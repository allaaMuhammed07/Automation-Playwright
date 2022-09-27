import {test, expect} from '@playwright/test'
import {LoginPage} from '/Users/allaaismail/Downloads/Automation-Playwright/page-objects/LoginPage'
import {HomePage} from '/Users/allaaismail/Downloads/Automation-Playwright/page-objects/HomePage'

test.describe('Login / Logout Flow', ()=>{
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page})=>{
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.loadHomePage()
    })
    //Negative scenario
    test('Negative Login Scenario', async ({page})=>{
        homePage.clickSignInButton()

        await loginPage.login("invalid username", "invalid password")
        await loginPage.wait(3000)
        await loginPage.assertErrorMessage()
        
    })
    //Positiva scenario + logout
    test('Positive Login Scenatio + Logout', async ({page})=>{
        homePage.clickSignInButton()
        await loginPage.login("username", "password")

        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
        const ammountSummaryTab = await page.locator('#account_summary_tab')
        await expect(ammountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
        
    })
})