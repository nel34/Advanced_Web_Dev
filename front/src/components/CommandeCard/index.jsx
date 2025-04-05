import './index.sass'
import axios from 'axios'

export default function CommandeCard({ delivery, onUpdate }) {
  const handleAccept = async () => {
    try {
      await axios.put(`http://localhost:3040/api/deliveries/${delivery._id}`, {
        status: 'completed'
      })
      onUpdate()
    } catch (err) {
      console.error('Erreur lors de l’acceptation de la commande :', err)
    }
  }

  const handleReject = async () => {
    try {
      await axios.put(`http://localhost:3040/api/deliveries/${delivery._id}`, {
        status: 'refused'
      })
      onUpdate()
    } catch (err) {
      console.error('Erreur lors du refus de la commande :', err)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3040/api/deliveries/${delivery._id}`)
      onUpdate()
    } catch (err) {
      console.error('Erreur lors de la suppression de la commande :', err)
    }
  }

  return (
    <div className="commande-card">
      <div className="commande-card__left">
        <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="client" />
        <div>
          <p>{delivery.delivery_person_name || 'Livreur inconnu'}</p>
          <p className="commande-card__order">Commande : {delivery.order_id}</p>
          <p className="commande-card__menu">Menu : {delivery.menu_name}</p>
        </div>
      </div>

      <div className="commande-card__right">
        {delivery.status === 'completed' ? (
          <>
            <span className="accepted-text">✅ Accepté</span>
            <button onClick={handleDelete}>🗑 Supprimer</button>
          </>
        ) : (
          <>
            <button onClick={handleAccept}>Accepter</button>
            <button onClick={handleReject} className="reject">Refuser</button>
          </>
        )}
      </div>
    </div>
  )
}
