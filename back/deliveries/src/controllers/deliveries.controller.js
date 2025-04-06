const Deliveries = require('../models/deliveries.model')

// Récupérer toutes les livraisons
exports.getAllDeliveries = async (req, res) => {
  try {
    const allDeliveries = await Deliveries.find()
    res.status(200).json(allDeliveries)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Récupérer une livraison par ID
exports.getDeliveryById = async (req, res) => {
  try {
    const delivery = await Deliveries.findById(req.params.id)
    if (!delivery) {return res.status(404).json({ message: 'Livraison non trouvée' })}
    res.json(delivery)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Créer une nouvelle livraison
exports.createDelivery = async (req, res) => {
  try {
    const newDelivery = new Deliveries(req.body)
    await newDelivery.save()
    res.status(201).json(newDelivery)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Modifier une livraison
exports.updateDelivery = async (req, res) => {
  try {
    const updatedDelivery = await Deliveries.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedDelivery) {return res.status(404).json({ message: 'Livraison non trouvée' })}
    res.status(200).json(updatedDelivery)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Supprimer une livraison
exports.deleteDelivery = async (req, res) => {
  try {
    const deletedDelivery = await Deliveries.findByIdAndDelete(req.params.id)
    if (!deletedDelivery) {return res.status(404).json({ message: 'Livraison non trouvée' })}
    res.json({ message: 'Livraison supprimée' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}


// Obtenir les statistiques pour un restaurateur
exports.getStatsForRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const deliveries = await Deliveries.find({
      restaurant_id: restaurantId,
      status: { $in: ['completed', 'finished'] }
    })

    const dailyDeliveries = deliveries.filter(d => new Date(d.createdAt) >= startOfDay)
    const monthlyDeliveries = deliveries.filter(d => new Date(d.createdAt) >= startOfMonth)

    const getTotalSales = arr => arr.reduce((sum, d) => sum + (d.menu_price || 0), 0)

    const bestMenuMap = {}
    for (const d of monthlyDeliveries) {
      if (d.menu_name) {
        bestMenuMap[d.menu_name] = (bestMenuMap[d.menu_name] || 0) + 1
      }
    }

    const bestMenu = Object.keys(bestMenuMap).reduce((a, b) =>
      bestMenuMap[a] > bestMenuMap[b] ? a : b, 'N/A')

    res.json({
      totalSalesToday: getTotalSales(dailyDeliveries),
      totalOrdersToday: dailyDeliveries.length,
      avgOrderValueToday: dailyDeliveries.length > 0 ? (getTotalSales(dailyDeliveries) / dailyDeliveries.length) : 0,
      totalSalesMonth: getTotalSales(monthlyDeliveries),
      totalOrdersMonth: monthlyDeliveries.length,
      bestMenu
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}