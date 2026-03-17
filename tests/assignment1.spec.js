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


});