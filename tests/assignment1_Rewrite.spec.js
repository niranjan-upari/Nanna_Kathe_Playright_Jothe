//ViratAnushka@gmail.com
//Va@12345
const {test, expect} = require('@playwright/test');
//import{test, expect} from '@playwright/test'

test('Assignment 1 -Rewriting using Playwright special locators - test', async({page})=>{

    const email = "ViratAnushka@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client")
    await page.getByPlaceholder("email@example.com").fill(email)
    await page.getByPlaceholder("enter your passsword").fill("Va@12345")
    await page.getByRole("button", {name:'Login'}).click()

    //await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().waitFor() //we can use waitFor() / .waitForLoadState to wait
    const items= await page.locator(".card-body b").allTextContents()
    console.log("Products", items)

    //ZARA COAT 3
    const productName = "ZARA COAT 3"
    await page.locator(".card-body").filter({hasText:productName}).getByRole("button", {name:"Add To Cart"}).click() // we can also use filter method to find the product and click on add to cart button

    await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click() // click on cart button
})