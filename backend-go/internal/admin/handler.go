package admin

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoginHandler(c *gin.Context) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"msg": "Invalid input"})
		return
	}

	token, err := Login(body.Email, body.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"msg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}

func DashboardHandler(c *gin.Context) {
	c.JSON(200, gin.H{
		"msg": "Welcome Admin",
	})
}

