var Koa = require('koa')
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

// Koa中间件
// 匹配任何路由，如果不写next，这个路由被匹配到了就不会继续向下匹配
app.use(async (ctx, next) => {
  console.log(new Date());
  await next();
})

router.get('/', async (ctx) => {
  console.log('aaaaa');
  ctx.body = '首页';
})

router.get('/news', async (ctx) => {
  ctx.body = '新闻列表页面';
})




// 启动路由
app.use(router.routes());



app.listen(3000);