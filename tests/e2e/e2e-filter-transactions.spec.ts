import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { AccountActivityPage } from '../../page-objects/AccountActivityPage'

test.describe("Account activities", () => {
    let homePage: HomePage 
    let loginPage: LoginPage
    let navbar: Navbar
    let accountActivityPage: AccountActivityPage

    test.beforeEach(async ({ page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navbar = new Navbar(page)
        accountActivityPage = new AccountActivityPage(page)

        homePage.visit()
        homePage.clickOnSignIn()
        loginPage.login('username', 'password')
    })
    //Verify results for each account
    test('Verify results for each account', async ({ page }) => {
        await navbar.clickOnTab("Account Activity")
        await accountActivityPage.accountActivityResultsVerification()
        await accountActivityPage.assertNoResultsMessage()        
    })    
})