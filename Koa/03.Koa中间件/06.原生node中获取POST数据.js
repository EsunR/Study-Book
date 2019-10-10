var Koa = require('koa');
var router = require('koa-router')();
var views = require('koa-views');
var app = new Koa();

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

// 配置中间件 - 模板引擎 - 第三方中间件
app.use(views('./views', {
  extension: 'ejs'
}))

router.get('/', async (ctx) => {
  await ctx.render('form');
})

router.post('/doAdd', async (ctx) => {
  var data = await getPostData(ctx);
  console.log(data);
  ctx.body = data;
})

app.use(router.routes());
app.listen(3001)
console.log('appp is running at http://localhost:3001');