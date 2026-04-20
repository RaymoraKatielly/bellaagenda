import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../services/supabase/client'
import { useAuth } from '../../hooks/useAuth'

function Dashboard() {
  const { user, signOut } = useAuth()

  const [totalClients, setTotalClients] = useState(0)
  const [totalAppointments, setTotalAppointments] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    setLoading(true)

    const today = new Date().toISOString().split('T')[0]

    const { count: clientsCount, error: clientsError } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })

    const { count: appointmentsCount, error: appointmentsError } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('date', today)

    if (clientsError) {
      console.error('Erro ao buscar clientes:', clientsError)
    } else {
      setTotalClients(clientsCount || 0)
    }

    if (appointmentsError) {
      console.error('Erro ao buscar agendamentos:', appointmentsError)
    } else {
      setTotalAppointments(appointmentsCount || 0)
    }

    setLoading(false)
  }

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

            <Link
              to="/agenda"
              className="block rounded-lg px-3 py-2 text-[#f3e5d8] hover:bg-[#6d4c41] transition"
            >
              Agenda
            </Link>
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
            <p className="mt-2 text-3xl font-bold text-[#4e342e]">
              {loading ? '...' : totalClients}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#efe4db] hover:shadow-md transition">
            <h3 className="text-sm text-[#a1887f]">Agendamentos Hoje</h3>
            <p className="mt-2 text-3xl font-bold text-[#4e342e]">
              {loading ? '...' : totalAppointments}
            </p>
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