# 1. Cookie

## 1.1 Cookie简介

- cookie是存储于访问者的计算机中的变量。可以让我们用同一个浏览器访问同一个域名的时候共享数据。
- HTTP是无状态协议。简单地说，当你浏览了一个页面，然后转到同一个网站的另一个页面，服务器无法认识到这是同一个浏览器在访问同一个网站。每一次的访问，都是没有任何关系的。

## 1.2 Koa Cookie的使用

### 1.2.1 Cookie的设置

```js
ctx.cookies.set(name, value, [options]);
```

通过options可以设置cookie name的value：

![20190604103743.png](http://img.cdn.esunr.xyz/markdown/20190604103743.png)

### 1.2.2 获取Cookie的值

```js
ctx.cookies.get('name');
```

### 1.2.3 无法设置中文的问题

如果 `ctx.cookies.set()` 中的 value 设置为中文，那么就会导致koa报错：

```
TypeError: argument value is invalid
```

需要使用一个方法来将中文转化为base64编码，node提供了转化base64编码和解码的方法，分别为：

```js
var data = '张三'
var coded = new Buffer(data).toString('base64');  // 5byg5LiJ
var uncoded = new Buffer(coded, 'base64').toString();  // 张三
```

演示实例：

```js
router.get('/', async (ctx) => {
  ctx.body = "首页";
  var userInfo = new Buffer('张三').toString('base64');
  ctx.cookies.set('userInfo', userInfo, {
    maxAge: 60 * 1000 * 60
  })
})

router.get('/news', async (ctx) => {
  var userInfo = ctx.cookies.get('userInfo');
  userInfo = new Buffer(userInfo, 'base64').toString();
  console.log('userInfo: ', userInfo);
})

```

# 2. Session

## 2.1 Session简介

session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而session保存在服务器上。

当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，生成一个类似于key，value的键值对，然后将key（cookie）返回到浏览器（客户）端，浏览器下次再访问时，携带key（cookie），找到对应的session（value）。客户的信息都保存在session中

## 2.2 kos-session的使用

1.安装:

```
npm install koa-session --save
```

2.引入：

```js
const session = require('koa-session');
```

3.设置官方文档提供的中间件

```js
app.keys = ['some secret hurr'];
const CONFIG = {
   key: 'koa:sess',   //cookie key (default is koa:sess)
   maxAge: 86400000,  //【需要修改】cookie的过期时间 maxAge in ms (default is 1 days)
   overwrite: true,  //是否可以overwrite    (默认default true)
   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
   signed: true,   //签名默认true
   rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
   renew: true,  //【需要修改】当session即将过期时更新session
};
app.use(session(CONFIG, app));
```

renew 与 rolling 这两个选项功能相似，应用场景都是为了应对长期保存用户的登录状态，当用户一定时间不进行登录操作（向服务器发送请求），本地存放的session就会失效，这样用户就会被迫强制登出。

其原理如下：

- 当我们设置了 rolling 为 true 时，用户每发送一次请求，服务器就会为客户端更新新的cookie，以保证本地的 cookie 有效时间被重置。【每次请求都更新 cookie】
- 当我们设置了 renew 为 true 时，本地的 cookie 在每次发送请求时不会再被更新了，但是当客户端的 cookie 即将过期时，客户端向服务器发送请求后，服务器端检测出 cookie 将要过期，会刷新 session 重新给客户端发送一个新的 cookie。【只有当 cookie 快过期时才更新】

所以，如果我们要想长期保存用户的登录状态，就需要将配置项设置为：

```
{ rolling: false（保持默认即可）, renew: true }

或者

{ rolling: true, renew: false（保持默认即可） }
```

4.使用

```js
// 设置值 ****
ctx.session.username = "张三";
// 获取值 
ctx.session.username
```


