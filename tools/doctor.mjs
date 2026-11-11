// Says what this computer has, and what to install. Changes nothing. Usage: npm run doctor
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { findBrowser, findTool } from './lib/find.mjs';
const mac = process.platform === 'darwin', win = process.platform === 'win32';
const how = (brew, apt, choco) => (mac ? `brew install ${brew}` : win ? `choco install ${choco}` : `sudo apt install ${apt}`);
let missing = 0;
const row = (ok, name, why, fix) => { console.log(`${ok ? 'OK     ' : 'MISSING'} ${name}: ${why}`); if (!ok && fix) { console.log(`        Fix: ${fix}`); missing++; } };
console.log('To run the lessons:');
const major = +process.versions.node.split('.')[0];
row(major >= 22, `Node.js ${process.versions.node}`, 'runs the server and tools', 'install Node 22 or newer from https://nodejs.org');
console.log('\nTo record voices (only if you change lessons):');
row(!!findTool('ffmpeg'), 'ffmpeg', 'joins and evens out audio', how('ffmpeg', 'ffmpeg', 'ffmpeg'));
row(spawnSync('espeak-ng', ['--version']).status === 0, 'espeak-ng', 'turns Spanish into sounds for the voice model', how('espeak-ng', 'espeak-ng', 'espeak-ng'));
row(existsSync('tools/voice/node_modules/kokoro-js'), 'Voice model code', 'about 500 MB. Install it, record, then remove it', 'npm run voice:setup');
console.log('\nTo run the checks:');
row(!!findBrowser(), 'Edge or Chrome', 'runs checks hidden and muted', 'install Microsoft Edge or Google Chrome, or set BROWSER to its path');
row(spawnSync(win ? 'python' : 'python3', ['--version']).status === 0, 'Python 3', 'only to render 3D art', how('python', 'python3', 'python'));
console.log(missing ? `\n${missing} item(s) to install. Only the first section is needed to run the lessons.` : '\nEverything is ready.');
