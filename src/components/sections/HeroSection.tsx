import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import fernandoImg from "@/assets/fernando-paz.jpg";
import { useAdminStore } from "@/hooks/useAdminStore";

const WHATSAPP_URL = "https://wa.me/5586998431378?text=Olá! Gostaria de agendar uma consulta no Núcleo Quantic.";

const HeroSection = () => {
  const { siteImages } = useAdminStore();
  const currentHeroBg = siteImages.heroBackground || heroBg;
  const currentProfileImage = siteImages.profileImage || fernandoImg;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={currentHeroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-primary-foreground"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-accent/40 text-accent text-sm font-medium mb-6">
              Neuropsicanálise Clínica & Terapias Integrativas
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-balance">
              Seu equilíbrio começa com um <span className="text-accent">cuidado integral</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-8 max-w-xl font-body">
              No Núcleo Quantic, unimos ciência, acolhimento e terapias integrativas para tratar a causa —
              e não apenas os sintomas. Atendimento presencial e online com Fernando Paz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Agendar Consulta pelo WhatsApp
                </Button>
              </a>
              <a href="#servicos">
                <Button variant="hero-outline" size="lg" className="w-full sm:w-auto">
                  Conhecer Serviços
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-96 rounded-2xl overflow-hidden border-4 border-accent/20 shadow-2xl">
                <img src={currentProfileImage} alt="Fernando Paz - Núcleo Quantic" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-6 py-3 rounded-xl shadow-lg">
                <p className="font-display font-bold text-sm">Fernando Paz</p>
                <p className="text-xs opacity-80">Especialista em Neuropsicanálise</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
