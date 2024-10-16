import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

/* Global  */
export default defineConfig<TestOptions>({
  timeout: 30000,
  globalTimeout: 60000,
  expect: {
    timeout: 2000,
    toHaveScreenshot: {maxDiffPixels: 50}
  },
  // testDir: './tests',
  /* Run tests in files in parallel */
  // fullyParallel: false, /* par defaut true - pour activer l'éxecution parallele */
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0, /* to activate retry once retries: process.env.CI ? 2 : 1, - deactive 2 : 0 */
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined, /* par defaut workers: "process.env.CI ? 1 : undefined" (undefined : localy), */

  //reporter: 'html',
  reporter: [
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}], 
    //['allure-playwright'],
    ['html']
  ],
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:4200/',
    globalsQAURL: 'https://www.globalsqa.com/demo-site/draganddrop/', // le reste est dans test-option
    baseURL: process.env.DEV === '1' ? 'http://localhost:4200/'
          : process.env.STAGIN === '1' ? 'http://localhost:4201/'
          : 'http://localhost:4200/',
    trace: 'on-first-retry',
    navigationTimeout: 20000,
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: {
         ...devices['Desktop Chrome'],
         baseURL: 'http://localhost:4200/',
        },
      // fullyParallel: true /* pour executer les tests chromium en parallel*/
    },
    {
      name: 'stagin',
      use: { ...devices['Desktop Chrome'], 
        baseURL: 'http://localhost:4201/'
      },
      // fullyParallel: true /* pour executer les tests chromium en parallel*/
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      timeout: 60000,
      // fullyParallel: true /* pour executer les tests chromium en parallel*/
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
       },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObject.spec.ts',
      use:{
        viewport: { width: 1920, height: 1080}
      }
    }
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
