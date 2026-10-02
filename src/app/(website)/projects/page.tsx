import { getProjects } from '@/sanity/queries'
import ProjectsGrid from '@/components/ProjectsGrid'
import DynamicTitleHandler from '@/components/DynamicTitleHandler'

export const metadata = {
  title: 'Projects | Lumière Studio',
  description: 'Explore our latest architectural narratives and interior design masterpieces.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main className="min-h-screen bg-primary">
      <DynamicTitleHandler 
        siteTitle={{}} 
        pageName={{ en: 'Projects', ar: 'المشاريع' }} 
      />
      
      <section className="pt-28 pb-40 px-6 overflow-hidden">
        <div className="container mx-auto">
          <ProjectsGrid projects={projects} />
        </div>
      </section>
    </main>
  )
}
