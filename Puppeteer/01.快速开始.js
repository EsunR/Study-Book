const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1366, height: 768 }
  });
  const page = await browser.newPage();
  await page.goto("https://www.baidu.com");

  // 找到输入框并输入内容
  const inputArea = await page.$("#kw");
  await inputArea.type("Hello word");

  // 点击搜索按钮
  const searchBtn = await page.$("#su");
  await searchBtn.click();
}

run();
