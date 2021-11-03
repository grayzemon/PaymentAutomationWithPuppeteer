const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const {click, getText, typeText, getCount, shouldNotBeHidden} = require('../lib/helpers');

describe('Currency Exchange Test', () => {
    let browser;
    let page;
    const screenshotPath = './screenshots/currency/';

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

    it('Display Currency Exchange', async () => {
        await page.waitForSelector('.nav-tabs');
        await click(page,'#pay_bills_tab');
        await click(page,'#tabs > ul > li:nth-child(3) > a');
        await page.waitForSelector('.board');
 ; 
    });

    it('Exchange currency', async () => {
        await page.select('#pc_currency','GBP');
        await page.type('#pc_amount','100');
        await click(page,'#pc_inDollars_true');
        await page.screenshot({path: screenshotPath + "Currency entered.png", fullpage: true});
        await click(page,'#purchase_cash');
        await page.waitForSelector('#alert_content');
        await page.screenshot({path: screenshotPath + "Currency purchase confirmation.png", fullpage: true});
    });
});