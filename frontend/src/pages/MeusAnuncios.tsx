import { useEffect, useState } from "react";

interface Anuncio {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  preco: number | null;
  imagemUrl: string;
}

const usuarioId = "6bb7390b-33fd-46ff-83ac-747cbc9b0728";

export function MeusAnuncios() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3333/anuncios/usuario/${usuarioId}`)
      .then((res) => res.json())
      .then((data) => setAnuncios(data))
      .finally(() => setCarregando(false));
  }, []);

  async function handleDelete(id: string) {
    await fetch(`http://localhost:3333/anuncios/${id}`, { method: "DELETE" });
    setAnuncios(anuncios.filter((a) => a.id !== id));
  }

  return (
    <section className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Meus anúncios</h1>

      {carregando ? (
        <p className="text-gray-500">Carregando...</p>
      ) : anuncios.length === 0 ? (
        <p className="text-gray-500">Você ainda não tem anúncios.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {anuncios.map((anuncio) => (
            <div key={anuncio.id} className="border rounded-lg overflow-hidden shadow-sm">
              <img
                src={anuncio.imagemUrl}
                alt={anuncio.titulo}
                className="w-full h-40 object-cover bg-gray-100"
              />
              <div className="p-4">
                <span className="text-xs text-green-700 font-semibold">
                  {anuncio.categoria}
                </span>
                <h3 className="font-bold text-gray-800">{anuncio.titulo}</h3>
                <p className="mt-2 font-semibold">
                  {anuncio.preco ? `R$ ${anuncio.preco.toFixed(2)}` : "Doação"}
                </p>
                <button
                  onClick={() => handleDelete(anuncio.id)}
                  className="mt-3 text-sm text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}