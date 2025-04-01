import { Link } from 'react-router-dom'
import './index.sass'

export default function RestaurantCard(restaurant) {
  return (
    <Link to='/restaurants/1'>
      <div className="restaurant-card">
        <img src={restaurant.image} alt={restaurant.name} className="restaurant-card__image" />
        <div className="restaurant-card__content">
          <h3>{restaurant.name}</h3>
          <p>{restaurant.rating}</p>
        </div>
      </div>
    </Link>
  )
}
