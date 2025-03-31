const express = require('express');
const router = express.Router();
const {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  getAllMenusByRestaurantId
} = require('../controllers/menus.controllers');

router.get('/', getAllMenus);
router.get('/:id', getMenuById);
router.post('/', createMenu);
router.put('/:id', updateMenu);
router.delete('/:id', deleteMenu);
router.get('/restaurants/:restaurantId', getAllMenusByRestaurantId);

module.exports = router;