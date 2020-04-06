import { sysConfig } from "./config"
import Koa from "koa"
import Router from "koa-router"
import cors from "@koa/cors"
import KoaBody from "koa-body"
import errorHandler from "./middle/error_handler"
import KoaStatic from "koa-static"
import path from "path"
import KoaLogger from "koa-logger"
import http from "http"
import Socket from "socket.io"

const app: Koa = new Koa()
const router: Router = new Router()
// log
app.use(KoaLogger())

// 错误处理
app.use(errorHandler())

// 静态文件服务
app.use(
  KoaStatic(path.join(__dirname, "../static"), {
    gzip: true
  })
)

// CORS
app.use(cors())

// 解析 HTTP Body
app.use(
  KoaBody({
    multipart: true,
    formidable: {
      maxFieldsSize: 2000 * 1024 * 1024
    }
  })
)

// Router
import testRouter from "./routers/test_router"
router.use("/api/test", testRouter.routes())

app.use(router.routes()).use(router.allowedMethods())

// 转换 app 为原生 http 对象
const serve = http.createServer(app.callback())

// 开启 ws
const io = Socket(serve)
io.on("connection", socket => {
  console.log("id", socket.id) //每次connect 的id都不一样
  console.log("a user connected")
})

serve.listen(sysConfig.port)
console.log(`serve running on port ${sysConfig.port}`)
