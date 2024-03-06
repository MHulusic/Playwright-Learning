import { expect, Locator, Page } from "@playwright/test"
import { AbstractPage } from "./AbstractPage"

export class PaymentPage extends AbstractPage{
    //Define selectors
    readonly payeeSelectBox: Locator
    readonly payeeDetailsButton: Locator
    readonly payeeDetail: Locator
    readonly accountSelectBox: Locator
    readonly accountInput: Locator
    readonly dateInput: Locator
    readonly desctiptionInput: Locator
    readonly submitPaymentButton: Locator
    readonly message: Locator

    //Init selectors using constructor
    constructor(page:Page) {
        super(page)
        this.payeeSelectBox = page.locator("#sp_payee")
        this.payeeDetailsButton = page.locator("#sp_get_payee_details")
        this.payeeDetail = page.locator("#sp_payee_details")
        this.accountSelectBox = page.locator("#sp_account")
        this.accountInput = page.locator("#sp_amount")
        this.dateInput = page.locator("#sp_date")
        this.desctiptionInput = page.locator("#sp_description")
        this.submitPaymentButton = page.locator("#pay_saved_payees")
        this.message = page.locator("#alert_content > span")
    }

    //Define login page methods
    async createPayment() {
        await this.payeeSelectBox.selectOption('apple')
        await this.payeeDetailsButton.click()
        await expect(this.payeeDetail).toBeVisible()
        await this.accountSelectBox.selectOption('6')
        await this.accountInput.fill('5000')
        await this.dateInput.fill("2021-11-09")
        await this.desctiptionInput.fill("Some description")
        await this.submitPaymentButton.click()        
    }

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText("The payment was successfully submitted.")
    }
}