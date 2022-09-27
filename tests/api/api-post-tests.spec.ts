import {test, expect} from "@playwright/test"

const baseURL: string = "https://reqres.in/api/"
let firstName = "morpheus"
let job = "leader"
let validUserEmail = "eve.holt@reqres.in"
let validUserPassword = "cityslicka"
let invalidUserEmail = "peter@klaven"
let errorMessage = "Missing password"

test.describe.only("POST Request Test", ()=>{
    test("POST Request - Create new user",async ({request}) => {
        const response = await request.post(`${baseURL}users`,{
            data:{
                "name": firstName,
                "job": job,
            }
        })
    
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(201)
        expect(responseBody.name).toBe(firstName)
        expect(responseBody.createdAt).toBeTruthy()
    })
    
    test("POST Request - Login",async ({request}) => {
        const response = await request.post(`${baseURL}login`,{
            data:{
                email: validUserEmail,
                password: validUserPassword
            }
        })
    
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
    })
    
    test("POST Login - Login Failed",async ({request}) => {
        const response = await request.post(`${baseURL}login`,{
            data:{
                email: invalidUserEmail
            }
        })
    
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe(errorMessage)
    })
})
