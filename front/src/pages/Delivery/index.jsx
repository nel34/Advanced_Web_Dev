import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import OrderCard from '../../components/Delivery/OrderCard'
import OrderDetailsPopup from '../../components/Delivery/OrderDetailsPopup'
import OrderHistoryPopup from '../../components/Delivery/OrderHistoryPopup'
import OrderHistorySection from '../../components/Delivery/OrderHistorySection'

import './index.sass'

const Delivery = () => {
  const [showHistory, setShowHistory] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [availableOrders, setAvailableOrders] = useState([])

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
      const res = await axios.get('http://localhost:3030/api/orders')
      console.log('Commandes reçues :', res.data)
      setAvailableOrders(res.data) // pas de filtre car pas de champ "status"
    } catch (err) {
      console.error('Erreur lors du chargement des commandes disponibles :', err)
    }
  }

  return (
    <div className="delivery-page">
      <Header />

      <main className="delivery-container">
        <section className="current-orders">
          <h2>Commandes en cours :</h2>
          <OrderCard order={currentOrder} onDetails={toggleDetails} />
        </section>

        <section className="available-orders">
          <h2>Commandes disponibles</h2>
          <div className="orders-grid">
            {availableOrders.map(order => (
              <div key={order._id} className="order">
                <p><strong>Commande ID :</strong> {order.order_id}</p>
                <p><strong>User ID :</strong> {order.user_id}</p>
                <p><strong>Restaurant ID :</strong> {order.restaurant_id}</p>
                <p><strong>Articles :</strong> {order.items.length} produit(s)</p>
                <div className="order__actions">
                  <button>Accepter</button>
                  <button>Refuser</button>
                  <button onClick={() => toggleDetails(order)}>Voir les détails</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {showDetails && (
          <OrderDetailsPopup order={selectedOrder} onClose={toggleDetails} />
        )}

        {showHistory && (
          <OrderHistoryPopup history={historyData} onClose={toggleHistory} />
        )}

        <OrderHistorySection history={historyData} onOpen={toggleHistory} />
      </main>

      <Footer />
    </div>
  )
}

export default Delivery
