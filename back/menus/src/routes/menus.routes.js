const express = require('express')
const router = express.Router()
const {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  getAllMenusByRestaurantId
} = require('../controllers/menus.controllers')

/**
 * @api {get} / Récupérer tous les menus
 * @apiName GetAllMenus
 * @apiGroup Menus
 * @apiSuccess {Object[]} menus Liste de tous les menus
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  [{
 *    "_id": "65a1b2c3d4e5f67890gh123",
 *    "name": "Menu Classique",
 *    "price": 29.90,
 *    "restaurantName": "La Bonne Cuisine"
 *  }]
 */
router.get('/', getAllMenus)

/**
 * @api {get} /:id Récupérer un menu par ID
 * @apiName GetMenuById
 * @apiGroup Menus
 * @apiParam {String} id ID unique du menu
 * @apiSuccess {Object} menu Détails du menu
 * @apiError {Object} 404 Menu non trouvé
 */
router.get('/:id', getMenuById)

/**
 * @api {post} / Créer un nouveau menu
 * @apiName CreateMenu
 * @apiGroup Menus
 * @apiBody {String} name Nom du menu (requis)
 * @apiBody {Number} price Prix (requis)
 * @apiBody {String} restaurantName Restaurant (requis)
 * @apiBody {String[]} [product] Produits (optionnel)
 * @apiBody {String} [description] Description (optionnel)
 * @apiBody {String} image URL image (requis)
 */
router.post('/', createMenu)

/**
 * @api {put} /:id Mettre à jour un menu
 * @apiName UpdateMenu
 * @apiGroup Menus
 * @apiParam {String} id ID du menu
 * @apiBody {Object} updates Champs à modifier
 */
router.put('/:id', updateMenu)

/**
 * @api {delete} /:id Supprimer un menu
 * @apiName DeleteMenu
 * @apiGroup Menus
 * @apiParam {String} id ID du menu à supprimer
 * @apiSuccess {Object} 200 Confirmation de suppression
 * @apiError {Object} 404 Menu non trouvé
 */
router.delete('/:id', deleteMenu)

/**
 * @api {get} /restaurants/:restaurantId Menus par restaurant
 * @apiName GetMenusByRestaurant
 * @apiGroup Menus
 * @apiParam {String} restaurantId ID du restaurant
 * @apiSuccess {Object[]} menus Liste des menus du restaurant
 * @apiError {Object} 404 Aucun menu trouvé
 */
router.get('/restaurants/:restaurantId', getAllMenusByRestaurantId)

module.exports = router