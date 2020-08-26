const Express = require("express");
const Vue = require("vue");
const { createBundleRenderer } = require("vue-server-renderer");
const serverBundle = require("../dist/server/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/client/vue-ssr-client-manifest.json");
const fs = require("fs");

const app = Express();
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync("../public/index.tmp.html", "utf-8"),
  clientManifest,
});

// 中间件处理静态文件请求
// 如果不关闭 index，那么会直接读取静态服务器的 index.html，导致跳过预渲染
app.use(Express.static("../dist/client", { index: false }));

app.get("*", async (req, res) => {
  try {
    const context = {
      url: req.url,
      title: "ssr test",
    };
    const html = await renderer.renderToString(context);
    res.send(html);
  } catch (error) {
    console.log(error);
    res.status(500).send("内部错误");
  }
});

app.listen(3000, () => {
  console.log("app running at http://localhost:3000/");
});
