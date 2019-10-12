package _cookie

import (
	"fmt"
	"net/http"
	"time"
)

func SetCookie(w http.ResponseWriter, r *http.Request) {
	exp := time.Now()
	exp = exp.AddDate(1, 0, 1)
	cookie := http.Cookie{Name: "username", Value: "EsunR", Expires: exp}
	http.SetCookie(w, &cookie)
	fmt.Fprintln(w, "cookie set as:")
	fmt.Fprintln(w, "username:", cookie.Name)
	fmt.Fprintln(w, "value:", cookie.Value)
	fmt.Fprintln(w, "expires:", cookie.Expires)
}




