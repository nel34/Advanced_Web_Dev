import React from 'react'
import './index.sass'

const OrderDetailsPopup = ({ order, onClose }) => {
  if (!order) return null

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Détails de la commande</h2>
        <p>Restaurant : {order.restaurant}</p>
        <p>Client : {order.client}</p>
        <p>Adresse : {order.address}</p>
        <p>Code de livraison : {order.deliveryCode}</p>
        <h3>Produits :</h3>
        <ul>
          {order.items.map((item, i) => (
            <li key={i}>{item.quantity} x {item.name} - {item.price}</li>
          ))}
        </ul>
        <p>Total : {order.total}</p>
        <button className="btn" onClick={onClose}>Fermer</button>
      </div>
    </div>
  )
}

export default OrderDetailsPopup
