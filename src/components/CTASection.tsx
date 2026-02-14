'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'

export default function CTASection() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="py-40 bg-accent text-primary relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h2 className={cn(
            "text-5xl md:text-8xl font-serif mb-16 italic tracking-tight text-balance leading-tight text-primary/90",
            isRTL && "font-arabic"
          )}>
            {t('cta.title')}
          </h2>
          <motion.button
            whileHover={{ 
              scale: 1.02, 
              y: -5,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-white px-20 py-7 text-xs uppercase tracking-[0.5em] font-sans hover:bg-black transition-all rounded-full"
          >
            {t('cta.button')}
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Circles */}
      <div className={cn(
        "absolute top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 blur-3xl",
        isRTL ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
      )} />
      <div className={cn(
        "absolute bottom-0 w-96 h-96 bg-black/5 rounded-full translate-y-1/2 blur-3xl",
        isRTL ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
      )} />
    </section>
  )
}
