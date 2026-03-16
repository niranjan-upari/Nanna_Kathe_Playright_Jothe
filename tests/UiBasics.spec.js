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

    // mentioning locators here with names
    const userName = page.locator('input#username')
    const password = page.locator('[type="password"]')
    const signIn = page.locator('[name="signin"]')
    const cardTitles = page.locator(".card-body a")
    await userName.fill("3rahulshettyacademy")
    await password.fill("Learning@830$3mK2")
    await signIn.click()

    console.log(await page.locator('[style*="block"]').textContent())
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect')

    await userName.fill("") // It erases the existing text with blank
    await userName.fill("rahulshettyacademy")
    await signIn.click()

    console.log(await cardTitles.nth(1).textContent()) //when locator is returning multiple things, lets use nth/first/last
    console.log(await cardTitles.first().textContent())
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)
});

