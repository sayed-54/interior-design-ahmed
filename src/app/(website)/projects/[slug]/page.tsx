import { notFound } from 'next/navigation'
import { getProjectBySlug, getSettings } from '@/sanity/queries'
import ProjectContent from '@/components/ProjectContent'
import DynamicTitleHandler from '@/components/DynamicTitleHandler'
import { getLocalizedValue } from '@/utils/i18n'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  const settings = await getSettings()
  
  if (!project) return { title: 'Project Not Found' }
  
  const siteName = getLocalizedValue(settings?.siteTitle, 'en') || 'Ahmed Samy'
  const postTitle = getLocalizedValue(project.title, 'en')
  
  return {
    title: `${postTitle} | ${siteName}`,
    description: postTitle
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <main className="min-h-screen bg-primary">
      <DynamicTitleHandler siteTitle={{}} pageName={project.title} />
      
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="container mx-auto">
          <ProjectContent project={project} />
        </div>
      </section>
    </main>
  )
}
