# 1. 跨域问题

在前后端分离开发的过程中，跨域是一个很常见的问题，跨域的解决方案也多种多样，如：

1. 通过jsonp跨域
2. document.domain + iframe跨域
3. location.hash + iframe
4. window.name + iframe跨域
5. postMessage跨域
6. 跨域资源共享（CORS）
7. nginx代理跨域
8. nodejs中间件代理跨域
9. WebSocket协议跨域

> 更多详细介绍：https://juejin.im/post/5d1ecb96f265da1b6d404433

# 2. CORS

本文重点介绍跨域资源共享（CORS）的解决方案，这种方案是目前最容易理解也是醉强大的方案，其重点在于后端服务器的实现。跨域资源共享的原理就是相当于将请求资源的域设置到一个白名单中，只要是白名单中的域，就可以访问到当前域的资源。

> 当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。

当我们在前端使用 AJAX 发起一个跨域请求的时候，正常情况是会出现 CORS 警告的，其内容如下：

![20190921180624.png](http://img.cdn.esunr.xyz/markdown/20190921180624.png)

其意思大致为：你从 `http://localhost:3100` 请求 `http://localhost:3000/getData` 的资源是不可能的，因为你的请求地址 ~~不符合基本法~~ 的 `Access-Control-Allow-Origin` 中没有你的标志。

`Access-Control-Allow-Origin` 就相当于一个白名单，后台需要设置这个白名单，请求的域在这个白名单中才能获得相应的资源。

在 Koa 中，我们可以通过上下文对象来设置 `Access-Control-Allow-Origin`，同时由于 Koa 的中间件机制，可以将跨域的处理逻辑放在最前面，当进行路由匹配前，检查请求资源的域是否在白名单中，总体的设置如下：

```js
const Koa = require('koa')
const Router = require('koa-router')
const bodypaser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')

const app = new Koa()
const router = new Router()
app.use(bodypaser())

// 处理跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  await next()
})

// 请求数据的接口
router.get('/getData', async (ctx, next) => {
  ctx.body = {
    msg: "ok",
    data: {
      name: "huahua",
      age: "18"
    }
  }
})
app.use(router.routes())

app.listen(3000)
```

这样我们的资源就可以正常访问了：

![20190921181516.png](http://img.cdn.esunr.xyz/markdown/20190921181516.png)

上面的只是一个非常非常简单的例子，关于请求跨域的设置还有很多，比如允许的请求方法、允许的 Header 内容等等，所以我们给出一个通用的设置，并对设置进行了备注，可以简单参考一下：

> 以下内容来自：https://blog.csdn.net/qq_30868289/article/details/83657535

```js
app.use(async (ctx, next) => {
  // 允许来自所有域名请求
  ctx.set("Access-Control-Allow-Origin", "*");

  // 设置所允许的HTTP请求方法
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

  // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

  // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

  // Content-Type表示具体请求中的媒体类型信息
  ctx.set("Content-Type", "application/json;charset=utf-8");

  // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
  // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  ctx.set("Access-Control-Allow-Credentials", true);

  // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
  // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
  // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
  ctx.set("Access-Control-Max-Age", 300);

  /*
  CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
      Cache-Control、
      Content-Language、
      Content-Type、
      Expires、
      Last-Modified、
      Pragma。
  */
  // 需要获取其他字段时，使用Access-Control-Expose-Headers，
  // getResponseHeader('myData')可以返回我们所需的值
  //https://www.rails365.net/articles/cors-jin-jie-expose-headers-wu
  ctx.set("Access-Control-Expose-Headers", "myData");

  await next();
})
```

# 3. 简单请求与非简单请求

虽说一般按照上面的设置就已经可以简单做后台接口了，但是通常我们会为接口设置一个访问权限，比如使用 JWT 来在 Http Headers 中添加一个 `authorization` 字段来携带 Token 发送给后台服务器（查看我的文章可以找到 Koa JWT 登录认证的解决方案），这时候就会发现请求又出错了：

![20190921181859.png](http://img.cdn.esunr.xyz/markdown/20190921181859.png)

这次报错反而更严重了，出现了一个 404 问题，还有一个 CORS 问题，同时我们通过 network 卡项可以看到我们发送的不是 GET 请求也不是 POST 请求，而是一个 OPTIONS 请求：

![20190921182254.png](http://img.cdn.esunr.xyz/markdown/20190921182254.png)

要想解决这两个问题，我们首先来探讨一下 HTTP 请求的分类。HTTP 请求分为简单请求和非简单（预检请求）请求。

通常如果一个请求是简单请求，它就会正常发送当前的请求，通过我们后台的跨域验证从而获取数据。但是安全起见，非简单请求的跨域验证则更为复杂，需要检查的信息更多，所以发送一个非简单请求前通常需要发送一个 OPTIONS 请求携带必要信息来专门检测跨域请求是否存在 CROS 问题。

区分简单请求和非简单请求主要看是否满足一定的规范，一个请求满足了如下的规范那它就是简单请求，否则就是非简单请求：

*   使用`GET、POST、HEAD`其中一种方法
*   只使用了如下的安全首部字段，不得人为设置其他首部字段
    *   `Accept`
    *   `Accept-Language`
    *   `Content-Language`
    *   `Content-Type` 仅限以下三种
        *   `text/plain`
        *   `multipart/form-data`
        *   `application/x-www-form-urlencoded`
    *   HTML头部header field字段：`DPR、Download、Save-Data、Viewport-Width、WIdth`
*   请求中的任意`XMLHttpRequestUpload` 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问
*   请求中没有使用 ReadableStream 对

> 关于简单请求和非简单请求的更多信息，参见：https://github.com/amandakelake/blog/issues/62

所以我们遇到的 404 问题是因为我们服务器没有设置专门处理 OPTIONS 请求的操作，只需要设置一个接受 OPTIONS 的空操作即可：

```js
app.use(async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    ctx.body = '';
  }else{
    await next(); 
  }
});
```

> 在这里要注意：一个 OPTIONS 操作仅仅用来验证接下来的请求是否合法，不会进行系统中的其他操作，如权限验证等，所以如果检测到请求是一个 OPTIONS 请求，则 KOA 执行中间件的流程就到此结束，不再执行后续的中间件操作。

![20190921183440.png](http://img.cdn.esunr.xyz/markdown/20190921183440.png)

404 问题消失了，但是还存在跨域问题，仔细想想我们当前的操作与一个简单的 get 请求的区别。对，就是因为我们加了一个 `authorization` 字段来携带 Token 信息，这个操作将我们的简单请求转变成了一个非简单请求，我们可以通过发送的 OPTIONS 来查看到当前请求的 Headers 中存放了哪些字段：

![20190921183851.png](http://img.cdn.esunr.xyz/markdown/20190921183851.png)

服务器端通过 `Access-Control-Allow-Headers` 来记录允许的 Headers 字段，于是我们只要将 `authorization` 添加为允许的字段即可：

```js
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set("Access-Control-Allow-Headers", "authorization")
  await next()
})
```

![20190921184025.png](http://img.cdn.esunr.xyz/markdown/20190921184025.png)

对于 CORS 的设置我们还可以使用 `koa-cors` 中间件来解决，但是由于其本身并非多么复杂，我们弄明白其中的道理就可以自行配置，只有我们弄明白了插件的原理，才能更好的使用插件提高效率。