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
      if (delivery.status === "completed") {
        await axios.put(`http://localhost:3040/api/deliveries/${delivery._id}`, {
          status: "finished"
        });
      } else {
        await axios.put(`http://localhost:3040/api/deliveries/${delivery._id}`, {
          status: "refused"
        });
      }
      onUpdate();
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la commande :", err);
    }
  };

  const formattedDate = new Date(delivery.createdAt).toLocaleString('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'short'
  })

  return (
    <div className="commande-card">
      <div className="commande-card__left">
        <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="client" />
        <div>
          <p><strong>{delivery.delivery_person_name || 'Livreur inconnu'}</strong></p>
          <p><strong>Menu : {delivery.menu_name}</strong></p>
          <p className="commande-card__order">Commande : {delivery.order_id}</p>
          <p className="commande-card__date">{formattedDate}</p>
        </div>
      </div>

      <div className="commande-card__right">
        {delivery.status === 'completed' ? (
          <>
            <span className="accepted-text">✅ Accepté</span>
            <button onClick={handleReject}>🗑 Supprimer</button>
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
