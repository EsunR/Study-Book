package xss

import (
	"fmt"
	"html/template"
	"net/http"
)

func Xss(w http.ResponseWriter, r *http.Request) {
	fmt.Println("method:", r.Method) // 获取请求的方法
	if r.Method == "GET" {
		t, _ := template.ParseFiles("./02.form/2.2_xss/xss.html")
		_ = t.Execute(w, nil)
	} else {
		script := r.FormValue("script")
		template.HTMLEscape(w, []byte(script))
		_, _ = w.Write([]byte(template.HTML(script)))
	}
}
