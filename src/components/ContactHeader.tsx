'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { MapPin, Mail, Phone } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

interface ContactHeaderProps {
  settings: any
}

export default function ContactHeader({ settings }: ContactHeaderProps) {
  const { t, language, isRTL } = useLanguage()

  const addressEn = settings?.addressEn || "Riyadh | London | Milan"
  const addressAr = settings?.addressAr || "الرياض | لندن | ميلانو"
  const emailVal = settings?.email || "studio@interior.com"
  const phoneVal = settings?.phone || "+1 234 567 890"

  return (
    <div className={cn("flex flex-col h-full justify-center", isRTL && "font-arabic")}>
      <motion.div
        initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
      >
        <span className="text-accent/60 uppercase tracking-widest text-xs font-bold mb-6 block">
          {language === 'ar' ? 'تواصل معنا' : 'Get In Touch'}
        </span>
        <h1 className="text-5xl md:text-7xl text-accent font-serif italic mb-8 leading-tight">
          {language === 'ar' ? "لنصنع مساحة استثنائية" : "Let's Build Something Exceptional"}
        </h1>
        
        <p className="text-cream/60 max-w-md font-sans text-lg font-light tracking-wide leading-relaxed mb-16">
          {language === 'ar' 
            ? "نحن هنا لتحويل رؤيتك إلى واقع ملموس. فريقنا من الخبراء جاهز لمناقشة مشروعك التالي."
            : "We are here to turn your vision into reality. Our team of experts is ready to discuss your next project."}
        </p>

        {/* Dynamic Contact Info Blocks */}
        <div className="space-y-8">
          {/* Address */}
          <div className="flex flex-col gap-2 group">
             <div className="flex items-center gap-3 text-accent/80">
               <MapPin size={20} />
               <span className="uppercase tracking-widest text-[10px] font-bold">
                 {language === 'ar' ? 'العنوان' : 'Location'}
               </span>
             </div>
             <p className="text-white/80 font-light text-lg">
               {language === 'ar' ? addressAr : addressEn}
             </p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 group">
             <div className="flex items-center gap-3 text-accent/80">
               <Mail size={20} />
               <span className="uppercase tracking-widest text-[10px] font-bold">
                 {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
               </span>
             </div>
             <a href={`mailto:${emailVal}`} className="text-white/80 font-light text-lg hover:text-accent transition-colors">
               {emailVal}
             </a>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2 group">
             <div className="flex items-center gap-3 text-accent/80">
               <Phone size={20} />
               <span className="uppercase tracking-widest text-[10px] font-bold">
                 {language === 'ar' ? 'الهاتف' : 'Phone'}
               </span>
             </div>
             <a href={`tel:${phoneVal}`} dir="ltr" className="text-white/80 font-light text-lg hover:text-accent transition-colors inline-block w-fit">
               {phoneVal}
             </a>
          </div>

           {/* WhatsApp (Optional Direct Link) */}
           {settings?.whatsapp && (
             <div className="flex flex-col gap-2 group mt-8">
              <a 
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 font-bold tracking-wider text-xs uppercase"
              >
                <FaWhatsapp size={20} />
                {language === 'ar' ? 'مراسلة عبر واتساب' : 'Chat on WhatsApp'}
              </a>
             </div>
           )}
        </div>
      </motion.div>
    </div>
  )
}
