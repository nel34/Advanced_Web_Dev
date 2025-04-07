import { useEffect, useState } from 'react'
import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import LargeSumRestaurateur from '../../components/LargeSumRestaurateur'
import BarChartRestaurateur from '../../components/BarChartRestaurateur'
import './index.sass'
import axios from 'axios'

export default function AccueilRestaurateur() {
  const [stats, setStats] = useState(null)
  const [restaurantName, setRestaurantName] = useState('')
  const RESTAURANT_ID = '000001'

  const fetchStats = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/orders/stats/${RESTAURANT_ID}`)
      setStats(res.data)
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
