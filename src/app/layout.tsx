import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/sanity/queries";
import { LanguageProvider } from "@/context/LanguageContext";
import GrainOverlay from "@/components/GrainOverlay";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings?.siteTitle || "Luxury Interior Design",
    description: "Premium Interior Design Studio",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        style={{
          // @ts-ignore
          "--primary": settings?.primaryColor || "#2A2520",
          "--secondary": settings?.warmBrown || "#524A44",
          "--accent": settings?.accentColor || "#C5A17A",
          "--beige": settings?.secondaryColor || "#D6C7BB",
          "--cream": settings?.backgroundColor || "#F0ECE6",
          "--overlay-gradient": settings?.overlayGradient || "linear-gradient(to bottom, rgba(42,37,32,0.7), rgba(42,37,32,0.9))",
          "--background": settings?.backgroundColor || "#F0ECE6",
          "--foreground": settings?.primaryColor || "#2A2520",
        } as React.CSSProperties}
      >
        <LanguageProvider>
          <GrainOverlay />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
