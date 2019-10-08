var Koa = require('koa')
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

app.use(async (ctx, next) => {
  console.log('1.执行外层中间件');
  await next();
  console.log('5.匹配路由完成后返回执行外层中间件');
})

app.use(async (ctx, next) => {
  console.log('2.执行里层中间件');
  await next();
  console.log('4.匹配路由完成后返回执行里层中间件');
})

router.get('/', async (ctx) => {
  console.log('3.匹配路由');
  ctx.body = '首页';
})






// 启动路由
app.use(router.routes());
app.listen(3000);