'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedValue } from '@/utils/i18n'
import { cn } from '@/lib/utils'

interface Project {
  _id: string
  title: any
  slug?: string
  category: any
  coverImage: string
  description?: any
}

interface RollingGalleryProps {
  projects: Project[]
}

export default function RollingGallery({ projects }: RollingGalleryProps) {
  const { t, language, isRTL } = useLanguage()
  const targetRef = useRef<HTMLDivElement>(null)
  
  // Triple the projects for infinite-like feel
  const items = projects.length > 0 ? [...projects, ...projects, ...projects] : []

  if (items.length === 0) return null

  return (
    <section id="projects" className="py-40 bg-primary overflow-hidden relative">
      <div className={cn(
        "container mx-auto px-6 mb-20 flex flex-col md:flex-row justify-between items-end gap-8",
        isRTL && "flex-row-reverse"
      )}>
        <div className={cn(isRTL ? "text-right" : "text-left")}>
          <h2 className="text-4xl md:text-7xl text-accent font-serif mb-6 italic leading-tight">
            {t('projects.title')}
          </h2>
          <div className={cn("w-32 h-[2px] bg-accent/30", isRTL && "ms-auto")} />
        </div>
        <p className={cn(
          "text-white/40 font-sans uppercase tracking-[0.2em] text-[10px] hidden md:block",
          isRTL ? "text-left" : "text-right"
        )}>
           {isRTL ? "استكشف أحدث رواياتنا المعمارية" : "Explore our latest architectural narratives"}
        </p>
      </div>

      <div 
        ref={targetRef}
        className="relative overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing pb-20"
      >
        <motion.div
          animate={{ x: isRTL ? [2000, 0] : [0, -2000] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex space-x-24 px-24 rtl:space-x-reverse"
          whileHover={{ animationPlayState: 'paused' }}
        >
          {items.map((project, index) => (
            <Link 
              key={`${project._id}-${index}`}
              href={`/projects/${project.slug || '#'}`}
              className="block shrink-0"
            >
              <motion.div
                className="shrink-0 w-[400px] md:w-[650px] group relative aspect-4/5 overflow-hidden rounded-3xl bg-secondary shadow-2xl"
                whileHover={{ 
                  scale: 1.03,
                  rotateY: isRTL ? -2 : 2,
                  z: 50
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src={project.coverImage}
                  alt={getLocalizedValue(project.title, language)}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Cinematic Bottom Gradient Overlay */}
                <div className={cn(
                  "absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-12",
                  isRTL ? "text-right items-end" : "text-left items-start"
                )}>
                  <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4 font-bold">
                    {getLocalizedValue(project.category, language)}
                  </p>
                  <h3 className="text-4xl text-white font-serif italic tracking-wide">
                    {getLocalizedValue(project.title, language)}
                  </h3>
                  <div className="mt-8 w-0 group-hover:w-full h-px bg-white/50 transition-all duration-1000 ease-out" />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-20 left-0 w-full h-px bg-white/5 px-12" />

      {/* View More Button */}
      <div className="mt-20 flex justify-center px-6">
        <Link
          href="/projects"
          className={cn(
            "group relative px-12 py-5 bg-transparent border border-accent/30 text-accent font-sans text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-500 hover:border-accent hover:text-primary",
            isRTL && "tracking-normal font-arabic"
          )}
        >
          <span className="relative z-10">{isRTL ? 'عرض جميع المشاريع' : 'View All Projects'}</span>
          <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        </Link>
      </div>
    </section>
  )
}
