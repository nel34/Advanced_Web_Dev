import './index.sass'

const statusLabels = {
  Pending_Restaurateur: 'En attente du restaurateur',
  In_Progress: 'Pris en charge par le restaurant',
  Pending_Delivery: 'En attente d’un livreur',
  In_Delivery: 'Livraison en cours',
  Delivered: 'Commande livrée',
  Cancelled: 'Commande annulée'
}

const statusOrder = [
  'Pending_Restaurateur',
  'In_Progress',
  'Pending_Delivery',
  'In_Delivery',
  'Delivered',
  'Cancelled'
]

export default function CommercialStats({ orders }) {
  const grouped = statusOrder.reduce((acc, status) => {
    acc[status] = orders.filter(order => order.status === status)
    return acc
  }, {})

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

  return (
    <div className="commercial-stats">
      <h2>Chiffre d'affaires transactionnel global en cours</h2>
      <div className="revenue-box">{totalRevenue.toFixed(2)} €</div>

      <div className="status-grid">
        {statusOrder.map(status => (
          <div key={status} className="status-column">
            <h3>{statusLabels[status]}</h3>
            {grouped[status].length === 0 ? (
              <p style={{ fontStyle: 'italic' }}>Aucune</p>
            ) : (
              grouped[status].map(order => (
                <div key={order._id} className="order-card">
                  <p><strong>{order.username}</strong></p>
                  <p>Total : {order.total.toFixed(2)} €</p>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
