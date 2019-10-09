package upload_files

import (
	"crypto/md5"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"os"
	"strconv"
	"time"
)

// 处理 /upload  逻辑
func Upload(w http.ResponseWriter, r *http.Request) {
	fmt.Println("method:", r.Method) // 获取请求的方法
	if r.Method == "GET" {
		crutime := time.Now().Unix()
		h := md5.New()
		_, _ = io.WriteString(h, strconv.FormatInt(crutime, 10))
		token := fmt.Sprintf("%x", h.Sum(nil))

		t, _ := template.ParseFiles("./02.form/2.6_upload_files/upload.html")
		_ = t.Execute(w, token)
	} else {
		_ = r.ParseMultipartForm(32 << 20) // 控制文件大小
		file, handler, err := r.FormFile("uploadfile")
		if err != nil {
			fmt.Println(err)
			return
		}
		defer file.Close()
		_, _ = fmt.Fprintf(w, "%v", handler.Header)
		f, err := os.OpenFile("upload/"+handler.Filename, os.O_WRONLY|os.O_CREATE, 0666) // 此处假设当前目录下已存在test目录
		if err != nil {
			fmt.Println(err)
			return
		}
		defer f.Close()
		_, _ = io.Copy(f, file)
	}
}
