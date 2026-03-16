import AnimatedSection from "@/components/AnimatedSection";
import { MapPin, Phone, Instagram, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5586998431378?text=Olá! Gostaria de mais informações sobre o Núcleo Quantic.";

const ContactSection = () => {
  return (
    <section id="contato" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Fale Conosco</span>
          <h2 className="section-title mt-3 mb-4 mx-auto">Contato & Localização</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedSection>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">Endereço</h3>
                  <p className="text-muted-foreground text-sm">
                    Rua Antonio Cardoso de Oliveira, Portal dos Carnaubais<br />
                    Campo Maior, Piauí
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">WhatsApp</h3>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    (86) 99843-1378
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Instagram className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">Instagram</h3>
                  <a href="https://www.instagram.com/nucleo_quantic/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    @nucleo_quantic
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">Horário</h3>
                  <p className="text-muted-foreground text-sm">
                    Segunda a Sexta: 08h às 18h<br />
                    Sábado: 08h às 12h
                  </p>
                </div>
              </div>

              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="mt-4 gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Falar pelo WhatsApp
                </Button>
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="rounded-2xl overflow-hidden shadow-xl h-80 lg:h-full min-h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31573.12!2d-42.17!3d-4.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDknNDguMCJTIDQywrAxMCcxMi4wIlc!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Núcleo Quantic"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
