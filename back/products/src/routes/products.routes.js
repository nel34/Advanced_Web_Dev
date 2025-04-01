const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');

/**
 * @api {get} /products Obtenir tous les produits
 * @apiName GetAllProducts
 * @apiGroup Products
 * @apiSuccess {Object[]} products Liste des produits.
 */
router.get('/', getAllProducts);

/**
 * @api {get} /products/:id Obtenir un produit par ID
 * @apiName GetProductById
 * @apiGroup Products
 * @apiParam {String} id ID du produit.
 * @apiSuccess {Object} product Détails du produit.
 * @apiError 404 Produit non trouvé.
 */
router.get('/:id', getProductById);

/**
 * @api {post} /products Créer un produit
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
router.post('/', createProduct);

/**
 * @api {put} /products/:id Modifier un produit
 * @apiName UpdateProduct
 * @apiGroup Products
 * @apiParam {String} id ID du produit.
 * @apiSuccess {Object} product Produit mis à jour.
 * @apiError 404 Produit non trouvé.
 */
router.put('/:id', updateProduct);

/**
 * @api {delete} /products/:id Supprimer un produit
 * @apiName DeleteProduct
 * @apiGroup Products
 * @apiParam {String} id ID du produit.
 * @apiSuccess {String} message Produit supprimé.
 * @apiError 404 Produit non trouvé.
 */
router.delete('/:id', deleteProduct);

module.exports = router;