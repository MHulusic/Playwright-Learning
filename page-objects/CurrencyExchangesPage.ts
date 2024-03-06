import { expect, Locator, Page } from "@playwright/test"
import { AbstractPage } from "./AbstractPage"

export class CurrencyExchangesPage extends AbstractPage{
    //Define selectors
    readonly selectCurrency: Locator
    readonly currencySellRate: Locator
    readonly amount: Locator
    readonly inDollarsSelectBox: Locator
    readonly calculateCostButton: Locator
    readonly conversionAmount: Locator
    readonly purchaseCashButton: Locator
    readonly message: Locator

    //Init selectors using constructor
    constructor(page:Page) {
        super(page)
        this.selectCurrency = page.locator("#pc_currency")
        this.currencySellRate = page.locator("#sp_sell_rate")
        this.amount = page.locator("#pc_amount")
        this.inDollarsSelectBox = page.locator("#pc_inDollars_true")
        this.calculateCostButton = page.locator("#pc_calculate_costs")
        this.conversionAmount = page.locator("#pc_conversion_amount")
        this.purchaseCashButton = page.locator("#purchase_cash")
        this.message = page.locator("#alert_content")
    }

    //Define login page methods

    async purchaseForeignCurrency() {
        await this.selectCurrency.selectOption("EUR")
        await expect(this.currencySellRate).toContainText("1 euro (EUR)")
        await this.amount.fill("5000")
        await this.inDollarsSelectBox.click()
        await this.calculateCostButton.click()
        await expect(this.conversionAmount).toContainText("5000.00 U.S. dollar (USD)")
        await this.purchaseCashButton.click()       
    }

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText("Foreign currency cash was successfully purchased.")
    }
}