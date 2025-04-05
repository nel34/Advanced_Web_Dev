const express = require('express')
const router = express.Router()
const { getAllProducts, getProductById, getProductsByRestaurant, createProduct, updateProduct, deleteProduct } = require('../controllers/products.controller')

/**
 * @api {get} / Obtenir tous les produits
 * @apiName GetAllProducts
 * @apiGroup Products
 * @apiSuccess {Object[]} products Liste des produits.
 */
router.get('/', getAllProducts)

/**
 * @api {get} /:id Obtenir un produit par ID
 * @apiName GetProductById
 * @apiGroup Products
 * @apiParam {String} id ID du produit.
 * @apiSuccess {Object} product Détails du produit.
 * @apiError 404 Produit non trouvé.
 */
router.get('/:id', getProductById)

/**
 * @api {get} /by-restaurant/:idrestaurant Obtenir tous les produits d'un restaurant
 * @apiName GetProductsByRestaurant
 * @apiGroup Products
 * @apiParam {String} idrestaurant ID du restaurant dont on souhaite récupérer tous les produits.
 * @apiSuccess {Object[]} products Liste des produits du restaurant spécifié.
 * @apiError 404 Aucun produit trouvé pour ce restaurant.
 */
router.get('/by-restaurant/:idrestaurant', getProductsByRestaurant);

/**
 * @api {post} / Créer un produit
 * @apiName CreateProduct
 * @apiGroup Products
 * @apiBody {String} name
 * @apiBody {String} description
 * @apiBody {String} restaurantId
 * @apiBody {Number} price
 * @apiBody {String} image
 * @apiBody {String[]} categories
 * @apiSuccess {Object} product Produit créé.
 * @apiError 400 Erreur de validation.
 */
router.post('/', createProduct)

/**
 * @api {put} /:id Modifier un produit
 * @apiName UpdateProduct
 * @apiGroup Products
 * @apiParam {String} id ID du produit.
 * @apiSuccess {Object} product Produit mis à jour.
 * @apiError 404 Produit non trouvé.
 */
router.put('/:id', updateProduct)

/**
 * @api {delete} /:id Supprimer un produit
 * @apiName DeleteProduct
 * @apiGroup Products
 * @apiParam {String} id ID du produit.
 * @apiSuccess {String} message Produit supprimé.
 * @apiError 404 Produit non trouvé.
 */
router.delete('/:id', deleteProduct)

module.exports = router