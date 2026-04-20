import { useAuth } from '../../hooks/useAuth'

function Header({ title }) {
  const { user } = useAuth()

  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-[#eadfd6] bg-[#f7f3ee]">
      <div>
        <h2 className="text-4xl font-bold text-[#4e342e]">{title}</h2>
        <p className="mt-1 text-base text-[#8d6e63]">
          Organize seus atendimentos com mais praticidade
        </p>
      </div>

      <div className="text-right">
        <p className="font-semibold text-[#3e2723]">
          {user?.user_metadata?.name || 'Raymora'}
        </p>
        <p className="text-sm text-[#8d6e63]">Administrador(a)</p>
      </div>
    </header>
  )
}

export default Header