import {test, expect} from "@playwright/test"
import {HomePage} from '/Users/allaaismail/Downloads/Automation-Playwright/page-objects/HomePage'
import {LoginPage} from '/Users/allaaismail/Downloads/Automation-Playwright/page-objects/LoginPage'


test.describe("New Payment", ()=>{
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
    test("Should make a currency exchange",async ({page}) => {
        await page.click("#pay_bills_tab")
        await page.click("text=Purchase Foreign Currency")
        await page.selectOption("#pc_currency", "GBP")
        
        const rate = await page.locator("#sp_sell_rate")
        await expect(rate).toContainText("1 pound (GBP)")

        await page.type("#pc_amount", "1000")
        await page.click("#pc_inDollars_true")
        await page.click("#pc_calculate_costs")

        const costAmount = await page.locator("#pc_conversion_amount")
        await expect(costAmount).toContainText("1000.00 U.S. dollar (USD)")

        await page.click("#purchase_cash")

        const message = await page.locator("#alert_content")
        await expect(message).toBeVisible
        await expect(message).toContainText("Foreign currency cash was successfully purchased.")
    })
})