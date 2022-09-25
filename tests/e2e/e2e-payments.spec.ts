import {test} from "@playwright/test"
import {HomePage} from '../../page-objects/HomePage'
import {LoginPage} from '../../page-objects/LoginPage'
import {NavBar} from '../../page-objects/component/NavBar'
import {PaymentSpec} from '../../page-objects/PaymentSpec'

test.describe("New Payment", ()=>{
    let homePage: HomePage
    let loginPage: LoginPage
    let navBar: NavBar
    let paymentSpec: PaymentSpec

    test.beforeEach(async ({page})=>{
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navBar = new NavBar(page)
        paymentSpec = new PaymentSpec(page)

        await homePage.loadHomePage()
        await homePage.clickSignInButton()
        await loginPage.login("username", "password")

        await page.goto("http://zero.webappsecurity.com/bank/account-summary.html")
    })

    test("Make a Payment",async ({page}) => {
        //await page.pause()

        await navBar.clickOnTab("Pay Bills")
        await paymentSpec.makePayment("apple", "6", "1000", "2022-09-23", "description")

        await paymentSpec.assertSuccessMessage()
        })
})