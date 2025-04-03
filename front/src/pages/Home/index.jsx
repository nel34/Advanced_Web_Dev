import { useFetch } from '../../utils/hooks'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RestaurantCard from '../../components/RestaurantCard'
import CategorySelector from '../../components/CategorySelector'
import './index.sass'

export default function Home() {
  const { isLoading, data, error } = useFetch('http://localhost:8080/api/restaurants')

  return (
    <div>
      <Header />
      <div className='home'>
        {data.length > 0 && <CategorySelector categories={data.map(item => item.category)} />}
        <div className='line'></div>
        <div className='home__restaurants'>
          {isLoading && <p>Chargement...</p>}
          {error && <p>Erreur lors du chargement</p>}
          {data.length > 0 && data.map((item, index) => (
            <RestaurantCard key={index} data={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}