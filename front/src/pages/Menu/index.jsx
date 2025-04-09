import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../../utils/hooks'
import Button from '../../components/Button'
import { useCart } from '../../context/CartContext'
import { useEffect, useState } from 'react'
import TechnicalNotification from '../../components/TechnicalNotification'
import './index.sass'

export default function Menu() {
  const { idRestaurant, idMenu } = useParams()
  const { isLoading, data, error } = useFetch(`http://localhost:8080/api/menus/${idMenu}`)
  const { addToCart } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [notification, setNotification] = useState(null)

  const handleAddToCart = () => {
    addToCart(data)
    setNotification({
      type: 'success',
      message: `${data.name} a été ajouté à votre commande !`
    })
  }
  return (
    <div className='home'>
      {notification && (
        <TechnicalNotification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <Link to={`/restaurant/${idRestaurant}`} className='home__back'>
        <p>← Retour au restaurant</p>
      </Link>
      {isLoading ? <p>Chargement...</p>
        : error ? <p>Erreur lors du chargement</p>
          : (
            <div className='menu'>
              <img src={data.image} alt={data.name} />
              <div className='menu__info'>
                <div className='menu__info__details'>
                  <h1>{data.name}</h1>
                  <p className='menu__info__details__price'>{data.price}€</p>
                  <p>{data.description}</p>
                </div>
                <Button content='Ajouter à la commande' onClick={handleAddToCart} />
              </div>
            </div>
          )}
    </div>
  )
}