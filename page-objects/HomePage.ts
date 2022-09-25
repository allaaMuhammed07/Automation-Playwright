import {Locator, Page} from '@playwright/test'

export class HomePage{
    readonly page: Page
    readonly signInButton: Locator
    readonly searchBar: Locator
    readonly feedbackButton: Locator

    constructor (page: Page){
        this.page = page
        this.signInButton = page.locator("#signin_button")
        this.searchBar = page.locator("#searchTerm")
        this.feedbackButton = page.locator("#feedback")
    }

    async loadHomePage(){
        await this.page.goto("http://zero.webappsecurity.com/index.html")
    }

   async clickSignInButton(){
        await this.signInButton.click()
   }

   async tybeInSearchBar(searchText: string){
    await this.searchBar.type(searchText)
    await this.page.keyboard.press("Enter")
   }

   async clickOnFeedbackForm(){
    await this.feedbackButton.click()
   }
}