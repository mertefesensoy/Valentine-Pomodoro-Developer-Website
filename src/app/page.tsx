import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Screenshots from "@/components/Screenshots";
import TechStack from "@/components/TechStack";
import PrivacySection from "@/components/PrivacySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Screenshots />
      <TechStack />
      <PrivacySection />
      <Footer />
    </main>
  );
}
