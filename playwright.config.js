import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },

    {
      name: 'chromium',
      use: {
        headless: false,

        storageState: 'storageState.json',

        permissions: ['notifications'],

        launchOptions: {
          args: [
            '--disable-notifications',
            '--disable-geolocation',
            '--disable-features=IsolateOrigins,site-per-process'
          ],
        },
      },

      dependencies: ['setup'],
    },
  ],
});