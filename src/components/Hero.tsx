'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedValue } from '@/utils/i18n'
import { cn } from '@/lib/utils'

interface HeroProps {
  hero: any
  settings: any
}

export default function Hero({ hero, settings }: HeroProps) {
  const { scrollY } = useScroll()
  const { t, language, isRTL } = useLanguage()
  
  // Refined Parallax Logic
  const yBase = useTransform(scrollY, [0, 1000], [0, 400])
  const y = useSpring(yBase, { stiffness: 100, damping: 30, restDelta: 0.001 })
  
  const scaleBase = useTransform(scrollY, [0, 1000], [1, 1.1])
  const scale = useSpring(scaleBase, { stiffness: 100, damping: 30 })

  const opacityBase = useTransform(scrollY, [0, 300], [1, 0])
  const opacity = useSpring(opacityBase, { stiffness: 100, damping: 30 })

  const overlayGradient = "linear-gradient(to bottom, rgba(42,37,32,0.65), rgba(42,37,32,0.85))"

  const headline = getLocalizedValue(hero?.headline, language) || t('hero.headline')
  
  // Arabic fix: Split by words instead of letters to maintain character joining
  const words = headline.split(' ')
  const isArabic = language === 'ar'

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: isArabic ? 0.12 : 0.05, delayChildren: 0.5 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Cinematic Parallax Background */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
      >
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: `url(${hero?.bgImage || settings?.heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div 
          className="absolute inset-0" 
          style={{ background: overlayGradient }} 
        />
      </motion.div>

      {/* Cinematic Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          key={language}
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <h1 className={cn(
            "text-3xl md:text-6xl lg:text-7xl text-accent font-light tracking-[-0.02em] leading-[1.05] mb-8 flex flex-wrap justify-center text-center",
            isArabic && "font-serif"
          )}>
            {isArabic ? (
              // Arabic word-by-word reveal
              words.map((word, index) => (
                <motion.span 
                  key={index}
                  variants={child as any} 
                  className="mx-[0.15em] inline-block"
                >
                  {word}
                </motion.span>
              ))
            ) : (
              // English letter-by-letter reveal
              Array.from(headline).map((char, index) => (
                <motion.span 
                  key={index}
                  variants={child as any} 
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))
            )}
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-cream/80 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-12 uppercase tracking-[0.3em] font-light"
          >
            {getLocalizedValue(hero?.subheadline, language) || t('hero.subheadline')}
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 1.5 }}
          >
            <motion.a
              href={hero?.buttonLink || '#projects'}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block bg-accent text-primary px-12 py-5 text-sm uppercase tracking-widest font-sans transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(197,161,122,0.3)]"
            >
              {getLocalizedValue(hero?.buttonText, language) || t('hero.button')}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  )
}
