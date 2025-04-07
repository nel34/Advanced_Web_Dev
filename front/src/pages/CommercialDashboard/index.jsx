import { useEffect, useState } from 'react'
import axios from 'axios'
import ClientCard from '../../components/ClientCard'
import NotificationPopupTechnical from '../../components/TechnicalNotification'
import './index.sass'

export default function CommercialDashboard() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

  const fetchClients = async () => {
    setLoading(true)
    setError(null)
  
    try {
      const res = await axios.get('http://localhost:8080/api/auth/users')
      const allUsers = res.data
      const clientsOnly = allUsers.filter(user => user.role === 'client')
  
      // Créer une map referralCode → username
      const referralMap = {}
      allUsers.forEach(user => {
        referralMap[user.referralCode] = user.username
      })
  
      // Remplacer referredBy par le nom du parrain si trouvé
      const enrichedClients = clientsOnly.map(client => ({
        ...client,
        referredByName: referralMap[client.referredBy] || null
      }))
  
      setClients(enrichedClients)
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

  useEffect(() => {
    const interval = setInterval(() => {
      fetchClients() // actualisation silencieuse
    }, 10000) // 10 secondes, à adapter si besoin
  
    return () => clearInterval(interval) // nettoyage
  }, [])
  
  const handleSuspend = async (userId) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'))
      const accessToken = storedUser?.accessToken
  
      await axios.put(`http://localhost:8080/api/auth/users/${userId}/suspend`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
  
      setNotification({ type: 'success', message: 'État du compte mis à jour' })
      fetchClients()
    } catch (err) {
      console.error('Erreur lors de la suspension/réactivation :', err)
      setNotification({ type: 'error', message: 'Impossible de modifier l’état du compte' })
    }
  }  
  
    const handleEdit = async (userId, newUsername, newEmail) => {
        if (!newUsername || !newEmail) return
    
        const storedUser = JSON.parse(localStorage.getItem('user'))
        const accessToken = storedUser?.accessToken

        if (!accessToken) {
        setNotification({ type: 'error', message: 'Token d\'accès manquant' })
        return
        }
    
        try {
        await axios.put(`http://localhost:8080/api/auth/users/${userId}`, {
            username: newUsername,
            email: newEmail
        }, {
            headers: {
            Authorization: `Bearer ${accessToken}`
            }
        })
    
        setNotification({ type: 'success', message: 'Utilisateur modifié avec succès' })
        fetchClients()
        } catch (err) {
        console.error('Erreur lors de la modification :', err)
        setNotification({ type: 'error', message: 'Erreur lors de la modification du compte' })
        }
    }  
    const handleDelete = async (userId) => {
        try {
          const storedUser = JSON.parse(localStorage.getItem('user'))
          const accessToken = storedUser?.accessToken
      
          await axios.delete(`http://localhost:8080/api/auth/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
      
          fetchClients()
          setNotification({
            type: 'success',
            message: 'Compte supprimé avec succès'
          })
        } catch (err) {
          console.error('Erreur lors de la suppression :', err)
          setNotification({
            type: 'error',
            message: 'Erreur lors de la suppression du compte'
          })
        }
      }
      
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 4

  const [search, setSearch] = useState('')

  const filteredClients = clients.filter(client => {
    const query = search.toLowerCase()
    return (
      client.username.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) 
    )
  })

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentClients = filteredClients.slice(indexOfFirstUser, indexOfLastUser)
    
    const totalPages = Math.ceil(filteredClients.length / usersPerPage)
    
    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
    }
    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1)
    }
  
    return (
        <div className="commercial-dashboard">
            <h1 className="page-title" onClick={() => window.location.href = '/commercial'}>
                Dashboard Commercial
            </h1>
            {notification && (
                <NotificationPopupTechnical
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="dashboard-header">
            <h2>Gestion des comptes clients</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Rechercher un client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>       

            <div className="stats-summary">
            <div className="stat-box">
                <h3>Total clients</h3>
                <p>{clients.length}</p>
            </div>
            <div className="stat-box">
                <h3>Actifs</h3>
                <p>{clients.filter(c => !c.isSuspended).length}</p>
            </div>
            <div className="stat-box">
                <h3>Suspendus</h3>
                <p>{clients.filter(c => c.isSuspended).length}</p>
            </div>
            <div className="stat-box">
                <h3>Parrainés</h3>
                <p>{clients.filter(c => c.referredBy).length}</p>
            </div>
            </div>
            {loading && <p>Chargement en cours...</p>}
            {error && <p className="error">{error}</p>}

            <div className="clients-grid">
            {currentClients.map(client => (
                <ClientCard
                    key={client.id}
                    client={client}
                    onUpdate={fetchClients}
                    onSuspend={handleSuspend}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
            </div>
            <div className="pagination">
                <button onClick={handlePrev} disabled={currentPage === 1}>◀ Précédent</button>
                <span>Page {currentPage} / {totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>Suivant ▶</button>
            </div>
        </div>
    )
    }