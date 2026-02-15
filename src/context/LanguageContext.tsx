'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import translations from '../locales/translations.json'

type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved) setLanguage(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])

  const t = (path: string) => {
    const keys = path.split('.')
    let current: any = translations[language]
    for (const key of keys) {
      if (current[key] === undefined) return path
      current = current[key]
    }
    return current
  }

  const isRTL = language === 'ar'

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
