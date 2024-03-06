import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe.parallel("Feedback Form", () => {
    let feedbackPage: FeedbackPage
    let homePage: HomePage
    
    
    test.beforeEach(async ({ page}) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        await homePage.visit()
        await homePage.clickOnFeedbackLink()
    })
    //Reset feedback form
    test('Reset feedback form', async ({ page }) => {
        await feedbackPage.fillForm(
            "some name",
            "email@email.com", 
            "some subject", 
            "some nice comment about app")
        await feedbackPage.resetForm()

        await feedbackPage.assertReset()
    })
    //Submit feedback form
    test('Submit feedback form', async ({ page }) => {
        await feedbackPage.fillForm(
            "some name", 
            "email@email.com", 
            "some subject", 
            "some nice comment about app")
        await feedbackPage.submitForm()
        
        await feedbackPage.feedbackFormSent()         
    })
})