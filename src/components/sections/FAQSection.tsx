import AnimatedSection from "@/components/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quais tipos de atendimento o Núcleo Quantic oferece?",
    answer: "Oferecemos Neuropsicanálise Clínica, Terapia Homeopata e Terapia Quântica, com atendimento presencial em Campo Maior - PI e teleconsulta online para todo o Brasil.",
  },
  {
    question: "Como funciona a consulta online?",
    answer: "A teleconsulta é realizada por videochamada segura, com a mesma qualidade e atenção do atendimento presencial. Após o agendamento, você receberá um link para acessar no horário marcado.",
  },
  {
    question: "Como posso agendar uma consulta?",
    answer: "O agendamento é feito pelo WhatsApp (86) 99843-1378. Basta enviar uma mensagem e nossa equipe irá orientá-lo sobre datas e horários disponíveis.",
  },
  {
    question: "As terapias integrativas substituem tratamentos médicos convencionais?",
    answer: "Não. Nossas terapias são complementares e podem atuar em conjunto com tratamentos médicos convencionais, sempre visando o bem-estar integral do paciente.",
  },
  {
    question: "Quanto tempo dura uma consulta?",
    answer: "O tempo varia de acordo com a especialidade e necessidade do paciente. Em geral, a primeira consulta é mais detalhada, podendo durar de 50 minutos a 1 hora e 30 minutos.",
  },
  {
    question: "A loja vende quais tipos de produtos?",
    answer: "Nossa loja oferece medicações homeopáticas, fórmulas personalizadas e produtos relacionados ao bem-estar e equilíbrio do corpo e da mente, todos selecionados pelo nosso profissional.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container mx-auto max-w-3xl">
        <AnimatedSection className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Dúvidas Frequentes</span>
          <h2 className="section-title mt-3 mb-4 mx-auto">Perguntas Frequentes</h2>
        </AnimatedSection>

        <AnimatedSection>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-accent transition-colors py-5 text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQSection;
