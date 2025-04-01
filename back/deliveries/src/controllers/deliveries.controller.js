const Delivery = require('../models/deliveries.model');

// Récupérer toutes les livraisons
exports.getAllDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.status(200).json(deliveries);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Récupérer une livraison par ID
exports.getDeliveryById = async (req, res) => {
    try {
        const delivery = await Delivery.findById(req.params.id);
        if (!delivery) return res.status(404).json({ message: 'Livraison non trouvée' });
        res.json(delivery);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Créer une nouvelle livraison
exports.createDelivery = async (req, res) => {
    try {
        const newDelivery = new Delivery(req.body);
        await newDelivery.save();
        res.status(201).json(newDelivery);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Modifier une livraison
exports.updateDelivery = async (req, res) => {
    try {
        const updatedDelivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDelivery) return res.status(404).json({ message: 'Livraison non trouvée' });
        res.status(200).json(updatedDelivery);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Supprimer une livraison
exports.deleteDelivery = async (req, res) => {
    try {
        const deletedDelivery = await Delivery.findByIdAndDelete(req.params.id);
        if (!deletedDelivery) return res.status(404).json({ message: 'Livraison non trouvée' });
        res.json({ message: 'Livraison supprimée' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
