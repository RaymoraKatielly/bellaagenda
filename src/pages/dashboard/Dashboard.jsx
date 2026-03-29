import { useAuth } from '../../hooks/useAuth'

function Dashboard() {
  const { user, signOut } = useAuth()

  async function handleLogout() {
    try {
      await signOut()
    } catch (error) {
      console.error('Erro ao sair:', error.message)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Bem-vinda ao BellaAgenda</p>
      <p>Usuário logado: {user?.email}</p>

      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}

export default Dashboard