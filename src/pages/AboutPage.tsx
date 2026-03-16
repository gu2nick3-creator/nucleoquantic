import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/sections/AboutSection";
import FernandoPazSection from "@/components/sections/FernandoPazSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-20">
      <AboutSection />
      <FernandoPazSection />
      <FinalCTASection />
    </main>
    <Footer />
  </div>
);

export default AboutPage;
