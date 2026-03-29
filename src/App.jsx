import Login from './pages/auth/Login'
import { useAuth } from './hooks/useAuth'

function App() {
  const { user, loading, signOut } = useAuth()

  async function handleLogout() {
    try {
      await signOut()
    } catch (error) {
      console.error('Erro ao sair:', error.message)
    }
  }

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

      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}

export default App