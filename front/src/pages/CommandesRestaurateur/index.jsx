import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import './index.sass'

export default function CommandesRestaurateur() {
  return (
    <div className="accueil-restaurateur">
      <div className="accueil-restaurateur__body">
        <SidebarRestaurateur />
        <main className="accueil-restaurateur__content">
          <h2>Commandes Restaurateur</h2>
        </main>
      </div>
    </div>
  )
}
