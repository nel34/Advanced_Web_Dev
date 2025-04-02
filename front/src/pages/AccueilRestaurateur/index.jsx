import HeaderRestaurateur from '../../components/HeaderRestaurateur'
import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import DashboardHeader from '../../components/DashboardHeaderRestaurateur'
import './index.sass'

export default function AccueilRestaurateur() {
    return (
        <div className="accueil-restaurateur">
            <HeaderRestaurateur />
            <div className="accueil-restaurateur__body">
                <SidebarRestaurateur />
                <main className="accueil-restaurateur__content">
                    <DashboardHeader />
                </main>
            </div>
        </div>
    );
}


