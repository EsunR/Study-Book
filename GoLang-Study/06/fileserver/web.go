package main

import (
	"GoLang-Study/06/fileserver/filelist"
	"log"
	"net/http"
	_ "net/http/pprof"
	"os"
)

type appHandler func(writer http.ResponseWriter, request *http.Request) error

func errWrapper(handler appHandler) func(http.ResponseWriter, *http.Request) {
	return func(writer http.ResponseWriter, request *http.Request) {
		// 防止程序出现panic
		defer func() {
			if r := recover(); r != nil {
				log.Printf("Panic: %v", r)
				http.Error(
					writer,
					http.StatusText(http.StatusInternalServerError),
					http.StatusInternalServerError,
				)
			}
		}()

		err := handler(writer, request)

		if err != nil {
			log.Printf("warning: %s\n", err)

			if userErr, ok := err.(userErr); ok {
				http.Error(writer, userErr.Message(), http.StatusBadRequest)
			}

			code := http.StatusOK
			switch {
			case os.IsNotExist(err):
				code = http.StatusNotFound
			case os.IsPermission(err):
				code = http.StatusForbidden
			default:
				code = http.StatusInternalServerError
			}
			http.Error(writer, http.StatusText(code), code)
		}
	}
}

type userErr interface {
	error
	Message() string
}

func main() {
	// url可匹配根目录
	http.HandleFunc("/", errWrapper(filelist.HandleFileList))
	// 访问 http://localhost:8888/file/06/test.txt
	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		panic(err)
	}
}
