import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
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

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
      window.location.href = '/account'
    }
    fetchLogin()
  }

  const register = (userData) => {
    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    else {
      delete userData.confirmPassword
    }

    const subdomain = window.location.hostname.split('.')[0]
    if (subdomain === 'localhost') {
      userData.role = 'client'
    }
    else if (subdomain === 'restaurant') {
      userData.role = 'restaurateur'
    }
    else if (subdomain === 'delivery') {
      userData.role = 'livreur'
    }

    async function fetchRegister() {
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
        throw new Error('Registration failed')
      }

      const data = await response.json()
      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
      if (subdomain === 'restaurant') {
        window.location.href = '/create'
        return
      }
      window.location.href = '/login'
    }
    fetchRegister()
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateUser = (userData, id, accessToken) => {
    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    else {
      delete userData.confirmPassword
    }

    async function fetchUpdateUser() {
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
        throw new Error('Update failed')
      }

      window.location.href = '/account'
    }
    fetchUpdateUser()
  }

  const deleteUser = (id, accessToken) => {
    async function fetchDeleteUser() {
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
        throw new Error('Delete failed')
      }

      setUser(null)
      localStorage.removeItem('user')
      window.location.href = '/'
    }
    fetchDeleteUser()
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, deleteUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
