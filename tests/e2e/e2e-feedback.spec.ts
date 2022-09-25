import {test} from "@playwright/test"
import {HomePage} from '/Users/allaaismail/Downloads/Automation-Playwright/page-objects/HomePage'
import {FeedbackForm} from '../../page-objects/FeedbackForm'

test.describe("Feedback Form", ()=>{
    let homePage: HomePage
    let feedbackForm: FeedbackForm
    test.beforeEach(async ({ page})=>{
        homePage = new HomePage(page)
        feedbackForm = new FeedbackForm(page)

        await homePage.loadHomePage()
        await homePage.clickOnFeedbackForm()
    })

    test("Reset Feedback Form",async ({page}) => {
        await feedbackForm.cleanFeedbackForm("username", "email", "subject", "comment")
    })

    test("Submit Feedback Form",async ({page}) => {
        await feedbackForm.submitFeedbackForm("username", "email", "subject", "comment")
    })
})