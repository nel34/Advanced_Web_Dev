import { Link } from 'react-router-dom'
import './index.sass'

export default function MenuCard({ data }) {
  return (
    <Link to={`./${data._id}`}>
      <div className='menu-card'>
        <div className='menu-card__info'>
          <h3>{data.name}</h3>
          <p>{data.price}€</p>
          <p>{data.description}</p>
        </div>
        <img src={data.image} alt={data.name} className='menu-card__img' />
      </div>
    </Link>
  )
}