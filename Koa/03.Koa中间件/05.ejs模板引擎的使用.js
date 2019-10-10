var Koa = require('koa');
var router = require('koa-router')();
var views = require('koa-views');

var app = new Koa();

// 配置中间件 - 模板引擎 - 第三方中间件
app.use(views('./views', {
  extension: 'ejs'
}))

app.use(async (ctx, next) => {
  ctx.state = {
    userName: '张三',
    account: '16031210105'
  }
  await next();
})

router.get('/', async (ctx) => {
  await ctx.render('index', {
    title: '你好ejs'
  });
})


app.use(router.routes());
app.listen(3000)
console.log('appp is running at http://localhost:3000');