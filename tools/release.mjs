// Publishes tested work to the family. The family's server runs from .live/, a separate copy of the `main` branch,
// so unfinished work in this folder never reaches them. Usage: npm run release
// It checks the work on the dev server first (port 8081), moves `main` to `dev`, and updates .live/.
import { execFileSync, spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
const git = (...a) => execFileSync('git', a, { encoding: 'utf8' }).trim();
const step = (t) => console.log(`\n${t}`);
if (git('branch', '--show-current') !== 'dev') { console.log('Run this on the dev branch.'); process.exit(1); }
if (!existsSync('.live')) { console.log('No .live copy yet. Make it once with: git worktree add .live main'); process.exit(1); }
// Check the saved commit in a clean copy, so unfinished work in this folder can't pass or fail it.
step('Checking the saved version in a clean copy...');
const tmp = '.release-check', port = '8098', data = `${process.cwd()}/data/release-check.json`;
spawnSync('git', ['worktree', 'remove', '--force', tmp]);
execFileSync('git', ['worktree', 'add', '-q', '--detach', tmp, 'dev']);
const server = spawn('node', ['tools/serve.mjs', '--lan', port], { cwd: tmp, env: { ...process.env, HS_DATA: data }, stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 1500));
const check = spawnSync('node', ['tools/verify.mjs'], { cwd: tmp, encoding: 'utf8', env: { ...process.env, PORT: port } });
server.kill(); spawnSync('git', ['worktree', 'remove', '--force', tmp]); rmSync(data, { force: true });
process.stdout.write(check.stdout.split('\n').filter((l) => !l.startsWith('OK')).join('\n'));
if (check.status !== 0 || !/All checks passed/.test(check.stdout)) { console.log('\nNot released: fix the problems above first.'); process.exit(1); }
step('Moving main to the tested commit...');
if (spawnSync('git', ['merge-base', '--is-ancestor', 'main', 'dev']).status !== 0) { console.log('main has commits that dev lacks. Not released.'); process.exit(1); }
execFileSync('git', ['update-ref', 'refs/heads/main', git('rev-parse', 'dev')]);
execFileSync('git', ['-C', '.live', 'reset', '-q', '--hard', 'main']);
console.log(`The family now has: ${git('log', '-1', '--format=%h %s', 'main')}`);
// The family's server Mac (HS_SERVER in .env, for example HS_SERVER=homeserver) takes main from GitHub.
const host = (existsSync('.env') ? readFileSync('.env', 'utf8') : '').match(/^HS_SERVER=(\S+)/m)?.[1];
if (!host) { console.log('Pages update on the next reload. Restart the family server only if tools/serve.mjs changed.'); process.exit(0); }
step('Sending it to GitHub and the server Mac...');
execFileSync('git', ['push', '-q', 'origin', 'main', 'dev'], { stdio: 'inherit' });
const ssh = (cmd) => spawnSync('ssh', ['-o', 'BatchMode=yes', '-o', 'ConnectTimeout=8', host, cmd], { encoding: 'utf8' });
const up = ssh('cd ~/HomeSchool && bash tools/host/update.sh');
console.log(up.status === 0 ? up.stdout.trim() : `Couldn't reach ${host} (${(up.stderr || '').trim()}). It takes the update by itself tonight at 04:00.`);
// A copy of the family data on this Mac too, in case the server Mac fails.
const dest = `data/server-backups/${new Date().toISOString().slice(0, 10)}`;
mkdirSync(dest, { recursive: true });
const copy = spawnSync('scp', ['-q', '-o', 'BatchMode=yes', `${host}:HomeSchool/data/family.json`, `${host}:HomeSchool/data/family-log.jsonl`, `${dest}/`]);
console.log(copy.status === 0 ? `Family data copied to ${dest}` : 'The family data could not be copied this time.');
