package appointment

import "go.mongodb.org/mongo-driver/bson/primitive"

type Appointment struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	PatientName string             `bson:"patientName" json:"patientName"`
	PatientEmail string             `bson:"patientEmail" json:"patientEmail"`
	PatientPhone string             `bson:"patientPhone" json:"patientPhone"`
	DoctorID    primitive.ObjectID `bson:"doctorId" json:"doctorId"`
	DoctorName  string             `bson:"doctorName" json:"doctorName"`
	Date        string             `bson:"date" json:"date"`
	Time        string             `bson:"time" json:"time"`
	Status      string             `bson:"status" json:"status"` // pending, confirmed, cancelled, completed
	Reason      string             `bson:"reason" json:"reason"`
	CreatedAt   primitive.DateTime `bson:"createdAt" json:"createdAt"`
}
