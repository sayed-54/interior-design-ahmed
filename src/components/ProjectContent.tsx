'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedValue } from '@/utils/i18n'
import { cn } from '@/lib/utils'
import ProjectStack from './ProjectStack'

interface ProjectContentProps {
  project: any
}

export default function ProjectContent({ project }: ProjectContentProps) {
  const { language, isRTL } = useLanguage()
  
  const projectImages = Array.from(new Set([project.coverImage, ...(project.gallery || [])]))

  return (
    <div className={cn(
      "grid lg:grid-cols-2 gap-20 items-start",
      isRTL && "rtl"
    )}>
      
      {/* Project Content */}
      <div className={cn("space-y-12", isRTL ? "text-right" : "text-left")}>
        <div className="space-y-4">
          <div className={cn(
            "flex items-center opacity-60 gap-4",
            isRTL ? "flex-row-reverse" : "flex-row"
          )}>
            <span className={cn(
              "text-accent uppercase tracking-[0.3em] text-xs font-bold",
              language === 'ar' && "font-arabic tracking-normal"
            )}>
              {getLocalizedValue(project.category, language)}
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          
          <h1 className={cn(
            "text-5xl md:text-8xl font-serif text-white italic leading-[1.1]",
            language === 'ar' && "font-arabic not-italic tracking-normal"
          )}>
            {getLocalizedValue(project.title, language)}
          </h1>
        </div>

        <div className="space-y-4 max-w-xl">
          <h3 className={cn(
            "text-accent uppercase tracking-[0.2em] text-[10px] font-bold opacity-50",
            language === 'ar' && "font-arabic tracking-normal"
          )}>
            {language === 'ar' ? 'الوصف' : 'Description'}
          </h3>
          <p className={cn(
            "text-white/70 font-sans text-lg md:text-xl leading-relaxed",
            language === 'ar' && "font-arabic"
          )}>
            {getLocalizedValue(project.description, language)}
          </p>
        </div>

        {/* Action Button */}
        <div className={cn(
          "pt-8 flex",
          isRTL ? "justify-start" : "justify-start"
        )}>
          <Link 
            href="/#contact"
            className={cn(
              "bg-accent text-primary px-12 py-5 font-sans text-xs uppercase tracking-widest font-bold hover:bg-white transition-all shadow-xl shadow-accent/10 whitespace-nowrap inline-block",
              language === 'ar' && "font-arabic tracking-normal"
            )}
          >
            {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </Link>
        </div>
      </div>

      {/* Interactive Stack Gallery */}
      <div className="relative">
        <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full -z-10" />
        <ProjectStack images={projectImages} isRTL={isRTL} />
      </div>

    </div>
  )
}
