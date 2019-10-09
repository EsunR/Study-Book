package form_enter

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"strings"
)

func SayHelloName(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.URL.Query())
	for k, v := range r.URL.Query() {
		fmt.Println("key:", k)
		fmt.Println("val:", strings.Join(v, ""))
	}
	_, _ = fmt.Fprintf(w, "Hello astaxie!") // 这个写入到 w 的是输出到客户端的
}

func Login(w http.ResponseWriter, r *http.Request) {
	fmt.Println("method:", r.Method) // 获取请求的方法
	if r.Method == "GET" {
		t, _ := template.ParseFiles("./02.form/2.1_form_enter/login.gtpl")
		_ = t.Execute(w, nil)
	} else {
		err := r.ParseForm() // 解析 url 传递的参数，对于 POST 则解析响应包的主体（request body）
		if err != nil {
			// handle error http.Error() for example
			log.Fatal("ParseForm: ", err)
		}
		// 请求的是登录数据，那么执行登录的逻辑判断
		fmt.Println("r.PostForm", r.PostForm)
		fmt.Println("r.Url.Query():", r.URL.Query())
		fmt.Println("r.Form:", r.Form)

		fmt.Println("username:", r.Form["username"])
		fmt.Println("password:", r.Form["password"])
	}
}
