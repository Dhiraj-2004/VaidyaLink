package doctor

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddDoctorHandler(c *gin.Context) {
	var doctor Doctor

	// Get form values
	doctor.Name = c.PostForm("name")
	doctor.Email = c.PostForm("email")
	doctor.Password = c.PostForm("password")
	doctor.Speciality = c.PostForm("speciality")
	doctor.Experience = c.PostForm("experience")
	doctor.Education = c.PostForm("education")
	doctor.Address1 = c.PostForm("address1")
	doctor.Address2 = c.PostForm("address2")
	doctor.Longitude = c.PostForm("longitude")
	doctor.Latitude = c.PostForm("latitude")
	doctor.About = c.PostForm("about")

	// Handle fees conversion
	if feesStr := c.PostForm("fees"); feesStr != "" {
		var fees int
		if _, err := fmt.Sscanf(feesStr, "%d", &fees); err == nil {
			doctor.Fees = fees
		}
	}

	// Handle image upload
	file, err := c.FormFile("image")
	if err == nil {
		// Generate unique filename
		filename := primitive.NewObjectID().Hex() + filepath.Ext(file.Filename)
		uploadPath := "./uploads/doctors/" + filename
		
		// Create directory if it doesn't exist
		if err := os.MkdirAll("./uploads/doctors", os.ModePerm); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Failed to create upload directory"})
			return
		}
		
		if err := c.SaveUploadedFile(file, uploadPath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Failed to upload image"})
			return
		}
		doctor.Image = uploadPath
	}

	if err := AddDoctor(&doctor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Doctor added successfully"})
}

func GetAllDoctorsHandler(c *gin.Context) {
	doctors, err := GetAllDoctors()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Failed to fetch doctors"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "doctors": doctors})
}

func DeleteDoctorHandler(c *gin.Context) {
	id := c.Param("id")
	
	if err := DeleteDoctor(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Failed to delete doctor"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Doctor deleted successfully"})
}

func LoginHandler(c *gin.Context) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Invalid input"})
		return
	}

	token, err := Login(body.Email, body.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"success": false, "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "token": token, "message": "Login successful"})
}
