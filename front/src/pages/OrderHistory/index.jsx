import { useAuth } from '../../context/AuthContext'
import { useFetchWithAuth } from '../../utils/hooks'
import './index.sass'

export default function OrderHistory() {
  const { user } = useAuth()
  const { isLoading, data, error } = useFetchWithAuth('GET', `http://localhost:8080/api/orders/users/${user.id}`)

  const statusLabels = {
    Pending_Restaurateur: 'En attente du restaurateur',
    In_Progress: 'En préparation',
    Pending_Delivery: 'En attente de livraison',
    In_Delivery: 'En livraison',
    Delivered: 'Livré',
    Cancelled: 'Annulé'
  }

  const sortedOrders = data?.length > 0
    ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : []

  return (
    <div className='home'>
      <a href="#" onClick={() => window.location.href = '/account'} className="order-back-link">
        ← Retour au compte
      </a>
      <h1>Historique des commandes</h1>

      {isLoading ? (
        <div className='home__loading'>
          <h2>Chargement...</h2>
        </div>
      ) : error ? (
        <h2>Erreur lors du chargement</h2>
      ) : sortedOrders.length > 0 ? (
        <div className='order-history'>
          {sortedOrders.map((order) => (
            <a key={order._id} href={`/order/${order._id}`} className='order-history__item'>
              <div>
                <h3>Commande n°{order._id}</h3>
                <p>Date : {new Date(order.createdAt).toLocaleString()}</p>
                <p>Total : {order.total.toFixed(2)} €</p>
                <p>Adresse : {order.location}</p>
                <p>Statut : {statusLabels[order.status] || order.status}</p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <h2>Aucune commande trouvée</h2>
      )}
    </div>
  )
}