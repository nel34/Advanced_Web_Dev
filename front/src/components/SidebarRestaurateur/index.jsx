import { Link } from 'react-router-dom'
import './index.sass'
import pdp from '../../assets/pdp.jpg'
import { FaHome, FaUtensils, FaShoppingCart, FaCreditCard } from 'react-icons/fa';


export default function SidebarRestaurateur() {
    return (
        <div className="sidebar">
            <div className="sidebar__restaurant">
                <div className="sidebar__avatar-wrapper">
                    <img src={pdp} alt="restaurant" className="sidebar__avatar" />
                </div>
                <span className="sidebar__name">Burger & Co</span>
            </div>
            <nav className="sidebar__nav">
                <Link to="/restaurateur" className="sidebar__link"><FaHome /> Accueil</Link>
                <Link to="/restaurateur/menu" className="sidebar__link"><FaUtensils /> Menu</Link>
                <Link to="/restaurateur/commandes" className="sidebar__link"><FaShoppingCart /> Commandes</Link>
                <Link to="/restaurateur/paiements" className="sidebar__link"><FaCreditCard /> Paiements</Link>
            </nav>
        </div>
    );
}
