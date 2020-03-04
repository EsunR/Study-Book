# 1. 快速开始

安装：

```
$ npm i puppeteer-core puppeteer -S
```

创建一个自动打开百度的浏览器：

```js
const puppeteer = require("puppeteer");

puppeteer.launch({ headless: false, defaultViewport: { width: 1366, height: 768 } }).then(browser => {
  browser.newPage().then(page => {
    page.goto("https://www.baidu.com");
  });
});
```

async 写法：

```js
const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1366, height: 768 }
  });
  const page = await browser.newPage();
  await page.goto("https://www.baidu.com");
}

run();
```