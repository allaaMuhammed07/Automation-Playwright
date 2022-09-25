import {test, expect} from "@playwright/test"
import {HomePage} from '/Users/allaaismail/Downloads/Automation-Playwright/page-objects/HomePage'
import {LoginPage} from '/Users/allaaismail/Downloads/Automation-Playwright/page-objects/LoginPage'

test.describe("Filter Account Transactions", ()=>{
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

    test("Checking Account",async ({page}) => {
        await page.click("#account_activity_tab")
        await page.selectOption("#aa_accountId","2")

        const checkingAccount = await page.locator("#all_transactions_for_account tbody tr")
        await expect(checkingAccount).toHaveCount(3)
    })
    test("Loan Account",async ({page}) => {
        await page.click("#account_activity_tab")
        await page.selectOption("#aa_accountId","4")

        const loanAccount = await page.locator("#all_transactions_for_account tbody tr")
        await expect(loanAccount).toHaveCount(2)
    })
    test("Brokerage Account",async ({page}) => {
        await page.click("#account_activity_tab")
        await page.selectOption("#aa_accountId","6")

        const broakageAccount = await page.locator(".well")
        await expect(broakageAccount).toBeVisible()
    })
})