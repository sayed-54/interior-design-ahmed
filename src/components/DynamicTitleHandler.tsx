'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedValue } from '@/utils/i18n'

interface DynamicTitleHandlerProps {
  siteTitle?: any
  pageName?: { en: string; ar: string }
}

export default function DynamicTitleHandler({ siteTitle, pageName }: DynamicTitleHandlerProps) {
  const { language } = useLanguage()

  useEffect(() => {
    const baseTitle = getLocalizedValue(siteTitle, language) || 'Lumière Studio'
    
    if (pageName) {
      const currentPage = getLocalizedValue(pageName, language)
      document.title = `${currentPage} | ${baseTitle}`
    } else {
      document.title = baseTitle
    }
  }, [language, siteTitle, pageName])

  return null
}
