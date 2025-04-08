import './index.sass'
import { useCart } from '../../context/CartContext'
import CartItem from '../../components/CartItem'
import Button from '../../components/Button'

export default function Checkout() {
  const { cart, getTotalPrice } = useCart()
  const deliveryPrice = 5

  return (
    <div className='home home--secondary'>
      <div className='info-section'>
        <h2>Détails de la livraison</h2>
        <div></div>
        <div className='line'></div>
        <div></div>
        <div className='line'></div>
        <div></div>
        <div className='line'></div>
        <Button content={'Valider la commande'} type='primary' onClick={() => alert('Commande validée !')} />
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
            <Button content={'Valider la commande'} type='primary' onClick={() => alert('Commande validée !')} />
          </div>
        </div>
      </div>
    </div>
  )
}