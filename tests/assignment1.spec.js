//ViratAnushka@gmail.com
//Va@12345
const {test, expect} = require('@playwright/test');
//import{test, expect} from '@playwright/test'

test('Assignment 1 - test', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill("ViratAnushka@gmail.com")
    await page.locator("#userPassword").fill("Va@12345")
    await page.locator("[type='submit']").click()

    //await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().waitFor() //we can use waitFor() / .waitForLoadState to wait
    const items= await page.locator(".card-body b").allTextContents()
    console.log(items)

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

});