var Koa = require('koa');
var router = require('koa-router')();
var views = require('koa-views');
var static = require('koa-static');

var app = new Koa();

// 配置中间件 - 模板引擎 - 第三方中间件
app.use(views('./views', {
  extension: 'ejs'
}))

app.use(static('static'))

router.get('/', async (ctx) => {
  await ctx.render('static');
})

app.use(router.routes());
app.listen(3001)
console.log('appp is running at http://localhost:3001');