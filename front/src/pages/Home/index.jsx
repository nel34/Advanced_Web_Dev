import { useFetch } from '../../utils/hooks'
import RestaurantCard from '../../components/RestaurantCard'
import './index.sass'

export default function Home() {
  const { isLoading, data, error } = useFetch('http://localhost:8080/api/restaurants')

  return (
    <div className='home'>
      <div className='home__restaurants'>
        {isLoading ? <p>Chargement...</p>
          : error ? <p>Erreur lors du chargement</p>
            : data.map((item, index) => (
              <RestaurantCard key={index} data={item} />
            ))}
      </div>
    </div>
  )
}