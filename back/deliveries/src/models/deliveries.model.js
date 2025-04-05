const mongoose = require('mongoose')

const Deliveries = new mongoose.Schema({
  order_id: { type: String, required: true },
  restaurant_id: { type: String, required: true },
  delivery_person_id: { type: String, required: true },
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'finished', 'refused'],
    default: 'in_progress',
    required: true
  },
  estimated_time: { type: Date },
  delivery_person_name: { type: String },
  menu_name: { type: String, required: true },
  menu_price: { type: Number, required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('Deliveries', Deliveries)
