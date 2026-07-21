import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setErro(data.erro || "Erro ao criar conta.");
        return;
      }

      navigate("/login");
    } catch (err) {
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="max-w-sm mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Criar conta</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        />

        {erro && <p className="text-red-600 text-sm">{erro}</p>}

        <button
          type="submit"
          disabled={carregando}
          className="bg-[#4C1D95] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2E1065] disabled:opacity-50"
        >
          {carregando ? "Criando..." : "Criar conta"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        Já tem conta? <Link to="/login" className="text-[#4C1D95] font-semibold">Entrar</Link>
      </p>
    </section>
  );
}