import { useAuth } from './hooks/useAuth'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <h1>Carregando...</h1>
  }

  return (
    <div>
      <h1>BellaAgenda</h1>
      <p>{user ? `Usuário logado: ${user.email}` : 'Nenhum usuário logado'}</p>
    </div>
  )
}

export default App