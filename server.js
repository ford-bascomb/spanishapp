'use strict';
/*
 * Spanish II Practice: server.
 * Express + SQLite (a local file by default, or a hosted libSQL/Turso database for hosts without a disk).
 * Teachers sign in with a username and password. Students sign in with a class code, their name and a PIN.
 */
const express = require('express');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { createClient } = require('@libsql/client');

const PORT = Number(process.env.PORT) || 3000;
const DB_URL = process.env.DATABASE_URL || 'file:' + path.join(__dirname, 'data', 'app.db');
if (DB_URL.startsWith('file:')) fs.mkdirSync(path.dirname(DB_URL.slice(5)), { recursive: true });
const db = createClient({ url: DB_URL, authToken: process.env.DATABASE_AUTH_TOKEN || undefined });

/* ---------- small database helpers ---------- */
async function rows(sql, args = []) {
  const r = await db.execute({ sql, args });
  return r.rows.map(row => {
    const o = {};
    r.columns.forEach((c, i) => { o[c] = typeof row[i] === 'bigint' ? Number(row[i]) : row[i]; });
    return o;
  });
}
const one = async (sql, args) => (await rows(sql, args))[0] || null;
async function run(sql, args = []) {
  const r = await db.execute({ sql, args });
  return { id: r.lastInsertRowid == null ? null : Number(r.lastInsertRowid), n: r.rowsAffected };
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS teachers (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, display_name TEXT NOT NULL, pass_hash TEXT NOT NULL, created INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS classes (id INTEGER PRIMARY KEY AUTOINCREMENT, teacher_id INTEGER NOT NULL, name TEXT NOT NULL, code TEXT NOT NULL UNIQUE, created INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, class_id INTEGER NOT NULL, name TEXT NOT NULL, name_key TEXT NOT NULL, pin_hash TEXT, created INTEGER NOT NULL, UNIQUE(class_id, name_key));
CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, role TEXT NOT NULL, user_id INTEGER NOT NULL, expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS units (id INTEGER PRIMARY KEY AUTOINCREMENT, teacher_id INTEGER NOT NULL, title TEXT NOT NULL, ord INTEGER NOT NULL, data TEXT NOT NULL, updated INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS assignments (id INTEGER PRIMARY KEY AUTOINCREMENT, class_id INTEGER NOT NULL, unit_id INTEGER NOT NULL, title TEXT NOT NULL, due TEXT NOT NULL, mix TEXT NOT NULL, note TEXT NOT NULL DEFAULT '', created INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS answers (id INTEGER PRIMARY KEY AUTOINCREMENT, student_id INTEGER NOT NULL, ts INTEGER NOT NULL, day TEXT NOT NULL, area TEXT NOT NULL, key TEXT NOT NULL, label TEXT NOT NULL, ok INTEGER NOT NULL, unit_id INTEGER);
CREATE TABLE IF NOT EXISTS attempts (id INTEGER PRIMARY KEY AUTOINCREMENT, student_id INTEGER NOT NULL, assignment_id INTEGER NOT NULL, ts INTEGER NOT NULL, correct INTEGER NOT NULL, total INTEGER NOT NULL, missed TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_answers_student ON answers(student_id, ts);
CREATE INDEX IF NOT EXISTS idx_attempts_student ON attempts(student_id, assignment_id);
CREATE INDEX IF NOT EXISTS idx_students_class ON students(class_id);
CREATE INDEX IF NOT EXISTS idx_assign_class ON assignments(class_id);
`;

/* ---------- passwords, PINs, sessions ---------- */
const scrypt = (pw, salt) => new Promise((res, rej) => crypto.scrypt(pw, salt, 64, (e, k) => (e ? rej(e) : res(k))));
async function hashSecret(secret) {
  const salt = crypto.randomBytes(16);
  return 'scrypt$' + salt.toString('base64') + '$' + (await scrypt(secret, salt)).toString('base64');
}
async function verifySecret(secret, stored) {
  const p = String(stored || '').split('$');
  if (p[0] !== 'scrypt' || p.length !== 3) return false;
  const want = Buffer.from(p[2], 'base64');
  const got = await scrypt(secret, Buffer.from(p[1], 'base64'));
  return want.length === got.length && crypto.timingSafeEqual(want, got);
}
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const DAY = 864e5;
async function startSession(res, req, role, userId) {
  const token = crypto.randomBytes(32).toString('base64url');
  const ttl = role === 'teacher' ? 7 * DAY : 30 * DAY;
  await run('INSERT INTO sessions(token_hash,role,user_id,expires) VALUES (?,?,?,?)', [sha(token), role, userId, Date.now() + ttl]);
  res.cookie('sid', token, { httpOnly: true, sameSite: 'lax', secure: req.secure, maxAge: ttl, path: '/' });
}
function readCookie(req, name) {
  const h = req.headers.cookie || '';
  for (const part of h.split(';')) {
    const i = part.indexOf('=');
    if (i > -1 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

/* ---------- attempt limiter (wrong PIN / password guessing) ---------- */
const hits = new Map();
function blocked(key, max) { const h = hits.get(key); return !!(h && h.reset > Date.now() && h.n >= max); }
function fail(key, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  let h = hits.get(key);
  if (!h || h.reset < now) { h = { n: 0, reset: now + windowMs }; hits.set(key, h); }
  h.n++;
}
setInterval(() => { const now = Date.now(); for (const [k, h] of hits) if (h.reset < now) hits.delete(k); }, 60 * 1000).unref();

/* ---------- validation helpers ---------- */
const TENSES = ['present', 'preterite', 'imperfect'];
const AREAS = ['present', 'preterite', 'imperfect', 'vocab', 'sentences'];
const str = (v, max) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');
const text = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '');
const stripMarks = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const nameKey = n => stripMarks(n.normalize('NFC')).toLowerCase().replace(/\s+/g, ' ').trim();
const normCode = c => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
const isDay = s => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
const bad = (msg, status = 400) => Object.assign(new Error(msg), { status });
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
function makeCode() { let s = ''; const b = crypto.randomBytes(6); for (let i = 0; i < 6; i++) s += CODE_ALPHABET[b[i] % CODE_ALPHABET.length]; return s; }

function cleanUnit(b) {
  const title = str(b.title, 80);
  if (!title) throw bad('Give the unit a title.');
  const arr = (v, max) => (Array.isArray(v) ? v.slice(0, max) : []);
  const vocab = arr(b.vocab, 500).map(x => ({ es: str(x && x.es, 120), en: str(x && x.en, 160) })).filter(x => x.es && x.en);
  const notes = arr(b.notes, 50).map(x => ({ h: str(x && x.h, 120), b: text(x && x.b, 4000) })).filter(x => x.h || x.b.trim());
  const verbs = arr(b.verbs, 300).map(x => {
    if (!x || !TENSES.includes(x.t) || !str(x.inf, 40)) return null;
    const v = { t: x.t, inf: str(x.inf, 40).toLowerCase() };
    if (Array.isArray(x.forms)) {
      const f = x.forms.slice(0, 5).map(y => str(y, 40));
      if (f.length !== 5 || f.some(y => !y)) return null;
      v.en = str(x.en, 80); v.forms = f;
    }
    return v;
  }).filter(Boolean);
  const sentences = arr(b.sentences, 300).map(x => ({ s: str(x && x.s, 240), a: str(x && x.a, 120), t: TENSES.includes(x && x.t) ? x.t : '', why: str(x && x.why, 300) }))
    .filter(x => x.s.includes('____') && x.a);
  return { title, data: { vocab, notes, verbs, sentences } };
}
const unitOut = u => { const d = JSON.parse(u.data); return { id: u.id, title: u.title, order: u.ord, vocab: d.vocab || [], notes: d.notes || [], verbs: d.verbs || [], sentences: d.sentences || [] }; };

/* ---------- progress ---------- */
const addDays = (d, n) => { const t = new Date(d + 'T00:00:00Z'); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); };
async function buildProgress(studentId) {
  const a = await rows('SELECT area, ok, COUNT(*) n FROM answers WHERE student_id=? GROUP BY area, ok', [studentId]);
  const areas = {}; let answered = 0, correct = 0;
  a.forEach(r => { const o = areas[r.area] || (areas[r.area] = { a: 0, c: 0 }); o.a += r.n; if (r.ok) o.c += r.n; answered += r.n; if (r.ok) correct += r.n; });
  const un = await rows('SELECT unit_id, ok, COUNT(*) n FROM answers WHERE student_id=? AND unit_id IS NOT NULL GROUP BY unit_id, ok', [studentId]);
  const units = {};
  un.forEach(r => { const o = units[r.unit_id] || (units[r.unit_id] = { a: 0, c: 0 }); o.a += r.n; if (r.ok) o.c += r.n; });
  const it = await rows('SELECT key, MAX(label) l, SUM(ok) c, SUM(1-ok) w FROM answers WHERE student_id=? GROUP BY key ORDER BY MAX(ts) DESC LIMIT 400', [studentId]);
  const items = {}; it.forEach(r => { items[r.key] = { c: r.c, w: r.w, l: r.l }; });
  const days = (await rows('SELECT DISTINCT day FROM answers WHERE student_id=? ORDER BY day', [studentId])).map(r => r.day);
  let best = 0, run = 0, prev = null;
  days.forEach(d => { run = prev && addDays(prev, 1) === d ? run + 1 : 1; if (run > best) best = run; prev = d; });
  const lastDay = days.length ? days[days.length - 1] : null;
  const today = new Date().toISOString().slice(0, 10);
  const streak = lastDay && lastDay >= addDays(today, -1) ? run : 0;
  const at = await rows('SELECT assignment_id, correct, total, missed, ts FROM attempts WHERE student_id=? ORDER BY ts', [studentId]);
  const hw = {};
  at.forEach(r => {
    const h = hw[r.assignment_id] || (hw[r.assignment_id] = { attempts: 0, best: -1, bestN: 0, at: r.ts });
    h.attempts++; h.lastC = r.correct; h.lastN = r.total; h.missed = JSON.parse(r.missed);
    if (h.best < 0 || r.correct / r.total > h.best / h.bestN) { h.best = r.correct; h.bestN = r.total; }
  });
  const last = await one('SELECT MAX(ts) t FROM answers WHERE student_id=?', [studentId]);
  return { answered, correct, xp: correct * 10, streak, best, lastDay, areas, units, items, hw, t: last && last.t };
}

/* ---------- app ---------- */
const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'same-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  });
  if (req.secure) res.set('Strict-Transport-Security', 'max-age=15552000');
  next();
});
app.use(express.json({ limit: '300kb' }));
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  if (req.method !== 'GET' && req.get('x-requested-with') !== 'spanish2') return res.status(403).json({ error: 'Request blocked.' });
  next();
});
app.use(async (req, res, next) => {
  try {
    const tok = readCookie(req, 'sid');
    req.user = null;
    if (tok) {
      const s = await one('SELECT * FROM sessions WHERE token_hash=? AND expires>?', [sha(tok), Date.now()]);
      if (s) req.user = { role: s.role, id: s.user_id, hash: s.token_hash };
    }
    next();
  } catch (e) { next(e); }
});
const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const need = role => (req, res, next) => (req.user && req.user.role === role ? next() : res.status(401).json({ error: 'Please sign in.' }));
const ownClass = async (teacherId, classId) => { const c = await one('SELECT * FROM classes WHERE id=? AND teacher_id=?', [Number(classId), teacherId]); if (!c) throw bad('Class not found.', 404); return c; };
const ownStudent = async (teacherId, studentId) => {
  const s = await one('SELECT s.*, c.name AS class_name, c.teacher_id FROM students s JOIN classes c ON c.id=s.class_id WHERE s.id=?', [Number(studentId)]);
  if (!s || s.teacher_id !== teacherId) throw bad('Student not found.', 404);
  return s;
};

/* --- status and sign-in --- */
let SETUP_CODE = process.env.TEACHER_SETUP_CODE || '';
app.get('/api/status', wrap(async (req, res) => {
  const t = await one('SELECT COUNT(*) n FROM teachers');
  res.json({ setupOpen: t.n === 0 });
}));
app.post('/api/auth/setup', wrap(async (req, res) => {
  const t = await one('SELECT COUNT(*) n FROM teachers');
  if (t.n > 0) throw bad('A teacher account already exists.', 403);
  const ip = 'setup|' + req.ip;
  if (blocked(ip, 10)) throw bad('Too many tries. Wait ten minutes and try again.', 429);
  const given = String(req.body.setupCode || '').trim();
  const a = Buffer.from(sha(given)), b = Buffer.from(sha(SETUP_CODE));
  if (!SETUP_CODE || !crypto.timingSafeEqual(a, b)) { fail(ip); throw bad('That setup code is not right.', 401); }
  const username = str(req.body.username, 40).toLowerCase(), name = str(req.body.displayName, 60), pw = String(req.body.password || '');
  if (!/^[a-z0-9._-]{3,40}$/.test(username)) throw bad('Username: 3 to 40 letters, numbers, dots, dashes or underscores.');
  if (!name) throw bad('Enter the name students will see, such as Sra. Ruiz.');
  if (pw.length < 8) throw bad('Password must be at least 8 characters.');
  const r = await run('INSERT INTO teachers(username,display_name,pass_hash,created) VALUES (?,?,?,?)', [username, name, await hashSecret(pw), Date.now()]);
  await startSession(res, req, 'teacher', r.id);
  res.json({ ok: true });
}));
app.post('/api/auth/teacher', wrap(async (req, res) => {
  const username = str(req.body.username, 40).toLowerCase(), pw = String(req.body.password || '');
  const k1 = 'tl|' + req.ip, k2 = 'tl|' + username;
  if (blocked(k1, 20) || blocked(k2, 8)) throw bad('Too many tries. Wait ten minutes and try again.', 429);
  const t = await one('SELECT * FROM teachers WHERE username=?', [username]);
  const ok = t && await verifySecret(pw, t.pass_hash);
  if (!ok) { fail(k1); fail(k2); throw bad('Username or password is not right.', 401); }
  await startSession(res, req, 'teacher', t.id);
  res.json({ ok: true });
}));
app.post('/api/auth/student', wrap(async (req, res) => {
  const code = normCode(req.body.code), name = str(req.body.name, 40), pin = String(req.body.pin || '');
  if (code.length !== 6) throw bad('Class codes have 6 letters and numbers.');
  if (name.length < 2) throw bad('Type your name (at least two letters).');
  if (!/^[A-Za-z0-9]{4,12}$/.test(pin)) throw bad('Your PIN needs 4 to 12 letters or numbers.');
  const ipk = 'sl|' + req.ip;
  if (blocked(ipk, 40)) throw bad('Too many tries. Wait ten minutes and try again.', 429);
  const cls = await one('SELECT * FROM classes WHERE code=?', [code]);
  if (!cls) { fail(ipk); throw bad('No class has that code. Check it with your teacher.', 404); }
  const key = nameKey(name), nk = 'sl|' + cls.id + '|' + key;
  if (blocked(nk, 8)) throw bad('Too many wrong PINs for this name. Wait ten minutes or ask your teacher to reset your PIN.', 429);
  let st = await one('SELECT * FROM students WHERE class_id=? AND name_key=?', [cls.id, key]);
  let created = false;
  if (!st) {
    const r = await run('INSERT INTO students(class_id,name,name_key,pin_hash,created) VALUES (?,?,?,?,?)', [cls.id, name, key, await hashSecret(pin), Date.now()]);
    st = { id: r.id, name }; created = true;
  } else if (!st.pin_hash) {
    await run('UPDATE students SET pin_hash=? WHERE id=?', [await hashSecret(pin), st.id]); created = true;
  } else if (!(await verifySecret(pin, st.pin_hash))) {
    fail(nk); fail(ipk);
    throw bad('That name already has a different PIN. Check your PIN, or ask your teacher to reset it.', 401);
  }
  await startSession(res, req, 'student', st.id);
  res.json({ ok: true, created, name: st.name });
}));
app.post('/api/auth/logout', wrap(async (req, res) => {
  if (req.user) await run('DELETE FROM sessions WHERE token_hash=?', [req.user.hash]);
  res.clearCookie('sid', { path: '/' });
  res.json({ ok: true });
}));
app.get('/api/me', wrap(async (req, res) => {
  if (!req.user) return res.json({ role: null });
  if (req.user.role === 'teacher') {
    const t = await one('SELECT id, display_name FROM teachers WHERE id=?', [req.user.id]);
    return t ? res.json({ role: 'teacher', id: t.id, name: t.display_name }) : res.json({ role: null });
  }
  const s = await one('SELECT s.id, s.name, s.class_id, c.name AS class_name FROM students s JOIN classes c ON c.id=s.class_id WHERE s.id=?', [req.user.id]);
  return s ? res.json({ role: 'student', id: s.id, name: s.name, classId: s.class_id, className: s.class_name }) : res.json({ role: null });
}));

/* --- units and assignments (read by teacher and by students of that teacher) --- */
async function teacherIdFor(user) {
  if (user.role === 'teacher') return user.id;
  const r = await one('SELECT c.teacher_id t FROM students s JOIN classes c ON c.id=s.class_id WHERE s.id=?', [user.id]);
  return r && r.t;
}
app.get('/api/units', wrap(async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Please sign in.' });
  const tid = await teacherIdFor(req.user);
  res.json((await rows('SELECT * FROM units WHERE teacher_id=? ORDER BY ord, id', [tid])).map(unitOut));
}));
app.get('/api/assignments', wrap(async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Please sign in.' });
  let classId;
  if (req.user.role === 'student') classId = (await one('SELECT class_id c FROM students WHERE id=?', [req.user.id])).c;
  else { await ownClass(req.user.id, req.query.classId); classId = Number(req.query.classId); }
  const list = await rows('SELECT * FROM assignments WHERE class_id=? ORDER BY due, id', [classId]);
  res.json(list.map(a => ({ id: a.id, classId: a.class_id, unitId: a.unit_id, title: a.title, due: a.due, mix: JSON.parse(a.mix), note: a.note, created: a.created })));
}));

/* --- student: progress, answers, homework attempts --- */
app.get('/api/progress', need('student'), wrap(async (req, res) => {
  const s = await one('SELECT name FROM students WHERE id=?', [req.user.id]);
  res.json(Object.assign(await buildProgress(req.user.id), { name: s.name }));
}));
app.post('/api/answers', need('student'), wrap(async (req, res) => {
  const list = Array.isArray(req.body.answers) ? req.body.answers.slice(0, 200) : [];
  const tid = await teacherIdFor(req.user);
  const stmts = [];
  for (const x of list) {
    if (!x || !AREAS.includes(x.area) || !isDay(x.day)) continue;
    const key = str(x.key, 120), label = str(x.label, 160);
    if (!key || !label) continue;
    let unit = null;
    if (x.unitId != null && x.unitId !== '') {
      const u = await one('SELECT id FROM units WHERE id=? AND teacher_id=?', [Number(x.unitId), tid]);
      unit = u ? u.id : null;
    }
    stmts.push({ sql: 'INSERT INTO answers(student_id,ts,day,area,key,label,ok,unit_id) VALUES (?,?,?,?,?,?,?,?)', args: [req.user.id, Date.now(), x.day, x.area, key, label, x.ok ? 1 : 0, unit] });
  }
  if (stmts.length) await db.batch(stmts, 'write');
  res.json({ saved: stmts.length });
}));
app.post('/api/attempts', need('student'), wrap(async (req, res) => {
  const aid = Number(req.body.assignmentId), total = Number(req.body.total), correct = Number(req.body.correct);
  const a = await one('SELECT a.id FROM assignments a JOIN students s ON s.class_id=a.class_id WHERE a.id=? AND s.id=?', [aid, req.user.id]);
  if (!a) throw bad('Assignment not found.', 404);
  if (!Number.isInteger(total) || total < 1 || total > 200 || !Number.isInteger(correct) || correct < 0 || correct > total) throw bad('Bad score.');
  const missed = (Array.isArray(req.body.missed) ? req.body.missed : []).slice(0, 10).map(m => str(m, 160));
  await run('INSERT INTO attempts(student_id,assignment_id,ts,correct,total,missed) VALUES (?,?,?,?,?,?)', [req.user.id, aid, Date.now(), correct, total, JSON.stringify(missed)]);
  res.json(await buildProgress(req.user.id));
}));

/* --- teacher: classes and students --- */
app.get('/api/classes', need('teacher'), wrap(async (req, res) => {
  const list = await rows('SELECT c.id, c.name, c.code, (SELECT COUNT(*) FROM students s WHERE s.class_id=c.id) students FROM classes c WHERE c.teacher_id=? ORDER BY c.created, c.id', [req.user.id]);
  res.json(list);
}));
app.post('/api/classes', need('teacher'), wrap(async (req, res) => {
  const name = str(req.body.name, 60);
  if (!name) throw bad('Give the class a name, such as Period 3.');
  for (let i = 0; i < 20; i++) {
    const code = makeCode();
    try { const r = await run('INSERT INTO classes(teacher_id,name,code,created) VALUES (?,?,?,?)', [req.user.id, name, code, Date.now()]); return res.json({ id: r.id, name, code, students: 0 }); }
    catch (e) { if (!/UNIQUE/i.test(String(e.message))) throw e; }
  }
  throw bad('Could not make a class code. Try again.', 500);
}));
app.put('/api/classes/:id', need('teacher'), wrap(async (req, res) => {
  await ownClass(req.user.id, req.params.id);
  const name = str(req.body.name, 60);
  if (!name) throw bad('Give the class a name.');
  await run('UPDATE classes SET name=? WHERE id=?', [name, Number(req.params.id)]);
  res.json({ ok: true });
}));
app.delete('/api/classes/:id', need('teacher'), wrap(async (req, res) => {
  const c = await ownClass(req.user.id, req.params.id), id = c.id;
  await db.batch([
    { sql: 'DELETE FROM sessions WHERE role=\'student\' AND user_id IN (SELECT id FROM students WHERE class_id=?)', args: [id] },
    { sql: 'DELETE FROM answers WHERE student_id IN (SELECT id FROM students WHERE class_id=?)', args: [id] },
    { sql: 'DELETE FROM attempts WHERE student_id IN (SELECT id FROM students WHERE class_id=?)', args: [id] },
    { sql: 'DELETE FROM students WHERE class_id=?', args: [id] },
    { sql: 'DELETE FROM assignments WHERE class_id=?', args: [id] },
    { sql: 'DELETE FROM classes WHERE id=?', args: [id] }
  ], 'write');
  res.json({ ok: true });
}));
app.get('/api/classes/:id/students', need('teacher'), wrap(async (req, res) => {
  const c = await ownClass(req.user.id, req.params.id);
  const list = await rows(`SELECT s.id, s.name, s.created, (s.pin_hash IS NULL) AS pin_reset,
    (SELECT COUNT(*) FROM answers a WHERE a.student_id=s.id) answered,
    (SELECT COALESCE(SUM(ok),0) FROM answers a WHERE a.student_id=s.id) correct,
    (SELECT MAX(ts) FROM answers a WHERE a.student_id=s.id) last_ts,
    (SELECT COUNT(DISTINCT t.assignment_id) FROM attempts t JOIN assignments x ON x.id=t.assignment_id WHERE t.student_id=s.id AND x.class_id=s.class_id) hw_done
    FROM students s WHERE s.class_id=? ORDER BY LOWER(s.name)`, [c.id]);
  res.json(list.map(s => ({ id: s.id, name: s.name, answered: s.answered, correct: s.correct, lastTs: s.last_ts, hwDone: s.hw_done, pinReset: !!s.pin_reset, joined: s.created })));
}));
app.get('/api/students/:id', need('teacher'), wrap(async (req, res) => {
  const s = await ownStudent(req.user.id, req.params.id);
  res.json(Object.assign(await buildProgress(s.id), { id: s.id, name: s.name, className: s.class_name, classId: s.class_id }));
}));
app.post('/api/students/:id/reset-pin', need('teacher'), wrap(async (req, res) => {
  const s = await ownStudent(req.user.id, req.params.id);
  await db.batch([{ sql: 'UPDATE students SET pin_hash=NULL WHERE id=?', args: [s.id] }, { sql: 'DELETE FROM sessions WHERE role=\'student\' AND user_id=?', args: [s.id] }], 'write');
  res.json({ ok: true });
}));
app.delete('/api/students/:id', need('teacher'), wrap(async (req, res) => {
  const s = await ownStudent(req.user.id, req.params.id);
  await db.batch([
    { sql: 'DELETE FROM sessions WHERE role=\'student\' AND user_id=?', args: [s.id] },
    { sql: 'DELETE FROM answers WHERE student_id=?', args: [s.id] },
    { sql: 'DELETE FROM attempts WHERE student_id=?', args: [s.id] },
    { sql: 'DELETE FROM students WHERE id=?', args: [s.id] }
  ], 'write');
  res.json({ ok: true });
}));

/* --- teacher: units --- */
app.post('/api/units', need('teacher'), wrap(async (req, res) => {
  const u = cleanUnit(req.body);
  const mx = await one('SELECT COALESCE(MAX(ord),0) m FROM units WHERE teacher_id=?', [req.user.id]);
  const r = await run('INSERT INTO units(teacher_id,title,ord,data,updated) VALUES (?,?,?,?,?)', [req.user.id, u.title, mx.m + 1, JSON.stringify(u.data), Date.now()]);
  res.json({ id: r.id });
}));
app.put('/api/units/:id', need('teacher'), wrap(async (req, res) => {
  const u = cleanUnit(req.body);
  const r = await run('UPDATE units SET title=?, data=?, updated=? WHERE id=? AND teacher_id=?', [u.title, JSON.stringify(u.data), Date.now(), Number(req.params.id), req.user.id]);
  if (!r.n) throw bad('Unit not found.', 404);
  res.json({ id: Number(req.params.id) });
}));
app.delete('/api/units/:id', need('teacher'), wrap(async (req, res) => {
  const id = Number(req.params.id);
  const u = await one('SELECT id FROM units WHERE id=? AND teacher_id=?', [id, req.user.id]);
  if (!u) throw bad('Unit not found.', 404);
  await db.batch([
    { sql: 'DELETE FROM attempts WHERE assignment_id IN (SELECT id FROM assignments WHERE unit_id=?)', args: [id] },
    { sql: 'DELETE FROM assignments WHERE unit_id=?', args: [id] },
    { sql: 'UPDATE answers SET unit_id=NULL WHERE unit_id=?', args: [id] },
    { sql: 'DELETE FROM units WHERE id=?', args: [id] }
  ], 'write');
  res.json({ ok: true });
}));

/* --- teacher: assignments --- */
app.post('/api/assignments', need('teacher'), wrap(async (req, res) => {
  const title = str(req.body.title, 80), due = req.body.due, note = str(req.body.note, 200);
  if (!title) throw bad('Give the assignment a title.');
  if (!isDay(due)) throw bad('Choose a due date.');
  const unit = await one('SELECT id FROM units WHERE id=? AND teacher_id=?', [Number(req.body.unitId), req.user.id]);
  if (!unit) throw bad('Choose a unit.');
  const m = req.body.mix || {};
  const mix = { vocab: Math.max(0, Math.min(50, Number(m.vocab) | 0)), conj: Math.max(0, Math.min(50, Number(m.conj) | 0)), sent: Math.max(0, Math.min(50, Number(m.sent) | 0)) };
  if (!mix.vocab && !mix.conj && !mix.sent) throw bad('Ask at least one question.');
  const ids = Array.isArray(req.body.classIds) ? req.body.classIds.map(Number) : [];
  if (!ids.length) throw bad('Choose at least one class.');
  const stmts = [];
  for (const cid of ids) { await ownClass(req.user.id, cid); stmts.push({ sql: 'INSERT INTO assignments(class_id,unit_id,title,due,mix,note,created) VALUES (?,?,?,?,?,?,?)', args: [cid, unit.id, title, due, JSON.stringify(mix), note, Date.now()] }); }
  await db.batch(stmts, 'write');
  res.json({ ok: true, count: stmts.length });
}));
app.delete('/api/assignments/:id', need('teacher'), wrap(async (req, res) => {
  const a = await one('SELECT a.id FROM assignments a JOIN classes c ON c.id=a.class_id WHERE a.id=? AND c.teacher_id=?', [Number(req.params.id), req.user.id]);
  if (!a) throw bad('Assignment not found.', 404);
  await db.batch([{ sql: 'DELETE FROM attempts WHERE assignment_id=?', args: [a.id] }, { sql: 'DELETE FROM assignments WHERE id=?', args: [a.id] }], 'write');
  res.json({ ok: true });
}));
app.get('/api/assignments/:id/status', need('teacher'), wrap(async (req, res) => {
  const a = await one('SELECT a.* FROM assignments a JOIN classes c ON c.id=a.class_id WHERE a.id=? AND c.teacher_id=?', [Number(req.params.id), req.user.id]);
  if (!a) throw bad('Assignment not found.', 404);
  const studs = await rows('SELECT id, name FROM students WHERE class_id=? ORDER BY LOWER(name)', [a.class_id]);
  const at = await rows('SELECT student_id, correct, total, missed, ts FROM attempts WHERE assignment_id=? ORDER BY ts', [a.id]);
  const by = {};
  at.forEach(r => {
    const h = by[r.student_id] || (by[r.student_id] = { attempts: 0, best: -1, bestN: 0, at: r.ts });
    h.attempts++; h.missed = JSON.parse(r.missed);
    if (h.best < 0 || r.correct / r.total > h.best / h.bestN) { h.best = r.correct; h.bestN = r.total; }
  });
  res.json(studs.map(s => Object.assign({ studentId: s.id, name: s.name, attempts: 0 }, by[s.id] || {})));
}));

/* ---------- static files, errors, start ---------- */
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found.' }));
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, p) => { if (p.endsWith('.html')) res.set('Cache-Control', 'no-cache'); }
}));
app.use((err, req, res, next) => {
  if (err && err.type === 'entity.too.large') return res.status(413).json({ error: 'That is too much data at once.' });
  if (err && err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Bad request.' });
  const status = err.status || 500;
  if (status >= 500) console.error(err);
  if (res.headersSent) return next(err);
  res.status(status).json({ error: status >= 500 ? 'Something went wrong on the server.' : err.message });
});

async function main() {
  await db.executeMultiple(SCHEMA);
  await run('DELETE FROM sessions WHERE expires<?', [Date.now()]);
  setInterval(() => run('DELETE FROM sessions WHERE expires<?', [Date.now()]).catch(() => {}), 6 * 60 * 60 * 1000).unref();
  const t = await one('SELECT COUNT(*) n FROM teachers');
  if (t.n === 0) {
    if (!SETUP_CODE) { SETUP_CODE = crypto.randomBytes(6).toString('hex'); console.log('\n  No teacher account yet. Setup code for the first sign-up: ' + SETUP_CODE + '\n'); }
    else console.log('\n  No teacher account yet. Use your TEACHER_SETUP_CODE on the Teacher sign-in page.\n');
  }
  const server = app.listen(PORT, () => console.log('Spanish II Practice is running on port ' + PORT));
  module.exports.server = server;
}
if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
module.exports = { app, main, db, getSetupCode: () => SETUP_CODE };
