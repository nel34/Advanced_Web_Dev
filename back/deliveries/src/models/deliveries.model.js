const mongoose = require('mongoose')

const deliverySchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  delivery_person_id: { type: String, required: true },
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'failed'],
    default: 'in_progress'
  },
  estimated_time: { type: Date },
  delivery_person_name: { type: String }
}, {
  timestamps: true
})

module.exports = mongoose.model('Delivery', deliverySchema)
