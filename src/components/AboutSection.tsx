'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedValue } from '@/utils/i18n'
import { cn } from '@/lib/utils'

interface AboutSectionProps {
  about: any
}

export default function AboutSection({ about }: AboutSectionProps) {
  const { t, language, isRTL } = useLanguage()
  const imageRef = useRef<HTMLDivElement>(null)

  // Scroll-driven color reveal for the about image
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "center center"]
  })

  const grayscaleBase = useTransform(scrollYProgress, [0, 1], [1, 0])
  const grayscale = useSpring(grayscaleBase, { stiffness: 80, damping: 25 })
  const filterValue = useTransform(grayscale, (v: number) => `grayscale(${v})`)

  const revealVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as any }
    }
  }

  return (
    <section id="about" className="py-40 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className={cn(
          "grid lg:grid-cols-[1.2fr_1fr] gap-32 items-center",
          isRTL && "rtl"
        )}>
          
          {/* Left: Content with vertical accent */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className={cn("relative", isRTL ? "text-right" : "text-left")}
          >
            {/* Vertical Gold Line Accent */}
            <div className={cn(
              "absolute top-0 w-px h-64 bg-accent/30 hidden xl:block",
              isRTL ? "-right-12" : "-left-12"
            )} />
            
            <motion.p variants={revealVariants} className="text-accent uppercase tracking-[0.4em] font-sans text-xs mb-8 font-bold">
              {t('about.since')} {getLocalizedValue(about?.year, language) || '1998'}
            </motion.p>
            
            <motion.h2 variants={revealVariants} className="text-5xl md:text-8xl font-serif mb-12 leading-[1.1] tracking-tight text-balance text-accent">
              {getLocalizedValue(about?.title, language) || 'Harmonizing Spaces with Soul'}
            </motion.h2>
            
            <motion.div variants={revealVariants} className={cn(
              "space-y-8 text-primary/70 font-sans text-xl leading-relaxed max-w-xl",
              isRTL && "mr-0 ml-auto"
            )}>
              <p>
                {getLocalizedValue(about?.description, language) || 'We believe that interior design is not just about aesthetics, but about the profound relationship between humans and the environments they inhabit.'}
              </p>
              <p className="font-light italic text-accent/80">
                "{t('about.architecture_quote')}"
              </p>
            </motion.div>
            
            <motion.div variants={revealVariants} className="mt-20 flex items-center space-x-12 rtl:space-x-reverse">
              <div className="w-16 h-px bg-primary/20" />
              <button className={cn(
                "text-primary font-serif italic text-2xl hover:text-accent transition-all transform",
                isRTL ? "hover:-translate-x-2" : "hover:translate-x-2"
              )}>
                {t('about.philosophy')}
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Large Asymmetric Image with Scroll Color Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] as any }}
            className="relative"
          >
             <div ref={imageRef} className="aspect-3/4 overflow-hidden rounded-3xl shadow-2xl relative group">
              <motion.img
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                src={about?.image || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200'}
                alt="Architect"
                style={{ filter: filterValue }}
                className="w-full h-full object-cover transition-all duration-1000"
              />
            </div>
            {/* Accent Shadow Box */}
            <div className={cn(
              "absolute -bottom-10 w-full h-full border border-accent/20 rounded-3xl -z-10 transition-transform duration-700",
              isRTL ? "-left-10 hover:-translate-x-2 hover:translate-y-2" : "-right-10 hover:translate-x-2 hover:translate-y-2"
            )} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
