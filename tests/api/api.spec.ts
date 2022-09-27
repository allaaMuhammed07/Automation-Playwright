import {test, expect} from "@playwright/test"

test.describe.parallel("API Testing", ()=>{
    const baseURL: string = "https://reqres.in/api/"

    test("Simple API test - Assert response status",async ({request}) => {
        const response = await request.get(`${baseURL}users/2`)
        expect(response.status()).toBe(200)
    })

    test("Simple API test - Assert invalid endpoint",async ({request}) => {
        const response = await request.get(`${baseURL}users/non-existing-endpoint`)
        expect(response.status()).toBe(404)
    })
})