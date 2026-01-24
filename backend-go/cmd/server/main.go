package main

import (
	"vaidyalink/config"
	"vaidyalink/middleware"
	"vaidyalink/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	config.ConnectDB()

	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	routes.RegisterRoutes(r)

	r.Run(":4000")
}
