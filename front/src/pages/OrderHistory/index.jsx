import { useAuth } from '../../context/AuthContext'
import { useFetchWithAuth } from '../../utils/hooks'

export default function OrderHistory() {
  const { user } = useAuth()

  const { isLoading, data, error } = useFetchWithAuth('GET', `http://localhost:8080/api/orders/users/${user.id}`)

  const status = {
    Pending_Restaurateur: 'En attente du restaurateur',
    In_Progress: 'En préparation',
    Pending_Delivery: 'En attente de livraison',
    In_Delivery: 'En livraison',
    Delivered: 'Livré',
    Cancelled: 'Annulé'
  }

  return (
    <div className='home'>
      <a href='#' onClick={() => window.history.back()}>Retour au compte</a>
      <h1>Historique de commandes</h1>
      { isLoading ? (
        <div className='home__loading'>
          <h2>Chargement...</h2>
        </div>
      ) : error ? (
        <h2>Erreur lors du chargement</h2>
      ) : data && data.length > 0 ? (
        <div className='order-history'>
          {data.map((order) => (
            <a key={order._id} href={`/order/${order._id}`} className='order-history__item'>
              <div key={order._id} className='order-history__item'>
                <h3>Commande n°{order._id}</h3>
                <p className='status-text'>Statut: {status[order.status]}</p>
                <>Date: {new Date(order.createdAt).toLocaleDateString('fr-FR')}</>
                <p>Total: {order.total} €</p>
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