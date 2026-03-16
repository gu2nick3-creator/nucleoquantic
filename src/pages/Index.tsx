import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FernandoPazSection from "@/components/sections/FernandoPazSection";
import ServicesSection from "@/components/sections/ServicesSection";
import DifferentialsSection from "@/components/sections/DifferentialsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FernandoPazSection />
        <ServicesSection />
        <DifferentialsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
