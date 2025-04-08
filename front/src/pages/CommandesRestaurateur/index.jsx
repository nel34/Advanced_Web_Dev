import { useEffect, useState } from 'react'
import axios from 'axios'
import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import CommandeCard from '../../components/CommandeCard'
import './index.sass'

export default function CommandesRestaurateur() {
  const [orders, setOrders] = useState([])
  const RESTAURANT_ID = '67f3d283bdc278e3e020baef'

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/orders`)
      const filtered = res.data.filter(
        (order) =>
          order.restaurant_id === RESTAURANT_ID &&
          order.status !== 'Delivered' &&
          order.status !== 'Cancelled'
      )
      
      
      setOrders(filtered)
    } catch (err) {
      console.error('Erreur lors du chargement des commandes :', err)
    }
  }

  useEffect(() => {
    fetchOrders()
    const intervalId = setInterval(fetchOrders, 5000)
    return () => clearInterval(intervalId)
  }, [])

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
                  onUpdate={fetchOrders}
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
