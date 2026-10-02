import { getSettings, getPackages } from '@/sanity/queries'
import PackagesClient from '@/components/PackagesClient'
import DynamicTitleHandler from '@/components/DynamicTitleHandler'

export const metadata = {
  title: 'Packages | Lumière Studio',
  description: 'Explore our curated architectural solutions and interior design packages.',
}

export default async function PackagesPage() {
  const [settings, packages] = await Promise.all([
    getSettings(),
    getPackages(),
  ])

  return (
    <main className="min-h-screen bg-primary">
      <DynamicTitleHandler 
        siteTitle={settings?.siteTitle} 
        pageName={{ en: 'Packages', ar: 'الباقات' }} 
      />
      <PackagesClient settings={settings} packages={packages} />
    </main>
  )
}
