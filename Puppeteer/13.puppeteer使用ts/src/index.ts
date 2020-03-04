import { Page, Browser, launch } from "puppeteer";

class Actions {
  public async goUrl(page: Page, url: string) {
    await page.goto(url);
  }
}

async function main() {
  const action = new Actions();
  let browser: Browser = await launch({ headless: false });
  let page: Page = await browser.newPage();
  await action.goUrl(page, "https://www.baidu.com");
}

main()