package main

import (
	form_enter "GoWeb/02.form/2.1_form_enter"
	xss "GoWeb/02.form/2.2_xss"
	upload_files "GoWeb/02.form/2.6_upload_files"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", form_enter.SayHelloName) // 设置访问的路由
	http.HandleFunc("/login", form_enter.Login)   // 设置访问的路由
	http.HandleFunc("/xss", xss.Xss)
	http.HandleFunc("/upload", upload_files.Upload)
	err := http.ListenAndServe(":9090", nil) // 设置监听的端口
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
