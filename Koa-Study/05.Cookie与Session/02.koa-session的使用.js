const Koa = require('koa');
const router = require('koa-router')();
const session = require('koa-session');

var app = new Koa();

app.keys = ['some secret hurr'];
const CONFIG = {
  maxAge: 20000,  // cookie的过期时间 maxAge in ms (default is 1 days)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  rolling: true,
  renew: false  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));

router.get('/', async (ctx) => {
  ctx.body = "首页";
  // 获取session
  console.log(ctx.session.userinfo);
})

router.get('/login', async (ctx) => {
  ctx.body = "登录";
  // 设置session
  ctx.session.userinfo = "张三";
})

app.use(router.routes());

app.listen(3000);
console.log('app running at http://localhost:3000');

