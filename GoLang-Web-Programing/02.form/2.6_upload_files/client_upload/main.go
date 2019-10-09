package main

import (
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
	"strings"
)

func postFile(filename string, targetUrl string) error {
	// 创建一个 Buffer 对象 bodyBuf 并为其生成一个 multipart Writer 准备写入 body 信息
	bodyBuf := &bytes.Buffer{}
	bodyWriter := multipart.NewWriter(bodyBuf)

	// 创建一个 Form File 写入 bodyBuf，将其表单的 fieldname 设置为 "uploadfile"，并记录文件名（此时相当于仅仅拷贝了文件的信息）
	filePath := strings.Split(filename, "/")
	fileWriter, err := bodyWriter.CreateFormFile("uploadfile", filePath[len(filePath)-1])
	if err != nil {
		fmt.Println("error writing to buffer")
		return err
	}

	// 打开文件句柄操作
	file, err := os.Open(filename)
	if err != nil {
		fmt.Println("error opening file")
		return err
	}
	defer file.Close()

	// iocopy，将目标文件内容转存入创建的 fileWriter 中
	_, err = io.Copy(fileWriter, file)
	if err != nil {
		return err
	}

	// 将 body 的 Content Type 设置为 multipart/form-data
	contentType := bodyWriter.FormDataContentType()
	_ = bodyWriter.Close()

	// 创建一个请求，填写目标url、ContentType信息、将创建的 bodyBuf 传入该请求的 Body 中
	resp, err := http.Post(targetUrl, contentType, bodyBuf)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	resp_body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	fmt.Println(resp.Status)
	fmt.Println(string(resp_body))
	return nil
}

// sample usage
func main() {
	target_url := "http://localhost:9090/upload"
	filename := "static/test.txt"
	_ = postFile(filename, target_url)
}
