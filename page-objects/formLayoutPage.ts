import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutPage extends HelperBase{

    constructor(page: Page) {
        super(page);
    }

    async submitUsingGridFormWithCredentialsWithOption(email: string, password: string, option: string){
        const gridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'});
        const emailField = gridForm.locator('[id="inputEmail1"]');
        const passwordField = gridForm.locator('[id="inputPassword2"]');
        const optionRadio = gridForm.getByRole('radio', {name: option});
        const submitBtn = gridForm.getByRole('button', {name: 'Sign in'})
        await emailField.fill(email);
        await passwordField.fill(password);
        await optionRadio.check({force: true});
        await submitBtn.click();

    }; 

    /**
     * This method will out the inligne from with user details
     * @param name - should be first and last name
     * @param email - valid email for the test user
     * @param remeberCheckBox - true or false if user session to be safed
     */
    async submitUsingInlineForm(name: string, email: string, remeberCheckBox: boolean){
        const inlignForm = this.page.locator('nb-card', {hasText: 'Inline form'});
        const name_field = inlignForm.getByRole('textbox', {name: 'Jane Doe'});
        const email_field = inlignForm.getByRole('textbox', {name: 'Email'});
        const remeberMe = inlignForm.getByRole('checkbox', {name: 'Remember me'});
        const submitBtn = inlignForm.getByRole('button');

        await name_field.fill(name);
        await email_field.fill(email);
        if (remeberCheckBox) {
            await remeberMe.check({force: true});
        }
        await submitBtn.click();

    }

}