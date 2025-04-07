const express = require('express')
const router = express.Router()
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
  getStatsForRestaurant,
  getWeeklySalesForRestaurant,
  getOrdersByDeliveryPersonId
} = require('../controllers/orders.controllers')

/**
 * @api {get} /orders/users/:idUser Récupérer les commandes d'un utilisateur
 * @apiName GetUserOrders
 * @apiGroup Orders
 * @apiParam {String} idUser ID de l'utilisateur
 * @apiSuccess {Object[]} orders Liste des commandes de l'utilisateur
 */
router.get('/users/:idUser', getOrdersByUserId)

/**
 * @api {get} /orders Récupérer toutes les commandes
 * @apiName GetAllOrders
 * @apiGroup Orders
 * @apiSuccess {Object[]} orders Liste de toutes les commandes
 */
router.get('/', getAllOrders)

/**
 * @api {get} /orders/:id Récupérer une commande par ID
 * @apiName GetOrderById
 * @apiGroup Orders
 * @apiParam {String} id ID de la commande
 * @apiSuccess {Object} order Détails de la commande
 */
router.get('/:id', getOrderById)

/**
 * @api {post} /orders Créer une nouvelle commande
 * @apiName CreateOrder
 * @apiGroup Orders
 * 
 * @apiBody {String} order_id ID unique de la commande
 * @apiBody {String} user_id ID de l'utilisateur
 * @apiBody {String} restaurant_id ID du restaurant
 * @apiBody {String} delivery_person_id ID du livreur
 * @apiBody {String="Pending_Restaurateur","In_Progress","Pending_Delivery","In_Delivery","Delivered","Cancelled"} status Statut de la commande
 * @apiBody {Date} [estimated_time] Heure estimée de livraison
 * @apiBody {String} [delivery_person_name] Nom du livreur
 * @apiBody {String} menu_name Nom du menu commandé
 * @apiBody {Number} menu_price Prix du menu
 * @apiSuccess {Object} order Commande créée
 */
router.post('/', createOrder)

/**
 * @api {put} /orders/:id Modifier une commande
 * @apiName UpdateOrder
 * @apiGroup Orders
 * @apiParam {String} id ID de la commande à modifier
 * 
 * @apiBody {String} order_id ID unique de la commande
 * @apiBody {String} user_id ID de l'utilisateur
 * @apiBody {String} restaurant_id ID du restaurant
 * @apiBody {String} delivery_person_id ID du livreur
 * @apiBody {String="Pending_Restaurateur","In_Progress","Pending_Delivery","In_Delivery","Delivered","Cancelled"} status Statut de la commande
 * @apiBody {Date} [estimated_time] Heure estimée de livraison
 * @apiBody {String} [delivery_person_name] Nom du livreur
 * @apiBody {String} menu_name Nom du menu commandé
 * @apiBody {Number} menu_price Prix du menu
 * @apiSuccess {Object} order Commande mise à jour
 */
router.put('/:id', updateOrder)

/**
 * @api {delete} /orders/:id Supprimer une commande
 * @apiName DeleteOrder
 * @apiGroup Orders
 * @apiParam {String} id ID de la commande à supprimer
 * @apiSuccess {String} message Message de confirmation
 */
router.delete('/:id', deleteOrder)

/**
 * @api {get} /orders/stats/:restaurantId Obtenir les statistiques d'un restaurateur
 * @apiName GetStatsForRestaurant
 * @apiGroup Orders
 * @apiParam {String} restaurantId ID du restaurant
 * @apiSuccess {Number} totalSalesToday Total des ventes du jour
 * @apiSuccess {Number} totalOrdersToday Nombre total de commandes du jour
 * @apiSuccess {Number} avgOrderValueGlobal Valeur moyenne des commandes
 * @apiSuccess {Number} totalSalesMonth Total des ventes du mois
 * @apiSuccess {Number} totalOrdersMonth Nombre total de commandes du mois
 * @apiSuccess {String} bestMenu Menu le plus commandé du mois
 */
router.get('/stats/:restaurantId', getStatsForRestaurant)

/**
 * @api {get} /orders/sales-per-week/:restaurantId Obtenir les ventes par semaine
 * @apiName GetWeeklySalesForRestaurant
 * @apiGroup Orders
 * @apiParam {String} restaurantId ID du restaurant
 * @apiSuccess {Object[]} sales Tableau des ventes hebdomadaires
 * @apiSuccess {String} sales.date Semaine (ex: "01/07 avr.")
 * @apiSuccess {Number} sales.ventes Total des ventes pour la semaine
 */
router.get('/sales-per-week/:restaurantId', getWeeklySalesForRestaurant)

/**
 * @api {get} /orders/delivery-person-id/:id Récupérer les commandes par ID du livreur
 * @apiName GetOrdersByDeliveryPersonId
 * @apiGroup Orders
 * @apiParam {String} id ID du livreur (delivery_person_id)
 * @apiSuccess {Object[]} orders Liste des commandes associées
 */
router.get('/delivery-person-id/:id', getOrdersByDeliveryPersonId)

module.exports = router
