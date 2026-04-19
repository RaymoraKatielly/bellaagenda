import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'


function Agenda() {
  const { user } = useAuth()
  const [selectedTime, setSelectedTime] = useState(null)

  return (
    <div className="flex min-h-screen bg-[#f7f3ee]">
      <aside className="w-64 min-h-screen bg-[#4e342e] p-6 text-white shadow-xl flex flex-col justify-between">
        <div>
          <h1 className="mb-10 text-2xl font-bold tracking-wide text-[#f7e7ce]">
            BellaAgenda
          </h1>

          <nav className="space-y-4">
            <Link
              to="/dashboard"
              className="block rounded-lg px-3 py-2 text-[#f3e5d8] hover:bg-[#6d4c41] transition"
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

        <div className="w-full rounded-xl bg-[#d7a86e] py-3 text-center font-semibold text-[#3e2723]">
          {user?.email}
        </div>
      </aside>

      <main className="flex-1 p-10">
  <div className="mb-10">
    <h1 className="text-3xl font-bold text-[#4e342e]">
      Agenda
    </h1>
    <p className="mt-1 text-sm text-[#8d6e63]">
      Gerencie seus atendimentos
    </p>
  </div>

  <div className="rounded-2xl border border-[#efe4db] bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-xl font-semibold text-[#4e342e]">
      Horários do Dia
    </h2>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {[
        '08:00', '09:00', '10:00', '11:00',
        '13:00', '14:00', '15:00', '16:00',
        '17:00', '18:00'
      ].map((hora) => (
        <div
  key={hora}
  onClick={() => setSelectedTime(hora)}
  className="cursor-pointer rounded-xl border border-[#e0d6cd] p-4 text-center hover:bg-[#f7f3ee] transition"
>
  {hora}
</div>
      ))}
    </div>
  </div>
</main>
    </div>
  )
}

export default Agenda