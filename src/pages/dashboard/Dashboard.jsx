import { useAuth } from '../../hooks/useAuth'

function Dashboard() {
  const { user, signOut } = useAuth()

  async function handleLogout() {
    await signOut()
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-8">
            BellaAgenda
          </h1>

          <nav className="space-y-3">
            <p className="text-gray-600 hover:text-orange-500 cursor-pointer">
              Dashboard
            </p>
            <p className="text-gray-600 hover:text-orange-500 cursor-pointer">
              Clientes
            </p>
            <p className="text-gray-600 hover:text-orange-500 cursor-pointer">
              Agenda
            </p>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg transition"
        >
          Sair
        </button>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Dashboard
          </h2>

          <p className="text-gray-600 text-sm">
            {user?.email}
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Clientes</h3>
            <p className="text-2xl font-bold text-gray-800">0</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Agendamentos</h3>
            <p className="text-2xl font-bold text-gray-800">0</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Faturamento</h3>
            <p className="text-2xl font-bold text-gray-800">R$ 0</p>
          </div>

        </div>

      </main>
    </div>
  )
}

export default Dashboard