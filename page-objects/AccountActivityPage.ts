import { expect, Locator, Page } from "@playwright/test"
import { AbstractPage } from "./AbstractPage"

export class AccountActivityPage extends AbstractPage{
    //Define selectors
    readonly selectAccount: Locator
    readonly checkingAccount: Locator
    readonly noResultsMessage: Locator
  
    //Init selectors using constructor
    constructor(page:Page) {
        super(page)
        this.selectAccount = page.locator("#aa_accountId")
        this.checkingAccount = page.locator("#all_transactions_for_account tbody tr")
        this.noResultsMessage = page.locator(".well")
    }

    //Verify results for each account

    async accountActivityResultsVerification() {
        await this.selectAccount.selectOption("2")
        await expect(this.checkingAccount).toHaveCount(3)
        await this.selectAccount.selectOption("4")
        await expect(this.checkingAccount).toHaveCount(2)
        await this.selectAccount.selectOption("6")
    }

    async assertNoResultsMessage() {
        await expect(this.noResultsMessage).toBeVisible()
        await expect(this.noResultsMessage).toContainText("No results.")
    }
}

