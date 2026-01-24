package routes

import (
	"vaidyalink/internal/admin"
	"vaidyalink/internal/appointment"
	"vaidyalink/internal/doctor"
	"vaidyalink/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	adminGroup := r.Group("/api/admin")
	{
		adminGroup.POST("/login", admin.LoginHandler)
		adminGroup.GET("/dashboard", middleware.AdminAuth(), admin.DashboardHandler)
		adminGroup.POST("/doctors", middleware.AdminAuth(), doctor.AddDoctorHandler)
		adminGroup.GET("/doctors", middleware.AdminAuth(), doctor.GetAllDoctorsHandler)
		adminGroup.DELETE("/doctors/:id", middleware.AdminAuth(), doctor.DeleteDoctorHandler)
		adminGroup.GET("/appointments", middleware.AdminAuth(), appointment.GetAllAppointmentsHandler)
		adminGroup.PATCH("/appointments/:id/status", middleware.AdminAuth(), appointment.UpdateAppointmentStatusHandler)
	}

	doctorGroup := r.Group("/api/doctor")
	{
		doctorGroup.POST("/login", doctor.LoginHandler)
	}
}
