'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { submitContactForm } from '@/app/(website)/contact/actions'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormState {
  name: string
  email: string
  phone: string
  city: string
  message: string
}

export default function ContactForm() {
  const { t, isRTL, language } = useLanguage()
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  })
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validate = () => {
    const newErrors: Partial<FormState> = {}
    if (!formData.name) newErrors.name = t('contact.required')
    if (!formData.email) {
      newErrors.email = t('contact.required')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.invalidEmail')
    }
    // Added Phone Validation
    if (!formData.phone) {
       newErrors.phone = t('contact.required')
    } else if (!/^[0-9+\s\-()]+$/.test(formData.phone)) {
       newErrors.phone = language === 'ar' ? 'رقم هاتف غير صالح' : 'Invalid phone format'
    }
    if (!formData.city) newErrors.city = t('contact.required')
    if (!formData.message) newErrors.message = t('contact.required')
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    
    const form = new FormData()
    Object.entries(formData).forEach(([key, value]) => form.append(key, value))
    
    const result = await submitContactForm(form)
    
    if (result.success) {
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', city: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } else {
      setStatus('error')
    }
  }

  const getInputClasses = (fieldName: string) => cn(
    "w-full bg-white/5 border rounded-xl px-5 py-4 text-white font-sans text-sm focus:outline-none transition-all placeholder:text-transparent peer",
    errors[fieldName as keyof FormState] 
      ? "border-red-500/50 bg-red-500/5" 
      : focusedField === fieldName 
        ? "border-accent/50 bg-white/10 shadow-[0_0_15px_rgba(197,161,122,0.1)]" 
        : "border-white/10 hover:bg-white/10"
  )

  const getLabelClasses = cn(
    "absolute text-white/40 text-sm transition-all duration-300 pointer-events-none peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-accent uppercase tracking-widest font-bold",
    isRTL ? "right-5 peer-focus:right-2" : "left-5 peer-focus:left-2"
  )

  // Floating label style evaluator
  const getFloatingLabelStyle = (value: string) => {
    return value ? { top: '-1.5rem', fontSize: '10px', color: '#C5A17A', ...(isRTL ? { right: '0.5rem'} : { left: '0.5rem' }) } : { top: '1rem' }
  }

  return (
    <div className={cn(
      "relative w-full max-w-xl mx-auto md:mx-0 bg-primary/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl overflow-hidden",
      isRTL && "text-right font-arabic",
    )}
    dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Soft overlay gradients for 3D card effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center text-center py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            >
              <CheckCircle2 size={80} className="text-accent mb-8" />
            </motion.div>
            <h3 className="text-3xl text-accent font-serif italic mb-4">{t('contact.success')}</h3>
            <p className="text-white/60 text-sm">
              {language === 'ar' ? 'سنتواصل معك في أقرب وقت ممكن.' : 'We will get back to you shortly.'}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-10 relative z-10 pt-4"
          >
            <div className="grid md:grid-cols-2 gap-10">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={getInputClasses('name')}
                  placeholder=" " // required for peer to work
                />
                <label htmlFor="name" className={getLabelClasses} style={getFloatingLabelStyle(formData.name)}>{t('contact.name')}</label>
                {errors.name && <p className="absolute -bottom-5 text-red-500/80 text-[10px] mt-1">{errors.name}</p>}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={getInputClasses('email')}
                  placeholder=" "
                />
                <label htmlFor="email" className={getLabelClasses} style={getFloatingLabelStyle(formData.email)}>{t('contact.email')}</label>
                {errors.email && <p className="absolute -bottom-5 text-red-500/80 text-[10px] mt-1">{errors.email}</p>}
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative">
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className={getInputClasses('phone')}
                  placeholder=" "
                />
                <label htmlFor="phone" className={getLabelClasses} style={getFloatingLabelStyle(formData.phone)}>{t('contact.phone')}</label>
                {errors.phone && <p className="absolute -bottom-5 text-red-500/80 text-[10px] mt-1">{errors.phone}</p>}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="relative">
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  onFocus={() => setFocusedField('city')}
                  onBlur={() => setFocusedField(null)}
                  className={getInputClasses('city')}
                  placeholder=" "
                />
                <label htmlFor="city" className={getLabelClasses} style={getFloatingLabelStyle(formData.city)}>{language === 'ar' ? 'المدينة' : 'City'}</label>
                {errors.city && <p className="absolute -bottom-5 text-red-500/80 text-[10px] mt-1">{errors.city}</p>}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="relative">
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                rows={4}
                className={cn(getInputClasses('message'), "resize-none")}
                placeholder=" "
              />
              <label htmlFor="message" className={getLabelClasses} style={getFloatingLabelStyle(formData.message)}>{t('contact.message')}</label>
              {errors.message && <p className="absolute -bottom-5 text-red-500/80 text-[10px] mt-1">{errors.message}</p>}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6 }}
              className="pt-6"
            >
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={cn(
                  "w-full bg-accent text-primary px-12 py-5 rounded-xl font-sans text-sm uppercase tracking-[0.3em] font-bold transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(197,161,122,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                )}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>{t('contact.sending')}</span>
                  </>
                ) : (
                  <span>{t('contact.submit')}</span>
                )}
              </button>
              {status === 'error' && (
                <p className="text-red-400 text-center text-sm mt-4">{t('contact.error')}</p>
              )}
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
