import React from 'react'

const AvailableOrderItem = ({ order, onDetails, onAccept, onReject }) => {
  return (
    <div className="order">
      <p><strong>Client :</strong> {order.client}</p>
      <p><strong>Adresse :</strong> {order.address}</p>
      <p><strong>Total :</strong> {order.total} €</p>

      <div className="order__actions">
        <button onClick={() => onAccept(order)}>Accepter</button>
        <button onClick={() => onReject(order)}>Refuser</button>
        <button onClick={() => onDetails(order)}>Voir les détails</button>
      </div>
    </div>
  )
}

export default AvailableOrderItem