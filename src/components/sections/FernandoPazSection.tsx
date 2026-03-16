import AnimatedSection from "@/components/AnimatedSection";
import fernandoImg from "@/assets/fernando-paz.jpg";
import { Award, BookOpen, Stethoscope } from "lucide-react";
import { useAdminStore } from "@/hooks/useAdminStore";

const FernandoPazSection = () => {
  const { siteImages } = useAdminStore();
  const currentProfileImage = siteImages.profileImage || fernandoImg;

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection delay={0.1} className="order-2 lg:order-1">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">O Profissional</span>
            <h2 className="section-title mt-3 mb-6">Fernando Paz</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Especialista em Neuropsicanálise Clínica e terapias integrativas, Fernando Paz conduz
              cada atendimento com profundo acolhimento, embasamento científico e visão holística do ser humano.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Com ampla experiência em abordagens complementares, ele busca entender a raiz dos desequilíbrios
              para oferecer um plano de cuidado verdadeiramente individualizado e eficaz.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: Stethoscope, text: "Neuropsicanálise Clínica" },
                { icon: BookOpen, text: "Homeopatia & Terapia Quântica" },
                { icon: Award, text: "Atendimento Presencial & Online" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <img
                src={currentProfileImage}
                alt="Fernando Paz"
                className="w-72 h-80 md:w-80 md:h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -z-10 top-4 left-4 w-full h-full rounded-2xl border-2 border-accent/30" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default FernandoPazSection;
