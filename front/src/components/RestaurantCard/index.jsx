import { Link } from 'react-router-dom'
import './index.sass'

export default function RestaurantCard({ data }) {
  return (
    <Link to={`/restaurant/${data._id}`}>
      <div className="restaurant-card">
        <img src={data.image} alt={data.name} className="restaurant-card__image" />
        <div className="restaurant-card__content">
          <h3>{data.name}</h3>
        </div>
      </div>
    </Link>
  )
}
