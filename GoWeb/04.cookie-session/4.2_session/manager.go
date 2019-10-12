package _session

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"net/http"
	"net/url"
	"sync"
)

type Manager struct {
	cookieName  string     // private cookie name
	lock        sync.Mutex // protects session
	provider    Provider
	maxLifeTime int64
}

// 创建一个 session 对象
func NewManager(provideName, cookieName string, maxLifeTime int64) (*Manager, error) {
	provider, ok := provides[provideName]
	if !ok {
		return nil, fmt.Errorf("session: unknown provide %q (forgotten import?)", provideName)
	}
	return &Manager{provider: provider, cookieName: cookieName, maxLifeTime: maxLifeTime}, nil
}

// 创建一条 session ID
// Session ID 是用来识别访问 Web 应用的每一个用户，因此必须保证它是全局唯一的（GUID）
func (manager *Manager) sessionId() string {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return ""
	}
	return base64.URLEncoding.EncodeToString(b)
}

// session 创建
// 我们需要为每个来访用户分配或获取与他相关连的 Session，以便后面根据 Session 信息来验证操作。
// SessionStart 这个函数就是用来检测是否已经有某个 Session 与当前来访用户发生了关联，如果没有则创建之。
func (manager *Manager) SessionStart(w http.ResponseWriter, r *http.Request) (session Session) {
	manager.lock.Lock()
	defer manager.lock.Unlock()
	cookie, err := r.Cookie(manager.cookieName) // 读取请求中携带的 Cookie
	if err != nil || cookie.Value == "" {
		// 如果 cookie 没有记录或者为空，就创建一条 cookie，用以记录 session ID
		sid := manager.sessionId()
		session, _ = manager.provider.SessionInit(sid)
		cookie := http.Cookie{Name: manager.cookieName, Value: url.QueryEscape(sid), Path: "/", HttpOnly: true, MaxAge: int(manager.maxLifeTime)}
		http.SetCookie(w, &cookie)
	} else {
		// 如果有就读取 session 对象
		sid, _ := url.QueryUnescape(cookie.Value)
		session, _ = manager.provider.SessionRead(sid)
	}
	return
}
