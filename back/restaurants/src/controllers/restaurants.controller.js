const Restaurants = require('../models/restaurants.model')

exports.getAllRestaurants = async (req, res) => {
  try {
    const allRestaurants = await Restaurants.find()
    res.status(200).json(allRestaurants)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurants.findById(req.params.id)
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' })
    }
    res.status(200).json(restaurant)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.createRestaurant = async (req, res) => {
  try {
    const newRestaurant = await Restaurants(req.body).save()
    res.status(201).json(newRestaurant)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurants.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' })
    }
    res.status(200).json(updatedRestaurant)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurants.findByIdAndDelete(req.params.id)
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' })
    }
    res.status(200).json({ message: 'Restaurant deleted' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}