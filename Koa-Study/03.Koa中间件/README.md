# 1. 什么是Koa的中间件

**通俗的讲：** 中间件就是匹配路由之前或者匹配路由完成做的一系列的操作，我们就可以把它叫做中间件。

**在express中间件（Middleware）** 是一个函数，它可以访问请求对象（request object（req）），响应对象（response object（res）），和web应用中处理请求-响应循环流程中的中间件，一般被命名为next的变量。在Koa中中间件和express优点类似。

**中间件的功能包括：**

- 执行任何代码。
- 修改请求和响应对象。
- 终结请求-响应循环。
- 调用堆栈中的下一个中间件。

如果我的get、post回调函数中，没有 next 参数，那么就匹配上第一个路由，就不会往下匹配了。如果想往下匹配的话，那么需要写next()

# 2. Koa应用可使用如下几种中间件

- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 第三方中间件

## 2.1 应用级中间件

写一个简单的中间件：在匹配所有路由时在控制台输出访问日期

```js
app.use(async (ctx, next) => {
  console.log(new Date());
  await next();
})
```

注意：如果不写 `next()` 那么其他的路由就会失效，在代码执行到中间件操作后，只会在控制台输出日期，之后就停止继续匹配路由了。中间件代码无论写在路由规则前还是路由规则后，都会被优先执行代码。

## 2.2 路由级中间件

```js
// 匹配到news路由后继续向下匹配路由
router.get('/news', async (ctx, next) => {
  ctx.body = '新闻列表页面11111';
  await next();
})

router.get('/news', async (ctx, next) => {
  ctx.body = '新闻列表页面';
  await next();
})
```

![20190603155210.png](http://img.cdn.esunr.xyz/markdown/20190603155210.png)


## 2.3 错误处理中间件

```js
app.use(async (ctx, next) => {
  console.log('这是一个中间件');
  next();
  if (ctx.status == 404) {
    ctx.status = 404;
    ctx.body = '这是一个404页面';
  } else {
    console.log(ctx.url);
  }
})
```

执行流程：进行路由匹配前，会被路由中间件拦截，然后执行 `console.log('这是一个中间件')` 当代码执行到 `next()` (await可不加) 后，会进行路由匹配，如果匹配到路由，就执行路由匹配成功后的代码，最后再返回执行 `if...else...` 语句进行判断。

## 2.4 中间件的执行顺序

一般中间件的执行顺序是按照先执行中间件代码，当遇到 `next()` 时进行路由匹配，路由匹配完成后再返回执行剩余的中间件代码。**当同时存在多个应用级中间件的话，会按照由外到内再由内到外的顺序执行。**

```js
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
```

```
1.执行外层中间件
2.执行里层中间件
3.匹配路由
4.匹配路由完成后返回执行里层中间件
5.匹配路由完成后返回执行外层中间件
```

![20190603162843.png](http://img.cdn.esunr.xyz/markdown/20190603162843.png)



# 3. koa-views中间件引入ejs模板

## 3.1 准备工作

1.安装中间件和ejs：

```
cnpm i koa-views --save
cnpm i ejs --save
```

2.配置模板引擎：

```js
// __dirname为模板路径

app.use(views(__dirname, {extension: 'ejs'}))
// 或者，但是如果使用第二种方式配置，模板后缀名为 .html
app.use(views(__dirname, {map: {html: 'ejs'}}))
```

3.渲染模板

```js
await ctx.render('index')
```

## 3.2 传递数据

在 `ctx.render()` 方法中，第一个参数为渲染的模板名，第二个参数为传入模板的数据：

```js
router.get('/', async (ctx) => {
  await ctx.render('index',{
    title: '你好ejs'
  });
})
```

之后即可在模板中调用 `<%=title%>` 来获取数据。


## 3.3 state公共数据

可以将公共数据存放在 `ctx.state` 中，但是要注意需要将 `state` 写在中间件位置下：

```js
app.use(async (ctx, next) => {
  ctx.state = {
    userName: '张三',
    account: '16031210105'
  }
  await next();
})
```

可以在所有的模板中使用公共数据中的数据：

```html
<body>
  <h1><%=userName%></h1>
</body>
```

# 4. Post提交数据以及koa-bodyparser中间件的使用

## 4.1 原生方式获取Post表单中的数据

我们编写一个原生的HTML表单：

```html
<body>
  <form action="/doAdd" method="post">
    用户名：<input type="text" name="username">
    <br>
    密码：<input type="password" name="password" id="password">
    <br>
    <button type="submit">提交</button>
  </form>
</body>
```

表单提交的数据是以流的形式发送，整体的接收过程是一个异步操作，我们通常使用这样的方式去接收表单的post数据：

```js
let str = '';
ctx.req.on('data', function (chunk) {
  str += chunk;
})
ctx.req.on('end', function (chunk) {
  resolve(str)
})
```

按照async和await的写法和思路，我们需要将接收数据的方法写成一个异步方法，使用Promise将其封装：

```js
function getPostData(ctx) {
  // 获取数据：异步
  return new Promise(function (resolve, reject) {
    try {
      let str = '';
      ctx.req.on('data', function (chunk) {
        str += chunk;
      })
      ctx.req.on('end', function (chunk) {
        resolve(str)
      })
    } catch{
      reject(err);
    }
  })
}
```

之后使用 `app.post()` 方法来接收表单传递过来的数据：

```js
router.post('/doAdd', async (ctx) => {
  var data = await getPostData(ctx);
  console.log(data);
  ctx.body = data;
})
```

结果：

```
username=111&password=2313123123
```

## 4.2 koa-bodyparser的使用

1.安装：

```
cnpm i koa-bodyparser -s
```

2.引入：

```js
var bodyParser = require('koa-bodyparser');
```

3.使用：

```js
app.use(bodyParser());
```

4.通过 `body-parser` 获取表单的POST数据

```js
router.post('/doAdd', async (ctx) => {
  console.log(ctx.request.body);
  ctx.body = ctx.request.body;
})
```

# 5. koa-static静态资源中间件的使用

我们在服务器端请求了静态资源（如图片、css样式），服务器如果没有对静态资源进行配置，那么就无法读取到静态资源，这时就需要 `koa-parser` 来配置静态资源。

1.安装：

```
cnpm i koa-static -s
```

2.引入：

```js
var static = require('koa-static');
```

3.配置中间件：

`static()` 的第一个参数为静态文件的目录，

```js
app.use(static('static'))
```

4.使用：

需要注意的是，服务器已经将静态资源的路径配置好了，当我们请求静态资源文件时，会自动定向到在第三步中我们所配置的 `static` 目录，所以我们在引入静态资源时，静态资源的相对路径`./` 代表的就是 `static` 目录。比如，我们去请求静态资源的路径不应该为 `../static/style.css` 而应该是 `style.css`。

```html
<!-- 此时引入的css文件可以生效 -->
<link rel="stylesheet" href="static.css">
```

> 静态资源中间件可以配置多个


