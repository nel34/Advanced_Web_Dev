import './index.sass'

export default function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <img src={restaurant.image} alt={restaurant.name} />
      <h3>{restaurant.name}</h3>
      <p>{restaurant.description}</p>
      <p>Rating: {restaurant.rating}</p>
    </div>
  )
}
