import {test, expect} from "@playwright/test"
import {HomePage} from '/Users/allaaismail/Downloads/Automation-Playwright/page-objects/HomePage'
import {LoginPage} from '/Users/allaaismail/Downloads/Automation-Playwright/page-objects/LoginPage'

test.describe("Transfer Fund and Make funds", ()=>{
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({page})=>{
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.loadHomePage()
        await homePage.clickSignInButton()
        await loginPage.login("username", "password")

        await page.goto("http://zero.webappsecurity.com/bank/account-summary.html")
    })
    test("Transfer Funds",async ({page}) => {
        await page.click("#transfer_funds_tab")
        await page.selectOption("#tf_fromAccountId", "2")
        await page.selectOption("#tf_toAccountId", "3")
        await page.type("#tf_amount", "500")
        await page.type("#tf_description", "transfer fund description test")
        await page.click("#btn_submit")

        const transferFundPage = await page.locator("h2.board-header")
        await expect(transferFundPage).toContainText("Verify")
        await page.click("#btn_submit")

        const confirmMessage = await page.locator(".alert-success")
        await expect(confirmMessage).toContainText(
        'You successfully submitted your transaction.')
    })
})