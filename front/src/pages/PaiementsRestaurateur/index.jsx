import { useEffect, useState } from 'react'
import axios from 'axios'
import SidebarRestaurateur from '../../components/SidebarRestaurateur'
import CardPaiement from '../../components/CardPaiement'
import NotificationPopup from '../../components/NotificationPopup'
import './index.sass'

export default function PaiementsRestaurateur() {
  const [deliveries, setDeliveries] = useState([])
  const [showPopup, setShowPopup] = useState(false)

  const RESTAURANT_ID = '670000000000000000000001'

  // 🔄 Charger les IDs déjà connus depuis le localStorage
  const getKnownIds = () => {
    const data = localStorage.getItem('knownPaymentIds')
    return data ? new Set(JSON.parse(data)) : new Set()
  }

  // ✅ Sauvegarder les nouveaux IDs dans le localStorage
  const saveKnownIds = (set) => {
    localStorage.setItem('knownPaymentIds', JSON.stringify([...set]))
  }

  const fetchDeliveries = async () => {
    try {
      const res = await axios.get('http://localhost:3040/api/deliveries')
      const filtered = res.data.filter(
        (delivery) =>
          delivery.restaurant_id === RESTAURANT_ID &&
          delivery.status === 'finished'
      )

      const knownIds = getKnownIds()
      const newPayments = filtered.filter((d) => !knownIds.has(d._id))

      if (newPayments.length > 0) {
        setShowPopup(true)

        newPayments.forEach((d) => knownIds.add(d._id))
        saveKnownIds(knownIds)
      }

      setDeliveries(filtered)
    } catch (err) {
      console.error('Erreur lors du chargement des paiements :', err)
    }
  }

  useEffect(() => {
    fetchDeliveries()
    const intervalId = setInterval(() => {
      fetchDeliveries()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="accueil-restaurateur">
      <div className="accueil-restaurateur__body">
        <SidebarRestaurateur />
        <main className="accueil-restaurateur__content">
          <h2>Vos paiements :</h2>
          <div className="paiement-list">
            {deliveries.length > 0 ? (
              deliveries.map((delivery) => (
                <CardPaiement key={delivery._id} delivery={delivery} />
              ))
            ) : (
              <p style={{ fontStyle: 'italic' }}>Aucun paiement terminé.</p>
            )}
          </div>
        </main>
      </div>

      <NotificationPopup
        visible={showPopup}
        message="Vous avez un nouveau paiement"
        onClose={() => setShowPopup(false)}
      />
    </div>
  )
}
