import { expect, Locator, Page } from "@playwright/test";

export class FeedbackForm{
    readonly page: Page
    readonly feedbackButton: Locator
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly subjectInput: Locator
    readonly commentInput: Locator
    readonly sendMessageButton: Locator
    readonly clearButton: Locator

    constructor(page: Page){
        this.page = page
        this.feedbackButton = page.locator("#feedback")
        this.nameInput = page.locator("#name")
        this.emailInput = page.locator("#email")
        this.subjectInput = page.locator("#subject")
        this.commentInput = page.locator("#comment")
        this.sendMessageButton = page.locator("Input[name='submit']")
        this.clearButton = page.locator("input[name='clear']")
    }

    async submitFeedbackForm(name: string, email: string, subject: string, comment: string){
        await this.nameInput.type(name)
        await this.emailInput.type(email)
        await this.subjectInput.type(subject)
        await this.commentInput.type(comment)
        await this.sendMessageButton.click()

        await this.page.waitForSelector("#feedback-title")
    }

    async cleanFeedbackForm(name: string, email: string, subject: string, comment: string){
        await this.nameInput.type(name)
        await this.emailInput.type(email)
        await this.subjectInput.type(subject)
        await this.commentInput.type(comment)
        await this.clearButton.click()

        await expect(this.nameInput).toBeEmpty()
        await expect(this.commentInput).toBeEmpty()
    }
}