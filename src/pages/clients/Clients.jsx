import { useEffect, useState } from 'react'
import { supabase } from '../../services/supabase/client'

function Clients() {
  const [clients, setClients] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchClients()
  }, [])

  async function fetchClients() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar clientes:', error.message)
    } else {
      setClients(data || [])
    }
  }

  function resetForm() {
    setName('')
    setPhone('')
    setEmail('')
    setNotes('')
    setEditingId(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!name.trim()) {
      alert('Digite o nome do cliente.')
      return
    }

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return

    const payload = {
      user_id: user.id,
      name: name.trim(),
      phone,
      email,
      notes
    }

    let error = null

    if (editingId) {
      const response = await supabase
        .from('clients')
        .update(payload)
        .eq('id', editingId)

      error = response.error
    } else {
      const response = await supabase.from('clients').insert([payload])
      error = response.error
    }

    if (error) {
      console.error('Erro ao salvar cliente:', error.message)
      return
    }

    resetForm()
    fetchClients()
  }

  function handleEdit(client) {
    setEditingId(client.id)
    setName(client.name || '')
    setPhone(client.phone || '')
    setEmail(client.email || '')
    setNotes(client.notes || '')
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm('Deseja excluir este cliente?')
    if (!confirmDelete) return

    const { error } = await supabase.from('clients').delete().eq('id', id)

    if (error) {
      console.error('Erro ao excluir cliente:', error.message)
      return
    }

    fetchClients()
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#4e342e]">Cadastro de Clientes</h1>
        <p className="mt-1 text-sm text-[#8d6e63]">
          Cadastre e acompanhe suas clientes
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-[#efe4db] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-[#4e342e]">
            {editingId ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[#d8c7bb] px-4 py-3 outline-none focus:border-[#c9975c]"
            />

            <input
              type="text"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-[#d8c7bb] px-4 py-3 outline-none focus:border-[#c9975c]"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#d8c7bb] px-4 py-3 outline-none focus:border-[#c9975c]"
            />

            <textarea
              placeholder="Observações"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              className="w-full rounded-xl border border-[#d8c7bb] px-4 py-3 outline-none focus:border-[#c9975c]"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#d7a86e] px-5 py-3 font-semibold text-[#3e2723] transition hover:bg-[#c9975c]"
              >
                {editingId ? 'Salvar alterações' : 'Cadastrar'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-[#d8c7bb] px-5 py-3 font-semibold text-[#6d4c41] hover:bg-[#f7f3ee]"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="rounded-2xl border border-[#efe4db] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-[#4e342e]">Lista de Clientes</h2>

          {clients.length === 0 ? (
            <p className="text-[#8d6e63]">Nenhum cliente cadastrado ainda.</p>
          ) : (
            <div className="space-y-3">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-start justify-between rounded-xl border border-[#efe4db] p-4"
                >
                  <div>
                    <h3 className="font-semibold text-[#4e342e]">{client.name}</h3>
                    <p className="text-sm text-[#8d6e63]">{client.phone || 'Sem telefone'}</p>
                    <p className="text-sm text-[#8d6e63]">{client.email || 'Sem email'}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(client)}
                      className="rounded-lg bg-[#f7f3ee] px-4 py-2 text-sm font-medium text-[#6d4c41] hover:bg-[#efe4db]"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
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
    </div>
  )
}

export default Clients