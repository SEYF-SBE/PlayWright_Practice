import {expect, Page} from "@playwright/test";
import { Navigation } from '../page-objects/navigationPage';
import { FormLayoutPage } from '../page-objects/formLayoutPage';
import { DatepickerPage } from '../page-objects/datepickerPage';

export class PageManager{
    private readonly page: Page;
    private readonly navigationPage: Navigation;
    private readonly formLayoutPage: FormLayoutPage;
    private readonly datepickerPage: DatepickerPage;

    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new Navigation(this.page);
        this.datepickerPage = new DatepickerPage(this.page);
        this.formLayoutPage = new FormLayoutPage(this.page);
    }; 
 
    navigateTo(){
        return this.navigationPage;
    };

    onFormLayoutPage(){
        return this.formLayoutPage;
    }

    onDatepickerPage(){
        return this.datepickerPage;
    }
}