const {test, expect} = require('@playwright/test');


test('page test', async({page})=>{

    await page.goto('https://google.com/')
    console.log(await page.title());
    await expect(page).toHaveTitle('Google')

});

test.only('traditional way using browser, context, page', async({browser})=>{

    //JS is asyncronous in nature so we must use await in each line to execute 1-by-1. And add async after test name 
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    //css selectors
    await page.locator('input#username').fill("3rahulshettyacademy")
    await page.locator('[type="password"]').fill("Learning@830$3mK2")
    await page.locator('[name="signin"]').click()
    console.log(await page.locator('[style*="block"]').textContent())
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect')

});

