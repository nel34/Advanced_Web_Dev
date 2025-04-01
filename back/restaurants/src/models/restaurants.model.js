const mongoose = require('mongoose')

const Restaurants = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }
})

module.exports = mongoose.model('Restaurants', Restaurants)