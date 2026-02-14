'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Search, Filter, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedValue } from '@/utils/i18n'
import { cn } from '@/lib/utils'

interface Project {
  _id: string
  title: any
  category: any
  slug: string
  coverImage: string
}

interface ProjectsGridProps {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const { t, language, isRTL } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Get unique categories with localized labels
  const categoryFilters = useMemo(() => {
    const cats = new Map()
    cats.set('All', { en: 'All', ar: 'الكل' })
    
    projects.forEach(p => {
      const enLabel = getLocalizedValue(p.category, 'en')
      const arLabel = getLocalizedValue(p.category, 'ar')
      if (enLabel && !cats.has(enLabel)) {
        cats.set(enLabel, { en: enLabel, ar: arLabel || enLabel })
      }
    })
    return Array.from(cats.entries())
  }, [projects])

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchCategory = activeCategory === 'All' || getLocalizedValue(project.category, 'en') === activeCategory
      const titleEn = (getLocalizedValue(project.title, 'en') || '').toLowerCase()
      const titleAr = (getLocalizedValue(project.title, 'ar') || '').toLowerCase()
      const matchSearch = titleEn.includes(searchQuery.toLowerCase()) || titleAr.includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [projects, activeCategory, searchQuery])

  return (
    <div className="space-y-16">
      {/* Dynamic Header Section */}
      <section className={cn(
        "pt-20 pb-12",
        isRTL ? "text-right" : "text-left"
      )}>
        <div className="max-w-4xl space-y-8">
          <motion.h1 
            key={language + '-title'}
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "text-6xl md:text-9xl text-white font-serif italic leading-none tracking-tighter",
              language === 'ar' && "font-arabic not-italic tracking-normal"
            )}
          >
            {language === 'ar' ? 'المشاريع' : 'Projects'}
          </motion.h1>
          <div className={cn(
            "flex items-center gap-12",
            isRTL && "flex-row-reverse"
          )}>
            <div className="w-24 h-px bg-accent/30" />
            <p className={cn(
              "text-white/40 font-sans uppercase tracking-[0.4em] text-xs font-bold",
              language === 'ar' && "font-arabic tracking-normal text-lg"
            )}>
              {language === 'ar' ? 'استكشف أحدث مشاريعنا وتصاميمنا' : 'Discover our latest architectural works'}
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <div className={cn(
        "flex flex-col-reverse md:flex-row gap-8 items-end justify-between border-b border-white/10 pb-12",
        isRTL && "md:flex-row-reverse"
      )}>
        {/* Categories */}
        <div className={cn(
          "flex flex-wrap gap-4",
          isRTL && "flex-row-reverse"
        )}>
          {categoryFilters.map(([key, labels]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={cn(
                "px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 border",
                language === 'ar' && "font-arabic tracking-normal text-sm",
                activeCategory === key 
                  ? "bg-accent border-accent text-primary" 
                  : "bg-transparent border-white/10 text-white/50 hover:border-white/30 hover:text-white"
              )}
            >
              {language === 'ar' ? labels.ar : labels.en}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:max-w-md group">
          <Search className={cn(
            "absolute top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent transition-colors",
            isRTL ? "right-6" : "left-6"
          )} size={18} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? "ابحث عن مشروع..." : "Search projects..."}
            className={cn(
              "w-full bg-white/5 border border-white/10 rounded-full py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/30 focus:bg-white/10 transition-all font-sans",
              isRTL ? "pr-16 pl-6 text-right font-arabic" : "pl-16 pr-6 text-left"
            )}
          />
        </div>
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
            >
              <Link 
                href={`/projects/${project.slug}`}
                className="group block relative aspect-4/5 overflow-hidden rounded-3xl bg-secondary shadow-2xl"
              >
                <img 
                  src={project.coverImage} 
                  alt={getLocalizedValue(project.title, language)}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className={cn(
                  "absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8",
                  isRTL ? "text-right items-end" : "text-left items-start"
                )}>
                  <p className={cn(
                    "text-accent text-[10px] uppercase tracking-[0.3em] mb-3 font-bold",
                    language === 'ar' && "font-arabic tracking-normal text-xs"
                  )}>
                    {getLocalizedValue(project.category, language)}
                  </p>
                  <h3 className={cn(
                    "text-2xl text-white font-serif italic tracking-wide group-hover:translate-x-2 transition-transform duration-500",
                    isRTL && "font-arabic not-italic group-hover:-translate-x-2"
                  )}>
                    {getLocalizedValue(project.title, language)}
                  </h3>
                  
                  <div className={cn(
                    "mt-6 flex items-center gap-3 text-white/60 group-hover:text-accent transition-colors",
                    isRTL && "flex-row-reverse"
                  )}>
                    <span className={cn(
                      "text-[10px] uppercase tracking-widest font-bold",
                      language === 'ar' && "font-arabic tracking-normal text-xs"
                    )}>
                      {language === 'ar' ? 'عرض المشروع' : 'View Project'}
                    </span>
                    <ArrowRight size={14} className={cn("transition-transform", isRTL && "rotate-180")} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-40 text-center space-y-6"
        >
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Search className="text-white/20" size={32} />
          </div>
          <h3 className={cn(
            "text-2xl text-white font-serif italic",
            language === 'ar' && "font-arabic not-italic"
          )}>
            {language === 'ar' ? 'لم يتم العثور على مشاريع' : 'No projects found'}
          </h3>
          <p className={cn(
            "text-white/40 font-sans text-sm",
            language === 'ar' && "font-arabic"
          )}>
            {language === 'ar' ? 'جرب البحث عن شيء آخر أو تغيير الفئة' : 'Try searching for something else or changing the category'}
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className={cn(
              "text-accent uppercase tracking-widest text-xs font-bold border-b border-accent/30 pb-2 hover:border-accent transition-all",
              language === 'ar' && "font-arabic tracking-normal text-sm"
            )}
          >
            {language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
          </button>
        </motion.div>
      )}
    </div>
  )
}
