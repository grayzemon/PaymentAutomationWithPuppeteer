const puppeteer = require('puppeteer');
const {click, getText, typeText, getCount, shouldNotBeHidden} = require('../lib/helpers');

describe('Login Test', () => {
    let browser;
    let page;
    const screenshotPath = './screenshots/login/';

    before(async function() {
        browser = await puppeteer.launch({
            headless: true,
            slowMo: 0,
            devtools: false,
            args: ['--ignore-certificate-errors']
            });
        page = await browser.newPage();
        await page.setDefaultTimeout(10000);
        await page.setDefaultNavigationTimeout(20000);
    });

    after(async function() {
        await browser.close();
    })

    it('Login Test - Invalid credentials', async () => {
        await page.goto('http://zero.webappsecurity.com');
        await click(page,'#signin_button');
        await typeText(page,'#user_login','invalid_creds');
        await typeText(page,'#user_password','invalid_password');
        await click(page,'#user_remember_me');
        await click(page,'input[type="submit"]');
        await page.waitForSelector('.alert-error'); 
        await page.screenshot({path: screenshotPath + "invalid credentials.png", fullpage: true});  
    });

    it('Login Test - Valid credentials', async () => {
        await page.goto('http://zero.webappsecurity.com');
        await click(page,'#signin_button');
        await typeText(page,'#user_login','username');
        await typeText(page,'#user_password','password');
        await click(page,'#user_remember_me');
        await page.screenshot({path: screenshotPath + "Credentials entered.png", fullpage: true});
        await click(page,'input[type="submit"]');
        await page.waitForSelector('#settingsBox'); 
        await page.screenshot({path: screenshotPath + "Logged in.png", fullpage: true});
    });

});