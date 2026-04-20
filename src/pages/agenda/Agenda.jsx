import { useEffect, useState } from 'react'
import { supabase } from '../../services/supabase/client'

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

function Agenda() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedTime, setSelectedTime] = useState(null)
  const [clients, setClients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [selectedClient, setSelectedClient] = useState('')

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
      .order('name')

    if (error) {
      console.error('Erro ao buscar clientes:', error.message)
    } else {
      setClients(data || [])
    }
  }

  async function fetchAppointments() {
    const { data, error } = await supabase
      .from('appointments')
      .select('*, clients(name)')
      .eq('date', selectedDate)

    if (error) {
      console.error('Erro ao buscar agendamentos:', error.message)
    } else {
      setAppointments(data || [])
    }
  }

  function getAppointmentByTime(time) {
    return appointments.find((appointment) => appointment.time === time)
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

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return

    const { error } = await supabase.from('appointments').insert([
      {
        user_id: user.id,
        client_id: selectedClient,
        date: selectedDate,
        time: selectedTime
      }
    ])

    if (error) {
      console.error('Erro ao salvar agendamento:', error.message)
      return
    }

    setSelectedClient('')
    setSelectedTime(null)
    fetchAppointments()
  }

  async function handleDeleteAppointment(id) {
    const confirmDelete = window.confirm('Deseja excluir este agendamento?')
    if (!confirmDelete) return

    const { error } = await supabase.from('appointments').delete().eq('id', id)

    if (error) {
      console.error('Erro ao excluir agendamento:', error.message)
      return
    }

    fetchAppointments()
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#4e342e]">Agenda</h1>
        <p className="mt-1 text-sm text-[#8d6e63]">Gerencie seus atendimentos</p>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-[#6d4c41]">
          Selecione a data
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="rounded-xl border border-[#d8c7bb] bg-white px-4 py-3 outline-none focus:border-[#c9975c]"
        />
      </div>

      <div className="rounded-2xl border border-[#efe4db] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-[#4e342e]">Horários do Dia</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {timeSlots.map((time) => {
            const appointment = getAppointmentByTime(time)
            const isOccupied = !!appointment
            const isSelected = selectedTime === time

            return (
              <button
                key={time}
                type="button"
                onClick={() =>
                  isOccupied
                    ? handleDeleteAppointment(appointment.id)
                    : setSelectedTime(time)
                }
                className={`rounded-xl border px-4 py-3 text-center font-semibold transition ${
                  isOccupied
                    ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
                    : isSelected
                    ? 'border-[#c9975c] bg-[#f7e7ce] text-[#4e342e]'
                    : 'border-[#d8c7bb] bg-white text-[#4e342e] hover:bg-[#f7f3ee]'
                }`}
              >
                {isOccupied ? `${time} - ${appointment.clients?.name || 'Agendado'}` : time}
              </button>
            )
          })}
        </div>
      </div>

      {selectedTime && (
        <div className="mt-6 rounded-2xl border border-[#efe4db] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-[#4e342e]">
            Novo Agendamento - {selectedTime}
          </h2>

          <div className="space-y-4">
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full rounded-xl border border-[#d8c7bb] px-4 py-3 outline-none focus:border-[#c9975c]"
            >
              <option value="">Selecione um cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSaveAppointment}
              className="rounded-xl bg-[#d7a86e] px-5 py-3 font-semibold text-[#3e2723] transition hover:bg-[#c9975c]"
            >
              Salvar Agendamento
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Agenda