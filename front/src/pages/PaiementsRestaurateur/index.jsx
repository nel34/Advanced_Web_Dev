import { useEffect, useState } from 'react'
import axios from 'axios'
import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import CardPaiement from '../../components/CardPaiement'
import NotificationPopup from '../../components/NotificationPopup'
import './index.sass'

export default function PaiementsRestaurateur() {
  const [orders, setOrders] = useState([])
  const [showPopup, setShowPopup] = useState(false)

  const RESTAURANT_ID = '67f3d283bdc278e3e020baef'

  const getKnownIds = () => {
    const data = localStorage.getItem('knownPaymentIds')
    return data ? new Set(JSON.parse(data)) : new Set()
  }

  const saveKnownIds = (set) => {
    localStorage.setItem('knownPaymentIds', JSON.stringify([...set]))
  }

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/orders')
      const filtered = res.data.filter(
        (order) =>
          order.restaurant_id === RESTAURANT_ID &&
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
    fetchOrders()
    const intervalId = setInterval(() => {
      fetchOrders()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="accueil-restaurateur">
      <div className="accueil-restaurateur__body">
        <SidebarRestaurateur />
        <main className="accueil-restaurateur__content">
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
        </main>
      </div>

      <NotificationPopup
        visible={showPopup}
        message="Vous avez un nouveau paiement"
        onClose={() => setShowPopup(false)}
      />
    </div>
  )
}
