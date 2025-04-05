import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import LargeSumRestaurateur from '../../components/LargeSumRestaurateur'
import BarChartRestaurateur from '../../components/BarChartRestaurateur'
import './index.sass'

export default function AccueilRestaurateur() {
  return (
    <div className="accueil-restaurateur">
      <div className="accueil-restaurateur__body">
        <SidebarRestaurateur />
        <main className="accueil-restaurateur__content">
          <div className="dashboard-header">
            <p className="dashboard-header__greeting">Bonjour, Burger & Co</p>
            <h1 className="dashboard-header__title">Résumé du jour</h1>
          </div>
          <div className="accueil-restaurateur__sums">
            <LargeSumRestaurateur title="Ventes" value="356€" />
            <LargeSumRestaurateur title="Commandes" value="6" />
            <LargeSumRestaurateur title="Moyenne commandes" value="17,56€" />
            <LargeSumRestaurateur title="Ventes du mois" value="12 000€" />
            <LargeSumRestaurateur title="Commandes du mois" value="845" />
            <LargeSumRestaurateur title="Plat du mois" value="Burger" />
          </div>
          <div className="accueil-restaurateur__charts">
            <BarChartRestaurateur />
          </div>
        </main>
      </div>
    </div>
  )
}
