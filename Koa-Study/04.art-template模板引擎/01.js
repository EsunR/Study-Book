const path = require('path');
const Koa = require('koa');
const router = require('koa-router')();
const render = require('koa-art-template');

var app = new Koa();

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

router.get('/', async (ctx) => {
  ctx.body = "首页";
  await ctx.render('index')
})

app.use(router.routes());

app.listen(3000);
console.log('app running at http://localhost:3000');

