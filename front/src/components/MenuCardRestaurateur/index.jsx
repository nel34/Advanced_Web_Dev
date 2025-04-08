import './index.sass'
import { useState } from 'react'
import axios from 'axios'

export default function MenuCardRestaurateur({
  id,
  name,
  price,
  image,
  description,
  restaurantId,
  productId,
  onUpdate
}) {
  const [showModal, setShowModal] = useState(false)
  const [editedData, setEditedData] = useState({
    name,
    description: description || '',
    price,
    image,
    product: productId || []
  })
  const [availableProducts, setAvailableProducts] = useState([])

  const handleEditClick = () => {
    fetchAvailableProducts()
    setShowModal(true)
  }

  const handleClose = () => setShowModal(false)

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value })
  }

  const handleProductToggle = (productId) => {
    setEditedData((prev) => {
      const isSelected = prev.product.includes(productId)
      const updatedProducts = isSelected
        ? prev.product.filter((id) => id !== productId)
        : [...prev.product, productId]
      return { ...prev, product: updatedProducts }
    })
  }

  const fetchAvailableProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/products/by-restaurant/${restaurantId}`)
      setAvailableProducts(res.data)
    } catch (err) {
      console.error('Erreur lors du chargement des produits :', err)
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/menus/${id}`, {
        ...editedData,
        restaurantId
      })
      setShowModal(false)
      onUpdate()
    } catch (err) {
      console.error('Erreur lors de la mise à jour du menu :', err)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/menus/${id}`)
      setShowModal(false)
      onUpdate()
    } catch (err) {
      console.error('Erreur lors de la suppression du menu :', err)
    }
  }

  return (
    <>
      <div className="menu-card" onClick={handleEditClick}>
        <div className="menu-card__left">
          <span className="menu-card__edit">✏️</span>
          <img src={image} alt={name} className="menu-card__image" />
          <p className="menu-card__name">{name}</p>
        </div>
        <p className="menu-card__price">{price}€</p>
      </div>

      {showModal && (
        <div className="menu-card__modal" onClick={handleClose}>
          <div className="menu-card__modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Modifier le menu</h3>
            <img src={editedData.image} alt="aperçu" className="menu-card__modal-image" />
            <label>Nom</label>
            <input type="text" name="name" value={editedData.name} onChange={handleChange} />
            <label>Description</label>
            <input type="text" name="description" value={editedData.description} onChange={handleChange} />
            <label>Prix</label>
            <input type="number" name="price" value={editedData.price} onChange={handleChange} />
            <label>Image</label>
            <input type="text" name="image" value={editedData.image} onChange={handleChange} />

            <p>Produits du menu :</p>
            <div className="product-list">
              {availableProducts.map((prod) => (
                <label key={prod._id} className="product-checkbox styled-checkbox">
                  <input
                    type="checkbox"
                    checked={editedData.product.includes(prod._id)}
                    onChange={() => handleProductToggle(prod._id)}
                  />
                  <span>{prod.name} – {prod.price}€</span>
                </label>
              ))}
            </div>

            <div className="menu-card__modal-actions">
              <button onClick={handleDelete}>Supprimer</button>
              <button onClick={handleUpdate}>Valider</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
