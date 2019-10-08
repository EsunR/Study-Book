const Koa = require('koa')
const http = require('http')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const passport = require('./passport')

const app = new Koa()

app.use(bodyParser())

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

app.use(passport.session)
app.use(passport.initialize())


const Router = require('koa-router')
const router = new Router()
router.post('/login', (ctx, next) => {
  // 会调用策略
  return passport.authenticate('local',
    function (err, user, info, status) {
      ctx.body = { user, err, info, status }
      return ctx.login({ username: "huahua", password: "123" })
    })(ctx, next)
})
router.post('/test', function (ctx, next) {
  if (ctx.isAuthenticated()) {
    ctx.body = '认证通过'
  } else {
    ctx.throw(401)
    ctx.body = '非法访问'
  }
})
app.use(router.routes())



// server
http.createServer(app.callback()).listen(3000)
