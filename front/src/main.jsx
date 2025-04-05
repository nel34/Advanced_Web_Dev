import Checkout from './pages/Checkout'
import Account from './pages/Account'
import { CartProvider } from './context/CartContext'
import AccueilRestaurateur from './pages/AccueilRestaurateur'
import PaiementsRestaurateur from './pages/PaiementsRestaurateur'
import CommandesRestaurateur from './pages/CommandesRestaurateur'
import MenuRestaurateur from './pages/MenuRestaurateur'
import PrivacyPolicy from './components/PrivacyPolicy'
import Cookies from './components/Cookies'
import LegalNotice from './components/LegalNotice'
import HelpPage from './components/Help'

createRoot(document.getElementById('root')).render(
  <Router>
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/register" />
          <Route path="/restaurant/:idRestaurant" element={<Restaurant />} />
          <Route path="/restaurant/:idRestaurant/:idMenu" element={<Menu />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders" />
          <Route path="/restaurateur" element={<AccueilRestaurateur />} />
          <Route path="/restaurateur/paiements" element={<PaiementsRestaurateur />} />
          <Route path="/restaurateur/commandes" element={<CommandesRestaurateur />} />
          <Route path="/restaurateur/menu" element={<MenuRestaurateur />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />            
        </Routes>
      </Layout>
    </CartProvider>
  </Router>,
)