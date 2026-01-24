package admin

import (
	"errors"
	"os"
	"time"

	"vaidyalink/internal/appointment"
	"vaidyalink/internal/doctor"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func Login(email, password string) (string, error) {
	admin, err := FindAdminByEmail(email)
	if err != nil {
		return "", errors.New("invalid credentials")
	}

	if bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(password)) != nil {
		return "", errors.New("invalid credentials")
	}

	claims := jwt.MapClaims{
		"id":   admin.ID.Hex(),
		"role": "admin",
		"exp":  time.Now().Add(24 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

func GetDashboardStats() (map[string]interface{}, error) {
	totalDoctors, err := doctor.CountDoctors()
	if err != nil {
		return nil, err
	}

	totalAppointments, err := appointment.CountAppointments()
	if err != nil {
		return nil, err
	}

	pendingAppointments, err := appointment.CountAppointmentsByStatus("pending")
	if err != nil {
		return nil, err
	}

	confirmedAppointments, err := appointment.CountAppointmentsByStatus("confirmed")
	if err != nil {
		return nil, err
	}

	return map[string]interface{}{
		"totalDoctors":         totalDoctors,
		"totalAppointments":    totalAppointments,
		"pendingAppointments": pendingAppointments,
		"confirmedAppointments": confirmedAppointments,
	}, nil
}
