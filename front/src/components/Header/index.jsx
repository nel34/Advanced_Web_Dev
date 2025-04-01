import SearchBar from '../SearchBar'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './index.sass'

export default function Header() {
  return (
    <header className='header'>
      <Link to='/'>
        <img src={logo} alt='logo' className='header__logo' />
      </Link>
      <div className='header__content'>
        <SearchBar placeholder='Rechercher un restaurant' />
        <p>Icon</p>
        <p>Icon</p>
      </div>
    </header>
  )
}