import {test, expect} from "@playwright/test"

test("GET Request - Get user details",async ({request}) => {
    const baseURL: string = "https://reqres.in/api/"


    const response = await request.get(`${baseURL}users/7`)
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(7)
    expect(responseBody.data.first_name).toBe("Michael")
    expect(responseBody.data.last_name).toBe("Lawson")

    //to assert that the data/attribute contains any value as sometimes the data changes
    expect(responseBody.data.email).toBeTruthy()
})