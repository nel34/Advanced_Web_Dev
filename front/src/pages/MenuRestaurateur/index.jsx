import { useEffect, useState } from 'react'
import axios from 'axios'
import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import MenuCardRestaurateur from '../../components/MenuCardRestaurateur'
import AddMenuModal from '../../components/AddMenu'
import './index.sass'

export default function MenuRestaurateur() {
  const [menus, setMenus] = useState([])
  const [availableProducts, setAvailableProducts] = useState([])
  const [showModal, setShowModal] = useState(false)

  const restaurantId = '670000000000000000000001' // ← ID du restaurateur codé en dur

  useEffect(() => {
    fetchMenus()
    fetchProducts()
  }, [])

  const fetchMenus = async () => {
    try {
      const res = await axios.get(`http://localhost:3020/api/menus/restaurants/${restaurantId}`)
      setMenus(res.data)
    } catch (err) {
      console.error('Erreur lors du chargement des menus :', err)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:3010/api/products/by-restaurant/${restaurantId}`)
      setAvailableProducts(res.data)
    } catch (err) {
      console.error('Erreur lors du chargement des produits :', err)
    }
  }

  return (
    <div className="accueil-restaurateur">
      <div className="accueil-restaurateur__body">
        <SidebarRestaurateur />
        <main className="accueil-restaurateur__content">
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
        </main>
      </div>

      {showModal && (
        <AddMenuModal
          restaurantId={restaurantId}
          onClose={() => setShowModal(false)}
          onMenuCreated={fetchMenus}
        />
      )}
    </div>
  )
}
