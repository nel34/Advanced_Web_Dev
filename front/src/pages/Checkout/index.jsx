import './index.sass'
import { useCart } from '../../context/CartContext'
import CartItem from '../../components/CartItem'
import Button from '../../components/Button'
import { useAuth } from '../../context/AuthContext'
import { useFetchWithAuth } from '../../utils/hooks'
import { useEffect } from 'react'

export default function Checkout() {
  const { cart, getTotalPrice } = useCart()
  const deliveryPrice = 5
  const { user } = useAuth()

  if (cart.length === 0) {
    window.location.href = '/'
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { isLoading, data, error } = useFetchWithAuth('GET', `http://localhost:8080/api/auth/users/${user.id}`)

  const handleCheckout = async () => {
    const order = {
      restaurant_id: cart[0].restaurantId,
      user_id: user.id,
      username: data.username,
      menu: cart.flatMap((item) => Array(item.quantity).fill(item._id)),
      total: (getTotalPrice() + deliveryPrice).toFixed(2),
      location: document.getElementById('address').value
    }

    if (order.location === '') {
      alert('Veuillez entrer une adresse de livraison')
      return
    }

    const response = await fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(order)
    })

    const created_order = await response.json()

    localStorage.removeItem('cart')
    window.location.href = `/order/${created_order._id}`
  }

  return (
    <div className='home home--secondary'>
      <div className='info-section'>
        <h2>Détails de la livraison</h2>
        <div className='form__input'>
          <label htmlFor='address'>Address de livraison</label>
          <input id='address' type='text' placeholder='Address de livraison' />
        </div>
        <div className='line'></div>
        <Button content={'Valider la commande'} type='primary' onClick={handleCheckout} />
      </div>
      <div className='info-section-layout--2'>
        <div className='info-section'>
          <h2>Récapitulatif du panier</h2>
          {cart.map((item) => (
            <CartItem key={item._id} data={item} />
          ))}
        </div>
        <div className='info-section'>
          <h2>Total de la commande</h2>
          <div className='total-price'>
            <div className='total-price__item'>
              <p>Sous-total</p>
              <p>{getTotalPrice()} €</p>
            </div>
            <div className='total-price__item'>
              <p>Frais de livraison</p>
              <p>{deliveryPrice} €</p>
            </div>
            <div className='line'></div>
            <div className='total-price__item'>
              <p>Total</p>
              <p>{(getTotalPrice() + deliveryPrice).toFixed(2)} €</p>
            </div>
            <Button content={'Valider la commande'} type='primary' onClick={handleCheckout} />
          </div>
        </div>
      </div>
    </div>
  )
}