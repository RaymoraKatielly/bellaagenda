import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

  const [editingClient, setEditingClient] = useState(null)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editNotes, setEditNotes] = useState('')

  useEffect(() => {
    fetchClients()
  }, [])

  async function fetchClients() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

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
      alert(`Erro ao cadastrar cliente: ${error.message}`)
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

  async function handleDelete(id) {
    const confirmDelete = window.confirm('Deseja excluir este cliente?')
    if (!confirmDelete) return

    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)

    if (error) {
      alert(`Erro ao excluir cliente: ${error.message}`)
      console.error('Erro ao excluir cliente:', error)
    } else {
      alert('Cliente excluído com sucesso')
      fetchClients()
    }
  }

  function handleEdit(client) {
    setEditingClient(client)
    setEditName(client.name || '')
    setEditPhone(client.phone || '')
    setEditEmail(client.email || '')
    setEditNotes(client.notes || '')
  }

  async function handleUpdate() {
    const { error } = await supabase
      .from('clients')
      .update({
        name: editName,
        phone: editPhone,
        email: editEmail,
        notes: editNotes,
      })
      .eq('id', editingClient.id)

    if (error) {
      alert(`Erro ao atualizar cliente: ${error.message}`)
      console.error('Erro ao atualizar cliente:', error)
    } else {
      alert('Cliente atualizado com sucesso')
      setEditingClient(null)
      fetchClients()
    }
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
              className="block rounded-lg bg-[#6d4c41] px-3 py-2 text-[#fff8f0]"
            >
              Clientes
            </Link>

            <Link
              to="/agenda"
              className="block rounded-lg px-3 py-2 text-[#f3e5d8] transition hover:bg-[#6d4c41]"
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
            Cadastro de Clientes
          </h1>
          <p className="mt-1 text-sm text-[#8d6e63]">
            Cadastre e acompanhe suas clientes
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#efe4db] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-[#4e342e]">
              Novo Cliente
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nome"
                className="w-full rounded-xl border border-[#e0d6cd] p-3 focus:outline-none focus:ring-2 focus:ring-[#d7a86e]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Telefone"
                className="w-full rounded-xl border border-[#e0d6cd] p-3 focus:outline-none focus:ring-2 focus:ring-[#d7a86e]"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-[#e0d6cd] p-3 focus:outline-none focus:ring-2 focus:ring-[#d7a86e]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <textarea
                placeholder="Observações"
                className="w-full rounded-xl border border-[#e0d6cd] p-3 focus:outline-none focus:ring-2 focus:ring-[#d7a86e]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-[#d7a86e] px-6 py-3 font-semibold text-[#3e2723] transition hover:bg-[#c9975c]"
              >
                {loading ? 'Salvando...' : 'Cadastrar'}
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-[#efe4db] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-[#4e342e]">
              Lista de Clientes
            </h2>

            {clients.length === 0 ? (
              <p className="text-[#8d6e63]">Nenhum cliente cadastrado ainda.</p>
            ) : (
              <div className="space-y-4">
                {clients.map((client) => (
                  <div
                    key={client.id}
                    className="rounded-2xl border border-[#efe4db] bg-[#fffdfb] p-4"
                  >
                    <p className="text-lg font-semibold text-[#4e342e]">
                      {client.name}
                    </p>
                    <p className="mt-2 text-sm text-[#6d4c41]">
                      <strong>Telefone:</strong> {client.phone || '—'}
                    </p>
                    <p className="text-sm text-[#6d4c41]">
                      <strong>Email:</strong> {client.email || '—'}
                    </p>
                    <p className="text-sm text-[#6d4c41]">
                      <strong>Observações:</strong> {client.notes || '—'}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(client)}
                        className="rounded-xl bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(client.id)}
                        className="rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {editingClient && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="mb-4 text-xl font-semibold text-[#4e342e]">
                Editar Cliente
              </h2>

              <input
                className="mb-3 w-full rounded-xl border border-[#e0d6cd] p-3"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Nome"
              />

              <input
                className="mb-3 w-full rounded-xl border border-[#e0d6cd] p-3"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                placeholder="Telefone"
              />

              <input
                className="mb-3 w-full rounded-xl border border-[#e0d6cd] p-3"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="Email"
              />

              <textarea
                className="mb-4 w-full rounded-xl border border-[#e0d6cd] p-3"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Observações"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="rounded-xl bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
                >
                  Salvar
                </button>

                <button
                  type="button"
                  onClick={() => setEditingClient(null)}
                  className="rounded-xl bg-gray-400 px-4 py-2 text-white transition hover:bg-gray-500"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Clients