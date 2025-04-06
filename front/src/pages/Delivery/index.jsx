import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import OrderCard from '../../components/Delivery/OrderCard'
import OrderDetailsPopup from '../../components/Delivery/OrderDetailsPopup'
import OrderHistoryPopup from '../../components/Delivery/OrderHistoryPopup'
import OrderHistorySection from '../../components/Delivery/OrderHistorySection'
import AvailableOrderItem from '../../components/Delivery/AvailableOrderItem'

import './index.sass'

const Delivery = () => {
  const [showHistory, setShowHistory] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

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

  const availableOrders = [
    {
      id: 201,
      restaurant: 'Pizza World',
      client: 'David',
      address: '33 rue Napoli',
      total: '20€',
      deliveryCode: 'NAP01',
      items: [
        { name: 'Pizza Margherita', quantity: 1, price: '12€' },
        { name: 'Coca', quantity: 2, price: '8€' }
      ]
    }
  ]

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
            {availableOrders.map((order, i) => (
              <AvailableOrderItem key={i} order={order} onDetails={toggleDetails} />
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