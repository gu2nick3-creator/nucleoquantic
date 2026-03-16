import { Link } from "react-router-dom";
import { Instagram, MessageCircle, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const WHATSAPP_URL = "https://wa.me/5586998431378";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl font-bold mb-4">
              Núcleo <span className="text-accent">Quantic</span>
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Clínica integrativa especializada em Neuropsicanálise Clínica e terapias complementares.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Navegação</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Início", href: "/" },
                { label: "Sobre Nós", href: "/sobre" },
                { label: "Serviços", href: "/servicos" },
                { label: "Loja", href: "/loja" },
                { label: "Contato", href: "/contato" },
              ].map((item) => (
                <Link key={item.href} to={item.href} className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Serviços</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/60">
              <span>Neuropsicanálise Clínica</span>
              <span>Terapia Homeopata</span>
              <span>Terapia Quântica</span>
              <span>Consultas Presenciais</span>
              <span>Consultas Online</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contato</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" /> (86) 99843-1378
              </a>
              <a href="https://www.instagram.com/nucleo_quantic/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Instagram className="w-4 h-4" /> @nucleo_quantic
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Rua Antonio Cardoso de Oliveira, Portal dos Carnaubais, Campo Maior - PI</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Núcleo Quantic. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/40 hover:text-accent transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/nucleo_quantic/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/40 hover:text-accent transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
