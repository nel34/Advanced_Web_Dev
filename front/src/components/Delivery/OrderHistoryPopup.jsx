import React from 'react'

const OrderHistoryPopup = ({ history, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Historique des commandes</h2>
        <ul>
          {history.map((item, i) => (
            <li key={i} className="history-item">
              <p>Restaurant : {item.restaurant}</p>
              <p>Client : {item.client}</p>
              <p>Adresse : {item.address}</p>
              <p>Prix : {item.price}</p>
            </li>
          ))}
        </ul>
        <button className="btn" onClick={onClose}>Fermer</button>
      </div>
    </div>
  )
}

export default OrderHistoryPopup
