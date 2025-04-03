import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './main.sass'
import Home from './pages/Home'
import Connection from './pages/Connection'
import Restaurant from './pages/Restaurant'
import AccueilRestaurateur from './pages/AccueilRestaurateur'
import PaiementsRestaurateur from './pages/PaiementsRestaurateur';
import CommandesRestaurateur from './pages/CommandesRestaurateur';
import MenuRestaurateur from './pages/MenuRestaurateur';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/connection" element={<Connection />} />
      <Route path="/register" />
      <Route path="/restaurants/:idRestaurant" element={<Restaurant />} />
      <Route path="/restaurants/:idRestaurant/product/:idProduct" />
      <Route path="/payment" />
      <Route path="/account" />
      <Route path="/account/orders" />
      <Route path="/restaurateur" element={<AccueilRestaurateur />} />
      <Route path="/restaurateur/paiements" element={<PaiementsRestaurateur />} />
      <Route path="/restaurateur/commandes" element={<CommandesRestaurateur />} />
      <Route path="/restaurateur/menu" element={<MenuRestaurateur />} />
    </Routes>
  </Router>,
)
