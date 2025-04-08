import './index.sass'
import { useCart } from '../../context/CartContext'
import CartItem from '../../components/CartItem'
import Button from '../../components/Button'
import { useAuth } from '../../context/AuthContext'
import { useFetchWithAuth } from '../../utils/hooks'

export default function Checkout() {
  const { cart, getTotalPrice } = useCart()
  const deliveryPrice = 5
  const { user } = useAuth()

  const { isLoading, data, error } = useFetchWithAuth('GET', `http://localhost:8080/api/auth/users/${user.id}`)

  const handleCheckout = async () => {
    const order = {
      restaurant_id: cart[0].restaurantId,
      user_id: user.id,
      username: data.username,
      menu: cart.map((item) => item._id),
      total: getTotalPrice() + deliveryPrice,
      location: document.getElementById('address').value
    }

    console.log(order)

    const response = await fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(order)
    })
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
              <p>{getTotalPrice() + deliveryPrice} €</p>
            </div>
            <Button content={'Valider la commande'} type='primary' onClick={handleCheckout} />
          </div>
        </div>
      </div>
    </div>
  )
}