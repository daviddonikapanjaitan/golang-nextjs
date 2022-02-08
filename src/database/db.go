package database

import (
	"amabassador/src/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {  
	var err error

	DB, err = gorm.Open(mysql.Open("root:root@tcp(db:3306)/ambassador"), &gorm.Config{})

	if err != nil {
		panic("Could not connect with the databases!")
	}
}

func AutoMigrate() {
	DB.AutoMigrate(models.User{})
	DB.AutoMigrate(models.Product{})
	DB.AutoMigrate(models.Link{})
	DB.AutoMigrate(models.Order{})
	DB.AutoMigrate(models.OrderItem{})
}