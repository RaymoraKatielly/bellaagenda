import { useEffect, useState } from 'react'
import { supabase } from '../../services/supabase/client'
import { useAuth } from '../../hooks/useAuth'

function Clients() {
  const { user } = useAuth()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState([])

  useEffect(() => {
    fetchClients()
  }, [])

  async function fetchClients() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')

    if (error) {
      console.error('Erro ao buscar clientes:', error)
    } else {
      setClients(data)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('clients').insert([
      {
        name,
        phone,
        email,
        notes,
        user_id: user.id,
      },
    ])

    if (error) {
      alert('Erro ao cadastrar cliente')
      console.error(error)
    } else {
      alert('Cliente cadastrado com sucesso')
      setName('')
      setPhone('')
      setEmail('')
      setNotes('')
      fetchClients()
    }

    setLoading(false)
  }

  return (
    <div className="p-10">
      <h1 className="mb-6 text-2xl font-bold text-[#4e342e]">
        Cadastro de Clientes
      </h1>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <input
          type="text"
          placeholder="Nome"
          className="w-full rounded-xl border p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Telefone"
          className="w-full rounded-xl border p-3"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Observações"
          className="w-full rounded-xl border p-3"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#d7a86e] px-6 py-3 font-semibold"
        >
          {loading ? 'Salvando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  )
}

export default Clients