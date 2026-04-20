import { useEffect, useState } from 'react'
import { supabase } from '../../services/supabase/client'

function Dashboard() {
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

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#4e342e]">Dashboard</h2>
        <p className="mt-1 text-sm text-[#8d6e63]">
          Bem-vinda ao seu painel
        </p>
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
    </div>
  )
}

export default Dashboard