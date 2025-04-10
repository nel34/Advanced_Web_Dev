import './index.sass'
import { useCart } from '../../context/CartContext'
import CartItem from '../CartItem'
import Button from '../Button'
import  { Link } from 'react-router-dom'

export default function Cart({ onClose }) {
  const closeCart = () => {
    onClose()
  }
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart')) {
      closeCart()
    }
  })
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart()
    }
  })

  const { cart, getTotalPrice } = useCart()

  return (
    <div className='cart'>
      <div className='cart__background'></div>
      <div className='cart__info'>
        {cart.length === 0 ? (
          <p>Votre panier est vide</p>
        ) : (
          <>
            <div className='cart__info__items'>
              {cart.map((item) => (
                <CartItem key={item._id} data={item} />
              ))}
            </div>
            <div className='cart__info__total'>
              <p>Total: {getTotalPrice()} €</p>
              <Link to='/checkout'>
                <Button content='Valider la commande' onClick={closeCart} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}