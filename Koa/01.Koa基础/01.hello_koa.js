var koa = require('koa');

var app = new koa();

// 配置路由，原生Koa不支持路由
// 中间件

// Express写法
// app.use(function (req, res) {
//   res.send("返回数据")
// })


// koa写法
app.use(async (ctx) => {
  ctx.body = "你好Koa 2.x"
})

app.listen(3000);

