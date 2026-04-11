//ViratAnushka@gmail.com
//Va@12345
const {test, expect} = require('@playwright/test');
//import{test, expect} from '@playwright/test'

test('Assignment 1 - test', async({page})=>{

    const email = "ViratAnushka@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill(email)
    await page.locator("#userPassword").fill("Va@12345")
    await page.locator("[type='submit']").click()

    //await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().waitFor() //we can use waitFor() / .waitForLoadState to wait
    const items= await page.locator(".card-body b").allTextContents()
    console.log("Products", items)

    //ZARA COAT 3
    const productName = "ZARA COAT 3"
    const products = page.locator(".card-body")
    const count =await products.count()
    for(let i=0; i<count; i++){
        if(await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text= Add To Cart").click()
            break;
        }
    }
    //await page.pause()
    await page.locator("[routerlink*='cart']").click() // click on cart button
    await page.locator("div li").last().waitFor() // wait for catItem to load
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible() // check the item title is visible in cart page
    expect(bool).toBeTruthy() //assertion to check the item is present in cart page or not

    //checkout
    await page.locator("text=Checkout").click()

    //Country selection----------Dynamic dropdown handling
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{ delay: 150 })
    const dropdown = page.locator(".ta-item")
    await dropdown.first().waitFor()
    const dropdwncount = await dropdown.count()
    for(let i=0; i<dropdwncount; ++i)
    {   
        let text =await dropdown.nth(i).textContent()
        if(text.trim() === "India")
        {
            await dropdown.nth(i).click()
            break;
        }
    }
    //await page.pause();
    expect(page.locator(".user__name>label")).toHaveText(email) //assertion to check the email is correct in checkout page or not
    await page.locator("text =Place Order").click() //click on place order button
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ") //assertion to check the order is placed successfully or not
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent() //get the order id from the confirmation page
    console.log("orderId", orderId) //print the order id in console

    //await page.pause();
    await page.locator("button[routerlink*='myorders']").click() //click on my orders button
    const ordersRow = page.locator("tbody>tr") //get all the rows of order list table in my orders page
    await ordersRow.first().waitFor() //wait for the order list to load
    //await page.pause();
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