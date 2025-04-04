import HeaderRestaurateur from '../../components/HeaderRestaurateur'
import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import FooterRestaurateur from '../../components/FooterRestaurateur'
import './index.sass'

export default function PaiementsRestaurateur() {
    return (
        <div className="accueil-restaurateur">
            <HeaderRestaurateur />
            <div className="accueil-restaurateur__body">
                <SidebarRestaurateur />
                <main className="accueil-restaurateur__content">
                    <h2>Paiements Restaurateur</h2>
                </main>
            </div>
            <FooterRestaurateur />
        </div>
    );
}
