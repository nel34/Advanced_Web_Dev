const Products = require('../models/products.model')
const axios = require('axios');

// Obtenir tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find()
    res.status(200).json(allProducts)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Obtenir un produit par son ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' })
    }
    res.status(200).json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Obtenir tous les produits d'un restaurant spécifique
exports.getProductsByRestaurant = async (req, res) => {
  try {
      const { idrestaurant } = req.params;
      const products = await Products.find({ restaurantId: idrestaurant });

      if (products.length === 0) {
          return res.status(404).json({ message: "Aucun produit trouvé pour ce restaurant." });
      }

      res.json(products);
  } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des produits : " + error.message });
  }
}

// Créer un produit
exports.createProduct = async (req, res) => {
  try {
    /*
    // Vérifier si le restaurant existe via l'API
    const response = await axios.get(`http://nginx:8080/api/restaurants/${req.body.restaurantId}`);
    
    if (response.status !== 200) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    */
    // Vérifier l'unicité du nom du produit dans ce restaurant
    const duplicateProduct = await Products.findOne({
      name: req.body.name,
      restaurantId: req.body.restaurantId
    });

    if (duplicateProduct) {
      return res.status(400).json({ error: "A product with this name already exists in the restaurant" });
    }

    // Créer le produit si toutes les vérifications sont passées
    const newProduct = new Products(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    // Gestion des erreurs provenant de l'appel API ou de la base de données
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(400).json({ error: err.message });
  }
};

// Modifier un produit par son ID
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' })
    }
    res.status(200).json(updatedProduct)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Supprimer un produit par son ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(req.params.id)
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' })
    }
    res.status(200).json({ message: 'Produit supprimé' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}