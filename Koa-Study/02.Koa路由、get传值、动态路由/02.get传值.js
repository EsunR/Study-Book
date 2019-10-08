var Koa = require('koa')
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/', async (ctx) => {
  ctx.body = '首页';
  console.log(ctx.request);
})

// 启动路由
app.use(router.routes());

app.listen(3000);