const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const {click, getText, typeText, getCount, shouldNotBeHidden} = require('../lib/helpers');

describe('Feedback Test', () => {
    let browser;
    let page;
    const screenshotPath = './screenshots/feedback/';

    before(async function() {
        browser = await puppeteer.launch({headless: true, slowMo: 0, devtools: false});
        page = await browser.newPage();
        await page.setDefaultTimeout(10000);
        await page.setDefaultNavigationTimeout(20000);
    });

    after(async function() {
        await browser.close();
    });

    it('Display Feedback Form', async () => {
        await page.goto('http://zero.webappsecurity.com');
        await click(page,'#feedback');
    });

    it('Submit Feedback Form', async () => {
        page.waitForSelector('form');
        await typeText(page,'#name','Mr Automation Tester');
        await typeText(page,'#email','automation@test.com');
        await typeText(page,'#subject','automation example');
        await typeText(page,'#comment','comment text goes here');
        await page.screenshot({path: screenshotPath + "Feedback details entered.png", fullpage: true});
        await click(page,'input[type="submit"]');
    });

    it('Display results page', async () => {
       page.waitForSelector('#feedback-title');
       await page.screenshot({path: screenshotPath + "Feedback results.png", fullpage: true});
       const url = await page.url();
       expect(url).to.include('/sendFeedback.html')
    });
});