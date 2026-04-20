import { useEffect, useState } from "react";
import { supabase } from "../services/supabase/client";

function Services() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState(60);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

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

  function handleEdit(service) {
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
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#4e342e]">Serviços</h2>
        <p className="mt-1 text-sm text-[#8d6e63]">
          Cadastre os serviços oferecidos no salão.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-[#efe4db] bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-2xl font-bold text-[#4e342e]">
            {editingId ? "Editar serviço" : "Novo serviço"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#6d4c41]">
                Nome do serviço
              </label>
              <input
                type="text"
                placeholder="Ex: Corte feminino"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-[#d8c7bb] px-4 py-3 outline-none focus:border-[#c9975c]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#6d4c41]">
                Valor
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Ex: 80.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-[#d8c7bb] px-4 py-3 outline-none focus:border-[#c9975c]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#6d4c41]">
                Duração (minutos)
              </label>
              <input
                type="number"
                min="1"
                placeholder="Ex: 60"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-xl border border-[#d8c7bb] px-4 py-3 outline-none focus:border-[#c9975c]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="rounded-xl bg-[#d7a86e] px-5 py-3 font-semibold text-[#3e2723] transition hover:bg-[#c9975c]"
              >
                {editingId ? "Salvar alterações" : "Cadastrar serviço"}
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
          <h3 className="mb-4 text-2xl font-bold text-[#4e342e]">
            Lista de serviços
          </h3>

          {loading ? (
            <p className="text-[#8d6e63]">Carregando serviços...</p>
          ) : services.length === 0 ? (
            <p className="text-[#8d6e63]">Nenhum serviço cadastrado ainda.</p>
          ) : (
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between rounded-xl border border-[#efe4db] p-4"
                >
                  <div>
                    <h4 className="font-semibold text-[#4e342e]">
                      {service.name}
                    </h4>
                    <p className="text-sm text-[#8d6e63]">
                      {formatCurrency(service.price)} • {service.duration_minutes} min
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="rounded-lg bg-[#f7f3ee] px-4 py-2 text-sm font-medium text-[#6d4c41] hover:bg-[#efe4db]"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
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
  );
}

export default Services;