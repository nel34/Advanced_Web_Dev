import './index.sass'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function CommandeCard({ order, onUpdate }) {
  const [menuNames, setMenuNames] = useState([])

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const responses = await Promise.all(
          (order.menu || []).map(menuId =>
            axios.get(`http://localhost:8080/api/menus/${menuId}`)
          )
        )

        const nameCount = {}
        responses.forEach(res => {
          const name = res.data.name
          nameCount[name] = (nameCount[name] || 0) + 1
        })

        const formattedNames = Object.entries(nameCount).map(([name, count]) =>
          count > 1 ? `x${count} ${name}` : name
        )

        setMenuNames(formattedNames)
      } catch (err) {
        console.error('Erreur lors de la récupération des menus :', err)
      }
    }

    if (order.menu && order.menu.length > 0) {
      fetchMenus()
    }
  }, [order.menu])

  const updateStatus = async (newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${order.order_id}`, {
        status: newStatus
      })
      onUpdate()
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut :', err)
    }
  }

  const handleAccept = () => {
    if (order.status === 'Pending_Restaurateur') {
      updateStatus('In_Progress')
    }
  }

  const handleReject = () => {
    updateStatus('Cancelled')
  }

  const handleFinish = () => {
    if (order.status === 'In_Progress') {
      updateStatus('Pending_Delivery')
    }
  }

  const formattedDate = new Date(order.createdAt).toLocaleString('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'short'
  })

  return (
    <div className="commande-card">
      <div className="commande-card__left">
        <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="client" />
        <div>
          <p><strong>{order.username || 'Client inconnu'}</strong></p>
          <p><strong>Menu : {menuNames.join(', ') || '...'}</strong></p>
          <p><strong>Total : {order.total?.toFixed(2)}€</strong></p>
          <p className="commande-card__order">Commande : {order.order_id}</p>
          <p className="commande-card__date">{formattedDate}</p>
        </div>
      </div>

      <div className="commande-card__right">
        {order.status === 'Pending_Restaurateur' && (
          <>
            <button onClick={handleAccept}>Accepter</button>
            <button onClick={handleReject} className="reject">Refuser</button>
          </>
        )}

        {order.status === 'In_Progress' && (
          <>
            <span className="accepted-text">✅ En préparation</span>
            <button onClick={handleFinish}>Terminer</button>
            <button onClick={handleReject} className="reject">Annuler</button>
          </>
        )}

        {order.status === 'Pending_Delivery' && (
          <span className="waiting-text">🕓 En attente d’un livreur</span>
        )}

        {order.status === 'In_Delivery' && (
          <span className="delivery-text">🚚 Commande en cours de livraison</span>
        )}
      </div>
    </div>
  )
}
