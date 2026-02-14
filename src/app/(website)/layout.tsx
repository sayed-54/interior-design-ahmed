import { getSettings, getFooter } from "@/sanity/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, footer] = await Promise.all([
    getSettings(),
    getFooter()
  ]);

  return (
    <>
      <Navbar settings={settings} />
      {children}
      <Footer footer={footer} settings={settings} />
    </>
  );
}
