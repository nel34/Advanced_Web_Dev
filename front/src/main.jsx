import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './main.sass'
import Layout from './components/Layout'
import Home from './pages/Home'
import AuthForm from './pages/AuthForm'
import Restaurant from './pages/Restaurant'
import Menu from './pages/Menu'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import AccueilRestaurateur from './pages/AccueilRestaurateur'
import PaiementsRestaurateur from './pages/PaiementsRestaurateur'
import CommandesRestaurateur from './pages/CommandesRestaurateur'
import MenuRestaurateur from './pages/MenuRestaurateur'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Cookies from './pages/Cookies'
import LegalNotice from './pages/LegalNotice'
import HelpPage from './pages/Help'
import ThirdDeveloper from './pages/ThirdDeveloper'
import Delivery from './pages/Delivery'

createRoot(document.getElementById('root')).render(
  <Router>
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" />
          <Route path="/delivery" element={<Delivery />} />
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
          <Route path="/developer" element={<ThirdDeveloper />} />
        </Routes>
      </Layout>
    </CartProvider>
  </Router>,
)