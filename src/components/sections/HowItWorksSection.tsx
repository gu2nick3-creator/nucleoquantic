import AnimatedSection from "@/components/AnimatedSection";
import { MessageCircle, CalendarCheck, Video, Stethoscope, HeartPulse } from "lucide-react";

const steps = [
  { icon: MessageCircle, title: "Contato", description: "Entre em contato pelo WhatsApp e converse com nossa equipe." },
  { icon: CalendarCheck, title: "Agendamento", description: "Escolha o melhor dia e horário para sua consulta." },
  { icon: Video, title: "Presencial ou Online", description: "Decida entre atendimento presencial na clínica ou teleconsulta." },
  { icon: Stethoscope, title: "Atendimento", description: "Consulta detalhada com avaliação integrativa completa." },
  { icon: HeartPulse, title: "Acompanhamento", description: "Plano de cuidado personalizado com suporte contínuo." },
];

const HowItWorksSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Jornada do Paciente</span>
          <h2 className="section-title mt-3 mb-4 mx-auto">Como Funciona</h2>
          <p className="section-subtitle mx-auto">
            Conheça o passo a passo do seu atendimento no Núcleo Quantic.
          </p>
        </AnimatedSection>

        <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-start justify-center">
          {steps.map((step, index) => (
            <AnimatedSection key={step.title} delay={index * 0.1} className="flex-1 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full forest-gradient flex items-center justify-center mb-4 shadow-lg">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <span className="text-accent font-bold text-xs mb-2">0{index + 1}</span>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
