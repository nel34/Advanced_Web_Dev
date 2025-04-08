import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import CardPaiement from '../../components/CardPaiement'
import GlobalPopup from '../../components/GlobalPopup'
import './index.sass'

export default function PaiementsRestaurateur() {
  const { user } = useAuth()
  const [restaurantId, setRestaurantId] = useState('')
  const [orders, setOrders] = useState([])
  const [showPopup, setShowPopup] = useState(false)

  const getKnownIds = () => {
    const data = localStorage.getItem('knownPaymentIds')
    return data ? new Set(JSON.parse(data)) : new Set()
  }

  const saveKnownIds = (set) => {
    localStorage.setItem('knownPaymentIds', JSON.stringify([...set]))
  }

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
          order.status === 'Delivered'
      )

      const knownIds = getKnownIds()
      const newPayments = filtered.filter((o) => !knownIds.has(o._id))

      if (newPayments.length > 0) {
        setShowPopup(true)
        newPayments.forEach((o) => knownIds.add(o._id))
        saveKnownIds(knownIds)
      }

      setOrders(filtered)
    } catch (err) {
      console.error('Erreur lors du chargement des paiements :', err)
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
      const intervalId = setInterval(() => {
        fetchOrders(restaurantId)
      }, 5000)
      return () => clearInterval(intervalId)
    }
  }, [restaurantId])

  return (
    <div className="accueil-restaurateur">
      <SidebarRestaurateur />
      <div className="accueil-restaurateur__content">
        <h2>Vos paiements :</h2>
        <div className="paiement-list">
          {orders.length > 0 ? (
            orders.map((order) => (
              <CardPaiement key={order._id} delivery={order} />
            ))
          ) : (
            <p style={{ fontStyle: 'italic' }}>Aucun paiement terminé.</p>
          )}
        </div>
      </div>

      <GlobalPopup
        visible={showPopup}
        message="Vous avez un nouveau paiement"
        onClose={() => setShowPopup(false)}
      />
    </div>
  )
}
