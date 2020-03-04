const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1200, height: 700 },
    ignoreDefaultArgs: ["--enable-automation"],
    slowMo: 200,
    args: ["--window-size=1200,700"]
  });
  const page = await browser.newPage();
  await page.goto("https://www.ctrip.com", { waitUntil: "networkidle2" });
  // 在页面执行脚本
  await page.evaluate(() => {
    document.querySelector("#HD_CheckIn").value = "2020-03-01";
  });
}

run();
