'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function ContactHeader() {
  const { t } = useLanguage()

  return (
    <div className="text-center mb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
      >
        <h1 className="text-5xl md:text-8xl text-accent font-serif italic mb-8">
          {t('contact.title')}
        </h1>
        <div className="w-24 h-px bg-accent/30 mx-auto mb-8" />
        <p className="text-cream/60 max-w-xl mx-auto font-sans text-lg uppercase tracking-widest leading-loose">
          {t('contact.subtitle')}
        </p>
      </motion.div>
    </div>
  )
}
