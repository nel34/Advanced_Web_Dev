import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import MenuCardRestaurateur from '../../components/MenuCardRestaurateur'
import AddMenuModal from '../../components/AddMenu'
import './index.sass'

export default function MenuRestaurateur() {
  const { user } = useAuth()
  const [restaurantId, setRestaurantId] = useState('')
  const [menus, setMenus] = useState([])
  const [availableProducts, setAvailableProducts] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (user?.id) {
      fetchRestaurantId()
    }
  }, [user])

  useEffect(() => {
    if (restaurantId) {
      fetchMenus()
      fetchProducts()
    }
  }, [restaurantId])

  const fetchRestaurantId = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/restaurants/user/${user.id}`)
      setRestaurantId(res.data._id)
    } catch (err) {
      console.error('Erreur lors de la récupération de l’ID du restaurant :', err)
    }
  }

  const fetchMenus = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/menus/restaurants/${restaurantId}`)
      setMenus(res.data)
    } catch (err) {
      console.error('Erreur lors du chargement des menus :', err)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/products/by-restaurant/${restaurantId}`)
      setAvailableProducts(res.data)
    } catch (err) {
      console.error('Erreur lors du chargement des produits :', err)
    }
  }

  return (
    <div className="accueil-restaurateur">
      <SidebarRestaurateur />
      <div className="accueil-restaurateur__content">
        <h2>Vos menus :</h2>
        <div className="menu-header">
          <button className="add-menu-btn" onClick={() => setShowModal(true)}>➕ Ajouter un menu</button>
        </div>

        <div className="menu-cards">
          {menus.map(menu => (
            <MenuCardRestaurateur
              key={menu._id}
              id={menu._id}
              name={menu.name}
              price={menu.price}
              image={menu.image}
              description={menu.description}
              productId={menu.product}
              restaurantId={menu.restaurantId}
              onUpdate={fetchMenus}
            />
          ))}
        </div>
      </div>

      {showModal && restaurantId && (
        <AddMenuModal
          restaurantId={restaurantId}
          onClose={() => setShowModal(false)}
          onMenuCreated={fetchMenus}
        />
      )}
    </div>
  )
}
