import Login from './pages/auth/Login'
import { useAuth } from './hooks/useAuth'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <h1>Carregando...</h1>
  }

  if (!user) {
    return <Login />
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>BellaAgenda</h1>
      <p>Usuário logado: {user.email}</p>
    </div>
  )
}

export default App