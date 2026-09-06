//ViratAnushka@gmail.com
//Va@12345
const {test, expect, request} = require('@playwright/test');
//import{test, expect} from '@playwright/test'
let token;
const loginPayload = {userEmail:"ViratAnushka@gmail.com",userPassword:"Va@12345"} // as Javascript object we can use this payload in API request body
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let orderId;

test.beforeAll(async()=>
{
 //before All tests executed.
 const ApiContext = await request.newContext()

 //login API
 const loginResponse = await ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data : loginPayload
    }
)
    expect(loginResponse.ok()).toBeTruthy() //200 OK
    const loginResponseJSON = await loginResponse.json()
    token = loginResponseJSON.token;
    console.log(token)

    //CreateOrder API
    const orderResponse = await ApiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data : orderPayload,
            headers : {
                        'Authorization' : token,
                        'Content-Type' : 'application/json'
                      }
        }

    )
    const orderResponseJson = await orderResponse.json()
    console.log(orderResponseJson)
    orderId = orderResponseJson.orders[0]
});

test('Login API integration for Assignment 1', async({page})=>{

    const email = "ViratAnushka@gmail.com"
    // await page.goto("https://rahulshettyacademy.com/client")
    // await page.locator("#userEmail").fill(email)
    // await page.locator("#userPassword").fill("Va@12345")
    // await page.locator("[type='submit']").click()


    await page.addInitScript(value=>{
        window.localStorage.setItem('token', value);
    }, token);

    //await page.waitForLoadState('networkidle')
    // await page.locator(".card-body b").first().waitFor() //we can use waitFor() / .waitForLoadState to wait
    // const items= await page.locator(".card-body b").allTextContents()
    // console.log("Products", items)

    await page.goto("https://rahulshettyacademy.com/client")

    await page.locator("button[routerlink*='myorders']").click() //click on my orders button
    const ordersRow = page.locator("tbody>tr") //get all the rows of order list table in my orders page
    await ordersRow.first().waitFor() //wait for the order list to load
    await page.pause();
    const orderListCount = await ordersRow.count()  //get the count of rows in order list table
    for(let i=0; i<orderListCount; i++){     //iterate through each row of order list table
        const rowOrderId = await ordersRow.locator("td").nth(i).textContent() //get the order id from each row of order list table
        if(orderId.includes(rowOrderId)){   //compare the order id from confirmation page with order id in order list table
            await ordersRow.nth(i).locator(".btn-primary").first().click() //
            break
        }
        else{console.log("Order id not found in order list")} //if order id is not found in order list table
    }

});