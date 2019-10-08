var Koa = require('koa')
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/', async (ctx) => {
  ctx.body = '首页';
})

// 匹配到news路由后继续向下匹配路由
router.get('/news', async (ctx, next) => {
  ctx.body = '新闻列表页面11111';
  next();
})

router.get('/news', async (ctx, next) => {
  ctx.body = '新闻列表页面';
})




// 启动路由
app.use(router.routes());



app.listen(3000);