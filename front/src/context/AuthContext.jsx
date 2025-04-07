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
      window.location.href = '/login'
    }
    fetchRegister()
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
