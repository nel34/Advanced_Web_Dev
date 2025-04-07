import React from 'react'

const OrderHistorySection = ({ history, onOpen }) => {
  return (
    <section className="order-history-section">
      <h2>Historique</h2>
      <ul>
        {history.map((item, i) => (
          <li key={i}>{item.restaurant} - {item.price}</li>
        ))}
      </ul>
      <button className="btn visual" onClick={onOpen}>Voir tout</button>
    </section>
  )
}

export default OrderHistorySection
