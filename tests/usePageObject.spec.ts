import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker'


test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test('nagivate to form page', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutPage();
    await pm.navigateTo().datepickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();
});


test('methodes parameters', async ({page}) => {
    const pm = new PageManager(page);    
    await pm.navigateTo().formLayoutPage();
    await pm.onFormLayoutPage().submitUsingGridFormWithCredentialsWithOption(process.env.MYUSERNAME, process.env.MYPASSWORD, 'Option 1');
    await page.screenshot({path: './test-results/screenshots/formsLayoutPage.png'});
});

test('methodes parameters inligne form', async ({page}) => {
    const pm = new PageManager(page);

    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutPage();
    await pm.onFormLayoutPage().submitUsingInlineForm(randomFullName, randomEmail, true); // of false
    await page.locator('nb-card', {hasText: 'Inline form'}).screenshot({path: './test-results/screenshots/formsLayoutPageElement.png'});
});

test('common datepicker', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().datepickerPage();
    await pm.onDatepickerPage().selectCommunDatepickerFromToday(17);
});

test('Range datepicker', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().datepickerPage();
    await pm.onDatepickerPage().selectDatepickerFromToday(19, 35);
});

test.only('testing with argos ci', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutPage();
    await pm.navigateTo().datepickerPage();

});

