import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.sass'
import pdp from '../../assets/pdp.jpg'
import { FaHome, FaUtensils, FaShoppingCart, FaCreditCard } from 'react-icons/fa'
import axios from 'axios'

export default function SidebarRestaurateur() {
  const [restaurantName, setRestaurantName] = useState('')
  const RESTAURANT_ID = '670000000000000000000001'

  useEffect(() => {
    const fetchRestaurantName = async () => {
      try {
        const res = await axios.get(`http://localhost:3050/api/restaurants/${RESTAURANT_ID}`)
        setRestaurantName(res.data.name)
      } catch (err) {
        console.error('Erreur lors de la récupération du nom du restaurant :', err)
      }
    }

    fetchRestaurantName()
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar__restaurant">
        <div className="sidebar__avatar-wrapper">
          <img src={pdp} alt="restaurant" className="sidebar__avatar" />
        </div>
        <span className="sidebar__name">{restaurantName || '...'}</span>
      </div>
      <nav className="sidebar__nav">
        <Link to="/" className="sidebar__link"><FaHome /> Accueil</Link>
        <Link to="/menu" className="sidebar__link"><FaUtensils /> Menu</Link>
        <Link to="/commandes" className="sidebar__link"><FaShoppingCart /> Commandes</Link>
        <Link to="/paiements" className="sidebar__link"><FaCreditCard /> Paiements</Link>
      </nav>
    </div>
  )
}
