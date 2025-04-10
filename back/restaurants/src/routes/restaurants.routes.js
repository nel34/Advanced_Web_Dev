const express = require('express')
const router = express.Router()
const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByUserId
} = require('../controllers/restaurants.controller')

/**
 * @api {post} / Créer un restaurant
 * @apiName CreateRestaurant
 * @apiGroup Restaurants
 * @apiBody {String} name Nom du restaurant
 * @apiBody {String} description Description du restaurant
 * @apiBody {String} address Adresse
 * @apiBody {String} category Catégorie (ex: asiatique, italien...)
 * @apiBody {String} image URL de l'image
 * @apiBody {Object} opening_hours Horaires d'ouverture
 * @apiBody {String} idOwner ID de l'utilisateur propriétaire
 * @apiSuccess {Object} restaurant Restaurant créé
 * @apiError 400 Erreur de validation
 */
router.post('/', createRestaurant)

/**
 * @api {get} / Récupérer tous les restaurants
 * @apiName GetAllRestaurants
 * @apiGroup Restaurants
 * @apiSuccess {Object[]} restaurants Liste des restaurants
 */
router.get('/', getAllRestaurants)

/**
 * @api {get} /:id Récupérer un restaurant par ID
 * @apiName GetRestaurantById
 * @apiGroup Restaurants
 * @apiParam {String} id ID du restaurant
 * @apiSuccess {Object} restaurant Détails du restaurant
 * @apiError 404 Restaurant non trouvé
 */
router.get('/:id', getRestaurantById)

/**
 * @api {put} /:id Modifier un restaurant
 * @apiName UpdateRestaurant
 * @apiGroup Restaurants
 * @apiParam {String} id ID du restaurant
 * @apiBody {String} name Nom du restaurant
 * @apiBody {String} description Description du restaurant
 * @apiBody {String} address Adresse
 * @apiBody {String} category Catégorie (ex: asiatique, italien...)
 * @apiBody {String} image URL de l'image
 * @apiBody {Object} opening_hours Horaires d'ouverture
 * @apiBody {String} idOwner ID de l'utilisateur propriétaire
 * @apiSuccess {Object} restaurant Restaurant mis à jour
 * @apiError 404 Restaurant non trouvé
 */
router.put('/:id', updateRestaurant)

/**
 * @api {delete} /:id Supprimer un restaurant
 * @apiName DeleteRestaurant
 * @apiGroup Restaurants
 * @apiParam {String} id ID du restaurant
 * @apiSuccess {String} message Message de confirmation
 * @apiError 404 Restaurant non trouvé
 */
router.delete('/:id', deleteRestaurant)

/**
 * @api {get} /user/:id Récupérer un restaurant par ID utilisateur
 * @apiName GetRestaurantByUserId
 * @apiGroup Restaurants
 * @apiParam {String} id ID de l'utilisateur
 * @apiSuccess {Object} restaurant Détails du restaurant
 * @apiError 404 Restaurant ou utilisateur non trouvé
 */
router.get('/user/:id', getRestaurantByUserId)

module.exports = router
