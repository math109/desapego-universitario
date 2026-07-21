import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.erro || "Erro ao fazer login.");
        return;
      }

      login(data.token, data.usuario);
      navigate("/");
    } catch (err) {
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="max-w-sm mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Entrar</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded-lg px-4 py-2"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="border rounded-lg px-4 py-2"
        />

        {erro && <p className="text-red-600 text-sm">{erro}</p>}

        <button
          type="submit"
          disabled={carregando}
          className="bg-[#4C1D95] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2E1065] disabled:opacity-50"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        Não tem conta? <Link to="/cadastro" className="text-[#4C1D95] font-semibold">Cadastre-se</Link>
      </p>
    </section>
  );
}