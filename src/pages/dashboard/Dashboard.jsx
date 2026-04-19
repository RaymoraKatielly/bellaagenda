import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function Dashboard() {
  const { user, signOut } = useAuth()

  async function handleLogout() {
    await signOut()
  }

  return (
    <div className="flex min-h-screen bg-[#f7f3ee]">
      <aside className="w-64 min-h-screen bg-[#4e342e] text-white shadow-xl p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-wide mb-10 text-[#f7e7ce]">
            BellaAgenda
          </h1>

         <nav className="space-y-4">
  <Link
    to="/dashboard"
    className="block rounded-lg px-3 py-2 bg-[#6d4c41] text-[#fff8f0]"
  >
    Dashboard
  </Link>

  <Link
    to="/clients"
    className="block rounded-lg px-3 py-2 text-[#f3e5d8] hover:bg-[#6d4c41] transition"
  >
    Clientes
  </Link>

  <p className="cursor-pointer rounded-lg px-3 py-2 text-[#f3e5d8] hover:bg-[#6d4c41] transition">
    Agenda
  </p>
</nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full rounded-xl bg-[#d7a86e] py-3 font-semibold text-[#3e2723] hover:bg-[#c9975c] transition"
        >
          Sair
        </button>
      </aside>

      <main className="flex-1 p-10">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#4e342e]">Dashboard</h2>
            <p className="mt-1 text-sm text-[#8d6e63]">
              Bem-vinda ao seu painel
            </p>
          </div>

          <div className="rounded-full bg-white px-5 py-2 shadow-sm border border-[#eadfd6] text-sm text-[#6d4c41]">
            {user?.email}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#efe4db] hover:shadow-md transition">
            <h3 className="text-sm text-[#a1887f]">Clientes</h3>
            <p className="mt-2 text-3xl font-bold text-[#4e342e]">0</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#efe4db] hover:shadow-md transition">
            <h3 className="text-sm text-[#a1887f]">Agendamentos</h3>
            <p className="mt-2 text-3xl font-bold text-[#4e342e]">0</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#efe4db] hover:shadow-md transition">
            <h3 className="text-sm text-[#a1887f]">Faturamento</h3>
            <p className="mt-2 text-3xl font-bold text-[#4e342e]">R$ 0</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard