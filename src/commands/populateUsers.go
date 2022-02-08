package main

import (
	"amabassador/src/database"
	"amabassador/src/models"

	"github.com/bxcodec/faker/v3"
)

func mainProduct(){
	database.Connect()

	for i := 0; i < 30; i++ {
		ambassador := models.User{
			FirstName: faker.FirstName(),
			LastName: faker.LastName(),
			Email: faker.Email(),
			IsAmbassador: true,
		}

		ambassador.SetPassword("1234")

		database.DB.Create(&ambassador)
	}
}