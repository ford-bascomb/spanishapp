'use strict';
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const PORT = 3200 + Math.floor(Math.random() * 500), BASE = 'http://localhost:' + PORT;
const DBF = '/tmp/s2-e2e-' + process.pid + '.db';
const SHOTS = process.env.SHOTS || '/tmp/s2shots';
fs.mkdirSync(SHOTS, { recursive: true });
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('  FAIL ' + m); } else console.log('  ok   ' + m); };
const H = { 'X-Requested-With': 'spanish2', 'Content-Type': 'application/json' };

(async () => {
  try { fs.unlinkSync(DBF); } catch (e) {}
  const srv = spawn('node', ['server.js'], { cwd: path.join(__dirname, '..'), env: Object.assign({}, process.env, { PORT, DATABASE_URL: 'file:' + DBF, TEACHER_SETUP_CODE: 'letmein-123' }), stdio: 'pipe' });
  srv.stderr.on('data', d => process.stderr.write(d));
  for (let i = 0; i < 50; i++) { try { await fetch(BASE + '/api/status'); break; } catch (e) { await new Promise(r => setTimeout(r, 200)); } }
  const browser = await chromium.launch();
  const errs = [];
  const mk = async () => { const c = await browser.newContext({ viewport: { width: 1000, height: 900 } }); const p = await c.newPage(); p.setDefaultTimeout(8000); p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); }); return p; };
  const raw = (p, method, url, body) => p.evaluate(async ([m, u, b, h]) => { const r = await fetch(u, { method: m, headers: h, body: b ? JSON.stringify(b) : undefined }); let j = null; try { j = await r.json(); } catch (e) {} return { s: r.status, j }; }, [method, url, body, H]);
  try {
    console.log('Home page');
    const t = await mk();
    await t.goto(BASE);
    await t.waitForSelector('#fStu');
    await t.screenshot({ path: SHOTS + '/home.png', fullPage: true });
    ok(await t.locator('#fTea').count() === 1, 'teacher sign-in shown');
    ok(await t.locator('#tFirst').count() === 1, 'first-time setup link shown (no teacher yet)');

    console.log('Teacher setup');
    await t.click('#tFirst');
    await t.fill('#tCode', 'wrong'); await t.fill('#tDisp', 'Sra. Ruiz'); await t.fill('#tUser', 'ruiz'); await t.fill('#tPass', 'longenough1');
    await t.click('#fSet button[type=submit]');
    await t.waitForFunction(() => document.querySelector('#tMsg').textContent.length > 0);
    ok(/setup code/.test(await t.textContent('#tMsg')), 'wrong setup code rejected');
    await t.fill('#tCode', 'letmein-123'); await t.fill('#tPass', 'short');
    await t.click('#fSet button[type=submit]');
    await t.waitForFunction(() => /8 char/.test(document.querySelector('#tMsg').textContent));
    ok(true, 'short password rejected');
    await t.fill('#tPass', 'longenough1');
    await t.click('#fSet button[type=submit]');
    await t.waitForSelector('#clName');
    ok(await t.locator('.badge').textContent() === 'Teacher', 'teacher signed in after setup');
    ok((await raw(t, 'GET', '/api/status')).j.setupOpen === false, 'setup closed afterwards');
    ok((await raw(t, 'POST', '/api/auth/setup', { setupCode: 'letmein-123', username: 'evil', displayName: 'x', password: 'password123' })).s === 403, 'second setup refused');

    console.log('Classes');
    await t.fill('#clName', 'Period 3'); await t.click('#clmake');
    await t.waitForSelector('.code');
    const code = (await t.textContent('.code')).trim();
    ok(/^[A-Z2-9]{6}$/.test(code), 'class code made: ' + code);
    await t.screenshot({ path: SHOTS + '/teacher-class-empty.png', fullPage: true });

    console.log('Unit (API) and assignment (UI)');
    const u = await raw(t, 'POST', '/api/units', { title: 'Unidad 1: La rutina', vocab: [{ es: 'el despertador', en: 'alarm clock' }, { es: 'levantarse', en: 'to get up' }, { es: 'la ducha', en: 'shower' }], notes: [{ h: 'Reflexives', b: 'Use me, te, se.' }],
      verbs: [{ t: 'present', inf: 'hablar' }, { t: 'preterite', inf: 'comer' }, { t: 'present', inf: 'levantarse', en: 'to get up', forms: ['me levanto', 'te levantas', 'se levanta', 'nos levantamos', 'se levantan'] }],
      sentences: [{ s: 'Yo ____ (hablar) español.', a: 'hablo', t: 'present', why: '-ar, yo = -o' }] });
    ok(u.s === 200, 'unit saved');
    ok((await raw(t, 'POST', '/api/units', { title: '', vocab: [] })).s === 400, 'empty title rejected');
    await t.reload(); await t.waitForSelector('.tab');
    await t.click('.tab[data-t=assign]');
    await t.waitForSelector('#aT');
    await t.fill('#aT', 'Week 1 homework'); await t.fill('#aV', '3'); await t.fill('#aC', '4'); await t.fill('#aS', '1');
    await t.click('#acreate');
    await t.waitForFunction(() => /Assigned/.test(document.querySelector('#amsg').textContent));
    ok(await t.locator('.ucard h3', { hasText: 'Week 1 homework' }).count() === 1, 'assignment listed');
    await t.screenshot({ path: SHOTS + '/teacher-assign.png', fullPage: true });

    console.log('Student sign-in');
    const s = await mk();
    await s.goto(BASE); await s.waitForSelector('#fStu');
    await s.fill('#sCode', 'ZZZZZZ'); await s.fill('#sName', 'Ana T.'); await s.fill('#sPin', '4321');
    await s.click('#fStu button[type=submit]');
    await s.waitForFunction(() => /No class has that code/.test(document.querySelector('#sMsg').textContent));
    ok(true, 'bad class code explained');
    await s.fill('#sCode', code.toLowerCase());
    await s.fill('#sPin', 'ab');
    await s.click('#fStu button[type=submit]');
    await s.waitForFunction(() => /PIN needs/.test(document.querySelector('#sMsg').textContent));
    ok(true, 'short PIN rejected client side');
    await s.fill('#sPin', '4321');
    await s.click('#fStu button[type=submit]');
    await s.waitForSelector('#hwlist');
    ok(await s.locator('.badge').textContent() === 'Student', 'student badge');
    ok(await s.locator('.tab[data-t=class]').count() === 0, 'student sees no teacher tabs');
    await s.screenshot({ path: SHOTS + '/student-homework.png', fullPage: true });
    ok(await s.locator('.ucard h3', { hasText: 'Week 1 homework' }).count() === 1, 'student sees the assignment');

    console.log('Wrong PIN, same name, other browser');
    const s2 = await mk();
    await s2.goto(BASE); await s2.waitForSelector('#fStu');
    await s2.fill('#sCode', code); await s2.fill('#sName', '  ana   t. '); await s2.fill('#sPin', '9999');
    await s2.click('#fStu button[type=submit]');
    await s2.waitForFunction(() => /different PIN/.test(document.querySelector('#sMsg').textContent));
    ok(true, 'same name (case/space-insensitive) with wrong PIN refused');
    await s2.fill('#sPin', '4321'); await s2.click('#fStu button[type=submit]');
    await s2.waitForSelector('#hwlist');
    ok(true, 'same name with right PIN signs in as the same student');

    console.log('Student does homework');
    await s.click('[data-hw]');
    await s.waitForSelector('#ans');
    let n = 0;
    while (await s.locator('#ans').count() && n < 20) {
      await s.fill('#ans', 'zzz'); await s.click('#go');
      await s.waitForSelector('#fb .fb');
      await s.click('#go'); n++;
      await s.waitForTimeout(50);
    }
    ok(n === 8, 'answered all 8 questions (' + n + ')');
    await s.waitForFunction(() => /Score sent|not sent/.test(document.querySelector('#attmsg') ? document.querySelector('#attmsg').textContent : ''));
    ok(/Score sent/.test(await s.textContent('#attmsg')), 'score sent to server');
    await s.screenshot({ path: SHOTS + '/student-done.png', fullPage: true });
    await s.click('#back'); await s.waitForSelector('#hwlist');
    ok(/Done/.test(await s.textContent('.ucard .pill')), 'status Done');

    console.log('Student practice');
    await s.click('.tab[data-t=conjugate]');
    await s.waitForSelector('#selSrc');
    await s.selectOption('#selSrc', { label: 'Unidad 1: La rutina' });
    await s.click('[data-s=vocab]');
    await s.waitForSelector('#view .card');
    await s.click('.tab[data-t=progress]');
    await s.waitForSelector('.stat');
    await s.waitForTimeout(2600);

    console.log('Teacher sees student');
    await t.click('.tab[data-t=class]');
    await t.reload(); await t.waitForSelector('#roster');
    await t.waitForSelector('tr.clickrow');
    ok(await t.locator('tr.clickrow').count() === 1, 'one student on roster (not two)');
    await t.click('tr.clickrow');
    await t.waitForSelector('#stpin');
    await t.waitForFunction(() => /Week 1 homework/.test(document.querySelector('#cldetail').textContent));
    const detail = await t.textContent('#cldetail');
    ok(/Done/.test(detail), 'teacher sees homework done');
    ok(/Missed on last try/.test(detail), 'missed items column shown to teacher');
    await t.screenshot({ path: SHOTS + '/teacher-detail.png', fullPage: true });

    console.log('Reset PIN');
    await t.click('#stpin'); await t.click('#stpin');
    await t.waitForFunction(() => /PIN reset/.test(document.querySelector('#stnote').textContent));
    const s3 = await mk();
    await s3.goto(BASE); await s3.waitForSelector('#fStu');
    ok((await raw(s, 'GET', '/api/me')).j.role === null, 'old student session ended by PIN reset');
    await s3.fill('#sCode', code); await s3.fill('#sName', 'Ana T.'); await s3.fill('#sPin', 'newpin7');
    await s3.click('#fStu button[type=submit]'); await s3.waitForSelector('#hwlist');
    ok(true, 'student chose a new PIN after reset');
    const me = await raw(s3, 'GET', '/api/progress');
    ok(me.j.answered > 0, 'progress survived PIN reset');

    console.log('Security');
    const anon = await mk(); await anon.goto(BASE);
    ok((await raw(anon, 'GET', '/api/units')).s === 401, 'units need sign-in');
    ok((await raw(anon, 'GET', '/api/classes')).s === 401, 'classes need sign-in');
    ok((await raw(s3, 'GET', '/api/classes')).s === 401, 'student cannot list classes');
    ok((await raw(s3, 'POST', '/api/units', { title: 'x' })).s === 401, 'student cannot create units');
    ok((await raw(s3, 'DELETE', '/api/units/1')).s === 401, 'student cannot delete units');
    ok((await raw(s3, 'GET', '/api/students/1')).s === 401, 'student cannot read others');
    const noHdr = await anon.evaluate(async () => (await fetch('/api/auth/logout', { method: 'POST' })).status);
    ok(noHdr === 403, 'POST without the custom header blocked');
    const hdrs = await anon.evaluate(async () => { const r = await fetch('/'); return { csp: r.headers.get('content-security-policy'), xf: r.headers.get('x-frame-options') }; });
    ok(/script-src 'self'/.test(hdrs.csp) && hdrs.xf === 'DENY', 'CSP and frame protection set');
    const ck = (await s3.context().cookies()).find(c => c.name === 'sid');
    ok(ck && ck.httpOnly && ck.sameSite === 'Lax', 'session cookie HttpOnly + SameSite=Lax');
    let blocked = 0;
    for (let i = 0; i < 12; i++) { const r = await raw(anon, 'POST', '/api/auth/teacher', { username: 'ruiz', password: 'nope' + i }); if (r.s === 429) blocked++; }
    ok(blocked > 0, 'repeated bad teacher logins get rate limited');
    ok((await raw(anon, 'POST', '/api/auth/student', { code, name: 'Ana T.', pin: 'wrong1' })).s === 401, 'wrong PIN is 401');
    const xss = await raw(t, 'POST', '/api/classes', { name: '<img src=x onerror=alert(1)>' });
    await t.reload(); await t.waitForSelector('#selClass');
    ok(await t.locator('img[src=x]').count() === 0, 'class names are escaped');
    await raw(t, 'DELETE', '/api/classes/' + xss.j.id);

    console.log('Teacher preview, sign out, guest');
    await t.reload(); await t.waitForSelector('#prev');
    await t.click('#prev'); await t.waitForSelector('#hwlist');
    ok(await t.locator('.tab[data-t=homework]').count() === 1, 'preview as student works');
    await t.click('#prev'); await t.click('#sout');
    await t.waitForSelector('#fStu');
    ok((await raw(t, 'GET', '/api/me')).j.role === null, 'sign out ends the session');
    await t.click('#gGuest'); await t.waitForSelector('#view .card');
    ok(await t.locator('.badge').textContent() === 'Guest', 'guest mode opens drills');
    await t.screenshot({ path: SHOTS + '/guest.png', fullPage: true });

    console.log('Mobile home');
    const mb = await browser.newContext({ viewport: { width: 375, height: 800 } }); const mp = await mb.newPage();
    await mp.goto(BASE); await mp.waitForSelector('#fStu');
    ok(await mp.evaluate(() => document.documentElement.scrollWidth <= 376), 'no horizontal scroll at 375px');
    await mp.screenshot({ path: SHOTS + '/home-mobile.png', fullPage: true });

    ok(errs.length === 0, 'no page errors' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  } catch (e) { fails++; console.log('  CRASH', e.message.split('\n')[0]); }
  await browser.close(); srv.kill();
  console.log(fails ? '\n' + fails + ' FAILED' : '\nAll passed');
  process.exit(fails ? 1 : 0);
})();
