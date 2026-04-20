import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../services/supabase/client'
import { useAuth } from '../../hooks/useAuth'

function Agenda() {
  const { user } = useAuth()

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [selectedTime, setSelectedTime] = useState(null)
  const [clients, setClients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [selectedClient, setSelectedClient] = useState('')
  const [loading, setLoading] = useState(false)

  const horarios = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ]

  useEffect(() => {
    fetchClients()
  }, [])

  useEffect(() => {
    fetchAppointments()
  }, [selectedDate])

  async function fetchClients() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Erro ao buscar clientes:', error)
    } else {
      setClients(data)
    }
  }

  async function fetchAppointments() {
    const today = selectedDate

    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        date,
        time,
        client_id,
        clients (
          name
        )
      `)
      .eq('date', today)
      .order('time', { ascending: true })

    if (error) {
      console.error('Erro ao buscar agendamentos:', error)
    } else {
      setAppointments(data)
    }
  }

  async function handleSaveAppointment() {
    if (!selectedTime) {
      alert('Selecione um horário.')
      return
    }

    if (!selectedClient) {
      alert('Selecione um cliente.')
      return
    }

    if (!user?.id) {
      alert('Usuário não encontrado.')
      return
    }

    const alreadyExists = appointments.find(
      (appointment) => appointment.time === selectedTime
    )

    if (alreadyExists) {
      alert('Esse horário já está ocupado.')
      return
    }

    setLoading(true)

    const today = selectedDate

    const { error } = await supabase.from('appointments').insert([
      {
        date: today,
        time: selectedTime,
        client_id: selectedClient,
        user_id: user.id,
      },
    ])

    if (error) {
      alert(`Erro ao salvar agendamento: ${error.message}`)
      console.error('Erro ao salvar agendamento:', error)
    } else {
      alert('Agendamento salvo com sucesso')
      setSelectedClient('')
      setSelectedTime(null)
      fetchAppointments()
    }

    setLoading(false)
  }

  async function handleDeleteAppointment(id) {
    const confirmDelete = window.confirm('Deseja excluir este agendamento?')

    if (!confirmDelete) return

    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id)

    if (error) {
      alert(`Erro ao excluir agendamento: ${error.message}`)
      console.error('Erro ao excluir agendamento:', error)
    } else {
      alert('Agendamento excluído com sucesso')
      if (selectedTime) {
        setSelectedTime(null)
      }
      fetchAppointments()
    }
  }

  function getAppointmentByTime(hora) {
    return appointments.find((appointment) => appointment.time === hora)
  }

  return (
    <div className="flex min-h-screen bg-[#f7f3ee]">
      <aside className="flex min-h-screen w-64 flex-col justify-between bg-[#4e342e] p-6 text-white shadow-xl">
        <div>
          <h1 className="mb-10 text-2xl font-bold tracking-wide text-[#f7e7ce]">
            BellaAgenda
          </h1>

          <nav className="space-y-4">
            <Link
              to="/dashboard"
              className="block rounded-lg px-3 py-2 text-[#f3e5d8] transition hover:bg-[#6d4c41]"
            >
              Dashboard
            </Link>

            <Link
              to="/clients"
              className="block rounded-lg px-3 py-2 text-[#f3e5d8] transition hover:bg-[#6d4c41]"
            >
              Clientes
            </Link>

            <Link
              to="/agenda"
              className="block rounded-lg bg-[#6d4c41] px-3 py-2 text-[#fff8f0]"
            >
              Agenda
            </Link>
          </nav>
        </div>

        <div className="w-full rounded-xl bg-[#d7a86e] py-3 text-center font-semibold text-[#3e2723]">
          {user?.email}
        </div>
      </aside>

      <main className="flex-1 p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#4e342e]">Agenda</h1>
          <p className="mt-1 text-sm text-[#8d6e63]">
            Gerencie seus atendimentos
          </p>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-[#6d4c41]">
            Selecione a data
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value)
              setSelectedTime(null)
              setSelectedClient('')
            }}
            className="rounded-xl border border-[#e0d6cd] bg-white p-3 text-[#4e342e] outline-none focus:ring-2 focus:ring-[#d7a86e]"
          />
        </div>

        <div className="rounded-2xl border border-[#efe4db] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-[#4e342e]">
            Horários do Dia
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {horarios.map((hora) => {
              const appointment = getAppointmentByTime(hora)

              return (
                <div
                  key={hora}
                  onClick={() => {
                    if (appointment) {
                      handleDeleteAppointment(appointment.id)
                    } else {
                      setSelectedTime(hora)
                    }
                  }}
                  className={`rounded-xl border p-4 text-center transition ${
                    appointment
                      ? 'border-[#c9975c] bg-[#f3e5d8] text-[#4e342e]'
                      : selectedTime === hora
                      ? 'cursor-pointer border-[#c9975c] bg-[#f3e5d8] text-[#4e342e]'
                      : 'cursor-pointer border-[#e0d6cd] hover:bg-[#f7f3ee]'
                  }`}
                >
                  <p className="font-semibold">{hora}</p>

                  {appointment && (
                    <p className="mt-2 text-xs font-medium text-[#6d4c41]">
                      {appointment.clients?.name || 'Agendado'}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          {selectedTime && (
            <div className="mt-6 rounded-2xl border border-[#efe4db] bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-[#4e342e]">
                Novo Agendamento - {selectedTime}
              </h3>

              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="mb-3 w-full rounded-xl border border-[#e0d6cd] p-3 outline-none focus:ring-2 focus:ring-[#d7a86e]"
              >
                <option value="">Selecione um cliente</option>

                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleSaveAppointment}
                disabled={loading}
                className="rounded-xl bg-[#d7a86e] px-6 py-3 font-semibold text-[#3e2723] transition hover:bg-[#c9975c]"
              >
                {loading ? 'Salvando...' : 'Salvar Agendamento'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Agenda