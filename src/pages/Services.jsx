import { useEffect, useState } from "react";
import { supabase } from "../services/supabase/client";

export default function Services() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState(60);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchServices() {
    setLoading(true);

    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar serviços:", error.message);
    } else {
      setServices(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchServices();
  }, []);

  function resetForm() {
    setName("");
    setPrice("");
    setDuration(60);
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Digite o nome do serviço.");
      return;
    }

    if (price === "" || Number(price) < 0) {
      alert("Digite um valor válido.");
      return;
    }

    if (!duration || Number(duration) <= 0) {
      alert("Digite uma duração válida.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Usuário não encontrado.");
      return;
    }

    const payload = {
      user_id: user.id,
      name: name.trim(),
      price: Number(price),
      duration_minutes: Number(duration),
    };

    let error = null;

    if (editingId) {
      const response = await supabase
        .from("services")
        .update(payload)
        .eq("id", editingId);

      error = response.error;
    } else {
      const response = await supabase.from("services").insert([payload]);
      error = response.error;
    }

    if (error) {
      console.error("Erro ao salvar serviço:", error.message);
      alert("Erro ao salvar serviço.");
      return;
    }

    resetForm();
    fetchServices();
  }

  async function handleEdit(service) {
    setEditingId(service.id);
    setName(service.name);
    setPrice(service.price);
    setDuration(service.duration_minutes);
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este serviço?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      console.error("Erro ao excluir serviço:", error.message);
      alert("Erro ao excluir serviço.");
      return;
    }

    fetchServices();
  }

  function formatCurrency(value) {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-800">Serviços</h1>
        <p className="text-sm text-zinc-500">
          Cadastre os serviços que o salão oferece.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
          <h2 className="mb-4 text-lg font-semibold text-zinc-800">
            {editingId ? "Editar serviço" : "Novo serviço"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">
                Nome do serviço
              </label>
              <input
                type="text"
                placeholder="Ex: Corte feminino"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">
                Valor
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Ex: 80.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">
                Duração (minutos)
              </label>
              <input
                type="number"
                min="1"
                placeholder="Ex: 60"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-xl bg-orange-500 px-5 py-3 font-medium text-white hover:bg-orange-600"
              >
                {editingId ? "Salvar alterações" : "Cadastrar serviço"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-zinc-300 px-5 py-3 font-medium text-zinc-700 hover:bg-zinc-100"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
          <h2 className="mb-4 text-lg font-semibold text-zinc-800">
            Lista de serviços
          </h2>

          {loading ? (
            <p className="text-zinc-500">Carregando serviços...</p>
          ) : services.length === 0 ? (
            <p className="text-zinc-500">Nenhum serviço cadastrado ainda.</p>
          ) : (
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 p-4"
                >
                  <div>
                    <h3 className="font-semibold text-zinc-800">
                      {service.name}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {formatCurrency(service.price)} • {service.duration_minutes} min
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200"
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
  );
}