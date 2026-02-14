'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'

export default function LanguageSwitcher() {
  const { language, setLanguage, isRTL } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'ar', label: 'العربية', flag: 'AR' },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white/80 hover:text-accent transition-colors py-2 group"
      >
        <Globe size={18} className="text-accent" />
        <span className="font-sans text-xs uppercase tracking-widest font-bold">
          {language === 'en' ? 'EN' : 'AR'}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={cn(
              "absolute top-full mt-2 bg-primary border border-white/10 shadow-2xl min-w-[120px] overflow-hidden z-100",
              isRTL ? "left-0" : "right-0"
            )}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as 'en' | 'ar')
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full px-4 py-3 text-xs uppercase tracking-[0.2em] font-sans transition-colors",
                  isRTL ? "text-right" : "text-left",
                  language === lang.code ? 'bg-accent text-primary' : 'text-white/60 hover:bg-white/5 hover:text-white'
                )}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
