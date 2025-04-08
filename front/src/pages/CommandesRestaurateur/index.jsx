import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import CommandeCard from '../../components/CommandeCard'
import './index.sass'

export default function CommandesRestaurateur() {
  const { user } = useAuth()
  const [restaurantId, setRestaurantId] = useState('')
  const [orders, setOrders] = useState([])

  const fetchRestaurantId = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/restaurants/user/${user.id}`)
      setRestaurantId(res.data._id)
    } catch (err) {
      console.error('Erreur lors de la récupération du restaurant :', err)
    }
  }

  const fetchOrders = async (id) => {
    try {
      const res = await axios.get('http://localhost:8080/api/orders')
      const filtered = res.data.filter(
        (order) =>
          order.restaurant_id === id &&
          order.status !== 'Delivered' &&
          order.status !== 'Cancelled'
      )
      setOrders(filtered)
    } catch (err) {
      console.error('Erreur lors du chargement des commandes :', err)
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchRestaurantId()
    }
  }, [user])

  useEffect(() => {
    if (restaurantId) {
      fetchOrders(restaurantId)
      const intervalId = setInterval(() => fetchOrders(restaurantId), 5000)
      return () => clearInterval(intervalId)
    }
  }, [restaurantId])

  return (
    <div className="accueil-restaurateur">
      <div className="accueil-restaurateur__body">
        <SidebarRestaurateur />
        <main className="accueil-restaurateur__content">
          <h2>Vos Commandes :</h2>
          <div className="commande-list">
            {orders.length > 0 ? (
              orders.map((order) => (
                <CommandeCard
                  key={order._id}
                  order={order}
                  onUpdate={() => fetchOrders(restaurantId)}
                />
              ))
            ) : (
              <p style={{ fontStyle: 'italic' }}>Aucune commande en cours.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
