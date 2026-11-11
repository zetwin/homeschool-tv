// Finds the programs our tools need, on any computer. Set BROWSER, FFMPEG or FFPROBE to choose your own.
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
const onPath = (name) => { const r = spawnSync(process.platform === 'win32' ? 'where' : 'which', [name], { encoding: 'utf8' }); return r.status === 0 ? r.stdout.split('\n')[0].trim() : null; };
const first = (paths) => paths.find((p) => p && existsSync(p)) || null;
export function findBrowser() {
  if (process.env.BROWSER) return process.env.BROWSER;
  const pf = process.env.PROGRAMFILES || 'C:\\Program Files', pf86 = process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)';
  return first(['/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium', join(pf86, 'Microsoft/Edge/Application/msedge.exe'), join(pf, 'Google/Chrome/Application/chrome.exe')])
    || onPath('microsoft-edge') || onPath('google-chrome') || onPath('chromium') || onPath('chromium-browser');
}
export const findTool = (name) => process.env[name.toUpperCase()] || first([`/opt/homebrew/bin/${name}`, `/usr/local/bin/${name}`]) || onPath(name);
