import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5586998431378?text=Olá! Gostaria de agendar minha consulta no Núcleo Quantic.";

const FinalCTASection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 forest-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(197,160,89,0.15),transparent_70%)]" />

      <div className="relative container mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6 max-w-3xl mx-auto leading-tight">
            Sua jornada de equilíbrio e bem-estar{" "}
            <span className="text-accent">começa aqui</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
            Dê o primeiro passo rumo a uma vida mais equilibrada. Agende sua consulta agora 
            e descubra como a abordagem integrativa pode transformar sua saúde.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="lg" className="gap-2 text-lg px-10 py-6">
              <MessageCircle className="w-5 h-5" />
              Agendar Minha Consulta
            </Button>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FinalCTASection;
