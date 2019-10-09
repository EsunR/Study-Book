# 1. 请求对象

请求对象为 `http.Request` 在下面的实例中使用 `r` 代替。

## 1.1 获取 Url Query Params

```go
fmt.Println(r.URL.Query())
for k, v := range r.URL.Query() {
    fmt.Println("key:", k)
    fmt.Println("val:", strings.Join(v, ""))
}
```

## 1.2 获取 url 信息：

```go
fmt.Println("url", r.URL.Path)
fmt.Println("scheme", r.URL.Scheme)
```

## 1.3 获取请求方法

```go
fmt.Println("method:", r.Method) // 获取请求的方法
```

## 1.4 Form 表单信息

获取 POST 请求中的表单信息：

```go
err := r.ParseForm() // 解析 url 传递的参数，对于 POST 则解析响应包的主体（request body）
if err != nil {
    // handle error http.Error() for example
    log.Fatal("ParseForm: ", err)
}
fmt.Println(r.PostForm) 
fmt.Println("username:", r.Form["username"])
fmt.Println("password:", r.Form["password"])
```

> 如果不实用 ParseForm 则无法获取 Form 内容。且 Form 仅能获取 x-www-form-urlencoded 部分的内容，不能获取 multipart/form-data 内容。

# 2. 关于 request.Form

`r.Form` 里面包含了所有请求的参数，比如 URL 中 query-string、POST 的数据、PUT 的数据。例如，对于同一字段，如 query 中的 `username` 字段与 post form 中的 `username` 字段重复的话，r.Form 会将其拼接为以一个空字符隔开的长字符串。如果要想避免解析，则可以使用 `r.PostForm` 来单独获取 x-www-form-urlencoded 部分的内容。

`request.Form` 是一个 url.Values 类型，里面存储的是对应的类似 `key=value` 的信息，下面展示了可以对 form 数据进行的一些操作:

```go
v := url.Values{}
v.Set("name", "Ava")
v.Add("friend", "Jess")
v.Add("friend", "Sarah")
v.Add("friend", "Zoe")
// v.Encode() == "name=Ava&friend=Jess&friend=Sarah&friend=Zoe"
fmt.Println(v.Get("name"))
fmt.Println(v.Get("friend"))
fmt.Println(v["friend"])
```

> **Tips**:
> Request 本身也提供了 FormValue () 函数来获取用户提交的参数。如 r.Form ["username"] 也可写成 r.FormValue ("username")。调用 r.FormValue 时会自动调用 r.ParseForm，所以不必提前调用。r.FormValue 只会返回同名参数中的第一个，若参数不存在则返回空字符串。

# 3. 预防 XSS 攻击

## 3.1 XSS攻击

对 XSS 最佳的防护应该结合以下两种方法：一是验证所有输入数据，有效检测攻击; 另一个是对所有输出数据进行适当的处理，以防止任何已成功注入的脚本在浏览器端运行。

当未对 XSS 攻击进行防范时，直接使用 `w.Write` 输入内容会直接将输出内容作为 html 解析如：

```go
script := r.FormValue("script")
_, _ = w.Write([]byte(script)) // 直接解析表单内容输出到浏览器
```

这样的话，当用户输入一段脚本，就会被浏览器直接执行（Chrome 对其进行了屏蔽，禁止执行 script 内容）

![image.png](https://i.loli.net/2019/10/09/gUN6KiRnmyex7MV.png)

![image.png](https://i.loli.net/2019/10/09/6xYrHGZMUs3FzIB.png)

## 3.2 转义内容

那么 Go 里面是怎么做这个有效防护的呢？Go 的 html/template 里面带有下面几个函数可以帮你转义

- func HTMLEscape (w io.Writer, b [] byte) // 把 b 进行转义之后写到 w
- func HTMLEscapeString (s string) string // 转义 s 之后返回结果字符串
- func HTMLEscaper (args ...interface {}) string // 支持多个参数一起转义，返回结果字符串

所以在输出内容前，我们可以对内容进行转义再输出：

```go
script := r.FormValue("script")
template.HTMLEscape(w, []byte(script))
// 或者
script := r.FormValue("script")
script = template.HTMLEscapeString(script)
_, _ = w.Write([]byte(script))
```

网页中显示的内容变为：

```
&lt;script&gt;alert(1)&lt;/script&gt;
```

## 3.3 输出正常字符

Go 的 html/template 包默认帮你过滤了 html 标签，但是有时候你只想要输出这个 `<script>alert()</script>` 看起来正常的信息，该怎么处理？请使用 text/template。请看下面的例子：

```go
import "text/template"
...
t, err := template.New("foo").Parse(`{{define "T"}}Hello, {{.}}!{{end}}`)
err = t.ExecuteTemplate(out, "T", "<script>alert('you have been pwned')</script>")
```

输出

```php
Hello, <script>alert('you have been pwned')</script>!
```

或者使用 template.HTML 类型

```go
import "html/template"
...
script := r.FormValue("script")
template.HTMLEscape(w, []byte(script)) // &lt;script&gt;alert(1)&lt;/script&gt;
_, _ = w.Write([]byte(template.HTML(script))) // <script>alert(1)</script>
```

转换成 `template.HTML` 后，变量的内容也不会被转义

转义的例子：

```go
import "html/template"
...
t, err := template.New("foo").Parse(`{{define "T"}}Hello, {{.}}!{{end}}`)
err = t.ExecuteTemplate(out, "T", "<script>alert('you have been pwned')</script>")
```

转义之后的输出：

```php
Hello, <script>alert('you have been pwned')</script>!
```

# 4. 表单的验证输入

开发 Web 的一个原则就是，不能信任用户输入的任何信息，所以验证和过滤用户的输入信息就变得非常重要，我们经常会在微博、新闻中听到某某网站被入侵了，存在什么漏洞，这些大多是因为网站对于用户输入的信息没有做严格的验证引起的，所以为了编写出安全可靠的 Web 程序，验证表单输入的意义重大。

我们平常编写 Web 应用主要有两方面的数据验证，一个是在页面端的 js 验证 (目前在这方面有很多的插件库，比如 ValidationJS 插件)，一个是在服务器端的验证，我们这小节讲解的是如何在服务器端验证。

[扩展阅读](https://learnku.com/docs/build-web-application-with-golang/042-validation-form-input/3176)

# 5. 防止多次提交

不知道你是否曾经看到过一个论坛或者博客，在一个帖子或者文章后面出现多条重复的记录，这些大多数是因为用户重复递交了留言的表单引起的。由于种种原因，用户经常会重复递交表单。通常这只是鼠标的误操作，如双击了递交按钮，也可能是为了编辑或者再次核对填写过的信息，点击了浏览器的后退按钮，然后又再次点击了递交按钮而不是浏览器的前进按钮。当然，也可能是故意的 —— 比如，在某项在线调查或者博彩活动中重复投票。那我们如何有效的防止用户多次递交相同的表单呢？

解决方案是在表单中添加一个带有唯一值的隐藏字段。在验证表单时，先检查带有该唯一值的表单是否已经递交过了。如果是，拒绝再次递交；如果不是，则处理表单进行逻辑处理。另外，如果是采用了 Ajax 模式递交表单的话，当表单递交后，通过 javascript 来禁用表单的递交按钮。

我继续拿 4.2 小节的例子优化：

```html
<input type="checkbox" name="interest" value="football">足球
<input type="checkbox" name="interest" value="basketball">篮球
<input type="checkbox" name="interest" value="tennis">网球    
用户名:<input type="text" name="username">
密码:<input type="password" name="password">
<input type="hidden" name="token" value="{{.}}">
<input type="submit" value="登陆">
```

我们在模版里面增加了一个隐藏字段 `token`，这个值我们通过 MD5 (时间戳) 来获取唯一值，然后我们把这个值存储到服务器端 (session 来控制，我们将在第六章讲解如何保存)，以方便表单提交时比对判定。

```go
func login(w http.ResponseWriter, r *http.Request) {
    fmt.Println("method:", r.Method) // 获取请求的方法
    if r.Method == "GET" {
        crutime := time.Now().Unix()
        h := md5.New()
        io.WriteString(h, strconv.FormatInt(crutime, 10))
        token := fmt.Sprintf("%x", h.Sum(nil))

        t, _ := template.ParseFiles("login.gtpl")
        t.Execute(w, token)
    } else {
        // 请求的是登陆数据，那么执行登陆的逻辑判断
        r.ParseForm()
        token := r.Form.Get("token")
        if token != "" {
            // 验证 token 的合法性
        } else {
            // 不存在 token 报错
        }
        fmt.Println("username length:", len(r.Form["username"][0]))
        fmt.Println("username:", template.HTMLEscapeString(r.Form.Get("username"))) // 输出到服务器端
        fmt.Println("password:", template.HTMLEscapeString(r.Form.Get("password")))
        template.HTMLEscape(w, []byte(r.Form.Get("username"))) // 输出到客户端
    }
}
```

![image.png](https://i.loli.net/2019/10/09/iXGIJKkTHr5CPpm.png)

图 4.4 增加 token 之后在客户端输出的源码信息

我们看到 token 已经有输出值，你可以不断的刷新，可以看到这个值在不断的变化。这样就保证了每次显示 form 表单的时候都是唯一的，用户递交的表单保持了唯一性。

我们的解决方案可以防止非恶意的攻击，并能使恶意用户暂时不知所措，然后，它却不能排除所有的欺骗性的动机，对此类情况还需要更复杂的工作。

# 6. 上传文件

上传文件主要三步处理：

1. 表单中增加 enctype="multipart/form-data"
2. 服务端调用 `r.ParseMultipartForm`, 把上传的文件存储在内存和临时文件中
3. 使用 `r.FormFile` 获取文件句柄，然后对文件进行存储等处理。

示例代码：[源码](./2.6_upload_files/main.go)

```go
func Upload(w http.ResponseWriter, r *http.Request) {
	fmt.Println("method:", r.Method)
	if r.Method == "GET" {
		// 渲染页面
	} else {
        // 控制文件大小
		_ = r.ParseMultipartForm(32 << 20) 
        // 获取文件对象、文件句柄
		file, handler, err := r.FormFile("uploadfile")
		if err != nil {
			fmt.Println(err)
			return
		}
		defer file.Close()
		_, _ = fmt.Fprintf(w, "%v", handler.Header)
        // 转存文件
		f, err := os.OpenFile("./test/"+handler.Filename, os.O_WRONLY|os.O_CREATE, 0666) 
		if err != nil {
			fmt.Println(err)
			return
		}
		defer f.Close()
		_, _ = io.Copy(f, file)
	}
}
```

文件 handler 是 multipart.FileHeader, 里面存储了如下结构信息

```go
type FileHeader struct {
    Filename string
    Header   textproto.MIMEHeader
    // contains filtered or unexported fields
}
```

将其打印后输出内同如下：

```
map[Content-Disposition:[form-data; name="uploadfile"; filename="file.pdf"] Content-Type:[application/pdf]]
```

