const {test, expect} = require('@playwright/test');


test('page test', async({page})=>{

    await page.goto('https://google.com/')
    console.log(await page.title());
    await expect(page).toHaveTitle('Google')

});

test('traditional way using browser, context, page', async({browser})=>{

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

test.only('UI - controls', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const userName = page.locator('input#username')
    const password = page.locator('[type="password"]')
    const dropDown = page.locator('select.form-control')
    await userName.fill("3rahulshettyacademy")
    await password.fill("Learning@830$3mK2")

    //dropdown
    const storeDropdownValue= await dropDown.selectOption('consult')
    console.log(storeDropdownValue)

    //radio button
    await page.locator(".checkmark").last().click()
    await page.locator("#okayBtn").click()
    await expect(page.locator(".checkmark").last()).toBeChecked() //assertion
    console.log(await (page.locator(".checkmark").last()).isChecked())

    //checkbox
    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked()

    await page.locator("#terms").uncheck()
    expect(await page.locator("#terms").isChecked()).toBeFalsy()
    await page.pause()

    //Blinking Text
    const textLink = page.locator("[href*='documents-request']")
    await expect(textLink).toHaveAttribute('class', 'blinkingText')

});