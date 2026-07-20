import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
 
const NAV_LINKS = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#categorias", label: "Categorias" },
  { href: "#vitrine", label: "Ver anúncios" },
];
 
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
 
  // trava o scroll do body quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
 
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#2E1065] to-[#4C1D95] shadow-lg shadow-[#1C0F33]/20">
      <div className="flex items-center justify-between px-6 py-4">
        <a href="/" className="flex flex-col leading-none" onClick={() => setIsOpen(false)}>
          <span className="text-xl font-bold text-[#F7F5FB]">Desapego</span>
          <span className="mt-1 text-[10px] font-mono uppercase tracking-widest text-[#C6F135]">
            Campus · Unifor
          </span>
        </a>
 
        <nav className="hidden md:flex gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#A78BFA] hover:text-[#F7F5FB] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
 
        <div className="hidden md:flex items-center gap-4">
          <a href="/entrar" className="text-[#F7F5FB] opacity-85 hover:opacity-100 transition-opacity">
            Entrar
          </a>
          <a
            href="/anunciar"
            className="rounded-full bg-[#C6F135] px-5 py-2 text-sm font-semibold text-[#1C0F33] hover:-translate-y-0.5 transition-transform"
          >
            Anunciar item
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-[#F7F5FB] hover:bg-white/10 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 pb-6 pt-2 border-t border-white/10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-3 text-[#A78BFA] hover:text-[#F7F5FB] transition-colors"
            >
              {link.label}
            </a>
          ))}
 
          <div className="flex flex-col gap-3 mt-3 pt-4 border-t border-white/10">
            <a
              href="/entrar"
              onClick={() => setIsOpen(false)}
              className="text-center py-2 text-[#F7F5FB] opacity-85 hover:opacity-100 transition-opacity"
            >
              Entrar
            </a>
            <a
              href="/anunciar"
              onClick={() => setIsOpen(false)}
              className="text-center rounded-full bg-[#C6F135] px-5 py-3 text-sm font-semibold text-[#1C0F33] active:scale-95 transition-transform"
            >
              Anunciar item
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}