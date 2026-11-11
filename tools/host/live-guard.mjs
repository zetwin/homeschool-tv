// Stops `npm run live` on this Mac once the family's copy has moved to the server Mac (HS_SERVER in .env),
// so there are never two copies of the family's progress drifting apart.
import { existsSync, readFileSync } from 'node:fs';
const host = (existsSync('.env') ? readFileSync('.env', 'utf8') : '').match(/^HS_SERVER=(\S+)/m)?.[1];
if (host) { console.log(`The family's copy runs on ${host} now: http://${host}.local:8080. Not starting a second one here.`); process.exit(1); }
