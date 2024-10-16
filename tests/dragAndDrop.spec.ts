import {expect} from '@playwright/test'
import { test } from '../test-options';

test('drag and drop with iframe', async ({page, globalsQAURL}) => {
    await page.goto(globalsQAURL);

    const iframeT = page.frameLocator('[rel-title="Photo Manager"] iframe');
    await iframeT.locator('li', {hasText: 'High Tatras 2'}).dragTo(iframeT.locator('#trash'));

    //2nd
    await iframeT.locator('li', {hasText: 'High Tatras 4'}).hover();
    await page.mouse.down();
    await iframeT.locator('#trash').hover();
    await page.mouse.up();

    //verification 
    await expect(iframeT.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4']);
});