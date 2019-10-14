package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
)

func checkError(err error) {
	if err != nil {
		_, _ = fmt.Fprintf(os.Stderr, "Fatal error: %s", err.Error())
		os.Exit(1)
	}
}

func handleClient(conn net.Conn) {
	defer conn.Close()

	reader := bufio.NewReader(conn)
	var buf [1000]byte
	n, err := reader.Read(buf[:])
	if err != nil {
		fmt.Println("read from client failed, err:", err)
	}
	recvStr := string(buf[:n])
	fmt.Println("收到client端发来的数据：\n", recvStr)

	conn.Write([]byte("I'm ok")) // 发送数据
}

func handleClientLong(conn net.Conn) {
	defer conn.Close()
	for {
		reader := bufio.NewReader(conn)
		var buf [1000]byte
		n, err := reader.Read(buf[:]) // 读取数据
		if err != nil {
			fmt.Println("read from client failed, err:", err)
			break
		}
		recvStr := string(buf[:n])
		fmt.Println("收到client端发来的数据:\n", recvStr)
		conn.Write([]byte("ok")) // 发送数据
	}
}

func main() {
	service := "localhost:9090"
	tcpAddr, err := net.ResolveTCPAddr("tcp4", service)
	checkError(err)
	listener, err := net.ListenTCP("tcp", tcpAddr)
	checkError(err)
	//listener, err := net.Listen("tcp", service)
	checkError(err)
	fmt.Println("serve start at:", service)
	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("connect err:", err)
			continue
		}
		go handleClientLong(conn)
	}
}
