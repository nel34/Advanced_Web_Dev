import './index.sass'
import { useCart } from '../../context/CartContext'

export default function CartItem({ data }) {
  const { updateItemQuantity } = useCart()

  const handleIncrement = () => {
    updateItemQuantity(data._id, data.quantity + 1)
  }

  const handleDecrement = () => {
    updateItemQuantity(data._id, data.quantity - 1)
  }

  const totalPrice = (data.price * data.quantity).toFixed(2)

  return (
    <div className='cart-item'>
      <img src={data.image} alt={data.name} className='cart-item__image' />
      <div className='cart-item__info'>
        <h2 className='cart-item__info__name'>{data.name}</h2>
        <p className='cart-item__info__price'>{totalPrice}€</p>
        <div className='cart-item__info__quantity'>
          <button onClick={handleDecrement}>-</button>
          <span>{data.quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
      </div>
    </div>
  )
}