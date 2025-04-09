import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../../utils/hooks'
import MenuCard from '../../components/MenuCard'
import { useEffect } from 'react'
import './index.sass'

export default function Restaurant() {
  const { idRestaurant } = useParams()
  const { isLoading, data, error } = useFetch(`http://localhost:8080/api/restaurants/${idRestaurant}`)
  const { isLoading: isLoadingMenus, data: dataMenus, error: errorMenus } = useFetch(`http://localhost:8080/api/menus/restaurants/${idRestaurant}`)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' })

  return (
    <div className='home'>
      <Link to={'/'} className='home__back'>
        <p>← Retour à l'accueil</p>
      </Link>
      <div className='restaurant-banner'>
        <img src={data.image} alt='Restaurant' />
      </div>
      <div className='restaurant-info'>
        <div>
          { isLoading ? <p>Chargement...</p>
            : error ? <p>Erreur lors du chargement</p>
              : (
                <div className='restaurant-info__details'>
                  <h1>{data.name}</h1>
                  {Object.entries(data.opening_hours).map(([day, time]) => (
                    day.toLowerCase() === today.toLowerCase() && (
                      <p>{time}</p>
                    )
                  ))}
                  <p>{data.address}</p>
                  <p>{data.phone}</p>
                  <br/>
                  <p>{data.description}</p>
                </div>
              )}
        </div>
      </div>
      <div className='line'></div>
      <div className='restaurant-products'>
        { isLoadingMenus && <p>Chargement...</p> }
        { errorMenus && <p>Erreur lors du chargement</p> }
        { dataMenus.length > 0 && dataMenus.map((item, index) => (
          <MenuCard key={index} data={item} />
        ))}
      </div>
    </div>
  )
}