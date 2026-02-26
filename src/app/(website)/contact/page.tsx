import { getSettings } from '@/sanity/queries'
import ContactForm from '@/components/ContactForm'
import ContactHeader from '@/components/ContactHeader'
import DynamicTitleHandler from '@/components/DynamicTitleHandler'

export const metadata = {
  title: 'Contact | Ahmed Samy Interior Design',
  description: 'Let us collaborate on your next architectural narrative and interior design masterpiece.',
}

export default async function ContactPage() {
  const settings = await getSettings()

  return (
    <main className="min-h-screen bg-primary pt-32 md:pt-40 pb-20 md:pb-40 px-6 relative overflow-hidden">
      {/* Background cinematic elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

      <DynamicTitleHandler 
        siteTitle={settings?.siteTitle} 
        pageName={{ en: 'Contact', ar: 'تواصل معنا' }} 
      />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[70vh]">
          {/* Left Side: Contact Info & Header */}
          <div className="order-2 lg:order-1 h-full">
            <ContactHeader settings={settings} />
          </div>

          {/* Right Side: Contact Form */}
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
}
