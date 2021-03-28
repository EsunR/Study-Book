const Express = require("express");
const Vue = require("vue");

const app = Express();
const page = new Vue({
  template: "<div>Hi~</div>",
});
const renderer = require("vue-server-renderer").createRenderer();

//  渲染器渲染 page 可以得到 html 内容

app.get("/", async (req, res) => {
  try {
    const html = await renderer.renderToString(page);
    res.send(html);
  } catch (error) {
    console.log(error);
    res.status(500).send("内部错误");
  }
});

app.listen(3000, () => {
  console.log("app running at http://localhost:3000/");
});
