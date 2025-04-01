const mongoose = require('mongoose')

const Products = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  restaurantId: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  categories: { type: [String], required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('Products', Products)