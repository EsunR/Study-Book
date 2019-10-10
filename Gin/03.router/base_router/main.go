package main

import "github.com/gin-gonic/gin"

func getting(c *gin.Context) {
	w := c.Writer
	_, _ = w.Write([]byte("hello"))
}

func main() {
	// 创建带有默认中间件的路由:
	// 日志与恢复中间件
	router := gin.Default()
	//创建不带中间件的路由：
	//r := gin.New()

	router.GET("/someGet", getting)
	//router.POST("/somePost", posting)
	//router.PUT("/somePut", putting)
	//router.DELETE("/someDelete", deleting)
	//router.PATCH("/somePatch", patching)
	//router.HEAD("/someHead", head)
	//router.OPTIONS("/someOptions", options)
	_ = router.Run()
}
