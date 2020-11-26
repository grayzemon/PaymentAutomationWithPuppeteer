const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const {click, getText, typeText, getCount, shouldNotBeHidden} = require('../lib/helpers');

describe('Payment test', () => {
    let browser;
    let page;
    const screenshotPath = './screenshots/payment/';

    before(async function() {
        browser = await puppeteer.launch({headless: true, slowMo: 0, devtools: false});
        page = await browser.newPage();
        await page.setDefaultTimeout(10000);
        await page.setDefaultNavigationTimeout(20000);
        await page.goto('http://zero.webappsecurity.com/login.html');
        await page.waitForSelector('#login_form');
        await typeText(page,'#user_login','username');
        await typeText(page,'#user_password','password');
        await click(page,'#user_remember_me');
        await click(page,'input[type="submit"]');  
    });

    after(async function() {
        await browser.close();
    });

    it('Display payment form', async () => {
        await page.waitForSelector('.nav-tabs');
        await click(page,'#pay_bills_tab');
        await page.waitForSelector('.board');
    });

    it('Make payment', async () => {
        await page.select('#sp_payee','Apple');
        await page.select('#sp_account','Credit Card');
        await typeText(page,'#sp_amount','500');
        await page.type('#sp_date','2020-11-26');
        await page.keyboard.press('Enter');
        await typeText(page,'#sp_description','test payment');
        await page.screenshot({path: screenshotPath + "Payment entered.png", fullpage: true});
        await click(page,'#pay_saved_payees');
        await page.waitForSelector('#alert_content');  
        await page.screenshot({path: screenshotPath + "Payment confirmation.png", fullpage: true});     
    });


});