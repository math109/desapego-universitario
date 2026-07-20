export function Footer() {
  return (
    <footer className="bg-[#1C0F33] text-center py-8 px-6">
      <p className="font-bold text-sm text-[#F7F5FB] mb-2">Desapego Universitário</p>
 
      <p className="text-[10px] font-mono uppercase tracking-widest text-[#C6F135] mb-3">
        Laboratório Vortex · UNIFOR
      </p>
 
      <div className="flex items-center justify-center gap-4 mb-3">
        <a
          href="https://github.com/SEU-USUARIO/SEU-REPOSITORIO"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#A78BFA] text-sm hover:text-[#F7F5FB] transition-colors"
        >
          Repositório
        </a>
        <span className="text-[#4C1D95]">·</span>
        <a href="#como-funciona" className="text-[#A78BFA] text-sm hover:text-[#F7F5FB] transition-colors">
          Como funciona
        </a>
      </div>
 
      <p className="text-[#A78BFA] text-sm">
        © {new Date().getFullYear()} — Projeto acadêmico por Matheus Martins
      </p>
    </footer>
  );
}