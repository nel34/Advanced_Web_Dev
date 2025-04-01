import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './index.sass';

export default function Header() {
    return (
        <aside className="sidebar">
            <div className="sidebar__logo">
                <img src={logo} alt="logo" />
                <span>Nom restaurant</span>
            </div>
            <nav className="sidebar__nav">
                <Link to="/dashboard" className="sidebar__link">Accueil</Link>
                <Link to="/menu" className="sidebar__link">Menu</Link>
                <Link to="/commandes" className="sidebar__link">Commandes</Link>
                <Link to="/paiements" className="sidebar__link">Paiements</Link>
            </nav>
        </aside>
    );
}
