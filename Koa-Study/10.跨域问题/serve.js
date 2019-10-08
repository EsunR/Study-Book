const Koa = require('koa')
const Router = require('koa-router')
const bodypaser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')


// api 服务
const app = new Koa()
const router = new Router()
app.use(bodypaser())

/** CORS */
app.use(async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    ctx.body = '';
  } else {
    await next();
  }
});
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set("Access-Control-Allow-Headers", "authorization")
  await next()
})

/** router */
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

// 前端资源服务
const webapp = new Koa()
const staticPath = './static'

webapp.use(static(path.join(__dirname, staticPath)))

webapp.listen(3100)