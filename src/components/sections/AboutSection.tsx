import AnimatedSection from "@/components/AnimatedSection";
import clinicImg from "@/assets/clinic-interior.jpg";
import { Heart, Shield, Users, Leaf } from "lucide-react";
import { useAdminStore } from "@/hooks/useAdminStore";

const AboutSection = () => {
  const { siteImages } = useAdminStore();
  const currentClinicImage = siteImages.clinicImage || clinicImg;

  const highlights = [
    { icon: Heart, label: "Atendimento Humanizado" },
    { icon: Shield, label: "Abordagem Integrativa" },
    { icon: Users, label: "Presencial & Online" },
    { icon: Leaf, label: "Terapias Complementares" },
  ];

  return (
    <section id="sobre" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div className="relative">
              <img src={currentClinicImage} alt="Interior do Núcleo Quantic" className="w-full rounded-2xl shadow-xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-accent/10 border border-accent/20 hidden md:block" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Quem Somos</span>
            <h2 className="section-title mt-3 mb-6">
              Cuidado integral para corpo, mente e emoções
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              O Núcleo Quantic é uma clínica integrativa que atua com atendimento presencial e teleconsulta online,
              oferecendo cuidado completo e humanizado. Utilizamos recursos modernos e terapias integrativas voltadas
              ao tratamento da causa, buscando promover saúde e bem-estar de forma individualizada.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Nossa abordagem une Neuropsicanálise Clínica, Homeopatia e Terapia Quântica para alcançar o
              equilíbrio físico, emocional, hormonal e comportamental de cada paciente.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                  <item.icon className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
