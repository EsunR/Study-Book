package filelist

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)

type userError string

func (e userError) Error() string {
	return e.Message()
}

func (e userError) Message() string {
	return string(e)
}

const prefix = "/file/"

func HandleFileList(writer http.ResponseWriter,
	request *http.Request) error {
	if strings.Index(request.URL.Path, prefix) != 0 {
		return userError("path must start with '" + prefix + "'")
	}
	path := request.URL.Path[len(prefix):] // 去掉url匹配的 "/file/"
	fmt.Println("open file path:", path)
	file, err := os.Open(path) // 打开文件路径
	if err != nil {
		//http.Error(writer, err.Error(), http.StatusInternalServerError)
		return err
	}
	defer file.Close()
	all, err := ioutil.ReadAll(file)
	if err != nil {
		return err
	}
	_, _ = writer.Write(all) // 返回响应
	return nil
}
