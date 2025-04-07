import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import profile from '../../assets/profile.svg'
import cart from '../../assets/cart.svg'
import Cart from '../Cart'
import './index.sass'

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false)
  const toggleCart = () => {
    setCartOpen(!cartOpen)
  }

  return (
    <header className='header'>
      <Link to='/'>
        <img src={logo} alt='logo' className='header__logo' />
      </Link>
      <div className='header__content'>
        <Link to='/login'>
          <img src={profile} alt='profile' className='header__icon' />
        </Link>
        <img src={cart} alt='cart' className='header__icon' onClick={toggleCart} />
        {cartOpen && <Cart onClose={toggleCart} />}
      </div>
    </header>
  )
}