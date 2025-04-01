import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './index.sass'

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__content'>
        <Link to='/'>
          <img src={logo} alt='logo' className='footer__content__logo' />
        </Link>
        <div className='footer__content__links'>
          <div>
            <ul>
              <li><a href='/'>Obtenir de l'aide</a></li>
              <li><a href='/'>Ajouter votre restaurant</a></li>
              <li><a href='/'>Se connecter pour livrer</a></li>
            </ul>
          </div>
          <div>
            <ul>
              <li><a href='/'>Mentions légales</a></li>
              <li><a href='/'>Cookies</a></li>
              <li><a href='/'>Politique de confidentialité</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='line'></div>
      <p>© CESI Eats 2025 - All rights reserved</p>
    </footer>
  )
}