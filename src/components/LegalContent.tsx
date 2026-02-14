'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'

interface LegalSection {
  title: string
  content: string
}

interface LegalContentProps {
  title: string
  lastUpdated: string
  sections: LegalSection[]
}

export default function LegalContent({ title, lastUpdated, sections }: LegalContentProps) {
  const { isRTL } = useLanguage()

  return (
    <main className="min-h-screen bg-primary pt-40 pb-40 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-20 text-center"
        >
          <h1 className={cn(
            "text-5xl md:text-7xl text-accent font-serif italic mb-6",
            isRTL && "font-serif"
          )}>
            {title}
          </h1>
          <p className="text-cream/40 font-sans text-xs uppercase tracking-widest">
            {lastUpdated}
          </p>
          <div className="w-16 h-px bg-accent/30 mx-auto mt-8" />
        </motion.div>

        <div className="space-y-16">
          {sections.map((section, idx) => (
            <motion.section
              key={idx}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
            >
              <h2 className={cn(
                "text-2xl text-accent/80 font-serif italic mb-6",
                isRTL && "text-right"
              )}>
                {section.title}
              </h2>
              <p className={cn(
                "text-cream/60 font-sans leading-relaxed text-lg",
                isRTL ? "text-right" : "text-left"
              )}>
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>
      </div>
    </main>
  )
}
