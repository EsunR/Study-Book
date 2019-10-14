# 1. 常见框架

## 1.1 框架排名

- Gin      	31k **[Lite]**
- Beego     22k
- Iris           16k
- Echo        15k **[Lite]**
- Revel       11k 
- Martini    10k **[×]**
- buffalo    5k   **[Lite]**

## 1.2 框架特性

**Gin：**

Gin 是一个用 Go (Golang) 编写的 web 框架。 它是一个类似于 martini 但拥有更好性能的 API 框架, 由于 httprouter，速度提高了近 40 倍。 如果你是性能和高效的追求者, 你会爱上 Gin.

快速：基于 Radix 树的路由，小内存占用。没有反射。可预测的 API 性能。

支持中间件：传入的 HTTP 请求可以由一系列中间件和最终操作来处理。 例如：Logger，Authorization，GZIP，最终操作 DB。

Crash 处理：Gin 可以 catch 一个发生在 HTTP 请求中的 panic 并 recover 它。这样，你的服务器将始终可用。例如，你可以向 Sentry 报告这个 panic！

JSON 验证：Gin 可以解析并验证请求的 JSON，例如检查所需值的存在。

路由组：更好地组织路由。是否需要授权，不同的 API 版本…… 此外，这些组可以无限制地嵌套而不会降低性能。

错误管理：Gin 提供了一种方便的方法来收集 HTTP 请求期间发生的所有错误。最终，中间件可以将它们写入日志文件，数据库并通过网络发送。

内置渲染：Gin 为 JSON，XML 和 HTML 渲染提供了易于使用的 API。

可扩展性：新建一个中间件非常简单，去查看示例代码吧。

[文档链接](https://gin-gonic.com/zh-cn/docs/) | 文档详细度：低

**Beego：**

bee 工具是一个为了协助快速开发 beego 项目而创建的项目，通过 bee 您可以很容易的进行 beego 项目的创建、热编译、开发、测试、和部署。

简单化：RESTful 支持、MVC 模型，可以使用 bee 工具快速地开发应用，包括监控代码修改进行热编译、自动化测试代码以及自动化打包部署。

智能化：支持智能路由、智能监控，可以监控 QPS、内存消耗、CPU 使用，以及 goroutine 的运行状况，让您的线上应用尽在掌握。

模块化：beego 内置了强大的模块，包括 Session、缓存操作、日志记录、配置解析、性能监控、上下文操作、ORM 模块、请求模拟等强大的模块，足以支撑你任何的应用。

高性能：beego 采用了 Go 原生的 http 包来处理请求，goroutine 的并发效率足以应付大流量的 Web 应用和 API 应用，目前已经应用于大量高并发的产品中。

[文档链接](https://beego.me/docs/mvc/view/tutorial.md) | 文档详细度：高

**Iris：**

- 专注于高性能
- 简单流畅的API
- 高扩展性
- 强大的路由和中间件生态系统
  - 使用iris独特的表达主义路径解释器构建RESTful API
  - 动态路径参数化或通配符路由与静态路由不冲突
  - 使用重定向选项从URL中删除尾部斜杠
  - 使用虚拟主机和子域名变得容易
  - 分组API和静态或甚至动态子域名
  - net / http和negroni-like处理程序通过iris.FromStd兼容
  - 针对任意Http请求错误 定义处理函数
  - 支持事务和回滚
  - 支持响应缓存
  - 使用简单的函数嵌入资源并与go-bindata 保持兼容
  - mvc
- 上下文
  - 高度可扩展的试图渲染(目前支持markdown,json,xml，jsonp等等)
  - 正文绑定器和发送HTTP响应的便捷功能
  - 限制请求正文
  - 提供静态资源或嵌入式资产
  - 本地化i18N
  - 压缩（Gzip是内置的）
- 身份验证
  - Basic Authentication
  - OAuth, OAuth2 (支持27个以上的热门网站)
  - JWT *服务器
  - 通过TLS提供服务时，自动安装和提供来自[https://letsencrypt.org的证书](https://letsencrypt.xn--org-ge9dz74pcw0a/)
  - 默认为关闭状态
  - 在关闭，错误或中断事件时注册
  - 连接多个服务器，完全兼容 net/http#Server
- 视图系统.支持五种模板引擎 完全兼容 html/template
- Websocket库，其API类似于socket.io [如果你愿意，你仍然可以使用你最喜欢的]
- 热重启
- Typescript集成 + Web IDE
- Iris是最具特色的网络框架之一

[文档链接1](https://studyiris.com/doc/irisDoc/DynamicPathParameters.html) [文档链接2](https://www.studyiris.com/example/) [wiki](https://github.com/kataras/iris/wiki) | 文档详细度：中

## 1.3 性能测试

- (1)：在一定的时间内实现的总调用数，越高越好
- (2)：单次操作耗时（ns/op），越低越好
- (3)：堆内存分配 （B/op）, 越低越好
- (4)：每次操作的平均内存分配次数（allocs/op），越低越好

| Benchmark name                 | (1)       | (2)         | (3)        | (4)      |
| ------------------------------ | --------- | ----------- | ---------- | -------- |
| **BenchmarkGin_GithubAll**     | **30000** | **48375**   | **0**      | **0**    |
| BenchmarkAce_GithubAll         | 10000     | 134059      | 13792      | 167      |
| BenchmarkBear_GithubAll        | 5000      | 534445      | 86448      | 943      |
| **BenchmarkBeego_GithubAll**   | **3000**  | **592444**  | **74705**  | **812**  |
| BenchmarkBone_GithubAll        | 200       | 6957308     | 698784     | 8453     |
| BenchmarkDenco_GithubAll       | 10000     | 158819      | 20224      | 167      |
| **BenchmarkEcho_GithubAll**    | **10000** | **154700**  | **6496**   | **203**  |
| BenchmarkGocraftWeb_GithubAll  | 3000      | 570806      | 131656     | 1686     |
| BenchmarkGoji_GithubAll        | 2000      | 818034      | 56112      | 334      |
| BenchmarkGojiv2_GithubAll      | 2000      | 1213973     | 274768     | 3712     |
| BenchmarkGoJsonRest_GithubAll  | 2000      | 785796      | 134371     | 2737     |
| BenchmarkGoRestful_GithubAll   | 300       | 5238188     | 689672     | 4519     |
| BenchmarkGorillaMux_GithubAll  | 100       | 10257726    | 211840     | 2272     |
| BenchmarkHttpRouter_GithubAll  | 20000     | 105414      | 13792      | 167      |
| BenchmarkHttpTreeMux_GithubAll | 10000     | 319934      | 65856      | 671      |
| BenchmarkKocha_GithubAll       | 10000     | 209442      | 23304      | 843      |
| BenchmarkLARS_GithubAll        | 20000     | 62565       | 0          | 0        |
| BenchmarkMacaron_GithubAll     | 2000      | 1161270     | 204194     | 2000     |
| **BenchmarkMartini_GithubAll** | **200**   | **9991713** | **226549** | **2325** |
| BenchmarkPat_GithubAll         | 200       | 5590793     | 1499568    | 27435    |
| BenchmarkPossum_GithubAll      | 10000     | 319768      | 84448      | 609      |
| BenchmarkR2router_GithubAll    | 10000     | 305134      | 77328      | 979      |
| BenchmarkRivet_GithubAll       | 10000     | 132134      | 16272      | 167      |
| BenchmarkTango_GithubAll       | 3000      | 552754      | 63826      | 1618     |
| BenchmarkTigerTonic_GithubAll  | 1000      | 1439483     | 239104     | 5374     |
| BenchmarkTraffic_GithubAll     | 100       | 11383067    | 2659329    | 21848    |
| BenchmarkVulcan_GithubAll      | 5000      | 394253      | 19894      | 609      |

# 2. 应用

## 2.1 主机服务

#### Gin

Gin 拥有灵活的开发环境，在运行时可以选择默认的服务器来运行，也可以选择原生的  `http.ListenAndServe(":8080", router)` 来开启服务，这是因为其本身使用 `gin.Default()` 创建的 `router` 对象实现了 Handler 接口，这就以为着其可以选择其他的 HTTP 服务器，如 [fvbock/endless](https://github.com/fvbock/endless) 、 [manners](https://github.com/braintree/manners) 或者原生的 http.Server 内置的 Shutdown 方法进行服务重启。

```go
r := gin.Default()
_ = r.Run()
// 或者启动原生服务
manners.ListenAndServe(":8888", r)
```

#### BeeGo

Beego 提供了一个构建工具，有着标准的开发环境规范，可以一键生成工程目录，并在工程目录使用 `run` 指令可以直接运行项目，并且支持开发模式下的热更新。

```go
beego.Run()
```

#### Iris

Iris 的主机有多种拓展功能，包括自定义监听服务、主机配置，同时也支持多主机服务。与 Gin 相似的 iris.Router与 net/http/Handler 功能兼容，它可以在任何net/http服务器上进行调整：

```go
app := iris.New()
app.Run(iris.Addr(":8080"))

// 或者自定义链接方式与端口号
l, err := listenerCfg.NewListener("tcp", ":8080")
if err != nil {
    app.Logger().Fatal(err)
}
app.Run(iris.Listener(l))

// 或者启动原生服务
app.Run(iris.Raw(&http.Server{Addr:":8080"}).ListenAndServe)
```

## 2.2 路由

#### Gin

Gin 在路由系统上集成了 [HttpRouter](https://github.com/julienschmidt/httprouter) 拥有高性能的优势，同时拥有其丰富的功能，包括组合路由、路由验证、CORS 等。

简单路由：

```go
r := gin.Default()
r.GET("/ping", func(c *gin.Context) {
    c.String(http.StatusOK, "pong")
})
```

分层路由：

```go
someGroup := router.Group("/someGroup") {
    someGroup.GET("/someGet", getting)
    someGroup.POST("/somePost", posting)
}
```

[引用来源](https://juejin.im/post/5cc7e726f265da03452be820)

#### BeeGo

BeeGo 的路由功能较为丰富，拥有基础路由、固定路由、正则路由、注解路由、namespace等多个功能，其 REST 风格性较强，且有固定的路由层规范。

简单路由：

```go
beego.Get("/",func(ctx *context.Context){
     ctx.Output.Body([]byte("hello world"))
})
```

固定路由：

```go
beego.Router("/", &controllers.MainController{})
beego.Router("/admin", &admin.UserController{})
beego.Router("/admin/index", &admin.ArticleController{})
beego.Router("/admin/addpkg", &admin.AddController{})
```

namespace（分层路由）：

```go
//初始化 namespace
ns :=
beego.NewNamespace("/v1",
    beego.NSCond(func(ctx *context.Context) bool {
        if ctx.Input.Domain() == "api.beego.me" {
            return true
        }
        return false
    }),
    beego.NSBefore(auth),
    beego.NSGet("/notallowed", func(ctx *context.Context) {
        ctx.Output.Body([]byte("notAllowed"))
    }),
    beego.NSRouter("/version", &AdminController{}, "get:ShowAPIVersion"),
    beego.NSRouter("/changepassword", &UserController{}),
    beego.NSNamespace("/shop",
        beego.NSBefore(sentry),
        beego.NSGet("/:id", func(ctx *context.Context) {
            ctx.Output.Body([]byte("notAllowed"))
        }),
    ),
    beego.NSNamespace("/cms",
        beego.NSInclude(
            &controllers.MainController{},
            &controllers.CMSController{},
            &controllers.BlockController{},
        ),
    ),
)
//注册 namespace
beego.AddNamespace(ns)
```

#### Irisi

简单路由：

```go
app.Get("/", func(ctx iris.Context) {
    ctx.HTML("<h1> Hello from /contact </h1>")
})
```

分层路由：

```go
users := app.Party("/users", myAuthMiddlewareHandler)
// http://localhost:8080/users/42/profile
users.Get("/{id:int}/profile", userProfileHandler)
// http://localhost:8080/users/inbox/1
users.Get("/inbox/{id:int}", userMessageHandler)

// 或者使用嵌套风格
app.PartyFunc("/users", func(users iris.Party) {
    users.Use(myAuthMiddlewareHandler)
    // http://localhost:8080/users/42/profile
    users.Get("/{id:int}/profile", userProfileHandler)
    // http://localhost:8080/users/messages/1
    users.Get("/inbox/{id:int}", userMessageHandler)
})
```

## 2.3 上下文对象

在进行路由匹配之后，可以获取到上下文对象，三套框架都对 Context 进行了封装。

Gin 与 Iris 对 context 的封装均是为其增加了必要的新功能，同时可以返回原生的 `http.Request` 对象。但 Beego 的 context 模块是对原生的 `http.ResponseWriter` 和 `http.Request` 对象进行了彻底的封装，将其分为两个部分，分别为 Input 对象与 Output 对象，对应的将常用方法进行封装，并不能调出原生的对象。

## 2.4 数据操作

#### 原生

在原生开发中，Go 支持解析 JSON 格式的数据处理能力：

```go
// 解析 JSON
func Unmarshal(data []byte, v interface{}) error

// 生成 JSON
func Marshal(v interface{}) ([]byte, error)
```

如果使用 `simplejson` 可以简化 JSON 数据的操作：

```go
js, err := NewJson([]byte(`{
    "test": {
        "array": [1, "2", 3],
        "int": 10,
        "float": 5.150,
        "bignum": 9223372036854775807,
        "string": "simplejson",
        "bool": true
    }
}`))

arr, _ := js.Get("test").Get("array").Array()
i, _ := js.Get("test").Get("int").Int()
ms := js.Get("test").Get("string").MustString()
```

#### Gin

Gin 可以使用 `c.ShouldBind`方法，可以将参数自动绑定到 `struct`.该方法是会检查 Url 查询字符串和 POST 的数据，而且会根据 `content-type`类型，优先匹配`JSON`或者 `XML`,之后才是 `Form`。

接收数据：

```go
func main() {
    route := gin.Default()
    route.POST("/testing", (c *gin.Context) {
        var person Person // 定义结构体步骤省略
        // 绑定到 person
        if c.ShouldBind(&person) == nil {
            log.Println(person.Name)
            log.Println(person.Address)
            log.Println(person.Birthday)
        }
        c.String(200, "Success")
    })
    route.Run(":8085")
}
```

发送数据：

Gin 输出这 JSON、 XML、 YAML 三种格式非常方便，直接使用对用方法并赋值一个结构体给它就行了。

同时还可以使用`gin.H`。`gin.H` 是一个很巧妙的设计，你可以像`javascript`定义`json`一样，直接一层层写键值对，只需要在每一层加上 `gin.H`即可：

```go
func main() {
    r := gin.Default()

    // gin.H 本质是 map[string]interface{}
    r.GET("/someJSON", func(c *gin.Context) {
        // 会输出头格式为 application/json; charset=UTF-8 的 json 字符串
        c.JSON(http.StatusOK, gin.H{"message": "hey", "status": http.StatusOK})
    })

    r.GET("/moreJSON", func(c *gin.Context) {
        // 直接使用结构体定义
        var msg struct {
            Name    string `json:"user"`
            Message string
            Number  int
        }
        msg.Name = "Lena"
        msg.Message = "hey"
        msg.Number = 123
        // 会输出  {"user": "Lena", "Message": "hey", "Number": 123}
        c.JSON(http.StatusOK, msg)
    })

    r.GET("/someXML", func(c *gin.Context) {
        // 会输出头格式为 text/xml; charset=UTF-8 的 xml 字符串
        c.XML(http.StatusOK, gin.H{"message": "hey", "status": http.StatusOK})
    })

    r.GET("/someYAML", func(c *gin.Context) {
        // 会输出头格式为 text/yaml; charset=UTF-8 的 yaml 字符串
        c.YAML(http.StatusOK, gin.H{"message": "hey", "status": http.StatusOK})
    })

    r.Run(":8080")
}
```

[引用来源](https://www.yoytang.com/go-gin-doc.html)

Gin 支持返回的数据格式有：HTML, String，JSON， XML， YAML

#### BeeGo

Beego 对与JSON 数据处理则比较复杂，如果接受数据则需要从 `context.RequestBody` 中取出数据，之后需要使用断言解析数据，实际上，这里的处理方式与原生的是一样的，并未进行功能优化：

```go
var body map[string]interface{}
_ = json.Unmarshal(ctx.Input.RequestBody, &body) // 将 json 数据解析到 body 变量中
username := body["name"].(string) // 使用断言取出单个数据
```

对于返回一个 json 数据，BeeGo 只是将我们创建的 json 结构对象存放于 `context.Data` 下的 `“json”` 字段中，然后调用 `context.ServeJSON()` 方法时，会去获取 `c.Data["json"]` 下存放的结构然后将结果转换成 json 的数据格式并发送：

```go
type User struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func (c *TestController) TestData() {
	user := User{
		Name: "huahua",
		Age:  18,
	}
	c.Data["json"] = user
	c.ServeJSON()
}
```

起始在处理 json 这一步，Beego 只是做了非常简单的替换工作，`context.ServeJSON()` 的方法调用后，取到我们设置的结构体后调用了：

```go
func (output *BeegoOutput) JSON(data interface{}, hasIndent bool, encoding bool) error
```

该方法将结构体通过 `json.Marshal()` 转成了 json 格式，同时又为响应报文添加了相应响应数据格式信息，之后将数据送出。

此外，BeeGo 支持返回的数据类型由有：JSON、XML、JSONP

#### Iris

Irisi 对处理 JSON 数据的方法进行了封装，同时也拥有验证数据的能力。

发送数据与前两者无差别，都是先定义结构体，然后底层使用 JSON 库的能力对 JSON 数据进行解析并赋值于创建的对象。

接收数据：

```go
func MyHandler(ctx iris.Context) {
    var c Company // 定义结构体省略
    if err := ctx.ReadJSON(&c); err != nil {
        ctx.StatusCode(iris.StatusBadRequest)
        ctx.WriteString(err.Error())
        return
    }
    ctx.Writef("Received: %#+v\n", c)
}
```

在对于返回数据的处理上，与 Gin 相似，采用了在 `iris.Context.JSON()` 方法可以将对象转化为 JSON 数据输出。

返回数据：

```go
app.Get("/encode", func(ctx iris.Context) {
    peter := User{
        Firstname: "John",
        Lastname:  "Doe",
        City:      "Neither FBI knows!!!",
        Age:       25,
    }
    //手动设置内容类型: ctx.ContentType("application/javascript")
    ctx.JSON(peter)
})
```

[引用来源](https://studyiris.com/example/responseWriter/writeRest.html)

此外，Iris 支持返回的数据格式有：binary, text, json, jsonp, xml, markdown

## 2.5 模板引擎

#### 原生

Go web 能力中包含了模板引擎的支持，可以使用 `template` 包来进行模板处理，使用类似 `Parse`、`ParseFile`、`Execute` 等方法从文件或者字符串加载模板，然后执行类似下图展示的模板的 merge 操作：

![](https://i.loli.net/2019/10/11/PKgbsVam1Qy3wFp.png)

```go
func handler(w http.ResponseWriter, r *http.Request) {
    t := template.New("some template") // 创建一个模板
    t, _ = t.ParseFiles("tmpl/welcome.html")  // 解析模板文件
    user := GetUser() // 获取当前用户信息
    t.Execute(w, user)  // 执行模板的 merger 操作
}
```

原生的模板引擎支持以下的能力：

- 字段操作：`{{.}}`
- 数据遍历： `{{with …}}…{{end}}`  `{{range …}}{{end}}`
- 条件处理：`if ... else ...`
- 管道符 （基于模板函数）
- 模板函数
- 模板变量
- Must 操作：作用是检测模板是否正确，例如大括号是否匹配，注释是否正确的关闭，变量是否正确的书写。

- 嵌套模板

[引用来源](https://learnku.com/docs/build-web-application-with-golang/074-template-processing/3198)

#### Gin

Gin 可以通过配置 `LoadHTMLGlob()` 或者 `LoadHTMLFiles()` 启用模板渲染，这两个方法挂载与 `gin.Defalut()` 生成的 router 对象上，用于设置，模板目录 。匹配完成后可以调用 `Context.HTML` 进行渲染和数据注入。

同时，与原生不同的是，Gin 可以使用 `gin.H()` 来向模板注入 json 格式的数据，而不需要创建额外的结构体。

```go
func main() {
	router := gin.Default()
	router.LoadHTMLGlob("templates/*")
	//router.LoadHTMLFiles("templates/template1.html", "templates/template2.html")
	router.GET("/index", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"title": "Main website",
		})
	})
	router.Run(":8080")
}
```

Gin 的模板引擎支持以下能力：

- 使用自定义的 html 模板渲染
- 自定义分隔符（模板标签）
- 继承原生能力

相比原生，Gin 定义模板的方式是采用创建全局模板对象（LoadHTMLGlob），然后在上下文对象中使用 `c.HTML` 去直接调用模板路径下的文件渲染模板。而原生则是在路由的上下文对象中创建 Template 对象，然后在上下文对象中渲染 Template 对象完成渲染工作。

[引用来源](https://gin-gonic.com/zh-cn/docs/examples/html-rendering/)

#### Beego

beego 的模板处理引擎采用的是 Go 内置的 `html/template` 包进行处理，而且 beego 的模板处理逻辑是采用了缓存编译方式，也就是所有的模板会在 beego 应用启动的时候全部编译然后缓存在 map 里面，Beego 的模板引擎支持以下能力：

- 自定义模板目录
- 自动渲染
- 自定义模板标签
- 模板数据：模板中的数据是通过在 Controller 中 `this.Data` 获取的
- 自定义模板名称
- layout 设计、LayoutSection：实际上是模板的组合、嵌套
- renderform

[引用来源](https://beego.me/docs/mvc/view/view.md)

#### Iris

Iris 自身并没有创建一种直接可用的模板引擎，而是交给用户可以选择任意一种模板引擎，且完全兼容 html/template。

官方推荐使用 Hero 引擎，可以预编译`html`模板以获取代码，其拥有以下特性：

- 高性能.
- 非常易用.
- 功能强大，支持模板继承和模板include.
- 自动编译.

[Hero 文档](https://github.com/shiyanhui/hero/blob/master/README_CN.md)

同时可以选用 quicktemplate 引擎，其拥有以下特性：

1. 非常快。 模板转换为Go代码然后编译
2. `Quicktemplate`语法非常接近`Go` - 在开始使用`quicktemplate`之前无需学习另一种模板语言
3. 在模板编译期间几乎所有错误都被捕获，因此生产受模板相关错误的影响较小
4. 使用方便。有关详细信息，请参阅快速入门和示例
5. 强大。任意`Go`代码可以嵌入到模板中并与模板混合。小心这个功能 - 不要从模板中查询数据库`and/or`外部资源，除非你错过`Go`中的`PHP`方 式`:)`这种功能主要用于任意数据转换
6. 易于使用的模板继承由`Go`接口提供支持。 请参阅此示例以获取详细信
7. 模板被编译为单个二进制文件，因此无需将模板文件复制到服务器

[quicktemplate 文档](https://github.com/valyala/fasttemplate)

## 2.6 MVC 架构

[Gin MVC 的实现参考](https://github.com/mydevc/go-gin-mvc)

#### Beego

Beego 是标准的 MVC 框架，对 MVC 有着良好的支持，同时提供了 Model 层的 ORM 引擎。

#### Iris

Iris对MVC(模型视图控制器)模式有一流的支持，Iris web框架支持请求数据、模型、持久数据和以最快的速度执行的绑定。其模式流程图如下：

![](https://i.loli.net/2019/10/11/ui2URWPwjSKMgDJ.png)

[Iris MVC 的实现参考](https://studyiris.com/doc/irisDoc/MoviesMVCApplication.html)