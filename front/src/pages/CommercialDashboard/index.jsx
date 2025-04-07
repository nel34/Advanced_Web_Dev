import { useEffect, useState } from 'react'
import axios from 'axios'
import ClientCard from '../../components/ClientCard'
import './index.sass'

export default function CommercialDashboard() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchClients = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('http://localhost:8080/api/auth/users')
      const clientsOnly = res.data.filter(user => user.role === 'client')
      setClients(clientsOnly)
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err)
      setError("Impossible de récupérer les clients.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return (
    <div className="commercial-dashboard">
      <h1 className="dashboard-title">Gestion des comptes clients</h1>

      {loading && <p>Chargement en cours...</p>}
      {error && <p className="error">{error}</p>}

      <div className="clients-grid">
        {clients.map(client => (
          <ClientCard key={client.id} client={client} onUpdate={fetchClients} />
        ))}
      </div>
    </div>
  )
}