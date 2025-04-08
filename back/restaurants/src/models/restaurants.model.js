const mongoose = require('mongoose')

const Restaurants = new mongoose.Schema({
  owner_id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  opening_hours: { type: Object, required: true },
  idOwner: { type: String, required: true }
})

module.exports = mongoose.model('Restaurants', Restaurants)