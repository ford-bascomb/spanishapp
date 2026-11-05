# Spanish II Practice

A website for your class. Students sign in with a class code, their name and a PIN. You sign in with a username and password, build units, assign homework and watch progress.

## Run it on your computer
    npm install
    TEACHER_SETUP_CODE=pick-something npm start
Open http://localhost:3000, choose "Set it up" under Teacher, enter the setup code and create your account. Data is stored in `data/app.db`.

## Put it online so students can use it
Students need a public address, so this has to be hosted. Easiest path (free):

1. **Database (keeps data safe).** Free hosts wipe their disk on restart, so use a free hosted database at turso.tech: create a database, then copy its URL (starts with `libsql://`) and create an auth token.
2. **Code.** Put this folder in a GitHub repository.
3. **Host.** On render.com choose New > Blueprint, pick the repository. Set `DATABASE_URL` to the Turso URL and `DATABASE_AUTH_TOKEN` to the token. Render generates `TEACHER_SETUP_CODE`; read it under Environment.
4. Open the site Render gives you, set up your teacher account, make a class, and give students the address and class code.

Any host that runs Node 20+ works. A host with a persistent disk can skip Turso (leave `DATABASE_URL` unset and keep `data/`).

## How sign-in works
- Student: class code + name + PIN. The first sign-in with a new name creates the student and saves the PIN. Forgotten PIN: Class tab > click the student > Reset PIN.
- The first teacher account is created with the setup code and becomes the admin.
- Other teachers create their own account with a school code. The admin sets or changes that code under Settings (leave it empty to turn sign-up off). Each teacher has private classes, units and students. The admin can reset another teacher's password.

## Known limits
- Homework is graded in the student's browser, so a technical student could fake a score. Fine for practice, not for tests.
- Teachers cannot share units with each other.
- Names are not verified; a PIN stops classmates from using each other's accounts.

Run the tests with `npm test` (needs Playwright installed).

## Ready-made units
The Units tab has a library of 12 finished units (about 535 vocabulary words, 366 practice sentences and grammar notes). Teachers can open one, add it to their own units (then edit it and assign homework), or add them all. Students and guests can practice any of them from Practice > "Practice from".
The library is built by `tools/build_templates.py` into `public/templates.js`. Conjugation answers come from a tested conjugation engine (`python3 tools/check_engine.py`).

## Files that must be at the top level of the GitHub repository
`server.js`, `package.json`, `package-lock.json`, `render.yaml`, and the folders `public` (index.html, app.js, style.css, templates.js), `units`, `test`, `tools`. If `package.json` is inside another folder, Render fails with "Could not read package.json".
