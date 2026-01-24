package admin

import (
	"context"
	"time"

	"vaidyalink/config"

	"go.mongodb.org/mongo-driver/bson"
)

func FindAdminByEmail(email string) (*Admin, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var admin Admin
	err := config.DB.Collection("admins").FindOne(ctx, bson.M{"email": email}).Decode(&admin)

	return &admin, err
}
