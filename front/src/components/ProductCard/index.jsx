import './index.sass'

export default function ProductCard({ product }) {
  const { name, description, price, image } = product

  return (
    <div className='product-card'>
      <div className='product-card__info'>
        <h3>{name}</h3>
        <p>{price}€</p>
        <p>{description}</p>
      </div>
      <img src={image} alt={name} />
    </div>
  )
}