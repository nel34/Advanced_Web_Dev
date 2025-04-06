const express = require('express')
const router = express.Router()
const { getAllDeliveries, getDeliveryById, createDelivery, updateDelivery, deleteDelivery, getStatsForRestaurant } = require('../controllers/deliveries.controller')

/**
 * @api {get} / Get all deliveries
 * @apiName GetAllDeliveries
 * @apiGroup Deliveries
 * @apiSuccess {Object[]} deliveries Liste de toutes les livraisons.
 */
router.get('/', getAllDeliveries)

/**
 * @api {get} /:id Get delivery by ID
 * @apiName GetDeliveryById
 * @apiGroup Deliveries
 * @apiParam {String} id ID de la livraison.
 * @apiSuccess {Object} delivery Informations de la livraison.
 * @apiError 404 Livraison non trouvée.
 */
router.get('/:id', getDeliveryById)

/**
 * @api {get} /stats/:restaurantId Obtenir les statistiques d'un restaurateur
 * @apiName GetStatsForRestaurant
 * @apiGroup Deliveries
 * @apiParam {String} restaurantId ID du restaurateur.
 * @apiSuccess {Object} stats Statistiques globales.
 */
router.get('/stats/:restaurantId', getStatsForRestaurant)

/**
 * @api {post} / Create a new delivery
 * @apiName CreateDelivery
 * @apiGroup Deliveries
 * @apiBody {String} order_id ID de la commande.
 * @apiBody {String} delivery_person_id ID du livreur.
 * @apiBody {String="in_progress","completed","failed"} [status] Statut de la livraison.
 * @apiBody {Date} [estimated_time] Temps estimé.
 * @apiBody {String} [delivery_person_name] Nom du livreur.
 * @apiSuccess {Object} delivery Livraison créée.
 * @apiError 400 Erreur de validation.
 */
router.post('/', createDelivery)

/**
 * @api {put} /:id Update delivery
 * @apiName UpdateDelivery
 * @apiGroup Deliveries
 * @apiParam {String} id ID de la livraison.
 * @apiSuccess {Object} delivery Livraison mise à jour.
 * @apiError 404 Livraison non trouvée.
 */
router.put('/:id', updateDelivery)

/**
 * @api {delete} /:id Delete delivery
 * @apiName DeleteDelivery
 * @apiGroup Deliveries
 * @apiParam {String} id ID de la livraison.
 * @apiSuccess {String} message Message de confirmation.
 * @apiError 404 Livraison non trouvée.
 */
router.delete('/:id', deleteDelivery)

module.exports = router
