import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
import TechnicalDashboard from './pages/TechnicalDashboard'
import Delivery from './pages/Delivery'
import CommercialDashboard from './pages/CommercialDashboard'

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
                <Route element={<ProtectedRoute role='developer' />}>
                  <Route path='/' element={<ThirdDeveloper />} />
                  <Route path='/account' element={<Account />} />
                </Route>
                <Route path='/login' element={<AuthForm mode='login' />} />
                <Route path='/signup' element={<AuthForm mode='signup' />} />
              </>
            ) : subdomain === 'restaurant' ? (
              <>
                <Route element={<ProtectedRoute role='restaurateur' />}>
                  <Route path='/' element={<AccueilRestaurateur />} />
                  <Route path='/account' element={<Account />} />
                  <Route path='/paiements' element={<PaiementsRestaurateur />} />
                  <Route path='/commandes' element={<CommandesRestaurateur />} />
                  <Route path='/menu' element={<MenuRestaurateur />} />
                </Route>
                <Route path='/login' element={<AuthForm mode='login' />} />
                <Route path='/signup' element={<AuthForm mode='signup' />} />
              </>
            ) : subdomain === 'admin' ? (
              <>
                <Route element={<ProtectedRoute role='technician' />}>
                  <Route path='/' element={<TechnicalDashboard />} />
                </Route>
                <Route path='/login' element={<AuthForm mode='login' />} />
                <Route path='/signup' element={<AuthForm mode='signup' />} />
              </>
            ) : subdomain === 'commercial' ? (
              <>
                <Route element={<ProtectedRoute role='commercial' />}>
                  <Route path='/' element={<CommercialDashboard />} />
                </Route>
                <Route path='/login' element={<AuthForm mode='login' />} />
                <Route path='/signup' element={<AuthForm mode='signup' />} />
              </>              
            ) : subdomain === 'delivery' ? (
              <>
                <Route element={<ProtectedRoute role='livreur' />}>
                  <Route path='/' element={<Delivery />} />
                  <Route path='/account' element={<Account />} />
                </Route>
                <Route path='/login' element={<AuthForm mode='login' />} />
                <Route path='/signup' element={<AuthForm mode='signup' />} />
              </>
            ) : (
              <>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<AuthForm mode='login' />} />
                <Route path='/signup' element={<AuthForm mode='signup' />} />
                <Route path='/restaurant/:idRestaurant' element={<Restaurant />} />
                <Route path='/restaurant/:idRestaurant/:idMenu' element={<Menu />} />
                <Route path='/help' element={<HelpPage />} />
                <Route path='/legal-notice' element={<LegalNotice />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/cookies' element={<Cookies />} />

                <Route element={<ProtectedRoute role='client' />}>
                  <Route path='/account' element={<Account />} />
                  <Route path='/checkout' element={<Checkout />} />
                  <Route path='/account/orders' element={<Account />} />
                </Route>
              </>
            )}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  </Router>
)
