'use client'

import * as LucideIcons from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedValue } from '@/utils/i18n'
import { cn } from '@/lib/utils'

interface Service {
  _id: string
  title: any
  description: any
  icon: string
}

interface ServicesSectionProps {
  services: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const { t, language, isRTL } = useLanguage()

  const defaultServices = [
    { 
      _id: '1', 
      title: { en: 'Conceptual Design', ar: 'التصميم المفاهيمي' }, 
      description: { en: 'Transforming ideas into coherent visual narratives.', ar: 'تحويل الأفكار إلى روايات بصرية متماسكة.' }, 
      icon: 'Layers' 
    },
    { 
      _id: '2', 
      title: { en: 'Spatial Planning', ar: 'التخطيط المكاني' }, 
      description: { en: 'Optimizing flows and functionality in architecture.', ar: 'تحسين التدفقات والوظائف في العمارة.' }, 
      icon: 'Layout' 
    },
    { 
      _id: '3', 
      title: { en: 'Material Selection', ar: 'اختيار المواد' }, 
      description: { en: 'Sourcing the finest textures and finishes.', ar: 'الحصول على أرقى المواد والتشطيبات.' }, 
      icon: 'Compass' 
    },
  ]

  const items = services.length > 0 ? services : defaultServices

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as any } 
    }
  }

  return (
    <section id="services" className="py-40 bg-cream relative">
      <div className="container mx-auto px-6">
        <div className={cn("mb-20 text-center", isRTL && "rtl")}>
          <h2 className="text-4xl md:text-7xl text-accent font-serif italic mb-6">
            { (isRTL ? 'خدماتنا' : 'Our Services')}
          </h2>
          <div className="w-24 h-px bg-accent/30 mx-auto" />
        </div>

        <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className="grid md:grid-cols-3 gap-12"
        >
          {items.map((service) => {
             // @ts-ignore
            const Icon = LucideIcons[service.icon] || LucideIcons.Sparkles
            
            return (
              <motion.div
                key={service._id}
                variants={cardVariants}
                className={cn(
                  "group p-12 bg-white rounded-3xl border border-primary/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative",
                  isRTL ? "text-right" : "text-left"
                )}
              >
                <div className={cn(
                  "text-accent mb-10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110",
                  isRTL ? "origin-right" : "origin-left"
                )}>
                  <Icon size={48} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-serif mb-6 group-hover:text-accent transition-colors text-primary italic">
                  {getLocalizedValue(service.title, language)}
                </h3>
                <p className="text-primary/60 leading-relaxed font-sans text-lg">
                  {getLocalizedValue(service.description, language)}
                </p>
                <div className="mt-12 overflow-hidden">
                  <div className={cn(
                    "w-12 h-[2px] bg-accent transition-transform duration-500",
                    isRTL ? "origin-right" : "origin-left",
                    "group-hover:scale-x-[4]"
                  )} />
                </div>
                
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
