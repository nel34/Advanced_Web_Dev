const Order = require('../models/orders.models')

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('menu')
    res.status(200).json(orders)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ order_id: req.params.id }).populate('menu')
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json(order)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}


exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body).save()
    res.status(201).json(newOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { order_id: req.params.id },
      req.body,
      { new: true }
    )
    if (!updatedOrder) {return res.status(404).json({ message: 'Order not found' })}
    res.status(200).json(updatedOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ order_id: req.params.id })
    if (!order) {return res.status(404).json({ message: 'Order not found' })}
    res.status(200).json({ message: 'Order deleted' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.params.idUser }).populate('menu')
    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found' })
    }
    res.status(200).json(orders)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}


// Récupérer les commandes par nom du livreur
exports.getOrdersByDeliveryPersonId = async (req, res) => {
  try {
    const { id } = req.params
    const orders = await Order.find({ delivery_person_id: id }).populate('menu')

    if (!orders.length) {
      return res.status(404).json({ message: 'Aucune commande trouvée pour ce livreur' })
    }

    res.status(200).json(orders)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}


// Obtenir les statistiques pour un restaurateur
exports.getStatsForRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const allOrders = await Order.find({
      restaurant_id: restaurantId,
      status: 'Delivered'
    }).populate('menu') // 👈 On récupère les noms des menus

    const dailyOrders = allOrders.filter(o => new Date(o.createdAt) >= startOfDay)
    const monthlyOrders = allOrders.filter(o => new Date(o.createdAt) >= startOfMonth)

    const getTotalSales = arr => arr.reduce((sum, o) => sum + (o.total || 0), 0)

    // 🥇 Compter les menus pour trouver le plus commandé
    const bestMenuMap = {}
    for (const order of monthlyOrders) {
      if (order.menu && Array.isArray(order.menu)) {
        for (const menu of order.menu) {
          const menuName = menu.name
          if (menuName) {
            bestMenuMap[menuName] = (bestMenuMap[menuName] || 0) + 1
          }
        }
      }
    }

    const bestMenu = Object.keys(bestMenuMap).length
      ? Object.keys(bestMenuMap).reduce((a, b) => bestMenuMap[a] > bestMenuMap[b] ? a : b)
      : 'N/A'

    const globalSales = getTotalSales(allOrders)
    const globalOrders = allOrders.length
    const avgOrderValueGlobal = globalOrders > 0 ? (globalSales / globalOrders) : 0

    res.json({
      totalSalesToday: getTotalSales(dailyOrders),
      totalOrdersToday: dailyOrders.length,
      avgOrderValueGlobal,
      totalSalesMonth: getTotalSales(monthlyOrders),
      totalOrdersMonth: monthlyOrders.length,
      bestMenu
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


// Obtenir les ventes par semaine pour un restaurant
exports.getWeeklySalesForRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params

    const orders = await Order.find({
      restaurant_id: restaurantId,
      status: 'Delivered' 
    })

    const formatWeekLabel = (monday) => {
      const sunday = new Date(monday)
      sunday.setDate(sunday.getDate() + 6)

      const dayOptions = { day: '2-digit' }
      const monthOptions = { month: 'short' }

      const mondayDay = monday.toLocaleDateString('fr-FR', dayOptions)
      const sundayDay = sunday.toLocaleDateString('fr-FR', dayOptions)
      const month = sunday.toLocaleDateString('fr-FR', monthOptions)

      return `${mondayDay}/${sundayDay} ${month}`
    }

    const weeks = []

    orders.forEach((o) => {
      const date = new Date(o.createdAt)
      const day = date.getDay() === 0 ? 6 : date.getDay() - 1
      const monday = new Date(date)
      monday.setDate(date.getDate() - day)
      monday.setHours(0, 0, 0, 0)

      const key = monday.toISOString()
      let existingWeek = weeks.find(w => w.key === key)

      if (!existingWeek) {
        existingWeek = {
          key,
          date: formatWeekLabel(monday),
          ventes: 0
        }
        weeks.push(existingWeek)
      }

      existingWeek.ventes += o.menu_price || 0
    })

    weeks.sort((a, b) => new Date(a.key) - new Date(b.key))

    res.json(weeks.map(({ date, ventes }) => ({ date, ventes })))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

