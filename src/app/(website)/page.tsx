import { 
  getSettings,
  getHero, 
  getProjects, 
  getServices, 
  getAbout,
  getPackages,
} from "@/sanity/queries";
import Hero from "@/components/Hero";
import RollingGallery from "@/components/RollingGallery";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PackagesSection from "@/components/PackagesSection";
import CTASection from "@/components/CTASection";

export default async function Home() {
  const [
    settings,
    hero,
    projects,
    services,
    about,
    packages,
  ] = await Promise.all([
    getSettings(),
    getHero(),
    getProjects(),
    getServices(),
    getAbout(),
    getPackages(),
  ]);

  return (
    <main className="min-h-screen">
      <Hero hero={hero} settings={settings} />
      
      <AboutSection about={about} />

      <RollingGallery projects={projects || []} />

      <ServicesSection services={services || []} />

      <PackagesSection packages={packages || []} />

      <CTASection />
    </main>
  );
}
