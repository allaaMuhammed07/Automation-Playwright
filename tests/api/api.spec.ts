import {test, expect} from "@playwright/test"

test.describe.parallel("API Testing", ()=>{
    const baseURL: string = "https://reqres.in/api/"
    let firstName = "morpheus"
    let job = "leader"

    test("Simple API test - Assert response status",async ({request}) => {
        const response = await request.get(`${baseURL}users/2`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
    })

    test("Simple API test - Assert invalid endpoint",async ({request}) => {
        const response = await request.get(`${baseURL}users/non-existing-endpoint`)
        expect(response.status()).toBe(404)
    })
})