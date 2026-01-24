package routes

import (
	"vaidyalink/internal/admin"
	"vaidyalink/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	adminGroup := r.Group("/api/admin")
	{
		adminGroup.POST("/login", admin.LoginHandler)
		adminGroup.GET("/dashboard", middleware.AdminAuth(), admin.DashboardHandler)
	}
}
