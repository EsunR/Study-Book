package main

import "fmt"

type mockData struct {
	content string
}

type Handle interface {
	ServeHTTP(mockData)
}

type HandleFunc func(mockData)

func (f HandleFunc) ServeHTTP(data mockData) {
	f(data)
}

func router(f Handle) {
	data := mockData{content: "mock data"}
	f.ServeHTTP(data)
}

func main() {
	router(HandleFunc(carry))
}

func carry(data mockData) {
	fmt.Println(data.content)
}
