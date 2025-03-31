const Product = require('../models/product.model');

// Obtenir tous les produits
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtenir un produit par son ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Créer un produit
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Modifier un produit par son ID
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Supprimer un produit par son ID
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json({ message: 'Produit supprimé' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


