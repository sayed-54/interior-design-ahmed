'use client'

import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'

interface FloatingWhatsAppProps {
  whatsappNumber?: string
}

export default function FloatingWhatsApp({ whatsappNumber }: FloatingWhatsAppProps) {
  const { isRTL, language } = useLanguage()
  const pathname = usePathname()

  // Hide in Sanity Studio and if no number
  if (!whatsappNumber || pathname?.startsWith('/studio')) return null

  // Ensure default message is URL encoded
  const defaultMessage = language === 'ar' 
    ? encodeURIComponent('مرحباً، أود الاستفسار عن خدمات التصميم الداخلي.')
    : encodeURIComponent('Hello, I would like to inquire about your interior design services.')

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "fixed bottom-8 z-90 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 group",
        isRTL ? "left-8" : "right-8"
      )}
      aria-label="Contact us on WhatsApp"
    >
      {/* Pulse effect behind the button */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      
      <FaWhatsapp size={28} className="relative z-10" />
      
      {/* Tooltip */}
      <div className={cn(
        "absolute top-1/2 -translate-y-1/2 px-4 py-2 bg-white text-primary text-xs font-bold rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-xl pointer-events-none",
        isRTL ? "left-full ml-4" : "right-full mr-4"
      )}>
        <div className={cn(
          "absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent",
          isRTL ? "-left-2 border-r-8 border-r-white" : "-right-2 border-l-8 border-l-white"
        )} />
        {language === 'ar' ? 'تواصل معنا' : 'Chat with us'}
      </div>
    </motion.a>
  )
}
