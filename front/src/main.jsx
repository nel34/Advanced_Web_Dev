import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './main.sass'
import Layout from './components/Layout'
import Home from './pages/Home'
import Connection from './pages/Connection'
import Restaurant from './pages/Restaurant'
import Menu from './pages/Menu'
import AccueilRestaurateur from './pages/AccueilRestaurateur'
import PaiementsRestaurateur from './pages/PaiementsRestaurateur';
import CommandesRestaurateur from './pages/CommandesRestaurateur';
import MenuRestaurateur from './pages/MenuRestaurateur';

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
        <Route path="/restaurateur" element={<AccueilRestaurateur />} />
        <Route path="/restaurateur/paiements" element={<PaiementsRestaurateur />} />
        <Route path="/restaurateur/commandes" element={<CommandesRestaurateur />} />
        <Route path="/restaurateur/menu" element={<MenuRestaurateur />} />
      </Routes>
    </Layout>
  </Router>,
)