const puppeteer = require("puppeteer");

async function aliyun() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1000,
      height: 1000
    }
  });
  const page = await browser.newPage();
  await page.goto("http://www.bootstrapmb.com/item/7224/preview");

  // 找到 frame 中的控件
  const fram = await page
    .frames()
    .find(fram =>
      fram.url().includes("http://v.bootstrapmb.com/2020/1/eb9ac7224")
    );
  const vilidator = await fram.waitForSelector("#mpanel1 > div");

  // 获取控件的位置及宽高信息
  const vilidatorInfo = await vilidator.boundingBox();

  const offset = 10;
  await page.mouse.move(vilidatorInfo.x + offset, vilidatorInfo.y + offset);
  await page.mouse.down();
  for (let i = 0; i < vilidatorInfo.width; i = i + 2) {
    await page.mouse.move(
      vilidatorInfo.x + offset + i,
      vilidatorInfo.y + offset
    );
  }
  await page.mouse.up();
}

aliyun();
