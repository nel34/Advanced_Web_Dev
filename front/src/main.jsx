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
import ProtectedRoute from './components/ProtectedRoute'

const getSubdomain = () => {
  const host = window.location.hostname
  const parts = host.split('.')
  return parts[0]
}

const subdomain = getSubdomain()

createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Routes>
            {subdomain === 'dev' ? (
              <>
                <Route element={<ProtectedRoute role="developer" />}>
                  <Route path="/" element={<ThirdDeveloper />} />
                </Route>
                <Route path="/login" element={<AuthForm mode='login' />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthForm mode='login' />} />
                <Route path="/signup" element={<AuthForm mode='signup' />} />
                <Route path="/restaurant/:idRestaurant" element={<Restaurant />} />
                <Route path="/restaurant/:idRestaurant/:idMenu" element={<Menu />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/account/orders" />
                <Route path="/restaurateur" element={<AccueilRestaurateur />} />
                <Route path="/restaurateur/paiements" element={<PaiementsRestaurateur />} />
                <Route path="/restaurateur/commandes" element={<CommandesRestaurateur />} />
                <Route path="/restaurateur/menu" element={<MenuRestaurateur />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/legal-notice" element={<LegalNotice />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookies" element={<Cookies />} />

                <Route element={<ProtectedRoute role="client" />}>
                  <Route path="/account" element={<Account />} />
                </Route>
              </>
            )}
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  </Router>,
)