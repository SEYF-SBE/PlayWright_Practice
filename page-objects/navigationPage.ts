import {Locator, Page} from '@playwright/test' 
import { HelperBase } from './helperBase';

export class Navigation extends HelperBase{

    readonly formLayoutMenuItem : Locator;
    readonly datpickerMenuItem : Locator;
    readonly smartTableMenuItem : Locator;
    readonly toastrMenuItem : Locator;
    readonly tooltipMenuItem : Locator;

    constructor(page : Page){
        super(page)
        this.formLayoutMenuItem = page.getByText('Form Layouts');
        this.datpickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem = page.getByText('Smart Table');
        this.toastrMenuItem = page.getByText('Toastr');
        this.tooltipMenuItem = page.getByText('Tooltip');
    }

    async formLayoutPage(){
        await this.selectGroupeMenuItem('Forms');
        await this.formLayoutMenuItem.click();
        await this.waitForNumberOfSections(2);
    }; 

    async datepickerPage(){
        await this.selectGroupeMenuItem('Forms');
        await this.datpickerMenuItem.click();
    }; 

    async smartTablePage(){
        await this.selectGroupeMenuItem('Tables & Data');
        await this.smartTableMenuItem.click();
    }; 

    async toastrPage(){
        await this.selectGroupeMenuItem('Modal & Overlays');
        await this.toastrMenuItem.click();
    }; 

    async tooltipPage(){
        // await this.page.getByText('Modal & Overlays').click();
        await this.selectGroupeMenuItem('Modal & Overlays');
        await this.tooltipMenuItem.click();
    }

    private async selectGroupeMenuItem(groupItemTitle : string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle);
        const expendedStat = await groupMenuItem.getAttribute('aria-expanded');
        if(expendedStat == "false"){
            await groupMenuItem.click();
        }
    }
}