import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchWithAuth } from '../../utils/hooks'
import './index.sass'
import TechnicalNotification from '../../components/TechnicalNotification'

export default function OrderStatus() {
  const { idOrder } = useParams()
  const [menuItemsDetails, setMenuItemsDetails] = useState([])
  const [restaurantDetails, setRestaurantDetails] = useState(null)

  const [notification, setNotification] = useState(null)
  const [liveStatus, setLiveStatus] = useState(null)
  const previousStatusRef = useRef(null)

  const { isLoading, data, error } = useFetchWithAuth('GET', `http://localhost:8080/api/orders/${idOrder}`)

  // Récupérer les détails des menus
  useEffect(() => {
    const fetchMenuItems = async () => {
      if (data?.menu) {
        // Compter les quantités de chaque item
        const itemCountMap = {}
        data.menu.forEach(itemId => {
          itemCountMap[itemId] = (itemCountMap[itemId] || 0) + 1
        })

        const uniqueItemIds = Object.keys(itemCountMap)

        const fetchedItems = await Promise.all(
          uniqueItemIds.map(async (itemId) => {
            const response = await fetch(`http://localhost:8080/api/menus/${itemId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            })
            return await response.json()
          })
        )

        // Ajouter la quantité à chaque item
        const itemsWithQuantities = fetchedItems.map(item => ({
          ...item,
          quantity: itemCountMap[item._id] || 1
        }))

        setMenuItemsDetails(itemsWithQuantities)
      }
    }

    fetchMenuItems()
  }, [data])

  // Récupérer les infos du restaurant
  useEffect(() => {
    const fetchRestaurant = async () => {
      if (data?.restaurant_id) {
        try {
          const response = await fetch(`http://localhost:8080/api/restaurants/${data.restaurant_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const restaurantData = await response.json()
          setRestaurantDetails(restaurantData)
        } catch (err) {
          console.error('Erreur en récupérant le restaurant :', err)
        }
      }
    }

    fetchRestaurant()
  }, [data])

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/orders/${idOrder}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const updatedData = await res.json()

        if (updatedData.status && updatedData.status !== previousStatusRef.current) {
          setLiveStatus(updatedData.status)
          previousStatusRef.current = updatedData.status

          setNotification({
            type: 'info',
            message: `Nouveau statut : ${status[updatedData.status] || updatedData.status}`
          })

          // Recharger la page si le statut devient "In_Delivery"
          if (updatedData.status === 'In_Delivery') {
            window.location.reload()
          }
        }
      } catch (err) {
        console.error('Erreur lors du rafraîchissement du statut :', err)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [idOrder])

  useEffect(() => {
    if (data && data.status) {
      setLiveStatus(data.status)
      previousStatusRef.current = data.status
    }
  }, [data])

  const status = {
    Pending_Restaurateur: 'En attente du restaurateur',
    In_Progress: 'En préparation',
    Pending_Delivery: 'En attente de livraison',
    In_Delivery: 'En livraison',
    Delivered: 'Livré',
    Cancelled: 'Annulé'
  }

  return (
    <div className='home home--secondary'>
      <a href="#" onClick={() => window.location.href = '/order-history'} className="order-back-link">
        ← Voir l'historique des commandes
      </a>

      <div className='info-section'>
        {notification && (
          <TechnicalNotification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <h1>Statut de la commande</h1>
        {isLoading && <p>Chargement...</p>}
        {error && <p>{error}</p>}
        {data && (
          <>
            <div className='order-status'>
              <h2>Commande n°{data._id}</h2>
              <p className='status-text'>Statut : {status[liveStatus]}</p>
              <p>Total: {data.total} €</p>
              <p>Adresse de livraison : {data.location}</p>
              {data.delivery_person_name && (
                <p>Nom du livreur : {data.delivery_person_name}</p>
              )}
            </div>

            {restaurantDetails && (
              <div className='order-restaurant'>
                <div className='order-restaurant__details'>
                  <img src={restaurantDetails.image} alt={restaurantDetails.name} />
                  <div>
                    <h3>{restaurantDetails.name}</h3>
                    <p>{restaurantDetails.address}</p>
                  </div>
                </div>
              </div>
            )}

            <div className='order-menus'>
              <h3>Articles de la commande :</h3>
              <div className='order-menus__list'>
                {menuItemsDetails.map((item) => (
                  <div key={item._id} className='order-menus__details'>
                    <div className='order-menus__details__item'>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h4>{item.name}</h4>
                        <p>Prix: {item.price} €</p>
                        <p>Quantité: {item.quantity}</p>
                      </div>
                    </div>
                    <p>Total: {item.price * item.quantity} €</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}