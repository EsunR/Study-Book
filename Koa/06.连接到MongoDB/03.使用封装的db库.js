const Koa = require('koa'),
  Router = require('koa-router'),
  db = require('./module/db')

const app = new Koa()
const router = new Router()

router.get('/', async ctx => {
  var data = await db.find('user', {})
  ctx.body = data
})

router.get('/news', async ctx => {
  var data = await db.find('news', {})
  ctx.body = data
})

router.get('/add', async ctx => {
  let data = await db.insert('user', {
    "name": "赵六",
    "age": 22,
    "sex": "女",
    "status": 1
  })
  ctx.body = data
})

router.get('/edit', async ctx => {
  let data = await db.update("user", { "name": "赵六" }, { "age": 18 })
  ctx.body = data
})

router.get('/delete', async ctx => {
  let data = await db.remove("user", { "name": "赵六" })
  ctx.body = data
})


app.use(router.routes())

app.listen(8080)



