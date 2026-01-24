package main

import (
	"vaidyalink/config"
	"vaidyalink/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	config.ConnectDB()

	r := gin.Default()
	routes.RegisterRoutes(r)

	r.Run(":4000")
}
