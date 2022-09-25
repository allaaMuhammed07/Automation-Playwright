import { expect, Locator, Page } from "@playwright/test"

export class PaymentSpec{
    readonly page: Page
    readonly payeeList: Locator
    readonly payeeDetails: Locator
    readonly accountType: Locator
    readonly amountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly payButton: Locator
    readonly message: Locator

    constructor (page:Page){
        this.page = page
        this.payeeList = page.locator("#sp_payee")
        this.payeeDetails = page.locator("#sp_get_payee_details")
        this.accountType = page.locator("#sp_account")
        this.amountInput = page.locator("#sp_amount")
        this.dateInput = page.locator("#sp_date")
        this.descriptionInput = page.locator("#sp_description")
        this.payButton = page.locator("#pay_saved_payees")
        this.message = page.locator("#alert_content > span")
    }

    async makePayment(payee: string, accountType: string, amount: string, date: string, describe:string){
        await this.payeeList.selectOption(payee)
        await this.payeeDetails.click()
        await this.accountType.selectOption(accountType)
        await this.amountInput.type(amount)
        await this.dateInput.type(date)
        await this.descriptionInput.type(describe)
        await this.payButton.click()
    }

    async assertSuccessMessage(){

        await expect(this.message).toBeVisible
        await expect(this.message).toContainText("The payment was successfully submitted.")
    }
}