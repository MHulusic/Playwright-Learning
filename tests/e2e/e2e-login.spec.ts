import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
 

test.describe.parallel("Login / Logout Flow", () => {
    let loginPage: LoginPage
    let homePage: HomePage
    
    //Before Hook
    test.beforeEach(async ({ page}) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)

        await homePage.visit()
    })
    //Negative Scenario
    test.skip('Negative Scenario for login', async ({ page }) => {

        await homePage.clickOnSignIn()
        await loginPage.login('invalid_username','invalid_password')
        await loginPage.wait(3000)
        await loginPage.assertErrorMessage()
    })
    
    //Positive Scenario + Logout
    test("Positive Scenario for Login / Logout", async ({page}) => {
        await homePage.clickOnSignIn()
        await loginPage.login("username", "password")
        await loginPage.assertAccountSummaryTabVisible()
        
        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})