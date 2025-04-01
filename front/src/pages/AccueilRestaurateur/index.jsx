import Header from '../../components/HeaderRestaurateur'
import SidebarRestaurateur from '../../components/SidebarRestaurateur'

import './index.sass'

export default function AccueilRestaurateur() {
    return (
        <div className="accueil-restaurateur">
            <SidebarRestaurateur />
            <div className="accueil-restaurateur__content">
                <Header />
                {/* Ici on mettra le DashboardHeader + StatCards + Graph */}
                <h1>Résumé du jour</h1>
                {/* On va ajouter tout ça dans les prochaines étapes */}
            </div>
        </div>
    );
}
