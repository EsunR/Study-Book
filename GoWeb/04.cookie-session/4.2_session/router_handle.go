package _session

import (
	"fmt"
	"html/template"
	"net/http"
)

var globalSessions *Manager

func init() {
	// 创建一个 session 提供者 memory，具体实现参考 memory.go
	globalSessions, _ = NewManager("memory", "gosessionid", 3600)
}

func Login(w http.ResponseWriter, r *http.Request) {
	sess := globalSessions.SessionStart(w, r)
	r.ParseForm()
	if r.Method == "GET" {
		t, err := template.ParseFiles("./template/login.html")
		if err != nil {
			fmt.Println("err:", err)
		}
		w.Header().Set("Content-Type", "text/html")
		username := sess.Get("username")
		t.Execute(w, username)
	} else {
		sess.Set("username", r.Form["username"])
		http.Redirect(w, r, "/", 302)
	}
}
