'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { getLocalizedValue } from '@/utils/i18n'
import { cn } from '@/lib/utils'

interface NavLink {
  labelKey: string
  href: string
}

interface NavbarProps {
  settings: any
}

export default function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t, language, isRTL } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation now supports both hardcoded fallback and dynamic labels
  const defaultNavLinks: NavLink[] = [
    { labelKey: 'nav.home', href: '/' },
    { labelKey: 'nav.projects', href: '/#projects' },
    { labelKey: 'nav.services', href: '/#services' },
    { labelKey: 'nav.about', href: '/#about' },
    { labelKey: 'nav.packages', href: '/packages' },
    { labelKey: 'nav.contact', href: '/contact' },
  ]

  const navLinks = settings?.navigation?.length > 0 
    ? settings.navigation.map((item: any) => ({
        label: getLocalizedValue(item.label, language),
        href: item.href
      }))
    : defaultNavLinks.map(link => ({
        label: t(link.labelKey),
        href: link.href
      }))

  // Dynamic Spacing Logic based on locale
  const navGapClass = isRTL ? "gap-10 md:gap-12" : "gap-8 md:gap-10"

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out',
        isScrolled 
          ? 'h-16 bg-primary/80 backdrop-blur-xl shadow-2xl border-b border-white/5' 
          : 'h-24 bg-transparent'
      )}
    >
      <div className={cn(
        "container mx-auto h-full px-6 flex items-center justify-between",
        isRTL && "flex-row-reverse"
      )}>
        <Link 
          href="/" 
          className={cn(
            "text-2xl text-white font-serif font-bold tracking-widest uppercase italic transition-all duration-500 hover:text-accent",
            isRTL && "ms-0"
          )}
        >
          {getLocalizedValue(settings?.siteTitle, language) || 'Lumière Studio'}
        </Link>

        {/* Desktop Links Container */}
        <div className={cn(
          "hidden md:flex items-center",
          isRTL ? "flex-row-reverse " + navGapClass : navGapClass
        )}>
          {navLinks.map((link: any) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "relative group flex items-center h-full text-white/80 hover:text-white transition-all duration-300",
                isRTL 
                  ? "font-sans text-sm tracking-[0.08em] font-medium" 
                  : "font-sans text-[10px] uppercase tracking-[0.3em]"
              )}
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-500 ease-out group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Toolset Shell: Language Toggle & CTA */}
        <div className={cn(
          "hidden md:flex items-center gap-8",
          isRTL && "flex-row-reverse"
        )}>
          <LanguageSwitcher />
         
        </div>

        {/* Mobile Toggle */}
        <div className={cn(
          "md:hidden flex items-center gap-4",
          isRTL && "flex-row-reverse"
        )}>
          <button
            className="text-white hover:text-accent transition-colors p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-0 top-0 bg-primary/95 backdrop-blur-2xl z-100 flex flex-col justify-center items-center overflow-hidden"
          >
             <button
              className="absolute top-6 right-6 text-white p-2"
              onClick={() => setIsOpen(false)}
            >
              <X size={40} />
            </button>
            <div className="flex flex-col space-y-10 text-center p-8">
              {navLinks.map((link: any, idx: number) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-white/80 hover:text-accent text-3xl font-serif transition-colors",
                      isRTL ? "tracking-widest" : "tracking-widest"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-10 flex flex-col items-center gap-10"
              >
                <LanguageSwitcher />
                <Link
                  href="#contact"
                  className="bg-accent text-primary px-12 py-5 inline-block font-sans text-sm uppercase tracking-widest font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  {t('nav.talk')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
