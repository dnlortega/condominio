import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Plans from "@/components/Plans";
import Location from "@/components/Location";
import ServiceContacts from "@/components/ServiceContacts";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <Preloader />
      <Navbar />
      <Hero />
      <Features />
      <Plans />
      <Location />
      <ServiceContacts />

      <Contact />
      <Footer />
      <WhatsAppFloating />
    </main>
  );
}
