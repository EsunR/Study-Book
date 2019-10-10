var Koa = require('koa')
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/', async (ctx) => {
  ctx.body = '首页';
})


router.get('/news', async (ctx, next) => {
  ctx.body = '新闻列表页面';
})

app.use(async (ctx, next) => {
  console.log('这是一个中间件');
  await next();
  if (ctx.status == 404) {
    ctx.status = 404;
    ctx.body = '这是一个404页面';
  } else {
    console.log(ctx.url);
  }
})




// 启动路由
app.use(router.routes());
app.listen(3000);