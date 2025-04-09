import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import CommandeCard from '../../components/CommandeCard'
import TechnicalNotification from '../../components/TechnicalNotification'
import './index.sass'

export default function CommandesRestaurateur() {
  const { user } = useAuth()
  const [restaurantId, setRestaurantId] = useState('')
  const [orders, setOrders] = useState([])
  const [notification, setNotification] = useState(null)
  const previousOrdersRef = useRef([])

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

      const previousOrders = previousOrdersRef.current

      // 💡 Détection des nouvelles commandes
      const newOrders = filtered.filter(
        (order) => !previousOrders.some(prev => prev._id === order._id)
      )

      // 💡 Détection des changements de statut
      const updatedStatus = filtered.filter(order => {
        const prev = previousOrders.find(o => o._id === order._id)
        return prev && prev.status !== order.status
      })

      if (newOrders.length > 0) {
        setNotification({ type: 'success', message: `${newOrders.length} nouvelle(s) commande(s) reçue(s)` })
      } else if (updatedStatus.length > 0) {
        setNotification({ type: 'info', message: `Des commandes ont changé de statut.` })
      }

      // Met à jour la ref
      previousOrdersRef.current = filtered

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
      <SidebarRestaurateur />
      <div className="accueil-restaurateur__content">
        {notification && (
          <TechnicalNotification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
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
      </div>
    </div>
  )
}
