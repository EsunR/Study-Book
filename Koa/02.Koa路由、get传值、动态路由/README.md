# 1. Koa路由

Koa不集成路由功能，需要使用 `koa-router` 才能使用路由

## 1.1 安装

```
cnpm i koa-router --save
```

> https://www.npmjs.com/package/koa-router

## 1.2 路由的使用

示例：

```js
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
  .use(router.routes())
  .use(router.allowedMethods());  // router.allowedMethods() 是为了优化状态码，否则只会返回404

app.listen(3000);
```

`app.use(router.allowedMethods())` 可以配置也可以不配置，建议配置。这是官方文档的推荐用法，我们可以看到 router.allowedMethods() 用在了路由匹配 router.routes() 之后，所以在当所有路由中间件最后调用，此时根据ctx.status设置response响应头。

引入和实例化路由可以简写为：

```js
var router = require('koa-router')();
```

# 2. get传值

在koa2中GET传值通过request接收，但是接收的方法有两种：query和querystring

- query：返回的是格式化好的参数对象。
- querystring：返回的是请求字符串。

query传值，获取一个对象：

```js
router.get('/', async (ctx) => {
  ctx.body = '首页';
  console.log(ctx.query);
})
```

```
> 访问 loaclhost:3000/?aid=1000
[Object: null prototype] { aid: '233' }
```

querystring传值，获取的是一个字符串

```js
router.get('/', async (ctx) => {
  ctx.body = '首页';
  console.log(ctx.querystring);
})
```

```
> 访问 localhost:3000/?aid=233&name=EsunR
aid=233&name=EsunR
```

获取request对象：

```js
router.get('/', async (ctx) => {
  ctx.body = '首页';
  console.log(ctx.request);
})
```

```
{ 
  method: 'GET',
  url: '/?aid=233&name=EsunR',
  header:
  { 
    host: 'localhost:3000',
    connection: 'keep-alive',
    'cache-control': 'max-age=0',
    'upgrade-insecure-requests': '1',
    'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9' 
  } 
}
```

可以使用request对象来获取query和querystring:

```js
router.get('/', async (ctx) => {
  ctx.body = '首页';
  console.log(ctx.request.request);
})
```

# 3. 动态路由

所谓动态路由即为动态匹配路由的最后一位参数位，如 `localhost:3000/news/1` 获取动态值 `1`。

其配置方法与Vue、React的路由类似，使用 `/:` 来设置参数位的key值，通过 `ctx.params` 可以获取路由的参数位，同时也可以设置多个参数位：

```js
router.get('/news/:page/:id', async (ctx) => {
  ctx.body = '新闻列表';
  console.log(ctx.params);
})
```

```
{ page: '1', id: '100' }
```












