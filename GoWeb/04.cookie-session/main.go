package main

import (
	_cookie "GoWeb/04.cookie-session/4.1_cookie"
	_session "GoWeb/04.cookie-session/4.2_session"
	"net/http"
)

func main() {
	http.HandleFunc("/setCookie", _cookie.SetCookie)
	http.HandleFunc("/getCookie", _cookie.GetCookie)
	http.HandleFunc("/login", _session.Login)
	_ = http.ListenAndServe(":9090", nil)
}
