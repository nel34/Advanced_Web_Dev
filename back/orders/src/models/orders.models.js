const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  restaurant_id: { type: String, required: true },
  user_id: { type: String, required: true },
  username: { type: String, required: true },
  delivery_person_id: { type: String, required: false, default: null },
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
    required: false
  },
  delivery_person_name: { type: String, required: false, default: null },
  menu: [{ type: String, required: true }],
  total: { type: Number, required: true },
  location: { type: String, required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('Orders', OrderSchema)