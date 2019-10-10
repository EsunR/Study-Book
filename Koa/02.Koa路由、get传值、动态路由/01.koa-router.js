var Koa = require('koa')
var Router = require('koa-router');

// 实例化
var app = new Koa();
var router = new Router();

// ctx:上下文，包含了request response等信息
router.get('/', async (ctx, next) => {
  ctx.body = '首页'; // 返回数据，类似于原生中的 res.WriteHead()  res.end()
}).get('/news', async (ctx) => {
  ctx.body = '这是一个新闻页面'
})

// 启动路由
app
  .use(router.routes())  // 启动路由
  .use(router.allowedMethods());  // 可以配置也可以不配置，建议配置
// 作用：这是官方文档的推荐用法，我们可以看到router.allowedMethods（）用在了路由匹配router.routes（）之后，所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头

app.listen(3000);