import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false, // Установите true для безголового режима
    viewport: { width: 1280, height: 720 },
  },
  reporter: [['list'], ['html', { output: 'test-report.html' }]],
});