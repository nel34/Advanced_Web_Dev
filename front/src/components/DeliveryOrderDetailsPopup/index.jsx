import React from 'react'
import './index.sass'

const OrderDetailsPopup = ({ order, onClose }) => {
  if (!order) return null

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Détails de la commande</h2>
        <p><strong>Commande ID :</strong> {order._id}</p>
        <p><strong>User ID :</strong> {order.user_id}</p>
        <p><strong>Restaurant ID :</strong> {order.restaurant_id}</p>
        <p><strong>Status :</strong> {
          order.status === 'Pending_Delivery' ? 'En attente de livraison' :
            order.status === 'Delivered' ? 'Livrée' :
              order.status === 'Cancelled' ? 'Annulée' :
                order.status === 'In_Progress' ? 'En cours' :
                  order.status === 'In_Delivery' ? 'En livraison' :
                  'Statut inconnu'
        }</p>
        <p><strong>Prix :</strong> {order.total} €</p>
        <p><strong>Adresse :</strong> {order.location}</p>
        <button className="btn" onClick={onClose}>Fermer</button>
      </div>
    </div>
  )
}

export default OrderDetailsPopup
