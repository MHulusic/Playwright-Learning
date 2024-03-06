import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { CurrencyExchangesPage } from '../../page-objects/CurrencyExchangesPage'
import { Navbar } from '../../page-objects/components/Navbar'

test.describe("Currency Exchange Form", () => {
    let homePage: HomePage 
    let loginPage: LoginPage
    let currencyExchangePage: CurrencyExchangesPage
    let navbar: Navbar

    test.beforeEach(async ({ page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        currencyExchangePage = new CurrencyExchangesPage(page)
        navbar = new Navbar(page)

        homePage.visit()
        homePage.clickOnSignIn()
        loginPage.login('username', 'password')
    })
    //Verify results of currency exchange
    test('Should make currency exchange', async ({ page }) => {
        
        await navbar.clickOnTab("Pay Bills")
        await navbar.clickOnTab2("Purchase Foreign Currency")
        await currencyExchangePage.purchaseForeignCurrency()
        await currencyExchangePage.assertSuccessMessage()
    })

})