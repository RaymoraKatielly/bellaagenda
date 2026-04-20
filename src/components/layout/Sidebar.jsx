import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Scissors,
  Wallet,
  Settings
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

function Sidebar() {
  const { signOut, user } = useAuth()

  const menuItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/clients', label: 'Clientes', icon: Users },
    { to: '/agenda', label: 'Agenda', icon: CalendarDays },
    { to: '/services', label: 'Serviços', icon: Scissors },
    { to: '/financial', label: 'Financeiro', icon: Wallet },
    { to: '/settings', label: 'Configurações', icon: Settings }
  ]

  async function handleLogout() {
    await signOut()
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-56 bg-[#4e342e] text-white shadow-xl">
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="border-b border-[#6d4c41] px-4 py-5">
            <h1 className="text-2xl font-bold text-[#f7e7ce]">BellaAgenda</h1>
            <p className="mt-1 text-sm text-[#e8d7c8]">Gestão para beleza</p>
          </div>

          <nav className="space-y-1 p-3">
            {menuItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[#6d4c41] text-white'
                      : 'text-[#f3e5d8] hover:bg-[#5d4037]'
                  }`
                }
              >
                <Icon size={17} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="border-t border-[#6d4c41] p-3">
          <p className="mb-3 truncate text-sm text-[#f3e5d8]">{user?.email}</p>

          <button
            onClick={handleLogout}
            className="w-full rounded-xl bg-[#d7a86e] py-2.5 font-semibold text-[#3e2723] transition hover:bg-[#c9975c]"
          >
            Sair
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar