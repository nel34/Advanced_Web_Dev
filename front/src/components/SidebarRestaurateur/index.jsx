import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import './index.sass'
import { FaHome, FaUtensils, FaShoppingCart, FaCreditCard } from 'react-icons/fa'
import axios from 'axios'

export default function SidebarRestaurateur() {
  const { user } = useAuth()
  const [restaurantName, setRestaurantName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/restaurants/user/${user.id}`)
        setRestaurantName(res.data.name)
        setImageUrl(res.data.image) // 👈 URL récupérée directement depuis Mongo
      } catch (err) {
        console.error('Erreur lors de la récupération du restaurant :', err)
      }
    }

    fetchRestaurant()
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar__restaurant">
        <div className="sidebar__avatar-wrapper">
          <img
            src={imageUrl}
            alt="restaurant"
            className="sidebar__avatar"
          />
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
