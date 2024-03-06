import { expect, Locator, Page } from "@playwright/test"
import { AbstractPage } from "./AbstractPage"

export class TransferFundsPage extends AbstractPage{
    //Define selectors
    readonly fromAccount: Locator
    readonly toAccount: Locator
    readonly amount: Locator
    readonly description: Locator
    readonly submitButton: Locator
    readonly boardHeader: Locator
    readonly paymentSuccesAlert: Locator
  
    //Init selectors using constructor
    constructor(page:Page) {
        super(page)
        this.fromAccount = page.locator("#tf_fromAccountId")
        this.toAccount = page.locator("#tf_toAccountId")
        this.amount = page.locator("#tf_amount")
        this.description = page.locator("#tf_description")
        this.submitButton = page.locator("#btn_submit")
        this.boardHeader = page.locator("h2.board-header")
        this.paymentSuccesAlert = page.locator(".alert-success")
    }

    //Transfer funds
    async trasferFromAccountToAccount() {
        await this.fromAccount.selectOption("2")
        await this.toAccount.selectOption("3")
        await this.amount.fill("500")
        await this.description.fill("Here comes the money")
        await this.submitButton.click()
        await expect(this.boardHeader).toContainText('Transfer Money & Make Payments - Verify')
        await this.submitButton.click()
    }

    async assertTransferSuccessMessage() {
        await expect(this.paymentSuccesAlert).toBeVisible()
        await expect(this.paymentSuccesAlert).toContainText("You successfully submitted your transaction.")
    }
}
  