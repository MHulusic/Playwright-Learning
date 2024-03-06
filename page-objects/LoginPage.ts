import { expect, Locator, Page } from "@playwright/test"
import { AbstractPage } from "./AbstractPage"

export class LoginPage extends AbstractPage{
    //Define selectors
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator
    readonly accountSummaryTab: Locator
    readonly loginForm: Locator

    //Init selectors using constructor
    constructor(page:Page) {
        super(page)
        this.usernameInput = page.locator('#user_login')
        this.passwordInput = page.locator('#user_password')
        this.submitButton = page.locator('text=Sign in')
        this.errorMessage = page.locator('.alert-error')
        this.accountSummaryTab = page.locator('#account_summary_tab')
        this.loginForm= page.locator('#login_form')
    }

    //Define login page methods
    async login(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
        await this.page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
    }

    async loginInvalid(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText('Login and/or password are wrong.')
    }

    async assertAccountSummaryTabVisible() {
        await expect(this.accountSummaryTab).toBeVisible()
    }

    async snapshotLoginForm() {
        await expect(await this.loginForm.screenshot()).toMatchSnapshot('Login-form.png')
    }

    async snapshotErrorMessage() {
        await expect(await this.errorMessage.screenshot()).toMatchSnapshot('Login-error.png')
    }
}