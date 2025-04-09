import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.sass'
import OrderDetailsPopup from '../../components/DeliveryOrderDetailsPopup'

const Delivery = () => {
  const [showDetails, setShowDetails] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [availableOrders, setAvailableOrders] = useState([])
  const [myDeliveredOrders, setMyDeliveredOrders] = useState([])
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(3)  // Number of orders per page

  const userData = JSON.parse(localStorage.getItem('user') || '{}')
  const deliveryPersonId = userData?.id || ''

  const toggleDetails = (order = null) => {
    setSelectedOrder(order)
    setShowDetails(!showDetails)
  }

  useEffect(() => {
    if (deliveryPersonId) {
      fetchAvailableOrders()
      fetchDeliveredOrders()
      const intervalId = setInterval(() => {
        fetchAvailableOrders()
        fetchDeliveredOrders()
      }, 5000)
      return () => clearInterval(intervalId)
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

  const fetchDeliveredOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/orders')
      const deliveredOrders = res.data.filter(order => order.status === 'Delivered' && String(order.delivery_person_id) === String(deliveryPersonId))
      setMyDeliveredOrders(deliveredOrders)
    } catch (err) {
      console.error('Erreur lors du chargement des commandes livrées :', err)
    }
  }

  const acceptOrder = async (order) => {
    try {
      const updatedOrder = {
        ...order,
        status: 'In_Delivery',
        delivery_person_id: deliveryPersonId
      }

      await axios.put(`http://localhost:8080/api/orders/${order._id}`, updatedOrder)

      setTimeout(() => {
        fetchAvailableOrders()
      }, 300)
    } catch (err) {
      console.error('Erreur lors de l\'acceptation de la commande :', err)
    }
  }

  const refuseOrder = async (order) => {
    try {
      const updatedOrder = {
        ...order,
        status: 'Cancelled'
      }

      await axios.put(`http://localhost:8080/api/orders/${order._id}`, updatedOrder)

      setTimeout(() => {
        fetchAvailableOrders()
      }, 300)
    } catch (err) {
      console.error('Erreur lors du refus de la commande :', err)
    }
  }

  const markAsDelivered = async (order) => {
    try {
      const updatedOrder = {
        ...order,
        status: 'Delivered'
      }

      await axios.put(`http://localhost:8080/api/orders/${order._id}`, updatedOrder)

      setTimeout(() => {
        fetchDeliveredOrders()
      }, 300)
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la commande :', err)
    }
  }

  const myActiveOrders = availableOrders.filter(
    order =>
      order.status === 'In_Delivery' &&
      String(order.delivery_person_id) === String(deliveryPersonId)
  )

  // Paginate the delivered orders
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = myDeliveredOrders.slice(indexOfFirstOrder, indexOfLastOrder)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(myDeliveredOrders.length / ordersPerPage); i++) {
    pageNumbers.push(i)
  }

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/restaurants')
        const restaurantData = res.data.reduce((acc, restaurant) => {
          acc[restaurant._id] = restaurant
          return acc
        }, {})
        setRestaurantDetails(restaurantData)
      } catch (err) {
        console.error('Erreur lors du chargement des détails des restaurants :', err)
      }
    }

    fetchRestaurantDetails()
  }, [])

  const [restaurantDetails, setRestaurantDetails] = useState({})

  return (
    <div className="home home--secondary">
      <main className="delivery-container">
        <h1>Dashboard de livraisons</h1>

        {/* Section pour les commandes en cours */}
        <section className="info-section">
          <h2>Mes livraisons en cours :</h2>
          <div className="orders-grid">
            {myActiveOrders.length === 0 ? (
              <p>Aucune commande en cours</p>
            ) : (
              myActiveOrders.map(order => (
                <div key={order._id} className="order">
                  <p><strong>Client :</strong> {order.username}</p>
                  {restaurantDetails[order.restaurant_id] && (
                    <>
                      <p><strong>Restaurant :</strong> {restaurantDetails[order.restaurant_id].name}</p>
                      <p><strong>Adresse du restaurant :</strong> {restaurantDetails[order.restaurant_id].address}</p>
                    </>
                  )}
                  <p><strong>Adresse de livraison :</strong> {order.location}</p>
                  <div className="order__actions">
                    <button className="btn-details" onClick={() => toggleDetails(order)}>Voir les détails</button>
                    <button className="btn-delivered" onClick={() => markAsDelivered(order)}>Livré</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Section pour les commandes disponibles */}
        <section className="info-section">
          <h2>Commandes disponibles</h2>
          <div className="orders-grid">
            {availableOrders.filter(order => order.status === 'Pending_Delivery').length === 0 ? (
              <p>Aucune commande disponible</p>
            ) : (
              availableOrders
                .filter(order => order.status === 'Pending_Delivery')
                .map(order => (
                  <div key={order._id} className="order">
                    <p><strong>Client :</strong> {order.username}</p>
                    {restaurantDetails[order.restaurant_id] && (
                      <>
                        <p><strong>Restaurant :</strong> {restaurantDetails[order.restaurant_id].name}</p>
                        <p><strong>Adresse du restaurant :</strong> {restaurantDetails[order.restaurant_id].address}</p>
                      </>
                    )}
                    <p><strong>Adresse de livraison :</strong> {order.location}</p>
                    <div className="order__actions">
                      <button className="btn-accept" onClick={() => acceptOrder(order)}>Accepter</button>
                      <button className="btn-refuse" onClick={() => refuseOrder(order)}>Refuser</button>
                      <button className="btn-details" onClick={() => toggleDetails(order)}>Voir les détails</button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </section>

        {/* Historique des commandes */}
        <section className="info-section order-history">
          <h2>Historique des commandes</h2>
          <div className="orders-grid">
            {currentOrders.length === 0 ? (
              <p>Aucune commande livrée</p>
            ) : (
              currentOrders.map(order => (
                <div key={order._id} className="order">
                  <p><strong>Client :</strong> {order.username}</p>
                  {restaurantDetails[order.restaurant_id] && (
                    <>
                      <p><strong>Restaurant :</strong> {restaurantDetails[order.restaurant_id].name}</p>
                      <p><strong>Adresse du restaurant :</strong> {restaurantDetails[order.restaurant_id].address}</p>
                    </>
                  )}
                  <p><strong>Adresse de livraison :</strong> {order.location}</p>
                  <div className="order__actions">
                    <button className="btn-details" onClick={() => toggleDetails(order)}>Voir les détails</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="pagination">
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={number === currentPage ? 'active' : ''}
              >
                {number}
              </button>
            ))}
          </div>
        </section>

        {/* Popups */}
        {showDetails && (
          <OrderDetailsPopup
            order={selectedOrder}
            restaurantDetails={restaurantDetails[selectedOrder?.restaurant_id] || {}}
            onClose={toggleDetails}
          />
        )}
      </main>
    </div>
  )
}

export default Delivery
