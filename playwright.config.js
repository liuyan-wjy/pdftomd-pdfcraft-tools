import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './test/browser',
  fullyParallel: true,
  workers: 2,
  timeout: 30000,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4175', headless: true, trace: 'retain-on-failure' },
  webServer: { command: 'npm run build && npm run preview -- --port 4175', url: 'http://127.0.0.1:4175', reuseExistingServer: false, timeout: 60000 },
});
