'use client'

import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  // Show the language we'll switch TO
  const nextLabel = language === 'en' ? 'عربي' : 'EN'

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 text-white/80 hover:text-accent transition-colors py-2 px-3 border border-white/10 hover:border-accent/40 rounded-full"
    >
      <Globe size={16} className="text-accent" />
      <span className="font-sans text-xs uppercase tracking-widest font-bold">
        {nextLabel}
      </span>
    </motion.button>
  )
}
