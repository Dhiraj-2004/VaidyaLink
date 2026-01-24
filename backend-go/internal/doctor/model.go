package doctor

import "go.mongodb.org/mongo-driver/bson/primitive"

type Doctor struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name        string             `bson:"name" json:"name"`
	Email       string             `bson:"email" json:"email"`
	Password    string             `bson:"password" json:"-"`
	Speciality  string             `bson:"speciality" json:"speciality"`
	Experience  string             `bson:"experience" json:"experience"`
	Education   string             `bson:"education" json:"education"`
	Fees        int                `bson:"fees" json:"fees"`
	Address1    string             `bson:"address1" json:"address1"`
	Address2    string             `bson:"address2" json:"address2"`
	Longitude   string             `bson:"longitude" json:"longitude"`
	Latitude    string             `bson:"latitude" json:"latitude"`
	About       string             `bson:"about" json:"about"`
	Image       string             `bson:"image" json:"image"`
	CreatedAt   primitive.DateTime `bson:"createdAt" json:"createdAt"`
}
