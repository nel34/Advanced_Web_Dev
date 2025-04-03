import './index.sass'

export default function ProductCard({ data }) {
  return (
    <div className='product-card'>
      <div className='product-card__info'>
        <h3>{data.name}</h3>
        <p>{data.price}€</p>
        <p>{data.description}</p>
      </div>
      <img src={data.image} alt={data.name} />
    </div>
  )
}