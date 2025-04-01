const express = require('express')
const router = express.Router()
const {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  getAllMenusByRestaurantId
} = require('../controllers/menus.controllers')

/**
 * @api {get} / Get all menus
 * @apiName GetAllMenus
 * @apiGroup Menus
 * @apiSuccess {Object[]} menus List of all menus
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [{
 *    "_id": "65a1b2c3d4e5f67890gh123",
 *    "name": "Classic Menu",
 *    "description": "Traditional dishes selection",
 *    "id_products": ["prod_123", "prod_456"],
 *    "restaurantId": "rest_789",
 *    "price": 29.90,
 *    "image": "menu.jpg"
 *  }]
 */
router.get('/', getAllMenus)

/**
 * @api {get} /:id Get menu by ID
 * @apiName GetMenuById
 * @apiGroup Menus
 * @apiParam {String} id Menu's unique ID
 * @apiSuccess {Object} menu Menu details
 * @apiError {Object} 404 Menu not found
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "_id": "65a1b2c3d4e5f67890gh123",
 *    "name": "Vegetarian Menu",
 *    "description": "Plant-based options",
 *    "id_products": ["prod_789", "prod_012"],
 *    "restaurantId": "rest_345",
 *    "price": 34.90,
 *    "image": "vegetarian.jpg"
 *  }
 */
router.get('/:id', getMenuById)

/**
 * @api {post} / Create new menu
 * @apiName CreateMenu
 * @apiGroup Menus
 * @apiBody {String} name Menu name (required)
 * @apiBody {String} [description] Menu description
 * @apiBody {String[]} id_products Array of product IDs (required)
 * @apiBody {String} restaurantId Restaurant ID (required)
 * @apiBody {Number} price Price (required)
 * @apiBody {String} image Image URL (required)
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 201 Created
 *  {
 *    "_id": "65a1b2c3d4e5f67890gh124",
 *    "name": "Seasonal Menu",
 *    "restaurantId": "rest_678",
 *    "price": 39.90,
 *    "image": "seasonal.jpg"
 *  }
 */
router.post('/', createMenu)

/**
 * @api {put} /:id Update menu
 * @apiName UpdateMenu
 * @apiGroup Menus
 * @apiParam {String} id Menu ID
 * @apiBody {Object} updates Fields to update
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "_id": "65a1b2c3d4e5f67890gh123",
 *    "name": "Updated Menu",
 *    "price": 44.90
 *  }
 */
router.put('/:id', updateMenu)

/**
 * @api {delete} /:id Delete menu
 * @apiName DeleteMenu
 * @apiGroup Menus
 * @apiParam {String} id Menu ID
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  { "message": "Menu deleted successfully" }
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 404 Not Found
 *  { "error": "Menu not found" }
 */
router.delete('/:id', deleteMenu)

/**
 * @api {get} /restaurants/:restaurantId Get menus by restaurant
 * @apiName GetMenusByRestaurant
 * @apiGroup Menus
 * @apiParam {String} restaurantId Restaurant ID
 * @apiSuccess {Object[]} menus Restaurant's menus
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [{
 *    "_id": "65a1b2c3d4e5f67890gh125",
 *    "name": "Kids Menu",
 *    "restaurantId": "rest_901",
 *    "price": 19.90
 *  }]
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 404 Not Found
 *  { "error": "No menus found for this restaurant" }
 */
router.get('/restaurants/:restaurantId', getAllMenusByRestaurantId)

module.exports = router