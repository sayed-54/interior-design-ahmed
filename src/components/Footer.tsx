'use client'

import Link from 'next/link'
import { Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedValue } from '@/utils/i18n'
import { cn } from '@/lib/utils'

interface FooterProps {
  footer: any
  settings: any
}

export default function Footer({ footer, settings }: FooterProps) {
  const { t, language, isRTL } = useLanguage()

  return (
    <footer id="contact" className="relative bg-primary text-white pt-40 pb-12 overflow-hidden">
      {/* Cinematic Background Image Effect */}
      {settings?.footerBg && (
        <div 
          className="absolute inset-0 grayscale pointer-events-none"
          style={{ 
            backgroundImage: `url(${settings.footerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.05
          }}
        />
      )}
      
      {/* Heavy Dark Overlay */}
      <div className="absolute inset-0 bg-primary/85 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={cn(
            "grid md:grid-cols-4 gap-16 mb-32",
            isRTL && "rtl"
          )}
        >
          {/* Logo & Info */}
          <div className={cn("space-y-10", isRTL ? "text-right" : "text-left")}>
            <h2 className="text-4xl font-serif italic tracking-wide">
              {getLocalizedValue(settings?.siteTitle, language) || 'Interior Studio'}
            </h2>
            <p className="text-white/40 leading-relaxed font-sans text-base max-w-xs font-light tracking-wide">
              {isRTL 
                ? "تصميم بيئات غامرة تمزج بين الدقة المعمارية والدفء الإنساني."
                : "Designing immersive environments that blend architectural precision with human warmth."
              }
            </p>
            <div className={cn("flex gap-8", isRTL ? "flex-row-reverse" : "flex-row")}>
              {footer?.socialLinks?.map((social: any) => {
                 const Icon = social.platform.toLowerCase() === 'instagram' ? Instagram : 
                             social.platform.toLowerCase() === 'linkedin' ? Linkedin : Twitter
                 return (
                   <a key={social.platform} href={social.url} className="text-white/30 hover:text-accent transition-all transform hover:-translate-y-1">
                     <Icon size={22} />
                   </a>
                 )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className={cn(isRTL ? "text-right" : "text-left md:ps-12")}>
            <h4 className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-12">{t('footer.quickLinks')}</h4>
            <ul className="space-y-5">
              {footer?.quickLinks?.map((link: any) => (
                <li key={link.label?.en || link.label}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-light">
                    {getLocalizedValue(link.label, language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          {/* <div className={cn(isRTL ? "text-right" : "text-left")}>
            <h4 className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-12">{t('footer.services')}</h4>
            <ul className="space-y-5">
              {footer?.servicesLinks?.map((link: any) => (
                <li key={link.label?.en || link.label}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-light">
                    {getLocalizedValue(link.label, language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact */}
          <div className={cn("space-y-10", isRTL ? "text-right" : "text-left")}>
            <h4 className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-12">{t('footer.connect')}</h4>
            <div className="space-y-6">
              <a href={`mailto:${footer?.email}`} className={cn(
                "flex items-center gap-5 text-white/50 hover:text-accent transition-colors group",
                isRTL && "flex-row-reverse"
              )}>
                <Mail size={18} className="text-accent/50 group-hover:text-accent" />
                <span className="text-sm font-light">{footer?.email || 'studio@interior.com'}</span>
              </a>
              <a href={`tel:${footer?.phone}`} className={cn(
                "flex items-center gap-5 text-white/50 hover:text-accent transition-colors group",
                isRTL && "flex-row-reverse"
              )}>
                <Phone size={18} className="text-accent/50 group-hover:text-accent" />
                <span className="text-sm font-light">{footer?.phone || '+1 234 567 890'}</span>
              </a>
              <div className={cn(
                "flex items-center gap-5 text-white/40",
                isRTL && "flex-row-reverse"
              )}>
                <MapPin size={18} className="text-accent/30" />
                <span className="text-sm font-light tracking-wide">
                  {getLocalizedValue(footer?.location, language) || (isRTL ? "الرياض | لندن | ميلانو" : "Riyadh | London | Milan")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className={cn(
          "pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8",
          isRTL && "md:flex-row-reverse"
        )}>
          <div className={cn("flex flex-col gap-4", isRTL ? "items-center md:items-end" : "items-center md:items-start")}>
             <p className="text-white/20 text-[10px] uppercase tracking-[0.4em]">
               {getLocalizedValue(footer?.copyrightText, language) || `© ${new Date().getFullYear()} Interior Studio. ${t('footer.copyright')}`}
             </p>
             <p className="text-white/20 text-[9px] uppercase tracking-[0.3em]">
               Built by <span className="text-accent/50 hover:text-accent transition-colors cursor-pointer">MAATech</span>
             </p>
          </div>
          <div className={cn("flex gap-12 text-white/30 text-[10px] uppercase tracking-[0.3em]", isRTL && "flex-row-reverse")}>
            <Link href="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
