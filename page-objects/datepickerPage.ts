import {expect, Page} from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase{

    constructor(page: Page){
        super(page);
    };

    async selectCommunDatepickerFromToday(numberOfDaysFromToday: number){
        const commonDate = this.page.locator('nb-card', {hasText: 'Common Datepicker'});
        const datepickerCommon = commonDate.getByPlaceholder('Form Picker');
        await datepickerCommon.click();
        const dateToAssert = await this.selectDateInTheCalender(numberOfDaysFromToday)
        await expect(datepickerCommon).toHaveValue(dateToAssert);
    };

    async selectDatepickerFromToday(startDayFromToday: number, endDayFromToday: number){
        const commonDate = this.page.locator('nb-card', {hasText: 'Datepicker With Range'});
        const datepickerCommon = commonDate.getByPlaceholder('Range Picker');
        await datepickerCommon.click();
        const startDateToAssert = await this.selectDateInTheCalender(startDayFromToday)
        const endDateToAssert = await this.selectDateInTheCalender(endDayFromToday)
        const dateToAssert = `${startDateToAssert} - ${endDateToAssert}`;
        await expect(datepickerCommon).toHaveValue(dateToAssert);
    }

    private async selectDateInTheCalender(numberOfDaysFromToday: number){
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        const expectedDate = date.getDate().toString();
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'});
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'});
        const expectedYear = date.getFullYear();
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

        let calendarMonthAndYear = await this.page.locator("nb-calendar-view-mode").textContent();
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact:true}).click();
        return dateToAssert;
    }
}
