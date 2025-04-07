import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useFetchWithAuth } from '../../utils/hooks'

export default function ProtectedRoute({ role }) {
  const { user } = useAuth()
  const { isLoading, error } = useFetchWithAuth('POST', `http://localhost:8080/api/auth/${role}`)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <Navigate to="/login" replace />
  }

  // Render the nested routes (using Outlet)
  return <Outlet />
}
