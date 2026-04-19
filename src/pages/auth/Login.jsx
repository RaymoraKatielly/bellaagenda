import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

function Login() {
  const { signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
    } catch (error) {
      setError('E-mail ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f3ee]">

      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-sm border border-[#efe4db]">

        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-[#4e342e] mb-2">
          BellaAgenda
        </h1>

        <p className="text-center text-[#8d6e63] mb-8">
          Seu controle de agenda premium
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            placeholder="Seu e-mail"
            className="w-full px-4 py-3 rounded-xl border border-[#e0d6cd] focus:outline-none focus:ring-2 focus:ring-[#d7a86e]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Sua senha"
            className="w-full px-4 py-3 rounded-xl border border-[#e0d6cd] focus:outline-none focus:ring-2 focus:ring-[#d7a86e]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#d7a86e] text-[#3e2723] font-semibold hover:bg-[#c9975c] transition"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login