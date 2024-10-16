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
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:4200/',
    globalsQAURL: 'https://www.globalsqa.com/demo-site/draganddrop/', // le reste est dans test-option
    baseURL: 'http://localhost:4200/',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      timeout: 60000,
      // fullyParallel: true /* pour executer les tests chromium en parallel*/
    }
  ]
});

// to execute project with this file config : npx playwright test --config=palywright-prod.confi.ts
