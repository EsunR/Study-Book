## 1. 创建一个简单的 Serve 服务

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

func sayhelloName(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()   // 解析参数，默认是不会解析的
	fmt.Println(r.Form) // 这些信息是输出到服务器端的打印信息
	fmt.Println("path", r.URL.Path)
	fmt.Println("scheme", r.URL.Scheme)
	fmt.Println(r.Form["url_long"])
	for k, v := range r.Form {
		fmt.Println("key:", k)
		fmt.Println("val:", strings.Join(v, ""))
	}
	_, _ = fmt.Fprintf(w, "Hello astaxie!") // 这个写入到 w 的是输出到客户端的
    _, _ = w.Write([]byte("I can write too!"))
}

func main() {
	http.HandleFunc("/", sayhelloName)       // 设置访问的路由
    err := http.ListenAndServe(":9090", nil) // 设置监听的端口【注意带冒号】
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
```

## 2. 分析底层

**http 包执行流程**

1. 创建 Listen Socket, 监听指定的端口，等待客户端请求到来。
2. Listen Socket 接受客户端的请求，得到 Client Socket, 接下来通过 Client Socket 与客户端通信。
3. 处理客户端的请求，首先从 Client Socket 读取 HTTP 请求的协议头，如果是 POST 方法，还可能要读取客户端提交的数据，然后交给相应的 handler 处理请求，handler 处理完毕准备好客户端需要的数据，通过 Client Socket 写给客户端。

**这整个的过程里面我们只要了解清楚下面三个问题，也就知道 Go 是如何让 Web 运行起来了**

- 如何监听端口？
- 如何接收客户端请求？
- 如何分配 handler？

前面小节的代码里面我们可以看到，Go 是通过一个函数 `ListenAndServe` 来处理这些事情的，这个底层其实这样处理的：初始化一个 server 对象，然后调用了 `net.Listen("tcp", addr)`，也就是底层用 TCP 协议搭建了一个服务，然后监控我们设置的端口。

下面代码来自 Go 的 http 包的源码，通过下面的代码我们可以看到整个的 http 处理过程：

```go
func (srv *Server) Serve(l net.Listener) error {
    defer l.Close()
    var tempDelay time.Duration // how long to sleep on accept failure
    for {
        rw, e := l.Accept()
        if e != nil {
            if ne, ok := e.(net.Error); ok && ne.Temporary() {
                if tempDelay == 0 {
                    tempDelay = 5 * time.Millisecond
                } else {
                    tempDelay *= 2
                }
                if max := 1 * time.Second; tempDelay > max {
                    tempDelay = max
                }
                log.Printf("http: Accept error: %v; retrying in %v", e, tempDelay)
                time.Sleep(tempDelay)
                continue
            }
            return e
        }
        tempDelay = 0
        c, err := srv.newConn(rw)
        if err != nil {
            continue
        }
        go c.serve()
    }
}
```

监控之后如何接收客户端的请求呢？上面代码执行监控端口之后，调用了 `srv.Serve(net.Listener)` 函数，这个函数就是处理接收客户端的请求信息。这个函数里面起了一个 `for{}`，首先通过 Listener 接收请求，其次创建一个 Conn，最后单独开了一个 goroutine，把这个请求的数据当做参数扔给这个 conn 去服务：`go c.serve()`。这个就是高并发体现了，用户的每一次请求都是在一个新的 goroutine 去服务，相互不影响。

**那么如何具体分配到相应的函数来处理请求呢？**

conn 首先会解析 request:`c.readRequest()`, 然后获取相应的 handler:`handler := c.server.Handler`，也就是我们刚才在调用函数 `ListenAndServe` 时候的第二个参数，我们前面例子传递的是 nil，也就是为空，那么默认获取 `handler = DefaultServeMux`, 那么这个变量用来做什么的呢？对，这个变量就是一个路由器，它用来匹配 url 跳转到其相应的 handle 函数，那么这个我们有设置过吗？有，我们调用的代码里面第一句不是调用了 `http.HandleFunc("/", sayhelloName)` 嘛。这个作用就是注册了请求 `/` 的路由规则，当请求 uri 为 "/"，路由就会转到函数 sayhelloName，DefaultServeMux 会调用 ServeHTTP 方法，这个方法内部其实就是调用 sayhelloName 本身，最后通过写入 response 的信息反馈到客户端。

详细的整个流程如下图所示：

![image.png](https://i.loli.net/2019/10/09/2ot8YOfXcd49CAg.png)

## 3. 自定义路由

`ListenAndServe` 的第二个参数是用以配置外部路由器的（如果设置了 `nil` 会调用默认路由），它是一个 Handler 接口：

```go
type Handler interface {
	ServeHTTP(ResponseWriter, *Request)
}
```

Handler 是一个接口，但是前一小节中的 `sayhelloName` 函数并没有实现 ServeHTTP 这个接口，为什么能添加呢？原来在 http 包里面还定义了一个类型 `HandlerFunc`, 我们定义的函数 `sayhelloName` 就是这个 **HandlerFunc 调用之后的结果**，这个类型默认就实现了 ServeHTTP 这个接口，**即我们调用了 HandlerFunc (f), 强制类型转换 f 成为 HandlerFunc 类型（内部调用方式为`HadnlerFunc(sayhelloName).ServeHTTP`）**，这样 f 就拥有了 ServeHTTP 方法。

```go
type HandlerFunc func(ResponseWriter, *Request)

// ServeHTTP calls f(w, r)
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {
    f(w, r)
}
```

即外部路由器只要实现了 Handler 接口就可以，我们可以在自己实现的路由器的 ServeHTTP 里面实现自定义路由功能。如下代码所示，我们自己实现了一个简易的路由器：

```go
package main

import (
    "fmt"
    "net/http"
)

type MyMux struct {}

func (p *MyMux) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path == "/" {
        sayhelloName(w, r)
        return
    }
    http.NotFound(w, r)
    return
}

func sayhelloName(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello myroute!")
}

func main() {
    mux := &MyMux{}
    http.ListenAndServe(":9090", mux)
}
```

## 4. 执行流程

通过对 http 包的分析之后，现在让我们来梳理一下整个的代码执行过程。

- 首先调用 Http.HandleFunc

  按顺序做了几件事：

  1 调用了 DefaultServeMux 的 HandleFunc

  2 调用了 DefaultServeMux 的 Handle

  3 往 DefaultServeMux 的 map [string] muxEntry 中增加对应的 handler 和路由规则

- 其次调用 http.ListenAndServe (":9090", nil)

  按顺序做了几件事情：

  1 实例化 Server

  2 调用 Server 的 ListenAndServe ()

  3 调用 net.Listen ("tcp", addr) 监听端口

  4 启动一个 for 循环，在循环体中 Accept 请求

  5 对每个请求实例化一个 Conn，并且开启一个 goroutine 为这个请求进行服务 go c.serve ()

  6 读取每个请求的内容 w, err := c.readRequest ()

  7 判断 handler 是否为空，如果没有设置 handler（这个例子就没有设置 handler），handler 就设置为 DefaultServeMux

  8 调用 handler 的 ServeHttp

  9 在这个例子中，下面就进入到 DefaultServeMux.ServeHttp

  10 根据 request 选择 handler，并且进入到这个 handler 的 ServeHTTP

  ```php
  mux.handler(r).ServeHTTP(w, r)
  ```

  11 选择 handler：

  A 判断是否有路由能满足这个 request（循环遍历 ServeMux 的 muxEntry）

  B 如果有路由满足，调用这个路由 handler 的 ServeHTTP

  C 如果没有路由满足，调用 NotFoundHandler 的 ServeHTTP