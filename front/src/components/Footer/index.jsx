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
              <li><Link to='/help'>Obtenir de l'aide</Link></li>
              <li><a href='/'>Ajouter votre restaurant</a></li>
              <li><a href='/'>Se connecter pour livrer</a></li>
            </ul>
          </div>
          <div>
            <ul>
              <li><Link to='/legal-notice'>Mentions légales</Link></li>
              <li><Link to='/cookies'>Cookies</Link></li>
              <li><Link to='/privacy-policy'>Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='line'></div>
      <p>© CESI Eats 2025 - All rights reserved</p>
    </footer>
  )
}