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
  await page.goto("https://music.taihe.com/", { waitUntil: "networkidle2" });

  // 关闭广告
  const ad = await page.waitForSelector("#__qianqian_pop_closebtn");
  await ad.click();

  const link = await page.waitForSelector(
    "#app > div > div.home-view.sub-view > section.section-inner.pr.mod-main > section.mod-tag.pa.clearfix > div > h3:nth-child(1) > a"
  );
  await link.click();

  const target = await browser.waitForTarget(t => t.url().includes("tag"));
  const newPage = await target.page();
  await newPage.waitForSelector("ul[select='20']");
  const text = await newPage.$eval("ul[select='20']", ele => ele.innerText);
  console.log('text: ', text);
}

run();
