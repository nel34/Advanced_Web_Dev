const Menus = require('../models/menus.models')

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
    const newMenu = await Menus(req.body).save()
    res.status(201).json(newMenu)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

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