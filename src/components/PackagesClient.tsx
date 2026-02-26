'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import Image from 'next/image'
import PackageReservationModal from './PackageReservationModal'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface PackagesClientProps {
  settings: any
  packages: any[]
}

export default function PackagesClient({ settings, packages }: PackagesClientProps) {
  const { t, language, isRTL } = useLanguage()
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const heroTitle = t('packagesPage.heroTitle')
  const heroSubtitle = t('packagesPage.heroSubtitle')

  return (
    <div className="pt-40 pb-40 px-6 max-w-[1400px] mx-auto min-h-screen">
      {/* Hero Section */}
      <div className={cn("text-center mb-24", isRTL && "font-arabic")}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl text-accent font-serif italic mb-6"
        >
          {heroTitle}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto tracking-wide"
        >
          {heroSubtitle}
        </motion.p>
      </div>

      {/* Packages Grid */}
      <div className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        isRTL && "font-arabic"
      )}>
        {packages.map((pkg, index) => {
          const title = language === 'ar' ? pkg.titleAr : pkg.titleEn
          const description = language === 'ar' ? pkg.shortDescriptionAr : pkg.shortDescriptionEn

          return (
            <motion.div
              key={pkg._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-4xl overflow-hidden group hover:bg-white/10 transition-colors duration-500 relative flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {pkg.image && (
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={title || 'Package Image'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#2A2520] via-transparent to-transparent opacity-90" />
                </div>
              )}

              <div className={cn(
                "p-8 flex-1 flex flex-col relative z-10",
                isRTL && "text-right"
              )} dir={isRTL ? 'rtl' : 'ltr'}>
                
                <h3 className="text-3xl text-accent font-serif mb-4">{title}</h3>
                
                {description && (
                  <p className="text-white/60 mb-8 leading-relaxed">
                    {description}
                  </p>
                )}

                {pkg.features && pkg.features.length > 0 && (
                  <div className="mb-8 flex-1">
                    <h4 className="text-white/40 uppercase tracking-widest text-[10px] sm:text-xs mb-4">
                      {t('packagesPage.features')}
                    </h4>
                    <ul className="space-y-4">
                      {pkg.features.map((feature: any, i: number) => (
                        <li key={i} className="flex items-start gap-4">
                          <Check className="text-accent shrink-0 mt-[2px]" size={16} />
                          <span className="text-white/80 text-sm">
                            {language === 'ar' ? feature.featureAr : feature.featureEn}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => setSelectedPackage(title)}
                  className="w-full mt-auto bg-transparent border border-accent/30 text-accent hover:bg-accent hover:text-primary transition-all duration-300 py-4 rounded-xl uppercase tracking-[0.2em] text-xs font-bold"
                >
                  {t('packagesPage.reserveNow')}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      <PackageReservationModal
        isOpen={!!selectedPackage}
        onClose={() => setSelectedPackage(null)}
        packageName={selectedPackage || ''}
      />
    </div>
  )
}
