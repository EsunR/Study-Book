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
  await page.goto("http://www.wangeditor.com/", { waitUntil: "networkidle2" });
  const editor = await page.waitForSelector(
    "#divDemo > div.w-e-text-container"
  );
  await editor.click();
  await page.keyboard.type("hello world!");

  // ctrl + A
  await page.keyboard.down("Control");
  await page.keyboard.down("a");
  await page.keyboard.up("Control");
  await page.keyboard.up("a");

  // ctrl + B
  await page.keyboard.down("Control");
  await page.keyboard.down("b");
  await page.keyboard.up("Control");
  await page.keyboard.up("b");
}

run();
