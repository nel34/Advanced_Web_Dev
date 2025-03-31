const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserId
} = require('../controllers/orders.controllers');

/**
 * @api {get} / Get all orders
 * @apiName GetAllOrders
 * @apiGroup Orders
 */
router.get('/', getAllOrders);

/**
 * @api {get} /:id Get order by ID
 * @apiName GetOrderById
 * @apiGroup Orders
 */
router.get('/:id', getOrderById);

/**
 * @api {post} / Create new order
 * @apiName CreateOrder
 * @apiGroup Orders
 */
router.post('/', createOrder);

/**
 * @api {put} /:id Update order
 * @apiName UpdateOrder
 * @apiGroup Orders
 */
router.put('/:id', updateOrder);

/**
 * @api {delete} /:id Delete order
 * @apiName DeleteOrder
 * @apiGroup Orders
 */
router.delete('/:id', deleteOrder);

/**
 * @api {get} /users/:idUser Get user orders
 * @apiName GetUserOrders
 * @apiGroup Orders
 */
router.get('/users/:idUser', getOrdersByUserId);

module.exports = router;