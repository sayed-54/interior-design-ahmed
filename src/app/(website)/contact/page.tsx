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
    <main className="min-h-screen bg-primary pt-40 pb-40 px-6">
      <DynamicTitleHandler 
        siteTitle={settings?.siteTitle} 
        pageName={{ en: 'Contact', ar: 'تواصل معنا' }} 
      />
      
      <div className="container mx-auto">
        <ContactHeader />
        <ContactForm />
      </div>
    </main>
  )
}
