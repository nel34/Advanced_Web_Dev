import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.sass'
import OrderCard from '../../components/DeliveryOrderCard'
import OrderDetailsPopup from '../../components/DeliveryOrderDetailsPopup'
import OrderHistoryPopup from '../../components/DeliveryOrderHistoryPopup'
import OrderHistorySection from '../../components/DeliveryOrderHistorySection'

const Delivery = () => {
  const [showHistory, setShowHistory] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [availableOrders, setAvailableOrders] = useState([])

  // ID fictif du livreur connecté
  const deliveryPersonId = 'LIVREUR123'

  const toggleHistory = () => setShowHistory(!showHistory)
  const toggleDetails = (order = null) => {
    setSelectedOrder(order)
    setShowDetails(!showDetails)
  }

  const historyData = [
    { id: 1, restaurant: 'Sushi Bar', client: 'Alice', address: '10 rue Tokyo', price: '24€' },
    { id: 2, restaurant: 'Pasta Place', client: 'Bob', address: '22 rue Rome', price: '18€' }
  ]

  const currentOrder = {
    id: 101,
    restaurant: 'Burger House',
    client: 'Charlie',
    address: '77 avenue USA',
    deliveryCode: 'XZ23',
    total: '15€',
    items: [
      { name: 'Cheeseburger', quantity: 2, price: '10€' },
      { name: 'Frites', quantity: 1, price: '5€' }
    ]
  }

  useEffect(() => {
    fetchAvailableOrders()
  }, [])

  const fetchAvailableOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/orders')
      console.log('Commandes reçues :', res.data)
      setAvailableOrders(res.data)
    } catch (err) {
      console.error('Erreur lors du chargement des commandes disponibles :', err)
    }
  }

  const acceptOrder = async (order) => {
    try {
      const updatedOrder = {
        ...order,
        status: 'In_Delivery',
        delivery_person_id: deliveryPersonId
      }

      await axios.put(`http://localhost:8080/api/orders/${order.order_id}`, updatedOrder)

      // Optionnel : rafraîchir les commandes disponibles
      setAvailableOrders(prev =>
        prev.filter(o => o.order_id !== order.order_id)
      )

      console.log(`Commande ${order.order_id} acceptée.`)
    } catch (err) {
      console.error("Erreur lors de l'acceptation de la commande :", err)
    }
  }

  return (
    <div className="delivery-page">
      <main className="delivery-container">
        {/* Commandes en cours */}
        <section className="current-orders">
          <h2>Commandes en cours :</h2>
          <OrderCard order={currentOrder} onDetails={toggleDetails} />
        </section>

        {/* Commandes disponibles */}
        <section className="available-orders">
          <h2>Commandes disponibles</h2>
          <div className="orders-grid">
            {availableOrders
              .filter(order => order.status === 'Pending_Delivery')
              .map(order => (
                <div key={order._id} className="order">
                  <p><strong>Commande ID :</strong> {order.order_id}</p>
                  <p><strong>Prix :</strong> {order.menu_price}</p>
                  <p><strong>Adresse :</strong> {order.location}</p>
                  <div className="order__actions">
                    <button onClick={() => acceptOrder(order)}>Accepter</button>
                    <button>Refuser</button>
                    <button onClick={() => toggleDetails(order)}>Voir les détails</button>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Popups */}
        {showDetails && (
          <OrderDetailsPopup order={selectedOrder} onClose={toggleDetails} />
        )}

        {showHistory && (
          <OrderHistoryPopup history={historyData} onClose={toggleHistory} />
        )}

        <OrderHistorySection history={historyData} onOpen={toggleHistory} />
      </main>
    </div>
  )
}

export default Delivery
