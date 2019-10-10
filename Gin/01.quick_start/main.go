package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		result := "pong"
		c.JSON(200, gin.H{
			"message": result,
		})
	})
	_ = r.Run() // 监听并在 0.0.0.0:8080 上启动服务
}
