import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria Clara S.",
    text: "O atendimento do Fernando transformou minha vida. Pela primeira vez senti que alguém realmente ouviu minhas queixas e foi além dos sintomas. O tratamento integrativo trouxe um equilíbrio que eu buscava há anos.",
    rating: 5,
  },
  {
    name: "João Pedro M.",
    text: "Fui cético no início com a terapia quântica, mas os resultados falam por si. Minha ansiedade diminuiu significativamente e meu sono melhorou muito. Recomendo o Núcleo Quantic de olhos fechados.",
    rating: 5,
  },
  {
    name: "Ana Beatriz L.",
    text: "A teleconsulta foi incrível! Mesmo à distância, senti todo o acolhimento e profissionalismo. O Fernando é um profissional excepcional que realmente se importa com cada paciente.",
    rating: 5,
  },
  {
    name: "Carlos Eduardo R.",
    text: "Depois de passar por vários profissionais, encontrei no Núcleo Quantic o cuidado que eu precisava. A abordagem integrativa fez toda a diferença no meu tratamento.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Depoimentos</span>
          <h2 className="section-title mt-3 mb-4 mx-auto">O que dizem nossos pacientes</h2>
        </AnimatedSection>

        <AnimatedSection className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 relative">
            <Quote className="w-10 h-10 text-accent/20 absolute top-6 left-6" />
            
            <div className="flex gap-1 justify-center mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>

            <p className="text-center text-foreground/80 text-lg leading-relaxed mb-8 italic font-body">
              "{testimonials[current].text}"
            </p>

            <p className="text-center font-display font-bold text-foreground text-lg">
              {testimonials[current].name}
            </p>

            <div className="flex justify-center gap-4 mt-8">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-accent w-6" : "bg-border"}`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;
