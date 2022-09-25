import {Page } from "@playwright/test"

export class AbstractPage{
    //first abstract page
    readonly page: Page

    constructor(page:Page){
        this.page = page
    }

    async wait(time){
        await this.page.waitForTimeout(time)
    }
}