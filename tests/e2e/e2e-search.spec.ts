import {test, expect} from "@playwright/test"
import {HomePage} from '/Users/allaaismail/Downloads/Automation-Playwright/page-objects/HomePage'

test.describe("Search in the website", ()=>{
    test("Should find test results", async({page})=>{
        let homePage: HomePage = new HomePage(page)
        await homePage.loadHomePage()
        await homePage.tybeInSearchBar("bank")

        const numberOfLinks = await page.locator("li > a")
        await expect(numberOfLinks).toHaveCount(2)
    })
})