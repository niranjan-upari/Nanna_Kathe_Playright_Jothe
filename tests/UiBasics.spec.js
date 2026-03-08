const {test, expect} = require('@playwright/test');

test('traditional way using browser, context, page', async({browser})=>{

    //JS is asyncronous in nature so we must use await in each line to execute 1-by-1. And add async after test name 
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://playwright.dev/');
    console.log(await page.title());
});


test('page test', async({page})=>{

    await page.goto('https://google.com/')
    console.log(await page.title());
    await expect(page).toHaveTitle('Google')

});