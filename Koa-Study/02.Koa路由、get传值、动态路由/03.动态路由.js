var Koa = require('koa')
var Router = require('koa-router');

var app = new Koa();
var router = new Router();


router.get('/', async (ctx) => {
  ctx.body = '首页';
})

router.get('/news', async (ctx) => {
  ctx.body = '新闻';
})

router.get('/news/:page/:id', async (ctx) => {
  ctx.body = '新闻列表';
  console.log(ctx.params);
})


// 启动路由
app.use(router.routes());

app.listen(3000);