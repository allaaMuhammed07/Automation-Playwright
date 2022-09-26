import {test, expect} from "@playwright/test"

test.describe("Visual Regression Testing Example", () =>{
    test("Full Page Screenshot",async ({page}) => {
        await page.goto("https://www.example.com")
        expect(await page.screenshot()).toMatchSnapshot('homepage.png')
    })

    test.only("Single Element Snapshot",async ({page}) => {
        await page.goto("https://www.example.com")

        const pageElement = await page.$("h1")
        expect(await pageElement?.screenshot()).toMatchSnapshot('page-title.png')
    })
})