package doctor

import (
	"context"
	"time"

	"vaidyalink/config"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateDoctor(doctor *Doctor) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	doctor.CreatedAt = primitive.NewDateTimeFromTime(time.Now())
	_, err := config.DB.Collection("doctors").InsertOne(ctx, doctor)
	return err
}

func GetAllDoctors() ([]Doctor, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := config.DB.Collection("doctors").Find(ctx, bson.M{}, options.Find().SetSort(bson.M{"createdAt": -1}))
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var doctors []Doctor
	if err = cursor.All(ctx, &doctors); err != nil {
		return nil, err
	}

	return doctors, nil
}

func GetDoctorByID(id string) (*Doctor, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var doctor Doctor
	err = config.DB.Collection("doctors").FindOne(ctx, bson.M{"_id": objID}).Decode(&doctor)
	if err != nil {
		return nil, err
	}

	return &doctor, nil
}

func DeleteDoctor(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = config.DB.Collection("doctors").DeleteOne(ctx, bson.M{"_id": objID})
	return err
}

func CountDoctors() (int64, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	count, err := config.DB.Collection("doctors").CountDocuments(ctx, bson.M{})
	return count, err
}
