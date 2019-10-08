var Koa = require('koa');
var router = require('koa-router')();
var views = require('koa-views');
var bodyParser = require('koa-bodyparser');

var app = new Koa();

// 配置中间件 - 模板引擎 - 第三方中间件
app.use(views('./views', {
  extension: 'ejs'
}))

app.use(bodyParser());

router.get('/', async (ctx) => {
  await ctx.render('form');
})

router.post('/doAdd', async (ctx) => {
  console.log(ctx.request.body);
  ctx.body = ctx.request.body;
})

app.use(router.routes());
app.listen(3001)
console.log('appp is running at http://localhost:3001');