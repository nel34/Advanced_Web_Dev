import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../../utils/hooks'
import Button from '../../components/Button'
import './index.sass'

export default function Menu() {
  const { idRestaurant, idMenu } = useParams()
  const { isLoading, data, error } = useFetch(`http://localhost:8080/api/menus/${idMenu}`)

  return (
    <div className='home'>
      <Link to={`/restaurant/${idRestaurant}`} className='home__back'>
        <p>Retour au restaurant</p>
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
                <Button content='Ajouter à la commande' />
              </div>
            </div>
          )}
    </div>
  )
}