import { Link } from 'react-router-dom'
import './index.sass'
import pdp from '../../assets/pdp.jpg'


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
                <Link to="/restaurateur" className="sidebar__link">Accueil</Link>
                <Link to="/menu" className="sidebar__link">Menu</Link>
                <Link to="/commandes" className="sidebar__link">Commandes</Link>
                <Link to="/paiements" className="sidebar__link">Paiements</Link>
            </nav>
        </div>
    );
}
