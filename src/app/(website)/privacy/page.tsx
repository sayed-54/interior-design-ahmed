'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import LegalContent from '@/components/LegalContent'
import DynamicTitleHandler from '@/components/DynamicTitleHandler'
import { getLegalData } from '@/sanity/queries'
import { getLocalizedValue } from '@/utils/i18n'

export default function PrivacyPage() {
  const { t, language } = useLanguage()
  const [sanityData, setSanityData] = useState<any>(null)

  useEffect(() => {
    getLegalData().then(data => {
      if (data?.privacyPolicy) setSanityData(data.privacyPolicy)
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
          title: t('privacyPolicy.introduction.title'),
          content: t('privacyPolicy.introduction.content'),
        },
        {
          title: t('privacyPolicy.dataCollection.title'),
          content: t('privacyPolicy.dataCollection.content'),
        },
        {
          title: t('privacyPolicy.dataUsage.title'),
          content: t('privacyPolicy.dataUsage.content'),
        },
        {
          title: t('privacyPolicy.dataProtection.title'),
          content: t('privacyPolicy.dataProtection.content'),
        },
      ]

  const title = getLocalizedValue(sanityData?.title, language) || t('privacyPolicy.title')
  const lastUpdated = getLocalizedValue(sanityData?.lastUpdated, language) || t('privacyPolicy.lastUpdated')

  return (
    <>
      <DynamicTitleHandler 
        pageName={{ en: 'Privacy Policy', ar: 'سياسة الخصوصية' }} 
      />
      <LegalContent 
        title={title}
        lastUpdated={lastUpdated}
        sections={sections}
      />
    </>
  )
}
