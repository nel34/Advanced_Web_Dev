import SearchBar from '../SearchBar'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import profile from '../../assets/profile.svg'
import cart from '../../assets/cart.svg'
import './index.sass'

export default function Header() {
  return (
    <header className='header'>
      <Link to='/'>
        <img src={logo} alt='logo' className='header__logo' />
      </Link>
      <div className='header__content'>
        <SearchBar placeholder='Rechercher un restaurant' />
        <Link to='/connection'>
          <img src={profile} alt='profile' className='header__icon' />
        </Link>
        <Link to='/payment'>
          <img src={cart} alt='cart' className='header__icon' />
        </Link>
      </div>
    </header>
  )
}