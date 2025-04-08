import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchWithAuth } from '../../utils/hooks'
import './index.sass'

export default function OrderStatus() {
  const { idOrder } = useParams()
  const { isLoading, data, error } = useFetchWithAuth('GET', `http://localhost:8080/api/orders/${idOrder}`)

  const [menuItemsDetails, setMenuItemsDetails] = useState([])
  const [restaurantDetails, setRestaurantDetails] = useState(null)

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
      <div className='info-section'>
        <h1>Statut de la commande</h1>
        {isLoading && <p>Chargement...</p>}
        {error && <p>{error}</p>}
        {data && (
          <>
            <div className='order-status'>
              <h2>Commande n°{data._id}</h2>
              <p className='status-text'>Statut: {status[data.status]}</p>
              <p>Total: {data.total} €</p>
              <p>Livraison à: {data.location}</p>
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
              <h3>Articles de la commande</h3>
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