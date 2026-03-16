import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, Lock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Loja", href: "/loja" },
  { label: "Contato", href: "/contato" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const WHATSAPP_URL =
    "https://wa.me/5586998431378?text=Olá! Gostaria de agendar uma consulta no Núcleo Quantic.";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#0f4fa8]/10 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between gap-3 px-3 sm:px-4 lg:h-24">
        <Link
          to="/"
          className="flex min-w-0 flex-1 items-center"
          aria-label="Núcleo Quantic"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_6px_24px_rgba(15,79,168,0.14)] ring-1 ring-[#0f4fa8]/10 sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]">
              <img
                src="/logo-icon.png"
                alt="Ícone Núcleo Quantic"
                className="h-11 w-11 object-contain sm:h-12 sm:w-12 lg:h-14 lg:w-14"
              />
            </div>

            <div className="flex min-w-0 flex-col justify-center text-left">
              <span className="truncate text-lg font-bold leading-none tracking-tight text-[#0f4fa8] sm:text-xl lg:text-[2rem]">
                NúcleoQuantic
              </span>
              <span className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4f77ad] sm:text-[11px] lg:text-sm">
                Fernando Paz
              </span>
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-4 lg:flex">
          <nav className="flex items-center gap-1 rounded-full border border-[#0f4fa8]/10 bg-white/80 px-2 py-2 shadow-[0_10px_30px_rgba(15,79,168,0.08)]">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#0f4fa8] text-white shadow-md"
                      : "text-foreground/70 hover:bg-[#0f4fa8]/8 hover:text-[#0f4fa8]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/carrinho"
              className="relative rounded-full border border-[#0f4fa8]/10 bg-white p-2.5 text-foreground/70 shadow-sm transition-all hover:-translate-y-0.5 hover:text-[#0f4fa8]"
              aria-label="Carrinho"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              to="/admin"
              className="rounded-full border border-[#0f4fa8]/10 bg-white p-2.5 text-foreground/70 shadow-sm transition-all hover:-translate-y-0.5 hover:text-[#0f4fa8]"
              aria-label="Login do painel admin"
            >
              <Lock className="h-5 w-5" />
            </Link>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="sm" className="rounded-full px-5">
                Agendar Consulta
              </Button>
            </a>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
          <Link
            to="/carrinho"
            className="relative rounded-full border border-[#0f4fa8]/10 bg-white p-2.5 text-foreground/70 shadow-sm"
            aria-label="Carrinho"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to="/admin"
            className="rounded-full border border-[#0f4fa8]/10 bg-white p-2.5 text-foreground/70 shadow-sm"
            aria-label="Login do painel admin"
          >
            <Lock className="h-5 w-5" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full border border-[#0f4fa8]/10 bg-white p-2.5 text-[#0f4fa8] shadow-sm"
            aria-label="Abrir menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[#0f4fa8]/10 bg-white/95 shadow-xl backdrop-blur-xl lg:hidden">
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-[#0f4fa8] text-white"
                      : "bg-[#f7faff] text-foreground/75 hover:bg-[#eaf2ff] hover:text-[#0f4fa8]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-2">
              <Button variant="gold" className="w-full rounded-2xl">
                Agendar Consulta
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
