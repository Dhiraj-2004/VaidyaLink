package doctor

import (
	"context"
	"errors"
	"os"
	"time"

	"vaidyalink/config"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func AddDoctor(doctor *Doctor) error {
	// Check if email already exists
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var existing Doctor
	err := config.DB.Collection("doctors").FindOne(ctx, bson.M{"email": doctor.Email}).Decode(&existing)
	if err == nil {
		return errors.New("email already exists")
	}
	if err != mongo.ErrNoDocuments {
		return err
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(doctor.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	doctor.Password = string(hashedPassword)

	return CreateDoctor(doctor)
}

func Login(email, password string) (string, error) {
	doctor, err := FindDoctorByEmail(email)
	if err != nil {
		return "", errors.New("invalid credentials")
	}

	if bcrypt.CompareHashAndPassword([]byte(doctor.Password), []byte(password)) != nil {
		return "", errors.New("invalid credentials")
	}

	claims := jwt.MapClaims{
		"id":   doctor.ID.Hex(),
		"role": "doctor",
		"exp":  time.Now().Add(24 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

func FindDoctorByEmail(email string) (*Doctor, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var doctor Doctor
	err := config.DB.Collection("doctors").FindOne(ctx, bson.M{"email": email}).Decode(&doctor)

	return &doctor, err
}
