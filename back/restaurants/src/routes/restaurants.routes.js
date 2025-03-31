const express = require('express')
const router = express.Router()
const { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant } = require('../controllers/restaurants.controller')

router.get('/', getAllRestaurants)
router.get('/:id', getRestaurantById)
router.post('/', createRestaurant)
router.put('/:id', updateRestaurant)
router.delete('/:id', deleteRestaurant)

module.exports = router