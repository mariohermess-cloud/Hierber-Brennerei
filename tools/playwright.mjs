// Gemeinsamer Zugang zu Playwright (global installiert, Chromium liegt unter /opt/pw-browsers).
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
export const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/node22/lib/node_modules/playwright');
export const BASIS = process.env.SEITE || 'http://localhost:8770';
