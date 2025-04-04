import HeaderRestaurateur from '../../components/HeaderRestaurateur'
import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import DashboardHeader from '../../components/DashboardHeaderRestaurateur'
import LargeSumRestaurateur from '../../components/LargeSumRestaurateur'
import BarChartRestaurateur from '../../components/BarChartRestaurateur'
import FooterRestaurateur from '../../components/FooterRestaurateur'
import './index.sass'

export default function AccueilRestaurateur() {
    return (
        <div className="accueil-restaurateur">
            <HeaderRestaurateur />
            <div className="accueil-restaurateur__body">
                <SidebarRestaurateur />
                <main className="accueil-restaurateur__content">
                    <DashboardHeader />
                    <div className="accueil-restaurateur__sums">
                        <LargeSumRestaurateur title="Ventes" value="356€" />
                        <LargeSumRestaurateur title="Commandes" value="6" />
                        <LargeSumRestaurateur title="Moyenne commandes" value="17,56€" />
                        <LargeSumRestaurateur title="Ventes du mois" value="12 000€" />
                        <LargeSumRestaurateur title="Commandes du mois" value="845" />
                        <LargeSumRestaurateur title="Plat du mois" value="blabla bla" />
                    </div>
                    <div className="accueil-restaurateur__charts">
                    <BarChartRestaurateur />
                    </div>                   
                </main>                
            </div>
            <FooterRestaurateur />
        </div>
    );
}
