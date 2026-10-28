import {defineConfig} from '@playwright/test';
import {existsSync} from 'node:fs';
import {join} from 'node:path';
const cached=join(process.env.LOCALAPPDATA||'', 'ms-playwright/chromium-1243/chrome-win64/chrome.exe');
const executablePath=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||(existsSync(cached)?cached:undefined);
export default defineConfig({testDir:'./tests',timeout:120000,use:{headless:true,viewport:{width:1440,height:1000},launchOptions:{executablePath}},webServer:{command:process.platform==='win32'?'npm.cmd run dev -- --port 5173':'npm run dev -- --port 5173',url:'http://127.0.0.1:5173',reuseExistingServer:true},reporter:'list'});
