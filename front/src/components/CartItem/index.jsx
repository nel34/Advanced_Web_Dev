import './index.sass'

export default function CartItem({ data }) {
  return (
    <div className='cart-item'>
      <img src={data.image} alt={data.name} className='cart-item__image' />
      <div className='cart-item__info'>
        <h2 className='cart-item__info__name'>{data.name}</h2>
        <p className='cart-item__info__price'>{data.price * data.quantity}€</p>
        <p className='cart-item__info__quantity'>Quantité: {data.quantity}</p>
      </div>
    </div>
  )
}