import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.sass'
import OrderDetailsPopup from '../../components/DeliveryOrderDetailsPopup'

const Delivery = () => {
  const [showDetails, setShowDetails] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [availableOrders, setAvailableOrders] = useState([])

  const userData = JSON.parse(localStorage.getItem('user') || '{}')
  const deliveryPersonId = userData?.id || ''

  const toggleDetails = (order = null) => {
    setSelectedOrder(order)
    setShowDetails(!showDetails)
  }

  useEffect(() => {
    if (deliveryPersonId) {
      fetchAvailableOrders()
    }
  }, [deliveryPersonId])

  const fetchAvailableOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/orders')
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

      setTimeout(() => {
        fetchAvailableOrders()
      }, 300)
    } catch (err) {
      console.error("Erreur lors de l'acceptation de la commande :", err)
    }
  }

  const markAsDelivered = async (order) => {
    try {
      const updatedOrder = {
        ...order,
        status: 'Delivered'
      }

      await axios.put(`http://localhost:8080/api/orders/${order.order_id}`, updatedOrder)

      setTimeout(() => {
        fetchAvailableOrders()
      }, 300)
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la commande :", err)
    }
  }

  const myActiveOrders = availableOrders.filter(
    order =>
      order.status === 'In_Delivery' &&
      String(order.delivery_person_id) === String(deliveryPersonId)
  )

  const myDeliveredOrders = availableOrders.filter(
    order =>
      order.status === 'Delivered' &&
      String(order.delivery_person_id) === String(deliveryPersonId)
  )

  return (
    <div className="delivery-page">
      <main className="delivery-container">

        {/* Commandes en cours */}
        <section className="current-orders">
          <h2>Mes livraisons en cours :</h2>
          <div className="orders-grid">
            {myActiveOrders.length === 0 ? (
              <p>Aucune commande en cours</p>
            ) : (
              myActiveOrders.map(order => (
                <div key={order.order_id} className="order">
                  <p><strong>Commande ID :</strong> {order.order_id}</p>
                  <p><strong>Prix :</strong> {order.menu_price}</p>
                  <p><strong>Adresse :</strong> {order.location}</p>
                  <div className="order__actions">
                    <button className="btn-details" onClick={() => toggleDetails(order)}>Voir les détails</button>
                    <button className="btn-delivered" onClick={() => markAsDelivered(order)}>Livré</button>
                  </div>
                </div>
              ))
            )}
          </div>
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
                    <button className="btn-accept" onClick={() => acceptOrder(order)}>Accepter</button>
                    <button className="btn-refuse">Refuser</button>
                    <button className="btn-details" onClick={() => toggleDetails(order)}>Voir les détails</button>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Commandes livrées */}
        <section className="history-orders">
          <h2>Commandes livrées</h2>
          <div className="orders-grid">
            {myDeliveredOrders.length === 0 ? (
              <p>Aucune commande livrée</p>
            ) : (
              myDeliveredOrders.map(order => (
                <div key={order.order_id} className="order">
                  <p><strong>Commande ID :</strong> {order.order_id}</p>
                  <p><strong>Prix :</strong> {order.menu_price}</p>
                  <p><strong>Adresse :</strong> {order.location}</p>
                  <div className="order__actions">
                    <button className="btn-details" onClick={() => toggleDetails(order)}>Voir les détails</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Popups */}
        {showDetails && (
          <OrderDetailsPopup order={selectedOrder} onClose={toggleDetails} />
        )}
      </main>
    </div>
  )
}

export default Delivery
