import {expect, test} from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout'

test.beforeAll(() =>{
    console.log('The test suite is running')
})

test.beforeEach(async ({page}, testInfo) => {
    await page.goto(process.env.URLAutoWaitingTest); // URL est dans .env - 
    // n'oublie pas de : 
    // 1 - telecharger le dotenv : npm i dotenv
    // 2 - activer dans playwright.config.ts la partie require('dotenv').config();
    await page.getByText('Button Triggering AJAX Request').click();
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('TC Auto waiting', async({page}) => {
    
    const successAlert = page.locator('.bg-success');
    // await successAlert.click();

    // const text = await successAlert.textContent();
    // await successAlert.waitFor({state: "attached"});
    // const text = await successAlert.allTextContents();

    // expect(text).toEqual("Data loaded with AJAX get request.");

    await expect(successAlert).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
});

test.skip('alternative test wait', async ({page}) => {
    const successAlert = page.locator('.bg-success');

    await page.waitForSelector('.bg-success');

    const text = await successAlert.allTextContents();
    expect (text).toContain('Data loaded with AJAX get request.');
})


test.skip('Timeout', async ({page}) => {

    //test.setTimeout(20000);
    test.slow();
    const successBtn = page.locator('.bg-success');
    await successBtn.click({timeout: 16000});
   // expect (text).toContain('Data loaded with AJAX get request.');
})