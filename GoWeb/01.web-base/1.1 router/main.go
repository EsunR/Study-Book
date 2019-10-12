package main

import (
	"fmt"
	"net/http"
)

type MyMux struct {
}

func (p *MyMux) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		sayhelloName(w, r)
		return
	}
	http.NotFound(w, r)
	return
}

func sayhelloName(w http.ResponseWriter, r *http.Request) {
	_, _ = fmt.Fprintf(w, "Hello myroute!")
}

func main() {
	mux := &MyMux{}
	_ = http.ListenAndServe(":9090", mux)
}
