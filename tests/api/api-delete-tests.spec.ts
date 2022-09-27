import {test, expect} from "@playwright/test"

const baseURL: string = "https://reqres.in/api/"

test.only("DELETE Request - Update user",async ({request}) => {
    const response = await request.delete(`${baseURL}users/2`)
    expect(response.status()).toBe(204)
})