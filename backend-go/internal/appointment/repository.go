package appointment

import (
	"context"
	"time"

	"vaidyalink/config"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetAllAppointments() ([]Appointment, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := config.DB.Collection("appointments").Find(ctx, bson.M{}, options.Find().SetSort(bson.M{"createdAt": -1}))
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var appointments []Appointment
	if err = cursor.All(ctx, &appointments); err != nil {
		return nil, err
	}

	return appointments, nil
}

func UpdateAppointmentStatus(id string, status string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = config.DB.Collection("appointments").UpdateOne(
		ctx,
		bson.M{"_id": objID},
		bson.M{"$set": bson.M{"status": status}},
	)

	return err
}

func CountAppointments() (int64, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	count, err := config.DB.Collection("appointments").CountDocuments(ctx, bson.M{})
	return count, err
}

func CountAppointmentsByStatus(status string) (int64, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	count, err := config.DB.Collection("appointments").CountDocuments(ctx, bson.M{"status": status})
	return count, err
}
