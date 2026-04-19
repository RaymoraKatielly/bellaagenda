import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function PublicRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <h1>Carregando...</h1>
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default PublicRoute