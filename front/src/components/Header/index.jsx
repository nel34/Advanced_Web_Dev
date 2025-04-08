import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import profile from '../../assets/profile.svg'
import cart from '../../assets/cart.svg'
import Cart from '../Cart'
import './index.sass'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
  const { user } = useAuth()
  const [cartOpen, setCartOpen] = useState(false)
  const toggleCart = () => {
    setCartOpen(!cartOpen)
  }

  const subdomain = window.location.hostname.split('.')[0]

  return (
    <header className='header'>
      <Link to='/'>
        <img src={logo} alt='logo' className='header__logo' />
      </Link>
      <div className='header__content'>
        {user ? (
          <Link to='/account'>
            <img src={profile} alt='profile' className='header__icon' />
          </Link>
        ) : (
          <Link to='/login'>
            <img src={profile} alt='profile' className='header__icon' />
          </Link>
        )}
        {subdomain === 'localhost' && (
          <>
            <img
              src={cart}
              alt='cart'
              className='header__icon'
              onClick={toggleCart}
            />
            {cartOpen && <Cart onClose={toggleCart} />}
          </>
        )}
      </div>
    </header>
  )
}