import { notFound } from 'next/navigation'
import { getProjectBySlug, getSettings } from '@/sanity/queries'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProjectContent from '@/components/ProjectContent'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const [project, settings] = await Promise.all([
    getProjectBySlug(slug),
    getSettings()
  ])

  if (!project) notFound()

  return (
    <main className="min-h-screen bg-primary">
      <Navbar settings={settings} />
      
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="container mx-auto">
          <ProjectContent project={project} />
        </div>
      </section>

      <Footer footer={settings} settings={settings} />
    </main>
  )
}
