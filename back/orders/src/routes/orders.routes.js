const express = require('express');
const router = express.Router();
const {getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder, getOrdersByUserId} = require('../controllers/orders.controllers');

/**
 * @api {get} /users/:idUser Récupérer les commandes d'un utilisateur
 * @apiName GetUserOrders
 * @apiGroup Orders
 * @apiParam {String} idUser ID de l'utilisateur
 */
router.get('/users/:idUser', getOrdersByUserId);

/**
 * @api {get} / Récupérer toutes les commandes
 * @apiName GetAllOrders
 * @apiGroup Orders
 */
router.get('/', getAllOrders);

/**
 * @api {get} /:id Récupérer une commande par ID
 * @apiName GetOrderById
 * @apiGroup Orders
 * @apiParam {String} id ID de la commande
 */
router.get('/:id', getOrderById);

/**
 * @api {post} / Créer une nouvelle commande
 * @apiName CreateOrder
 * @apiGroup Orders
 *
 * @apiBody {String} order_id ID unique de la commande
 * @apiBody {String} user_id ID de l'utilisateur
 * @apiBody {String} restaurant_id ID du restaurant
 * @apiBody {Object[]} items Liste des articles
 * @apiBody {String} items.product_id ID du produit
 * @apiBody {Number} items.quantity Quantité
 * @apiBody {String="pending","delivered","cancelled"} status Statut de la commande
 * @apiBody {Number} total_price Prix total
 * @apiBody {Date} [created_at] Date de création (optionnel)
 */
router.post('/', createOrder);

/**
 * @api {put} /:id Modifier une commande
 * @apiName UpdateOrder
 * @apiGroup Orders
 * @apiParam {String} id ID de la commande à modifier
 *
 * @apiBody {String} user_id ID de l'utilisateur
 * @apiBody {String} restaurant_id ID du restaurant
 * @apiBody {Object[]} items Liste des articles
 * @apiBody {String} items.product_id ID du produit
 * @apiBody {Number} items.quantity Quantité
 * @apiBody {String="pending","delivered","cancelled"} status Statut de la commande
 * @apiBody {Number} total_price Prix total
 */
router.put('/:id', updateOrder);

/**
 * @api {delete} /:id Supprimer une commande
 * @apiName DeleteOrder
 * @apiGroup Orders
 * @apiParam {String} id ID de la commande à supprimer
 */
router.delete('/:id', deleteOrder);

module.exports = router;