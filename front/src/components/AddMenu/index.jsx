import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './index.sass'

export default function AddMenuModal({ restaurantId, onClose, onMenuCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    product: []
  })
  const [productFormData, setProductFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    categories: ''
  })
  const [availableProducts, setAvailableProducts] = useState([])
  const [showProductModal, setShowProductModal] = useState(false)

  const modalRef = useRef()
  const productModalRef = useRef()

  useEffect(() => {
    fetchProducts()

    const handleClickOutside = (e) => {
      const clickedOutsideMain = modalRef.current && !modalRef.current.contains(e.target)
      const clickedOutsideProduct = productModalRef.current && !productModalRef.current.contains(e.target)
      if (showProductModal && clickedOutsideProduct && !modalRef.current.contains(e.target)) {
        setShowProductModal(false)
      } else if (!showProductModal && clickedOutsideMain) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showProductModal])

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/products/by-restaurant/${restaurantId}`)
      setAvailableProducts(res.data)
    } catch (err) {
      console.error('Erreur lors du chargement des produits :', err)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleProductInputChange = (e) => {
    setProductFormData({ ...productFormData, [e.target.name]: e.target.value })
  }

  const handleProductToggle = (productId) => {
    const updated = formData.product.includes(productId)
      ? formData.product.filter((id) => id !== productId)
      : [...formData.product, productId]
    setFormData({ ...formData, product: updated })
  }

  const handleCreateMenu = async () => {
    try {
      const newMenu = {
        ...formData,
        restaurantId,
        price: parseFloat(formData.price), 
      }

      console.log('Menu envoyé :', newMenu)
      const res = await axios.post('http://localhost:8080/api/menus', newMenu)
      onMenuCreated(res.data)
      onClose()
    } catch (err) {
      console.error('Erreur lors de la création du menu :', err.response?.data || err.message)
    }
  }

  const handleCreateProduct = async () => {
    try {
      const productToSend = {
        ...productFormData,
        restaurantId,
        categories: productFormData.categories.split(',').map(cat => cat.trim())
      }
      const res = await axios.post('http://localhost:8080/api/products', productToSend)
      setAvailableProducts(prev => [...prev, res.data])
      setShowProductModal(false)
      setProductFormData({ name: '', description: '', price: '', image: '', categories: '' })
    } catch (err) {
      console.error('Erreur lors de la création du produit :', err)
    }
  }

  const handleDeleteSelectedProducts = async () => {
    try {
      await Promise.all(
        formData.product.map(productId =>
          axios.delete(`http://localhost:8080/api/products/${productId}`)
        )
      )
      setFormData(prev => ({ ...prev, product: [] }))
      fetchProducts()
    } catch (err) {
      console.error('Erreur lors de la suppression des produits :', err)
    }
  }

  return (
    <div className="menu-modal">
      <div className="menu-modal__content" ref={modalRef}>
        <h3>Créer un nouveau menu</h3>
        <input name="name" placeholder="Nom du menu" value={formData.name} onChange={handleChange} />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Prix" value={formData.price} onChange={handleChange} />
        <input name="image" placeholder="URL de l'image" value={formData.image} onChange={handleChange} />

        <button className="add-product-btn" onClick={() => setShowProductModal(true)}>
          ➕ Ajouter un produit
        </button>

        <p className="product-list-title">Ajouter des produits au menu :</p>
        <div className="product-list">
          {availableProducts.length > 0 ? (
            availableProducts.map(prod => (
              <label key={prod._id} className="product-checkbox">
                <div className="product-details">
                  <strong>{prod.name}</strong>
                  <span className="product-price">{prod.price}€</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.product.includes(prod._id)}
                  onChange={() => handleProductToggle(prod._id)}
                />
              </label>
            ))
          ) : (
            <p style={{ fontStyle: 'italic', color: '#888' }}>Aucun produit disponible.</p>
          )}
        </div>

        <div className="menu-modal__actions">
          <button onClick={handleDeleteSelectedProducts} className="delete">🗑️ Supprimer</button>
          <button onClick={handleCreateMenu}>Créer</button>
        </div>
      </div>

      {showProductModal && (
        <div className="menu-modal">
          <div className="menu-modal__content" ref={productModalRef}>
            <h3>Créer un produit</h3>
            <input name="name" placeholder="Nom du produit" value={productFormData.name} onChange={handleProductInputChange} />
            <input name="description" placeholder="Description" value={productFormData.description} onChange={handleProductInputChange} />
            <input name="price" placeholder="Prix" value={productFormData.price} onChange={handleProductInputChange} />
            <input name="image" placeholder="URL de l'image" value={productFormData.image} onChange={handleProductInputChange} />
            <input name="categories" placeholder="Catégories (séparées par des virgules)" value={productFormData.categories} onChange={handleProductInputChange} />
            <div className="menu-modal__actions">
              <button onClick={() => setShowProductModal(false)}>Annuler</button>
              <button onClick={handleCreateProduct}>Créer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
