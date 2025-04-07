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

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
