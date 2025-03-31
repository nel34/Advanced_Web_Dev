const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
  order_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  restaurant_id: { type: String, required: true },
  items: [itemSchema],
  status: { 
    type: String, 
    enum: ['pending', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  total_price: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);