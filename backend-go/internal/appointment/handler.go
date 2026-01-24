package appointment

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllAppointmentsHandler(c *gin.Context) {
	appointments, err := GetAllAppointments()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Failed to fetch appointments"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "appointments": appointments})
}

func UpdateAppointmentStatusHandler(c *gin.Context) {
	id := c.Param("id")
	
	var body struct {
		Status string `json:"status"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid input"})
		return
	}

	if err := UpdateAppointmentStatus(id, body.Status); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Failed to update appointment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Appointment status updated successfully"})
}
