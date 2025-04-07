const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  quantity: { type: Number, required: true }
})

const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  restaurant_id: { type: String, required: true },
  user_id: { type: String, required: true },
  delivery_person_id: { type: String, required: true },
  status: {
    type: String,
    enum: [
      'Pending_Restaurateur',
      'In_Progress',
      'Pending_Delivery',
      'In_Delivery',
      'Delivered',
      'Cancelled'
    ],
    default: 'Pending_Restaurateur',
    required: true
  },
  estimated_time: { type: Date },
  delivery_person_name: { type: String },
  menu_name: { type: String, required: true },
  menu_price: { type: Number, required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('Orders', OrderSchema)
