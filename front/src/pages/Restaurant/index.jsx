import { useParams } from 'react-router-dom'
import { useFetch } from '../../utils/hooks'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SearchBar from '../../components/SearchBar'
import ProductCard from '../../components/ProductCard'
import './index.sass'

export default function Restaurant() {
  const { idRestaurant } = useParams()
  const { isLoading, data, error } = useFetch(`http://localhost:8080/api/restaurants/${idRestaurant}`)
  const { isLoading: isLoadingMenus, data: dataMenus, error: errorMenus } = useFetch(`http://localhost:8080/api/menus/restaurants/${idRestaurant}`)

  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' })

  return (
    <div>
      <Header />
      <div className='home'>
        <div className='restaurant-banner'>
          <img src={data.image} alt='Restaurant' />
        </div>
        <div className='restaurant-info'>
          <div>
            { isLoading && <p>Chargement...</p> }
            { error && <p>Erreur lors du chargement</p> }
            { data && (
              <div className='restaurant-info__details'>
                <h1>{data.name}</h1>
                <p>{data.address}</p>
                <p>{data.phone}</p>
                <p>{data.description}</p>
                <div>
                  <h3>Horaires d'ouverture :</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {Object.entries(data.opening_hours).map(([day, time]) => (
                      <li
                        key={day}
                        style={{
                          fontWeight: day.toLowerCase() === today.toLowerCase() ? 'bold' : 'normal',
                          color: time === 'Fermé' ? 'red' : 'black',
                          fontSize: '16px'
                        }}
                      >
                        <strong>{day} :</strong> {time}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <SearchBar />
        </div>
        <div className='line'></div>
        <div className='restaurant-products'>
          { isLoadingMenus && <p>Chargement...</p> }
          { errorMenus && <p>Erreur lors du chargement</p> }
          { dataMenus.length > 0 && dataMenus.map((item, index) => (
            <ProductCard key={index} data={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}