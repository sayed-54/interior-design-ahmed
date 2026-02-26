'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedValue } from '@/utils/i18n'
import { cn } from '@/lib/utils'
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaXTwitter, 
  FaYoutube, 
  FaTiktok, 
  FaPinterest, 
  FaSnapchat, 
  FaBehance, 
  FaDribbble,
  FaWhatsapp
} from 'react-icons/fa6'
import { Mail, Phone, MapPin } from 'lucide-react'

// Map platform values to React Icons
const IconMap: Record<string, any> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  snapchat: FaSnapchat,
  behance: FaBehance,
  dribbble: FaDribbble,
}

interface FooterProps {
  footer: any
  settings: any
}

export default function Footer({ footer, settings }: FooterProps) {
  const { t, language, isRTL } = useLanguage()

  // Use Settings values (fallback to old footer fields or placeholders)
  const companyNameEn = settings?.companyNameEn || getLocalizedValue(settings?.siteTitle, 'en') || 'Interior Studio'
  const companyNameAr = settings?.companyNameAr || getLocalizedValue(settings?.siteTitle, 'ar') || 'استوديو التصميم'
  
  const emailVal = settings?.email || footer?.email
  const phoneVal = settings?.phone || footer?.phone
  
  const addressEn = settings?.addressEn || "Riyadh | London | Milan"
  const addressAr = settings?.addressAr || "الرياض | لندن | ميلانو"
  
  const whatsappNumber = settings?.whatsapp

  return (
    <footer id="contact" className="relative bg-[#1A1816] text-white pt-40 pb-12 overflow-hidden border-t border-accent/10">
      
      {/* Background Enhancements */}
      {settings?.footerBg && (
        <div 
          className="absolute inset-0 grayscale pointer-events-none mix-blend-overlay"
          style={{ 
            backgroundImage: `url(${settings.footerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1
          }}
        />
      )}
      
      {/* Subtle top blur glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent blur-[2px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={cn(
            "grid md:grid-cols-4 gap-16 mb-24",
            isRTL && "rtl"
          )}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Section 1: Logo & About */}
          <div className={cn("space-y-8", isRTL ? "text-right" : "text-left")}>
            <h2 className="text-4xl font-serif italic tracking-wide text-transparent bg-clip-text bg-linear-to-r from-accent to-white">
              {language === 'ar' ? companyNameAr : companyNameEn}
            </h2>
            <p className="text-white/50 leading-relaxed font-sans text-sm max-w-xs font-light tracking-wide">
              {isRTL 
                ? "نصنع مساحات غامرة تمزج الدقة المعمارية بالدفء، تاركين بصمة لا تُنسى من الفخامة."
                : "Designing immersive environments that blend architectural precision with human warmth, leaving a lasting mark of luxury."
              }
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className={cn(isRTL ? "text-right" : "text-left md:ps-12")}>
            <h4 className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-10 flex items-center gap-3">
              <span className="w-4 h-px bg-accent/50"></span>
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-4">
              {settings?.navigation?.map((link: any) => (
                <li key={link?.label?.en || 'link'}>
                  <Link href={link?.href || '#'} className="inline-block text-white/50 hover:text-accent hover:translate-x-2 transition-all text-sm font-light">
                    {getLocalizedValue(link?.label, language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Contact Info */}
          <div className={cn("space-y-8", isRTL ? "text-right" : "text-left")}>
            <h4 className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-10 flex items-center gap-3">
              <span className="w-4 h-px bg-accent/50"></span>
              {t('footer.connect')}
            </h4>
            <div className="space-y-6">
              {addressEn && (
                <div className="flex items-start gap-4 text-white/50 group">
                  <MapPin size={18} className="text-accent/40 mt-1 shrink-0" />
                  <span className="text-sm font-light tracking-wide leading-relaxed">
                    {language === 'ar' ? addressAr : addressEn}
                  </span>
                </div>
              )}
              {emailVal && (
                <a href={`mailto:${emailVal}`} className="flex items-center gap-4 text-white/50 hover:text-accent transition-colors group">
                  <Mail size={18} className="text-accent/40 group-hover:text-accent" />
                  <span className="text-sm font-light">{emailVal}</span>
                </a>
              )}
              {phoneVal && (
                <a href={`tel:${phoneVal}`} className="flex items-center gap-4 text-white/50 hover:text-accent transition-colors group">
                  <Phone size={18} className="text-accent/40 group-hover:text-accent" />
                  <span className="text-sm font-light" dir="ltr">{phoneVal}</span>
                </a>
              )}
            </div>
          </div>

          {/* Section 4: Social Icons */}
          <div className={cn(isRTL ? "text-right" : "text-left")}>
            <h4 className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-10 flex items-center gap-3">
               <span className="w-4 h-px bg-accent/50"></span>
               {isRTL ? "تابعنا" : "FOLLOW US"}
            </h4>
            
            <div className="flex flex-wrap gap-4 justify-start">
              {settings?.socialLinks?.map((social: any) => {
                 const platform = social.platform?.toLowerCase() || ''
                 const Icon = IconMap[platform] || null
                 if (!Icon) return null
                 
                 return (
                   <a 
                     key={social.platform} 
                     href={social.url} 
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/5 text-white/60 hover:bg-accent/20 hover:text-accent hover:border-accent/40 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(197,161,122,0.2)]"
                     aria-label={social.platform}
                   >
                     <Icon size={18} />
                   </a>
                 )
              })}

              {/* Explicit WhatsApp Icon from the phone number entered */}
              {whatsappNumber && (
                 <a 
                   href={`https://wa.me/${whatsappNumber}`} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/5 text-[#25D366]/80 hover:bg-[#25D366]/20 hover:text-[#25D366] hover:border-[#25D366]/40 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(37,211,102,0.2)]"
                   aria-label="WhatsApp"
                 >
                   <FaWhatsapp size={20} />
                 </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Divider line */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className={cn("flex flex-col gap-2", isRTL ? "items-center md:items-end" : "items-center md:items-start")}>
             <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em]">
               © {new Date().getFullYear()} {language === 'ar' ? companyNameAr : companyNameEn}. {t('footer.copyright')}
             </p>
             <p className="text-white/20 text-[9px] uppercase tracking-[0.3em]">
               Built by <a href="#" className="font-bold text-accent/50 hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">MAATech</a>
             </p>
          </div>
          <div className="flex gap-8 text-white/40 text-[10px] uppercase tracking-[0.3em]">
            <Link href="/privacy" className="hover:text-accent transition-colors">{t('footer.privacy')}</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
