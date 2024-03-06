import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { TransferFundsPage } from '../../page-objects/TransferFundsPage'

test.describe("Transfer funds and make payments", () => {
    let homePage: HomePage 
    let loginPage: LoginPage
    let transferFundsPage: TransferFundsPage

    test.beforeEach(async ({ page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        transferFundsPage = new TransferFundsPage(page)

        homePage.visit()
        homePage.clickOnSignIn()
        loginPage.login('username', 'password')
    })
    //Transfer funds
    test('Transfer funds', async ({ page }) => {
        await transferFundsPage.trasferFromAccountToAccount()
        await transferFundsPage.assertTransferSuccessMessage()
    })    
})