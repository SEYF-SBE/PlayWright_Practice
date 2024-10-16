import {test, expect} from '@playwright/test'

test.describe.configure({mode: 'parallel'})

test.beforeEach(async ({page}) => {
    page.goto('http://localhost:4200/');
});

test.describe('Form Layout page', () => {
    test.describe.configure({retries: 0})
    test.describe.configure({mode: 'serial'});

    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })

    test('Input Fields', async ({page}, testInfo) =>{
        if(testInfo.retry){
            // exemple : avant le 2nd retry on clean les données - script
        }
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name:'Email'});
        await usingTheGridEmailInput.fill('seyf@gmail.com')
        await usingTheGridEmailInput.clear();
        await usingTheGridEmailInput.pressSequentially('Test2@gmail.com');

        // generic assertion
        const inputVal = await usingTheGridEmailInput.inputValue();
        expect(inputVal).toEqual('Test2@gmail.com1');

        // locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('Test2@gmail.com')
    });

    test.only('Radio Buttons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'});
        //await usingTheGridForm.getByLabel('Option 1').check({force:true}); -- premiere solution

        await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force:true});
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked();
        // visual test
        await expect(usingTheGridForm).toHaveScreenshot({maxDiffPixels: 250}); 
        // generic assertion
        // expect(radioStatus).toBeTruthy();
        // locator assertion
        // await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked();

        // await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force:true});

        // expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy();
        // expect(await usingTheGridForm.getByRole('radio',{name: 'Option 2'}).isChecked()).toBeTruthy();
    });

});

test.describe('Model & Overlays', () =>{

    test.beforeEach(async ({page}) => {
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Toastr').click();
    })
    test('checkbox test', async({page}) => {
        const usingTheGridModal = page.locator('nb-card', {hasText: 'Toaster configuration'}); 
        await usingTheGridModal.getByRole('checkbox', {name:'Hide on click'}).uncheck({force:true});
        await usingTheGridModal.getByRole('checkbox', {name:'Prevent arising of duplicate toast'}).check({force:true});
        //check all 
        const allCheckobLocator = page.getByRole('checkbox');
        for(const box of await allCheckobLocator.all()){
            await box.check({force:true});
            expect(await box.isChecked()).toBeTruthy();
        }
        // unckeck all
        for(const box of await allCheckobLocator.all()){
            await box.uncheck({force:true});
            expect(await box.isChecked()).toBeFalsy();
        }
    });

    test.afterEach(async({page}) => {
        await page.waitForTimeout(3000);
        page.close();
    });
});

test.describe('Model & Overlays ToolTips', () =>{

    test.beforeEach(async ({page}) => {
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Tooltip').click();
    });

    test('ToolTips Test', async({page}) => {
        const toolTipCard = page.locator('nb-card', {hasText:'Tooltip Placements'});
        await toolTipCard.getByRole('button', {name:'Top'}).hover();

        page.getByRole('tooltip');
        const tooltip = await page.locator('nb-tooltip').textContent();
        expect(tooltip).toEqual('This is a tooltip');
    });

    test.afterEach(async ({page}) =>{
        await page.waitForTimeout(3000);
        page.close();
    });


});

test('Listas and dropdowns', async ({page}) =>{
    const dropdownMenu = page.locator('ngx-header nb-select');
    await dropdownMenu.getByRole('button').click();

    page.getByRole('list')  // UL
    page.getByRole('listitem')  //
    
    // const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option');
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']);

    await optionList.filter({hasText:'Cosmic'}).click();

    const header = page.locator('nb-layout-header');
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }
    await dropdownMenu.click();
    for (const color in colors) {
        await optionList.filter({hasText:color}).click();
        await expect(header).toHaveCSS('background-color', colors[color]);
        if(color != 'Corporate')
            await dropdownMenu.click();
    }
        
});

test.describe('Dialog Boxes', () =>{

    test.beforeEach(async ({page}) => {
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click();
    });

    test('Navigater Alert', async({page}) => {
        const table = page.locator('table tbody');

        page.on('dialog', dialog =>{
            expect(dialog.message()).toEqual('Are you sure you want to delete?');
            dialog.accept();
        });

        await table.locator('tr', {hasText:'mdo@gmail.com'}).locator('.nb-trash').click();
        await expect(table.locator('tr').first()).not.toHaveText('mdo@gmail.com');

        
        //expect(tooltip).toEqual('This is a tooltip');
    });

    test.afterEach(async ({page}) =>{
        await page.waitForTimeout(3000);
        page.close();
    });


});

test.describe('Tables', () =>{

    test.beforeEach(async ({page}) => {
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click();
    });

    test('Web Table', async({page}) => {
        const row = page.getByRole('row', {name: 'fat@yandex.ru'});

        await row.locator('.nb-edit').click();

        const tdEdit = page.locator('ng2-smart-table-cell input-editor').getByPlaceholder('Age');
        tdEdit.clear();
        tdEdit.pressSequentially('55');
        await row.locator('.nb-checkmark').click();

        
    });

    test('selection of row by ID ', async ({page}) =>{
        // selection by ID

        // pagination ==> 2 
        const rowId = page.locator('nav ul').getByText('2');
        await rowId.click();

        // find row by id 11 : 
        // const targetRowById = page.getByRole('row', {name: '11'}); ça ne marche pas parce que il y a plusieurs 11 sur d'autre rows
        const targetRowById = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')});
        targetRowById.locator('.nb-edit').click();

        const tdEdit = page.locator('ng2-smart-table-cell input-editor').getByPlaceholder('Age');
        tdEdit.clear();
        tdEdit.pressSequentially('55');
        await page.locator('.nb-checkmark').click();
        await expect(targetRowById.locator('td').nth(6)).toHaveText('55');


    });

    //Test filter of the table
    test('Filter of the table', async ({page}) => {
        const ages = ["20", "30", "40", "200"];
        const inputAge = page.locator('input-filter').getByPlaceholder('Age');

        for (let age of ages) {
            inputAge.clear();
            inputAge.fill(age);
            await page.waitForTimeout(1000);

            const ageRows = page.locator('tbody tr');
            for(let row of await ageRows.all()){
                const cellValue = await row.locator('td').last().textContent();

                if(age == "200"){
                    expect(await page.locator('tbody').textContent()).toContain('No data found');
                }else{
                    expect(cellValue).toEqual(age);
                }
            }
        }

    })

    test.afterEach(async ({page}) =>{
        await page.waitForTimeout(3000);
        page.close();
    });
});

test.describe('DatePicker', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click();
        await page.getByText('Datepicker').click();
    })

    test('simple date slection', async ({page}) =>{
        const commonDP = page.locator('nb-card', {hasText: 'Common Datepicker'});
        const inputDate = commonDP.getByPlaceholder('Form Picker');
        await inputDate.click();

        let date = new Date()
        date.setDate(date.getDate() + 5);
        const expectedDate = date.getDate().toString();

        const expectedMothShort = date.toLocaleString('En-US', {month: 'short'});
        const expectedMothLong = date.toLocaleString('En-US', {month: 'long'});

        const expectedYear = date.getFullYear();
        const expectedToAssert = `${expectedMothShort} ${expectedDate}, ${expectedYear}`;

        let calendarMY = await page.locator('nb-calendar-view-mode').textContent();
        const expectedMonthandYear = ` ${expectedMothLong} ${expectedYear} `;

        while(!calendarMY.includes(expectedMonthandYear)){
            await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calendarMY = await page.locator('nb-calendar-view-mode').textContent();
        }

        await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact:true}).click();
        await expect(inputDate).toHaveValue(expectedToAssert);
    });
});

test('sliders', async ({page}) => {
    //update attribute 
    // const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
    // await tempGauge.evaluate( node =>{
    //     node.setAttribute('cx', '232');
    //     node.setAttribute('cy', '232');
    // });
    // await tempGauge.click();

    // mouse mouvment
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
    await tempBox.scrollIntoViewIfNeeded();

    const box = await tempBox.boundingBox();
    const x = box.x + box.width/2;
    const y = box.y + box.height/2;

    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x+100, y);
    await page.mouse.move(x-100, y+100);
    await page.mouse.up()
    await expect(tempBox).toContainText('24')

});

