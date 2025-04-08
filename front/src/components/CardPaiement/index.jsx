import { useEffect, useState } from 'react'
import axios from 'axios'
import './index.sass'

export default function CardPaiement({ delivery }) {
  const [menuNames, setMenuNames] = useState([])

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const responses = await Promise.all(
          delivery.menu.map((menuId) =>
            axios.get(`http://localhost:8080/api/menus/${menuId}`)
          )
        )

        const names = responses.map(res => res.data.name)
        const counted = {}

        names.forEach(name => {
          counted[name] = (counted[name] || 0) + 1
        })

        const formatted = Object.entries(counted).map(([name, count]) =>
          count > 1 ? `${name} x${count}` : name
        )

        setMenuNames(formatted)
      } catch (err) {
        console.error('Erreur lors de la récupération des menus :', err)
      }
    }

    if (delivery.menu?.length) {
      fetchMenus()
    }
  }, [delivery.menu])

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
          <span className="name">{delivery.username || 'Client inconnu'}</span>
          <span className="menu">Menu : {menuNames.length > 0 ? menuNames.join(', ') : 'Chargement...'}</span>
          <span className="total">Total : {delivery.total?.toFixed(2)} €</span>
          <span className="order-id">Commande : {delivery.order_id}</span>
          <span className="date">Date : {formattedDate} à {formattedTime}</span>
        </div>
      </div>
      <div className="card-paiement__price">{delivery.total?.toFixed(2)} €</div>
    </div>
  )
}
