package controllers

import (
	"amabassador/src/database"
	"amabassador/src/middlewares"
	"amabassador/src/models"
	"strconv"

	"github.com/bxcodec/faker/v3"
	"github.com/gofiber/fiber/v2"
)

func Link(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var links []models.Link

	database.DB.Preload("Products").Where("user_id = ?", id).Find(&links)

	for i, link := range links {
		var orders []models.Order

		database.DB.Preload("OrderItems").Where("code = ? and complete = true", link.Code).Find(&orders)

		for i, order := range orders {
			orders[i].Name = order.FullName()
			orders[i].Total = order.GetTotal()
		}

		links[i].Orders = orders
	}

	return c.JSON(links)
}

type CreateLinkRequest struct {
	Products []int
}

func CreateLink(c *fiber.Ctx) error {
	var request CreateLinkRequest

	if err := c.BodyParser(&request); err != nil {
		return err
	}

	id, _ := middlewares.GetUserId(c)

	link := models.Link{
		UserId: id,
		Code:   faker.Username(),
	}

	for _, productId := range request.Products {
		product := models.Product{}
		product.Id = uint(productId)
		link.Products = append(link.Products, product)
	}

	database.DB.Create(&link)

	return c.JSON(link)
}

func Stats(c *fiber.Ctx) error {
	id, _ := middlewares.GetUserId(c)

	var links []models.Link

	database.DB.Find(&links, models.Link{
		UserId: id,
	})

	var result []interface{}

	var orders []models.Order

	for _, link := range links {
		database.DB.Preload("OrderItems").Find(&orders, &models.Order{
			Code:     link.Code,
			Complete: true,
		})

		revenue := 0.0

		for _, order := range orders {
			revenue += order.GetTotal()
		}

		result = append(result, fiber.Map{
			"code":    link.Code,
			"count":   len(orders),
			"revenue": revenue,
		})
	}

	return c.JSON(result)
}

func GetLink(c *fiber.Ctx) error {
	code := c.Params("code")

	link := models.Link{
	}		

	// database.DB.Preload("User").Preload("Products").First(&link)
	database.DB.Preload("User").Preload("Products").First(&link, &models.Link{
		Code: code,
	})

	return c.JSON(link)
}