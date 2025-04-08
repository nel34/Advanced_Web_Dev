import { useEffect, useState } from 'react'
import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import LargeSumRestaurateur from '../../components/LargeSumRestaurateur'
import BarChartRestaurateur from '../../components/BarChartRestaurateur'
import './index.sass'
import axios from 'axios'

export default function AccueilRestaurateur() {
  const [stats, setStats] = useState(null)
  const [restaurantName, setRestaurantName] = useState('')
  const RESTAURANT_ID = '67f3d283bdc278e3e020baef'

  const fetchStats = async () => {
    try {
      const resOrders = await axios.get(`http://localhost:8080/api/orders`)
      const filteredOrders = resOrders.data.filter(
        (order) =>
          order.restaurant_id === RESTAURANT_ID &&
          order.status === 'Delivered'
      )

      const now = new Date()
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

      const dailyOrders = filteredOrders.filter(o => new Date(o.createdAt) >= startOfDay)
      const monthlyOrders = filteredOrders.filter(o => new Date(o.createdAt) >= startOfMonth)

      const getTotalSales = arr => arr.reduce((sum, o) => sum + (o.total || 0), 0)

      const globalSales = getTotalSales(filteredOrders)
      const globalOrders = filteredOrders.length
      const avgOrderValueGlobal = globalOrders > 0 ? (globalSales / globalOrders) : 0

      // ➕ Calcul du plat du mois
      const allMenuIds = monthlyOrders.flatMap(order => order.menu)
      const menuNameCounts = {}

      await Promise.all(allMenuIds.map(async (id) => {
        try {
          const res = await axios.get(`http://localhost:8080/api/menus/${id}`)
          const name = res.data.name
          menuNameCounts[name] = (menuNameCounts[name] || 0) + 1
        } catch (err) {
          console.error('Erreur récupération menu:', err)
        }
      }))

      const bestMenu = Object.entries(menuNameCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'

      setStats({
        totalSalesToday: getTotalSales(dailyOrders),
        totalOrdersToday: dailyOrders.length,
        avgOrderValueGlobal,
        totalSalesMonth: getTotalSales(monthlyOrders),
        totalOrdersMonth: monthlyOrders.length,
        bestMenu
      })
    } catch (err) {
      console.error('Erreur lors du chargement des statistiques :', err)
    }
  }

  const fetchRestaurantName = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/restaurants/${RESTAURANT_ID}`)
      setRestaurantName(res.data.name)
    } catch (err) {
      console.error('Erreur lors de la récupération du nom du restaurant :', err)
    }
  }

  useEffect(() => {
    fetchStats()
    fetchRestaurantName()

    const intervalId = setInterval(() => {
      fetchStats()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="accueil-restaurateur">
      <div className="accueil-restaurateur__body">
        <SidebarRestaurateur />
        <main className="accueil-restaurateur__content">
          <div className="dashboard-header">
            <p className="dashboard-header__greeting">Bonjour, {restaurantName}</p>
            <h1 className="dashboard-header__title">Vos performances</h1>
          </div>
          <div className="accueil-restaurateur__sums">
            <LargeSumRestaurateur title="Ventes du jour" value={stats ? `${stats.totalSalesToday.toFixed(2)}€` : '...'} />
            <LargeSumRestaurateur title="Commandes du jour" value={stats ? stats.totalOrdersToday : '...'} />
            <LargeSumRestaurateur title="Panier moyen" value={stats ? `${stats.avgOrderValueGlobal.toFixed(2)}€` : '...'} />
            <LargeSumRestaurateur title="Ventes du mois" value={stats ? `${stats.totalSalesMonth.toFixed(2)}€` : '...'} />
            <LargeSumRestaurateur title="Commandes du mois" value={stats ? stats.totalOrdersMonth : '...'} />
            <LargeSumRestaurateur title="Plat du mois" value={stats ? stats.bestMenu : '...'} />
          </div>
          <div className="accueil-restaurateur__charts">
            <BarChartRestaurateur />
          </div>
        </main>
      </div>
    </div>
  )
}
