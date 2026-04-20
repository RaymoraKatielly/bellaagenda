import { useAuth } from '../../hooks/useAuth'

function Header() {
  const { user } = useAuth()

  return (
    <header className="border-b border-[#eadfd6] bg-[#f7f3ee]">
      <div className="flex items-center justify-end px-6 py-5">
        <div className="text-right">
          <p className="font-semibold text-[#3e2723]">
            {user?.user_metadata?.name || 'Raymora'}
          </p>
          <p className="text-sm text-[#8d6e63]">Administrador(a)</p>
        </div>
      </div>
    </header>
  )
}

export default Header