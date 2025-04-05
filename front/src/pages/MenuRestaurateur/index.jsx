import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import MenuCardRestaurateur from '../../components/MenuCardRestaurateur'
import './index.sass'

export default function MenuRestaurateur() {
  return (
    <div className="accueil-restaurateur">
      <div className="accueil-restaurateur__body">
        <SidebarRestaurateur />
        <main className="accueil-restaurateur__content">
          <h2>Vos menus :</h2>
          <div className="menu-cards">
            <MenuCardRestaurateur name="Burger Deluxe" price="15" image="https://i.imgur.com/0umadnY.jpg" />
            <MenuCardRestaurateur name="Cheese" price="8" image="https://i.imgur.com/0umadnY.jpg" />
          </div>
        </main>
      </div>
    </div>
  )
}
