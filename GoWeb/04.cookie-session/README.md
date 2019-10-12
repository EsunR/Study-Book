# 1. Cookie

## 1.1 设置 Cookie

设置 Cookie：

```go
http.SetCookie(w ResponseWriter, cookie *Cookie)
```

w 表示需要写入的 response，cookie 是一个 struct，让我们来看一下 cookie 对象是怎么样的：

```go
type Cookie struct {
    Name       string
    Value      string
    Path       string
    Domain     string
    Expires    time.Time
    RawExpires string

// MaxAge=0 means no 'Max-Age' attribute specified.
// MaxAge<0 means delete cookie now, equivalently 'Max-Age: 0'
// MaxAge>0 means Max-Age attribute present and given in seconds
    MaxAge   int
    Secure   bool
    HttpOnly bool
    Raw      string
    Unparsed []string // Raw text of unparsed attribute-value pairs
}
```

我们来看一个例子，如何设置 cookie

```go
expiration := time.Now()
expiration = expiration.AddDate(1, 0, 0)
cookie := http.Cookie{Name: "username", Value: "astaxie", Expires: expiration}
http.SetCookie(w, &cookie)
```

## 1.2 读取 Cookie

上面的例子演示了如何设置 cookie 数据，我们这里来演示一下如何读取 cookie

```go
cookie, _ := r.Cookie("username")
fmt.Fprint(w, cookie)
```

还有另外一种读取方式

```go
for _, cookie := range r.Cookies() {
    fmt.Fprint(w, cookie.Name) // username=astaxie
}
```

可以看到通过 request 获取 cookie 非常方便。

# 2. Session

Go 的 session 功能并没有实现，需要用户手动实现，在 [Demo](./4.2_session) 中实现了一个简单的 Cookie-Session 机制可以进行参考。

session 管理涉及到如下几个因素：

- 全局 session 管理器
- 保证 sessionid 的全局唯一性
- 为每个客户关联一个 session
- session 的存储 (可以存储到内存、文件、数据库等)
- session 过期处理

设计方案是创建一个 [manager](./4.2_session/manager.go) 对象，同时创建 [provider](./4.2_session/provider.go) 接口与 [session](./4.2_session/session.go) 接口。我们需要在 [系统初始化时](./4.2_session/router_handle.go)，创建一个全局的 manager 对象，这个 manager 对象会根据 provideName 去查找对应的 session 处理机制来实现 provider 接口和 session 接口（在 Demo 中我们创建了一种 [Session 处理机制](./4.2_session/router_handle.go) 来实现了 provider 与 session 接口）。

完整的实例可以参考 [《06.2. Go 如何使用 session》](https://learnku.com/docs/build-web-application-with-golang/how-062-go-uses-session/3190)