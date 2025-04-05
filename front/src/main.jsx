import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './main.sass'
import Layout from './components/Layout'
import Home from './pages/Home'
import Connection from './pages/Connection'
import Restaurant from './pages/Restaurant'
import Menu from './pages/Menu'
import PrivacyPolicy from './components/PrivacyPolicy'
import Cookies from './components/Cookies'
import LegalNotice from './components/LegalNotice'
import HelpPage from './components/Help'

createRoot(document.getElementById('root')).render(
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/register" />
        <Route path="/restaurant/:idRestaurant" element={<Restaurant />} />
        <Route path="/restaurant/:idRestaurant/:idMenu" element={<Menu />} />
        <Route path="/payment" />
        <Route path="/account" />
        <Route path="/account/orders" />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/legal-notice" element={<LegalNotice />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<Cookies />} />
      </Routes>
    </Layout>
  </Router>,
)