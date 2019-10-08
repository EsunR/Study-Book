const path = require('path');         // 用于处理目录路径
const Koa = require('koa');          // web开发框架
const serve = require('koa-static');   // 静态资源处理
const Router = require('koa-router');    // 路由中间件
const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
const jwtKoa = require('koa-jwt');      // 用于路由权限控制
const bodyparser = require('koa-bodyparser');     // 用于查询字符串解析到`ctx.request.query`
const tokenCheck = require('./tokenCheck')
const app = new Koa();

const website = {
  scheme: 'http',
  host: 'localhost',
  port: 1337,
  join: function () {
    return `${this.scheme}://${this.host}:${this.port}`
  }
}

/* jwt密钥 */
const secret = 'secret';

/* 当token验证异常时候的处理，如token过期、token错误 */
app.use(async (ctx, next) => {
  return await next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        ok: false,
        msg: err.originalError ? err.originalError.message : err.message
      }
    } else {
      throw err;
    }
  });
});

/* 查询字符串解析到`ctx.request.query` */
app.use(bodyparser());

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

/* 获取一个期限为4小时的token */
function getToken(payload = {}) {
  return jwt.sign(payload, secret, { expiresIn: '3h' });
}

const router = new Router()
/* POST /api/register 注册 */
router.post('/api/register', async (ctx, next) => {
  const body = ctx.request.body
  /*
   * body = {
   *  user : 'EsunR',
   *  password : '123456'
   * }
   */

  // 判断 body.user 和 body.password 格式是否正确
  // 待办事项……

  // 判断用户是否已经注册
  // 待办事项……

  // 保存到新用户到数据库中
  // 待办事项……

  // 是否注册成功
  let result = true;
  if (result) {
    // 返回一个注册成功的JOSN数据给前端
    return ctx.body = {
      ok: true,
      msg: '注册成功',
      token: getToken({ user: body.user, password: body.password })
    }
  } else {
    // 返回一个注册失败的JOSN数据给前端
    return ctx.body = {
      ok: false,
      msg: '注册失败'
    }
  }
});





/* GET /api/login 登录 */
router.get('/api/login', async (ctx, next) => {
  console.log(1);
  const query = ctx.request.query;
  /*
   * query = {
   *  user : '御焱',
   *  password : '123456'
   * }
   */

  // 判断 query.user 和 query.password 格式是否正确
  // 待办事项……

  // 判断是否已经注册
  // 待办事项……

  // 判断姓名、学号是否正确
  // 待办事项……

  return ctx.body = {
    ok: true,
    msg: '登录成功',
    token: getToken({ user: query.user, password: query.password })
  }
});

/* GET /api/info 信息 */
router.get('/api/info', async (ctx, next) => {
  // 前端访问时会附带token在请求头
  payload = getJWTPayload(ctx.headers.authorization)
  console.log('payload: ', payload);
  /*
   * payload = {
   * user : "御焱",
   * iat : 1524042454,
   * exp : 1524056854
   * }
   */

  // 根据 payload.user 查询该用户在数据库中的信息
  // 待办事项……
  const info = {
    name: '御焱',
    age: 10,
    sex: '男'
  }
  let result = true;
  if (result) {
    return ctx.body = {
      ok: true,
      msg: '获取信息成功',
      data: info
    }
  } else {
    return ctx.body = {
      ok: false,
      msg: '获取信息失败'
    }
  }
});
/* 通过token获取JWT的payload部分 */
function getJWTPayload(token) {
  // 验证并解析JWT
  return jwt.verify(token.split(' ')[1], secret);
}

app.use(router.routes())



/* 静态资源处理 */
app.use(serve(path.join(__dirname, 'static')));
/* 监听服务器端口 */
app.listen(website.port, () => {
  console.log(`${website.join()} 服务器已经启动！`);
});