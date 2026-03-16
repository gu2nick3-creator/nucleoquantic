import AnimatedSection from "@/components/AnimatedSection";
import { Brain, Leaf, Atom, Building, Monitor } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Neuropsicanálise Clínica",
    description: "Abordagem que une neurociência e psicanálise para compreender os processos mentais profundos, tratando ansiedade, depressão, traumas e padrões comportamentais na raiz.",
    audience: "Para quem busca autoconhecimento profundo e transformação emocional.",
  },
  {
    icon: Leaf,
    title: "Terapia Homeopata",
    description: "Tratamento natural e individualizado que estimula o organismo a restaurar seu equilíbrio, utilizando substâncias diluídas e potencializadas para tratar corpo e mente.",
    audience: "Ideal para tratamentos crônicos, alergias, insônia e desequilíbrios hormonais.",
  },
  {
    icon: Atom,
    title: "Terapia Quântica",
    description: "Técnica inovadora que trabalha com frequências e campos energéticos do corpo, promovendo harmonização celular, alívio de dores e restauração do equilíbrio vital.",
    audience: "Indicada para quem busca equilíbrio energético e bem-estar integral.",
  },
  {
    icon: Building,
    title: "Consultas Presenciais",
    description: "Atendimento acolhedor no Núcleo Quantic, em ambiente preparado para proporcionar conforto, privacidade e uma experiência terapêutica completa.",
    audience: "Para quem prefere o contato presencial e está em Campo Maior - PI.",
  },
  {
    icon: Monitor,
    title: "Consultas Online",
    description: "Teleconsultas com a mesma qualidade do atendimento presencial, levando o cuidado integrativo a qualquer lugar do Brasil com praticidade e segurança.",
    audience: "Para pacientes de qualquer localidade que buscam flexibilidade.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="section-padding bg-background">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Nossos Serviços</span>
          <h2 className="section-title mt-3 mb-4 mx-auto">Especialidades & Serviços</h2>
          <p className="section-subtitle mx-auto">
            Abordagens complementares e integrativas para o seu equilíbrio físico, emocional e comportamental.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.1}>
              <div className="h-full bg-card border border-border rounded-2xl p-8 card-hover group">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                <p className="text-xs text-accent font-medium">{service.audience}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
