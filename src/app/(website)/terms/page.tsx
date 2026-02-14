'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import LegalContent from '@/components/LegalContent'
import DynamicTitleHandler from '@/components/DynamicTitleHandler'
import { getLegalData } from '@/sanity/queries'
import { getLocalizedValue } from '@/utils/i18n'

export default function TermsPage() {
  const { t, language } = useLanguage()
  const [sanityData, setSanityData] = useState<any>(null)

  useEffect(() => {
    getLegalData().then(data => {
      if (data?.termsOfUse) setSanityData(data.termsOfUse)
    })
  }, [])

  // Dynamic Content Construction with Fallback to translations.json
  const sections = sanityData?.sections?.length > 0
    ? sanityData.sections.map((s: any) => ({
        title: getLocalizedValue(s.title, language),
        content: getLocalizedValue(s.content, language)
      }))
    : [
        {
          title: t('termsOfUse.agreement.title'),
          content: t('termsOfUse.agreement.content'),
        },
        {
          title: t('termsOfUse.services.title'),
          content: t('termsOfUse.services.content'),
        },
        {
          title: t('termsOfUse.limitation.title'),
          content: t('termsOfUse.limitation.content'),
        },
      ]

  const title = getLocalizedValue(sanityData?.title, language) || t('termsOfUse.title')
  const lastUpdated = getLocalizedValue(sanityData?.lastUpdated, language) || t('termsOfUse.lastUpdated')

  return (
    <>
      <DynamicTitleHandler 
        pageName={{ en: 'Terms of Use', ar: 'شروط الاستخدام' }} 
      />
      <LegalContent 
        title={title}
        lastUpdated={lastUpdated}
        sections={sections}
      />
    </>
  )
}
