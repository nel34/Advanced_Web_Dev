import './index.sass'

export default function CardPaiement({ delivery }) {
  const date = new Date(delivery.createdAt)
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  const formattedTime = date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="card-paiement">
      <div className="card-paiement__left">
        <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="profil" />
        <div className="info">
          <span className="name">{delivery.delivery_person_name}</span>
          <span className="menu">Menu : {delivery.menu_name}</span>
          <span className="date">Date : {formattedDate} à {formattedTime}</span>
        </div>
      </div>
      <div className="card-paiement__price">{delivery.menu_price.toFixed(2)} €</div>
    </div>
  )
}
