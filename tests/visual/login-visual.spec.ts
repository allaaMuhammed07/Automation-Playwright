import {test } from "@playwright/test"
import {HomePage} from '../../page-objects/HomePage'
import {LoginPage} from '../../page-objects/LoginPage'

test.describe.only("Login Page Visual Test", ()=>{
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.loadHomePage()
        await homePage.clickSignInButton()
    })

    test("Login Form",async ({page}) => {
        await loginPage.snapshotLoginForm()
    })

    test("Invalid Login Message",async ({page}) => {
        await loginPage.login("invalid username", "invalid password")
        await loginPage.snabshotErrorMessage()
    })
})