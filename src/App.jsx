import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import { useAuth } from './hooks/useAuth'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <h1>Carregando...</h1>
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="*"
        element={<Navigate to={user ? '/dashboard' : '/login'} />}
      />
    </Routes>
  )
}

export default App