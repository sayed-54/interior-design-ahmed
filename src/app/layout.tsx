import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/sanity/queries";
import { baseUrl } from "@/sanity/env";
import { LanguageProvider } from "@/context/LanguageContext";
import GrainOverlay from "@/components/GrainOverlay";
import DynamicTitleHandler from "@/components/DynamicTitleHandler";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getLocalizedValue } from "@/utils/i18n";
import { Analytics } from "@vercel/analytics/react"

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
  const title = getLocalizedValue(settings?.siteTitle, 'en') || "Lumière Studio";
  const description = getLocalizedValue(settings?.seoDescription, 'en') || "Lumière Studio - Premium Architectural & Luxury Interior Design Studio. Transforming spaces into immersive environments.";
  const keywords = settings?.seoKeywords || "Interior Design, Architecture, Luxury Design, Lumière Studio, Modern Interior, تصميم داخلي, عمارة, دهانات, تشطيبات, ديكور داخلي, تصميم مودرن, مهندس ديكور";
  const ogImageUrl = settings?.ogImage || '/og-image.jpg';
  
  return {
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    keywords: keywords.split(',').map((k: string) => k.trim()),
    authors: [{ name: "Lumière Studio" }],
    creator: "Lumière Studio",
    publisher: "Lumière Studio",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en',
        'ar-EG': '/ar',
      },
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: title,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@lumierestudio',
      images: [ogImageUrl],
    },
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
          <DynamicTitleHandler siteTitle={settings?.siteTitle} />
          <GrainOverlay />
          {children}
          <FloatingWhatsApp />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
