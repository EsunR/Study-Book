const puppeteer = require("puppeteer");
const { userName, password } = require("./config");

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1200, height: 700 },
    ignoreDefaultArgs: ["--enable-automation"],
    slowMo: 200,
    args: ["--window-size=1200,700"]
  });
  const page = await browser.newPage();

  // 获取文本内容
  await page.goto("https://hitokoto.cn/");
  console.log("goto hitokoto... ...");
  const text = await page.$eval("#hitokoto_text", ele => ele.innerHTML);
  const from = await page.$eval("#hitokoto_author", ele => ele.innerHTML);
  const content = `${text}   ${from}`;
  console.log("copy content: ", content);

  // 发送微博
  await page.goto("https://weibo.com/", { waitUntil: "networkidle2" });
  console.log("goto weibo... ...");
  await page.waitFor(2 * 1000); // 首次进入微博会检查登录状态，要在这里停顿 2s
  await page.reload();

  // 用户登录
  const formName = await page.waitForSelector("#loginname");
  const formPassword = await page.waitForSelector(
    "#pl_login_form > div > div:nth-child(3) > div.info_list.password > div > input"
  );
  const formBtn = await page.waitForSelector(
    "#pl_login_form > div > div:nth-child(3) > div.info_list.login_btn > a"
  );
  await formName.type(userName);
  await formPassword.type(password);
  await formBtn.click();
  console.log("login... ...");

  // 输入内容并发送微博
  const textarea = await page.waitForSelector(
    "#v6_pl_content_publishertop > div > div.input > textarea"
  );
  const publishBtn = await page.waitForSelector(
    "#v6_pl_content_publishertop > div > div.func_area.clearfix > div.func > a"
  );
  console.log("login success!");
  await textarea.type(content);
  await publishBtn.click();
  console.log("Published success!");
}

run();
