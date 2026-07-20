import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIAS = ["Livros", "Engenharia", "Computação"];

export function Anunciar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    categoria: CATEGORIAS[0],
    preco: "",
    imagemUrl: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  // TEMPORÁRIO: até termos login, usamos um ID fixo salvo aqui
  const usuarioId = "6bb7390b-33fd-46ff-83ac-747cbc9b0728";

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      const res = await fetch("http://localhost:3333/anuncios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          preco: form.preco ? Number(form.preco) : null,
          usuarioId,
        }),
      });

      if (!res.ok) throw new Error("Erro ao criar anúncio");

      navigate("/meus-anuncios");
    } catch (err) {
      setErro("Não foi possível criar o anúncio. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="max-w-lg mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Anunciar um item</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="titulo"
          placeholder="Título do item"
          value={form.titulo}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        />

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
          rows={3}
        />

        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
        >
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          name="preco"
          type="number"
          placeholder="Preço (deixe vazio se for doação)"
          value={form.preco}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
        />

        <input
          name="imagemUrl"
          placeholder="URL da imagem"
          value={form.imagemUrl}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        />

        {erro && <p className="text-red-600 text-sm">{erro}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
        >
          {enviando ? "Enviando..." : "Publicar anúncio"}
        </button>
      </form>
    </section>
  );
}