import { createContext, useContext, useState } from 'react'
import TechnicalNotification from '../components/TechnicalNotification'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    try {
      return JSON.parse(storedUser)
    }
    catch {
      return null
    }
  })

  const login = (userData) => {
    async function fetchLogin() {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        if (data.error === 'Compte suspendu') {
          setNotification({ type: 'warning', message: 'Votre compte est suspendu.' })
        } else {
          setNotification({ type: 'error', message: data.error || 'Échec de la connexion.' })
        }
        return
      }
  
      setNotification({ type: 'success', message: 'Connexion réussie 🎉' })
      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
      window.location.href = '/account'
    }
    fetchLogin()
  }  

  const register = (userData) => {
    if (userData.password !== userData.confirmPassword) {
      setNotification({ type: 'error', message: 'Les mots de passe ne correspondent pas.' })
      return
    } else {
      delete userData.confirmPassword
    }
  
    const subdomain = window.location.hostname.split('.')[0]
    if (subdomain === 'localhost') {
      userData.role = 'client'
    } else if (subdomain === 'restaurant') {
      userData.role = 'restaurateur'
    } else if (subdomain === 'delivery') {
      userData.role = 'livreur'
    } else if (subdomain === 'admin') {
      userData.role = 'technician'
    } else if (subdomain === 'commercial') {
      userData.role = 'commercial'
    } else if (subdomain === 'dev') {
      userData.role = 'developer'
    }

    async function fetchRegister() {
      try {
        const response = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        })
  
        if (!response.ok) {
          const error = await response.json()
          setNotification({ type: 'error', message: error.error || 'Échec de l’inscription.' })
          return
        }
  
        const data = await response.json()
        setNotification({ type: 'success', message: 'Inscription réussie ✅' })
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
        window.location.href = '/login'
      } catch (err) {
        setNotification({ type: 'error', message: "Erreur réseau lors de l'inscription." })
      }

      const data = await response.json()
      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
      if (subdomain === 'restaurant') {
        window.location.href = '/create'
        return
      }
      window.location.href = '/account'
    }
    fetchRegister()
  }  

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    setNotification({ type: 'info', message: 'Vous êtes déconnecté.' })
  }  

  const updateUser = (userData, id, accessToken) => {
    if (userData.password !== userData.confirmPassword) {
      setNotification({ type: 'error', message: 'Les mots de passe ne correspondent pas.' })
      return
    } else {
      delete userData.confirmPassword
    }
  
    async function fetchUpdateUser() {
      try {
        const response = await fetch(`http://localhost:8080/api/auth/users/${id}`, {
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify(userData),
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        })
  
        if (!response.ok) {
          const error = await response.json()
          setNotification({ type: 'error', message: error.error || 'Échec de la mise à jour.' })
          return
        }
  
        setNotification({ type: 'success', message: 'Compte mis à jour avec succès ✅' })
        window.location.href = '/account'
      } catch (err) {
        setNotification({ type: 'error', message: 'Erreur réseau lors de la mise à jour.' })
      }

      window.location.href = '/account'
    }
    fetchUpdateUser()
  }  

  const deleteUser = (id, accessToken) => {
    async function fetchDeleteUser() {
      try {
        const response = await fetch(`http://localhost:8080/api/auth/users/${id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        })
  
        if (!response.ok) {
          const error = await response.json()
          setNotification({ type: 'error', message: error.error || 'Échec de la suppression.' })
          return
        }
  
        setNotification({ type: 'success', message: 'Compte supprimé avec succès.' })
        setUser(null)
        localStorage.removeItem('user')
        window.location.href = '/'
      } catch (err) {
        setNotification({ type: 'error', message: 'Erreur réseau lors de la suppression.' })
      }
    }
    fetchDeleteUser()
  }  
  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      deleteUser,
      notification,       
      setNotification      
    }}>
      {children}
      {notification && (
        <TechnicalNotification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </AuthContext.Provider>
  )  
}  

export const useAuth = () => useContext(AuthContext)