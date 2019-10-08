# 1. http 标准库

## 1.1 标准 Get 请求

使用客户端发送请求：

```go
resp, err := http.Get(url)
if err != nil {
    panic(err)
}
defer resp.Body.Close()
```

发送完请求后，我们获取到的 response 对象需要经过 Dump 操作才能获取到数据：

```go
s, err := httputil.DumpResponse(resp, true)
if err != nil {
    panic(err)
}
fmt.Printf("%s\n", s)
```

## 1.2 自定义请求

除了标准的 get 请求之外，我们还可以创建自定义请求，其参数分别为请求类型、url、请求体：

```go
request, err := http.NewRequest(http.MethodGet, "https://www.imooc.com", nil)
```

其返回值为一个 request 对象，此时的请求还未发送，我们还可以修改其 header，如为其加上一个 `User-Agent`：

```go
request.Header.Add("User-Agent",
		"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1")
```

之后我们需要创建一个 Client 客户端去发送这个请求，返回的 response  对象可以继续进行 Dump 操作：

```go
resp, err := http.DefaultClient.Do(request)
```

## 1.3 自定义 Client

除了使用 DefaultClient 我们还可以自定义 Client：

```go
// 创建一个客户端去发送请求
client := http.Client{
    Transport: nil,
    // 当检测到出现重定向时，触发此函数，via 代表重定向的队列
    CheckRedirect: func(req *http.Request, via []*http.Request) error {
        fmt.Println("Redirect:", req.URL)
        // 如果返回值为 nil 就执行重定向
        return nil
    },
    Jar:     nil,
    Timeout: 0,
}
```

同样的，自定义 Client 也有一个 `Do()` 方法来发送请求：

```go
resp, err := client.Do(request)
```

# 2. 其他标准库

- bufio

- log
- encoding/json
- regexp
- time
- strings/math/rand

> 启动文档服务器：godoc -http 8888