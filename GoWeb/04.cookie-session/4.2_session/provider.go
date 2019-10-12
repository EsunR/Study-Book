package _session

// Provider 是一个提供者，这里之所以将提供者设置为接口是因为提供者既可以是系统缓存，也可以是 Redis 等数据库
// 创建为一个接口的好处是方便我们可以实现不同的 Provider
type Provider interface {
	SessionInit(sid string) (Session, error)
	SessionRead(sid string) (Session, error)
	SessionDestroy(sid string) error
	SessionGC(maxLifeTime int64)
}

var provides = make(map[string]Provider)

func Register(name string, provider Provider) {
	if provider == nil {
		panic("session: Register provider is nil")
	}
	if _, dup := provides[name]; dup {
		panic("session: Register called twice for provider " + name)
	}
	provides[name] = provider
}

