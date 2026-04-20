import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Scissors,
  Wallet,
  Settings
} from 'lucide-react'

function Sidebar() {
  const menuItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/clients', label: 'Clientes', icon: Users },
    { to: '/agenda', label: 'Agenda', icon: CalendarDays },
    { to: '/services', label: 'Serviços', icon: Scissors },
    { to: '/financial', label: 'Financeiro', icon: Wallet },
    { to: '/settings', label: 'Configurações', icon: Settings }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">B</div>
        <div>
          <h2>BellaAgenda</h2>
          <p>Gestão para beleza</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar