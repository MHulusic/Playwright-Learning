import { Locator, Page } from "@playwright/test";

export class Navbar {
    readonly page: Page
    readonly accountSummary: Locator
    readonly accountActivity: Locator
    readonly transferFunds: Locator
    readonly payBills: Locator
    readonly myMoneyMap: Locator
    readonly onlineStatements: Locator
    readonly paySavedPayee: Locator
    readonly addNewPayee: Locator
    readonly purchaseForeignCurrency: Locator

    constructor (page: Page) {
        this.page = page
        this.accountSummary = page.locator('#account_summary_tab')
        this.accountActivity = page.locator('#account_activity_tab')
        this.transferFunds = page.locator('#transfer_funds_tab')
        this.payBills = page.locator('#pay_bills_tab')
        this.myMoneyMap = page.locator('#money_map_tab')
        this.onlineStatements = page.locator('#online_statements_tab')
        this.paySavedPayee = page.locator('text=Pay Saved Payee')
        this.addNewPayee = page.locator('text=Add New Payee')
        this.purchaseForeignCurrency = page.locator('text=Purchase Foreign Currency')
    }

    async clickOnTab(tabName) {
        switch (tabName) {
            case "Account Summary":
                await this.accountSummary.click()
                break
            case "Account Activity":
                await this.accountActivity.click()
                break
            case "Transfer Funds":
                await this.transferFunds.click()
                break
            case "Pay Bills":
                await this.payBills.click()
                break
            case "My Money Map":
                await this.myMoneyMap.click()
                break
            case "Online Statements":
                await this.onlineStatements.click()
                break
            default:
                throw new Error('This tab does not exist...')
        }
    }

    async clickOnTab2(tabName) {
        switch (tabName) {
            case "Pay Saved Payee":
                await this.paySavedPayee.click()
                break
            case "Add New Payee":
                await this.addNewPayee.click()
                break
            case "Purchase Foreign Currency":
                await this.purchaseForeignCurrency.click()
                break
            default:
                throw new Error('This tab does not exist...')
        }
    }
}