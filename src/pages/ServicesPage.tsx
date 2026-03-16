import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/sections/ServicesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

const ServicesPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-20">
      <ServicesSection />
      <HowItWorksSection />
      <FinalCTASection />
    </main>
    <Footer />
  </div>
);

export default ServicesPage;
