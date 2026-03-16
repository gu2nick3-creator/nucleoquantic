import AnimatedSection from "@/components/AnimatedSection";
import { HeartHandshake, Eye, Fingerprint, Globe, ShieldCheck, Sparkles } from "lucide-react";

const differentials = [
  { icon: HeartHandshake, title: "Atendimento Humanizado", text: "Cada paciente é acolhido com empatia, escuta ativa e respeito à sua individualidade." },
  { icon: Eye, title: "Visão Integrativa", text: "Olhar completo que une corpo, mente e emoções no processo terapêutico." },
  { icon: Fingerprint, title: "Foco na Causa", text: "Tratamos a origem dos desequilíbrios, não apenas os sintomas aparentes." },
  { icon: Sparkles, title: "Acompanhamento Individualizado", text: "Planos de cuidado personalizados para cada jornada de saúde." },
  { icon: Globe, title: "Presencial & Online", text: "Flexibilidade de atendimento para pacientes de qualquer lugar do Brasil." },
  { icon: ShieldCheck, title: "Ambiente de Confiança", text: "Espaço seguro para que você se sinta à vontade em sua jornada de cura." },
];

const DifferentialsSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Por que nos escolher</span>
          <h2 className="section-title mt-3 mb-4 mx-auto">Nossos Diferenciais</h2>
          <p className="section-subtitle mx-auto">
            O que torna o Núcleo Quantic uma referência em saúde integrativa.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.08}>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
