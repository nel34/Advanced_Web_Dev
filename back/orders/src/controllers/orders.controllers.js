const Order = require('../models/orders.models')

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ order_id: req.params.id })
    if (!order) {return res.status(404).json({ message: 'Order not found' })}
    res.status(200).json(order)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body).save()
    res.status(201).json(newOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { order_id: req.params.id },
      req.body,
      { new: true }
    )
    if (!updatedOrder) {return res.status(404).json({ message: 'Order not found' })}
    res.status(200).json(updatedOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ order_id: req.params.id })
    if (!order) {return res.status(404).json({ message: 'Order not found' })}
    res.status(200).json({ message: 'Order deleted' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.params.idUser })
    if (!orders.length) {return res.status(404).json({ message: 'No orders found' })}
    res.status(200).json(orders)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}