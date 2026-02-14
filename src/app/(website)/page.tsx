import { 
  getSettings,
  getHero, 
  getProjects, 
  getServices, 
  getAbout, 
} from "@/sanity/queries";
import Hero from "@/components/Hero";
import RollingGallery from "@/components/RollingGallery";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";

export default async function Home() {
  const [
    settings,
    hero,
    projects,
    services,
    about,
  ] = await Promise.all([
    getSettings(),
    getHero(),
    getProjects(),
    getServices(),
    getAbout(),
  ]);

  return (
    <main className="min-h-screen">
      <Hero hero={hero} settings={settings} />
      
      <AboutSection about={about} />

      <RollingGallery projects={projects || []} />

      <ServicesSection services={services || []} />

      <CTASection />
    </main>
  );
}
