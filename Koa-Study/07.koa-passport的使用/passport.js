// passport.js
const passport = require('koa-passport')
var LocalStrategy = require('passport-local').Strategy


// 序列化ctx.login()触发
passport.serializeUser(function (user, done) {
  console.log('serializeUser: ', user)
  done(null, user)
})

// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async function (user, done) {
  console.log('deserializeUser: ', user)
  // var user = { id: 1, username: 'admin', password: '123456' }
  done(null, user)
})

// 提交数据(策略)
passport.use(new LocalStrategy(
  function (username, password, done) {
    if (username === "huahua" && password === "123") {
      console.log("成功");
      return done(null, { uid: 1 })
    } else {
      console.log("失败");
      return done(null, false, { message: "匹配失败" })
    }
  }
))


module.exports = passport
