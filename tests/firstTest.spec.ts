import {expect, test} from '@playwright/test'

test.beforeAll(() =>{
    console.log('The test suite is running')
})

test.beforeEach(async ({page}) => {
    await page.goto('/')

})

test.describe('test suite Forms', () => {

    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })

    test ('The first test', async ({page}) => {
   
        await page.getByText('Form Layouts').click()
        //await page.getByRole('link', name:'Form Layouts')
    })
    
    test ('navigate to the datepicker page', async ({page}) => {
        await page.getByText('Datepicker').click()
        //await page.getByRole('link', name:'Form Layouts')
    })
    
})

test.describe('test suite Charts', () => {

    test('chart test', async({page}) => {
        await page.getByRole('link', { name: 'Charts'})
    })
    
    test ('The first test Charts Ecrats', async ({page}) => {
        await page.getByText('Charts').click()
        await page.getByText('Echarts').click()
        //await page.getByRole('link', name:'Form Layouts')
    })
    
    // test ('navigate to the datepicker page', async ({page}) => {
    //     await page.getByText('Datepicker').click()
    //     //await page.getByRole('link', name:'Form Layouts')
    // })
    
})

test('Locator syntaxe rules', async({page}) =>{

    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

    // find locator by tag Name
    await page.locator('input').click();

    // find by Id
    await page.locator('#inputEmail1').click();

    //find by Class
    page.locator('.shape-rectangle')

    // find by attribute
    page.locator('[placeholder="Email"]')

    //find by full Class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition cdk-focused cdk-mouse-focused"]')

    // find by combination different selector
    page.locator('input[placeholder="Email"]')

    // find by xpath (Not recommanded)
    page.locator('//input[@id="inputEmail1"]')

    //find by pertial text
    page.locator(':text()"Using"')

    //find by full text match
    page.locator(':text-is("Using the Grid")')
});

test('User facing locators', async({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await page.getByRole('textbox', {name: "Email"}).first().click();
    await page.getByRole('button', {name: "Sign in"}).first().click();

    await page.getByLabel('Email').first().click();

    await page.getByPlaceholder('Message').click();

    await page.getByText('Form without labels').click();

    await page.getByAltText
})

test('TC child find', async({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click();
    await page.locator('nb-card').nth(3).getByRole('button').click();
})

test('TC locating parent elements', async({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name:"Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputPassword2')}).getByRole('textbox', {name:"Password"}).click();
})

test('TC Reusing the locators', async({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

    const basicForm = page.locator('nb-card', {hasText: "Basic form"});
    const emailFeild = basicForm.getByRole('textbox', {name:"Email"})

    await emailFeild.fill('emai@email.fr');
    await basicForm.getByRole('textbox', {name:"Password"}).fill('password@password.fr');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button').click();
    
    await expect(emailFeild).toHaveValue('emai@email.fr');


})

test('TC Extract text of element', async({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    //single test value 
    const basicForm = page.locator('nb-card', {hasText: "Basic form"});
    const btnText = await basicForm.getByRole('button').textContent();

    expect(btnText).toEqual('Submit');

    //all text value
    const allRadioLabels = await page.locator('nb-card').locator('nb-radio').allTextContents();
    expect(allRadioLabels).toContain("Option 1");

    //value Input
    const emailField = basicForm.getByRole('textbox', {name:"Email"})
    await emailField.fill("Seyf@seyf.com");
    const emailValue = await emailField.inputValue();
    expect(emailValue).toEqual('Seyf@seyf.com');

    // find value of placeholder
    const placeHolderValue = await emailField.getAttribute('placeholder');
    expect(placeHolderValue).toEqual('Email')
})

test('TC Assertions', async({page}) => {
    // await page.getByText('Forms').click();
    // await page.getByText('Form Layouts').click();

    //Generale assertion
    const val = 5; 
    expect(val).toEqual(5);

    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    const basicForm = page.locator('nb-card', {hasText: "Basic form"}).getByRole('button');
    const btnText = await basicForm.textContent();

    expect(btnText).toEqual('Submit');

    // Locator Assertion
    await expect(basicForm).toHaveText('Submit');

    //Soft Assertion
    await expect.soft(basicForm).toHaveText('Submit');
    await basicForm.click();
})


// test.afterAll(async ({page}) => {
//     //page.close()
//     console.log('Tests done!')
// })

