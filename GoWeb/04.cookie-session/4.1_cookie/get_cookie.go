package _cookie

import (
	"fmt"
	"net/http"
)

func GetCookie(w http.ResponseWriter, r *http.Request) {
	cookie, _ := r.Cookie("username")
	fmt.Fprintln(w, cookie.Value)
}
