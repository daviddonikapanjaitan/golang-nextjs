package main

import (
	"amabassador/src/database"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"amabassador/src/routes"
)
 
func main() {   
    database.Connect(); 
    database.AutoMigrate();
    database.SetupRedis();
    database.SetupCacheChannel()
 
    app := fiber.New()

    app.Use(cors.New(cors.Config{
        AllowCredentials: true,
    }))

    routes.Setup(app)

    app.Listen(":8000")
}