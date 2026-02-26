'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight, ArrowLeft } from 'lucide-react'

interface PackagesSectionProps {
  packages: any[]
}

export default function PackagesSection({ packages }: PackagesSectionProps) {
  const { language, isRTL } = useLanguage()

  if (!packages || packages.length === 0) return null

  // Get only first 3 packages for the preview section
  const featuredPackages = packages.slice(0, 3)

  return (
    <section className="py-24 bg-[#2A2520] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-accent/5 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-1/3 h-[500px] bg-accent/5 blur-[120px] rounded-full mix-blend-screen" />
      
      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        <div className={cn(
          "flex flex-col md:flex-row md:items-end justify-between mb-16",
          isRTL && "md:flex-row-reverse"
        )}>
          <div className={cn("max-w-2xl", isRTL && "text-right font-arabic")}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl text-accent font-serif italic mb-6 leading-tight"
            >
              {isRTL ? "باقات التصميم" : "Design Packages"}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 md:mt-0"
          >
            <Link 
              href="/packages"
              className={cn(
                "group flex items-center gap-3 text-white hover:text-accent transition-colors duration-300 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold",
                isRTL && "flex-row-reverse"
              )}
            >
              <span>{isRTL ? "اكتشف جميع الباقات" : "View All Packages"}</span>
              <span className={cn(
                "p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300",
                "group-hover:translate-x-1",
                isRTL && "group-hover:-translate-x-1"
              )}>
                {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </span>
            </Link>
          </motion.div>
        </div>

        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
          isRTL && "font-arabic"
        )}>
          {featuredPackages.map((pkg, index) => {
            const title = language === 'ar' ? pkg.titleAr : pkg.titleEn
            const description = language === 'ar' ? pkg.shortDescriptionAr : pkg.shortDescriptionEn

            return (
              <motion.div
                key={pkg._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-primary/40 border border-white/5 rounded-3xl overflow-hidden group hover:bg-white/5 transition-colors duration-500 relative flex flex-col h-full"
              >
                {pkg.image && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={title || 'Package Image'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-transparent to-transparent" />
                  </div>
                )}

                <div className={cn(
                  "p-8 flex-1 flex flex-col relative z-10",
                  isRTL && "text-right"
                )} dir={isRTL ? 'rtl' : 'ltr'}>
                  
                  <h3 className="text-2xl text-accent font-serif mb-3">{title}</h3>
                  
                  {description && (
                    <p className="text-white/60 mb-8 text-sm leading-relaxed line-clamp-3">
                      {description}
                    </p>
                  )}

                  <div className="mt-auto">
                    <Link
                      href="/packages"
                      className="inline-flex items-center text-accent/80 hover:text-accent font-sans text-xs uppercase tracking-widest transition-colors font-bold group/link"
                    >
                      <span>{isRTL ? "مزيد من التفاصيل" : "More Details"}</span>
                      {isRTL ? (
                         <ArrowLeft size={14} className="mr-2 group-hover/link:-translate-x-1 transition-transform" />
                      ) : (
                         <ArrowRight size={14} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                      )}
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
