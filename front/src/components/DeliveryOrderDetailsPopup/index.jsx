import React from 'react'
import './index.sass'

const OrderDetailsPopup = ({ order, onClose, restaurantDetails }) => {
  if (!order) return null

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Détails de la commande</h2>
        <p><strong>Client :</strong> {order.username}</p>
        {restaurantDetails && (
          <>
            <p><strong>Nom du restaurant :</strong> {restaurantDetails.name}</p>
            <p><strong>Adresse du restaurant :</strong> {restaurantDetails.address}</p>
          </>
        )}
        <p><strong>Adresse de livraison :</strong> {order.location}</p>
        <p><strong>Prix :</strong> {order.total}</p>
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
