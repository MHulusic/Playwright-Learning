import {test, expect} from '@playwright/test'

import { loadHomepage, assertTitle } from '../helpers'


test("Simple basic test", async ({ page }) =>{
    await page.goto('https://example.com/')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
})

test('Clicking on elements', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.click('text=Sign in')

    const errorMessage = page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.skip("Selectors", async ({ page}) => {
    // text
    await page.click('text=some text')

    //css selectors
    // For simple html element - 
    await page.click('button')
    // For Id - 
    await page.click('#id')
    // For Calss - 
    await page.click('.class')

    //Only visible Css selector
    await page.click('.submit-button:visible')

    //Combinations
    await page.click('#username .first')

    //XPath
    await page.click('//button')
})

test.describe('My first test suite', () => {
    test('Working with inputs', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.type('#user_login', 'some username')
        await page.type('#user_password', 'some password')
        await page.click('text=Sign in')
    
        const errorMessage = page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
    
    test("Assertions @myTag", async ({ page }) =>{
        await page.goto('https://example.com/')
        await expect(page).toHaveURL('https://example.com/')
        await expect(page).toHaveTitle('Example Domain')
    
        const pageTitle = await page.locator('h1')
        await expect(pageTitle).toBeVisible()
        await expect(pageTitle).toHaveText('Example Domain')
        await expect(pageTitle).toHaveCount(1)
    
        const nonExitingElement = page.locator('h5')
        await expect(nonExitingElement).not.toBeVisible()
    })
})

test.describe.parallel.only('Hooks', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com/')
    })
    test("Screenshots", async ({ page }) => {
        //1. Load the website
        //await page.goto('https://example.com/')
        //2. Take screenshot of full page
        await page.screenshot({ path: 'screenshot.png', fullPage: true })
    })
    
    test("Single element Screenshot", async ({ page}) => {
        //await page.goto('https://example.com/')
        const element = await page.$('h1')
        await element.screenshot({ path: 'single_element_screenshot.png' })
    })
})

test('Custom helpers', async ({page}) => {
    await loadHomepage(page)
    //await page.pause() - // USE ONLY FOR DEBUGING OR DEVELOPMENT PURPOSE
    await assertTitle(page)
})


