const Menus = require('../models/menus.models')
const axios = require('axios');

exports.getAllMenus = async (req, res) => {
  try {
    const allMenus = await Menus.find()
    res.status(200).json(allMenus)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menus.findById(req.params.id)
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' })
    }
    res.status(200).json(menu)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.createMenu = async (req, res) => {
  try {
    // Vérifier si le restaurant existe
    const restaurantResponse = await axios.get(`http://nginx:8080/api/restaurants/${req.body.restaurantId}`);
    if (restaurantResponse.status !== 200) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Vérifier si tous les produits existent
    for (let productId of req.body.productId) {
      const productResponse = await axios.get(`http://nginx:8080/api/products/${productId}`);
      if (productResponse.status !== 200) {
        return res.status(404).json({ message: `Product with ID ${productId} not found` });
      }
    }

    // Vérifier l'absence de doublons de nom dans le même restaurant
    const existingMenu = await Menus.findOne({ name: req.body.name, restaurantId: req.body.restaurantId });
    if (existingMenu) {
      return res.status(400).json({ message: "A menu with the same name already exists in this restaurant" });
    }

    // Création du menu
    const newMenu = await Menus(req.body).save();
    res.status(201).json(newMenu);
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json({ message: err.response.data.message });
    }
    res.status(500).json({ message: err.message });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const updatedMenu = await Menus.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedMenu) {
      return res.status(404).json({ message: 'Menu not found' })
    }
    res.status(200).json(updatedMenu)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menus.findByIdAndDelete(req.params.id)
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' })
    }
    res.status(200).json({ message: 'Menu deleted' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getAllMenusByRestaurantId = async (req, res) => {
  try {
    const restaurantMenus = await Menus.find({ restaurantId: req.params.restaurantId })
    if (!restaurantMenus) {
      return res.status(404).json({ message: 'No menus found for this restaurant' })
    }
    res.status(200).json(restaurantMenus)
  }
  catch (err) {
    res.status(400).json({ message: err.message })
  }
}