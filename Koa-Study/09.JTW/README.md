
# 1. 引入依赖

- jsonwebtoken 用于签发、解析 token
- koa-jwt 用于路由权限控制
- koa-bodyparser 用于解析 post 数据

# 2. 创建一个简单的 Token 获取与验证机制

## 2.1 获取 Token

引入 jsonwebtoken 库，可以根据传入的 json 字符串生成一个 token 信息。客户端可以将这个 token 托管于用户浏览器的 localStroage 保存，在每次向后台发送 http 请求时，将 Token 存放于 Http Headers 的 Authorization 字段，用来作为与服务器通信的凭证。

生成一个 Token 的方式如下：

```js
const jwt = require('jsonwebtoken')
const secret = 'secret' // 自定义的加密字符串
function getToken(payload = {}) {
  return jwt.sign(payload, secret, { expiresIn: '4h' })
}

let token = getToken({uid: "12306", username: "EsunR"}) // 将关键信息记录与 Token 内
console.log(token)
```

## 2.2 验证 Token

当客户端携带 Token 向服务器端发起请求时，服务器端通过解析 Http Headers 的 authorization 字段可以获取客户端发送的 Token。拿到 Token 后，服务器端需要对 Token 进行解析，从而获取 Token 中存放的用户信息，对 Token 解密就需要之前设置好的 `secret` 密钥，解析 Token 的示例如下：

```js
const bodyparser = require('koa-bodyparser') // 引入 bodypaser 用于解析 authorization
// 假设以下代码在一个 get 请求中，可以获取上下文对象 ctx
let token = ctx.headers.authorization
// 获取的 Authorization 格式为：Bearer <token>
let payload = jwt.verify(token.split(' ')[1], secret)
```

同时，如果使用了 `koa-jwt`，可以直接调用 `ctx.state.user` 来获取 payload 内容：

```js
let payload = ctx.state.user
```

# 3. 路由拦截

`koa-jwt` 提供了一个路由拦截的功能，用户拥有 Token 和未拥有 Token 可访问的接口权限不一样。比如，没有登录的用户只能访问 `/login` 和 `/register` 接口，而登录之后才能访问其他接口的地址，我们要在路由匹配前加入如下的中间件：

```js
/* 路由权限控制 */
app.use(jwtKoa({ secret: secret }).unless({
  // 设置login、register接口，可以不需要认证访问
  path: [
    /^\/api\/login/,
    /^\/api\/register/,
    /^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
  ]
}));
```

> 如果在这一步检查出错，即当一个请求需要携带 Token 但未携带时，会暂停执行之后的所有中间件，但是可以通过设置 `passthrough: true` 来取消这一特性

# 4. Token 检查

`koa-jwt` 仅能帮助我们设置当前的请求是否需要携带 Token，然而并不能检查当前 Token 的有效性。所以我们如果是要设计一个登录模块的话，需要对每一个 Token 进行有效性的检验。那么我们多增加一个中间件 `tokenCheck` ，在 `koa-jwt` 之后调用，这样 `koa-jwt` 负责检查请求是否携带 Token，而 `tokenCheck` 负责检查 Token 的有效性：

```js
// server.js
const tokenCheck = require('./tokenCheck')

/* 路由权限控制 */
app.use(jwtKoa({ secret: secret }).unless({
  // 设置login、register接口，可以不需要认证访问
  path: [
    /^\/api\/login/,
    /^\/api\/register/,
    /^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
  ]
}));

app.use(tokenCheck())
```

```js
// tokenCheck.js
const tokenCheck = function () {
  return async function (ctx, next) {
    if (ctx.state.user) {
      // 如果携带有效 Token 就对 Token 进行检查（由 kow-jwt 检查 Token 有效性）
      let result = true
      // check here
      if (result) {
        await next()
      } else {
        ctx.body = {
          msg: "Token 检查未通过"
        }
      }
    } else {
      // 如果没有携带 Token 就跳过检查
      await next()
    }
  }
}

module.exports = tokenCheck
```