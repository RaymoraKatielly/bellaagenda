import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, Users, Scissors } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

function Sidebar() {
  const { signOut, user } = useAuth()

  const menuItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/clients', label: 'Clientes', icon: Users },
    { to: '/agenda', label: 'Agenda', icon: CalendarDays },
    { to: '/services', label: 'Serviços', icon: Scissors }
  ]

  async function handleLogout() {
    await signOut()
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#4e342e] text-white shadow-xl flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-[#6d4c41]">
          <h1 className="text-3xl font-bold text-[#f7e7ce]">BellaAgenda</h1>
          <p className="mt-1 text-sm text-[#e8d7c8]">Gestão para beleza</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? 'bg-[#6d4c41] text-white'
                    : 'text-[#f3e5d8] hover:bg-[#5d4037]'
                }`
              }
            >
              <Icon size={18} />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-[#6d4c41]">
        <div className="mb-3 text-sm text-[#f3e5d8] truncate">
          {user?.email}
        </div>

        <button
          onClick={handleLogout}
          className="w-full rounded-xl bg-[#d7a86e] py-3 font-semibold text-[#3e2723] hover:bg-[#c9975c] transition"
        >
          Sair
        </button>
      </div>
    </aside>
  )
}

export default Sidebar