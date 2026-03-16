import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/sections/ContactSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

const ContactPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-20">
      <ContactSection />
      <FinalCTASection />
    </main>
    <Footer />
  </div>
);

export default ContactPage;
