import {test, expect} from "@playwright/test"

const baseURL: string = "https://reqres.in/api/"
let firstName = "morpheus"
let job = "zion resident"

test.only("PUT Request - Update user",async ({request}) => {
    const response = await request.put(`${baseURL}users/2`,{
        data:{
            "name": firstName,
            "job": job
        }
    })

    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.updatedAt).toBeTruthy()
})