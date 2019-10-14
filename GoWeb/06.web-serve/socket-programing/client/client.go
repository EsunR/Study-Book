package main

import (
	"fmt"
	"io/ioutil"
	"net"
	"os"
	"strconv"
)

func checkError(err error) {
	if err != nil {
		_, _ = fmt.Fprintf(os.Stderr, "Fatal error: %s", err.Error())
		os.Exit(1)
	}
}

func main() {
	service := "localhost:9090"
	// 由 ip 地址字符串创建个 IP 对象
	tcpAddr, err := net.ResolveTCPAddr("tcp4", service)
	checkError(err)
	// 建立连接
	conn, err := net.DialTCP("tcp", nil, tcpAddr)
	checkError(err)
	defer conn.Close()
	for i := 0; i < 10; i++ {
		_, err = conn.Write([]byte("HEAD / HTTP/1.0" +
			" - " + strconv.Itoa(i) + "\n"))
	}
	//conn.Write([]byte("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
	//	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"))
	_ = conn.CloseWrite()
	checkError(err)
	result, err := ioutil.ReadAll(conn)
	checkError(err)
	fmt.Println(string(result))
	os.Exit(0)
}
