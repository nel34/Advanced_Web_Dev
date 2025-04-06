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
    // Vérifier si un restaurant existe déjà avec le même nom et la même adresse
    const existingRestaurant = await Restaurants.findOne({
      name: req.body.name,
      address: req.body.address
    })

    // Si un restaurant existe déjà, renvoyer une erreur
    if (existingRestaurant) {
      return res.status(400).json({ message: 'Un restaurant avec ce nom et cette adresse existe déjà.' })
    }

    // Si non, créer le nouveau restaurant
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