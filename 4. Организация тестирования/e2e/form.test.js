import puppeteer from 'puppeteer';

describe('Inn Form', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test('Form should render on page start', async () => {
    await page.goto('http://localhost:9000');

    await page.waitFor('.innogrn-form-widget');
  });

  test('Form input should add .valid class if inn is valid', async () => {
    jest.setTimeout(20000);
    await page.goto('http://localhost:9000');

    await page.waitFor('.innogrn-form-widget');

    const form = await page.$('.innogrn-form-widget');
    const input = await form.$('.input');
    const submit = await form.$('.submit');

    await input.type('7715964180');
    await submit.click();

    await page.waitFor('.innogrn-form-widget .input.valid');
  });

  afterEach(async () => {
    await browser.close();
  });
});