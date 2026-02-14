import { 
  getSettings, 
  getHero, 
  getProjects, 
  getServices, 
  getAbout, 
  getFooter 
} from "@/sanity/queries";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RollingGallery from "@/components/RollingGallery";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default async function Home() {
  const [
    settings,
    hero,
    projects,
    services,
    about,
    footer
  ] = await Promise.all([
    getSettings(),
    getHero(),
    getProjects(),
    getServices(),
    getAbout(),
    getFooter()
  ]);

  return (
    <main className="min-h-screen">
      <Navbar settings={settings} />
      
      <Hero hero={hero} settings={settings} />
      
      <AboutSection about={about} />

      <RollingGallery projects={projects || []} />

      <ServicesSection services={services || []} />

      <CTASection />

      <Footer footer={footer} settings={settings} />
    </main>
  );
}
