import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

reporter: [
  ['list'],
  ['allure-playwright']
],

  reporter: [
    ['list'],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['allure-playwright']
  ],

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
        use: {
  storageState: 'storageState.json',

  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'retain-on-failure',
},
      },

      dependencies: ['setup'],
    },
  ],
  timeout: 60000,
});