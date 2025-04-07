import React from 'react'

const OrderCard = ({ order, onDetails }) => {
  return (
    <div className="order-card">
      <p>Restaurant : {order.restaurant}</p>
        <p>Client : {order.client}</p>
        <p>Adresse : {order.address}</p>
        <p>Total : {order.total}</p>
      <button className="btn" onClick={() => onDetails(order)}>Détails</button>
    </div>
  )
}

export default OrderCard