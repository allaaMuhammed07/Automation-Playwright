import { test, expect } from '@playwright/test'
import {loadHomePage, assertTitle } from '../helpers'

//how playwright test look like
//page argument gives us an access to control the browser
//we use async as eveything in playwright is asynchronous

test.skip('Selectors', async ({ page })=>{
    //text
    await page.click('text=some text')

    //CSS Selector
    await page.click('button')
    await page.click('#id')
    await page.click('.class')

    //only visible CSS selector
    await page.click('.submit-button:visible')

    //Combinations
    await page.click('#username .first')

    //xpath
    await page.click('//some xpath')
})

test("Simple basic test", async ({ page }) =>{
    //Tests goes here
    await page.goto('https://www.example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
})

test.describe('First test suite', ()=> {
    test("Clicking on Element", async ({ page})=> {
        await page.goto('http://zero.webappsecurity.com/index.html')
        //click on an element using its id
        await page.click("#signin_button")
        //click on an element using its text
        await page.click("text=Sign in")
        //check an element with classes
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
    
    test('Enter invalid login details @Login', async({page}) =>{
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click("#signin_button")
    
        await page.type('#user_login','some username')
        await page.type('#user_password','some password')
    
        await page.click("text=Sign in")
    
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toBeVisible()
        await expect(errorMessage).toHaveText('Login and/or password are wrong.')
    })
})

test.describe.parallel.only('Hooks', ()=>{
    test.beforeEach(async({page})=>{
        await page.goto('https://www.example.com')
    })
    test('screenshot', async ({page})=> {
        await page.screenshot({path:'screenshot.png', fullPage: true})
    })
    
    test('Single element screenshot', async({page})=>{
        const element = await page.$('h1')
        await element?.screenshot({path: 'single-element-escreenshot.png'})
    })
})

test('Custom Helpers',async ({ page }) => {
    await loadHomePage(page)
    //to pause the execution after the home page. useful for debugging
    //await page.pause()
    await assertTitle(page)
})