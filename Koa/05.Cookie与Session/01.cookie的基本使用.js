const path = require('path');
const Koa = require('koa');
const router = require('koa-router')();

var app = new Koa();



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

app.use(router.routes());

app.listen(3000);
console.log('app running at http://localhost:3000');

