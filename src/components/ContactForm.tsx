'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { submitContactForm } from '@/app/(website)/contact/actions'
import { cn } from '@/lib/utils'

interface FormState {
  name: string
  email: string
  phone: string
  message: string
}

export default function ContactForm() {
  const { t, isRTL } = useLanguage()
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const validate = () => {
    const newErrors: Partial<FormState> = {}
    if (!formData.name) newErrors.name = t('contact.required')
    if (!formData.email) {
      newErrors.email = t('contact.required')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.invalidEmail')
    }
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
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } else {
      setStatus('error')
    }
  }

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-sans focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all placeholder:text-white/20"
  const labelClasses = "block text-accent/60 text-xs uppercase tracking-widest mb-3 font-bold"

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-accent/10 border border-accent/20 p-12 rounded-3xl text-center"
          >
            <div className="text-4xl mb-6">📩</div>
            <h3 className="text-2xl text-accent font-serif italic mb-4">{t('contact.success')}</h3>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <label className={labelClasses}>{t('contact.name')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ahmed Samy"
                  className={inputClasses}
                  aria-required="true"
                />
                {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name}</p>}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <label className={labelClasses}>{t('contact.email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="hello@ahmedsamy.com"
                  className={inputClasses}
                  aria-required="true"
                />
                {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <label className={labelClasses}>{t('contact.phone')}</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+20 123 456 7890"
                className={inputClasses}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <label className={labelClasses}>{t('contact.message')}</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={isRTL ? "أخبرنا عن مشروعك..." : "Tell us about your project..."}
                rows={5}
                className={cn(inputClasses, "resize-none")}
                aria-required="true"
              />
              {errors.message && <p className="text-red-400 text-xs mt-2">{errors.message}</p>}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={cn(
                  "w-full bg-accent text-primary px-12 py-5 rounded-2xl font-sans text-sm uppercase tracking-[0.3em] font-bold transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(197,161,122,0.3)] disabled:opacity-50 disabled:cursor-not-allowed",
                  status === 'submitting' && "animate-pulse"
                )}
              >
                {status === 'submitting' ? t('contact.sending') : t('contact.submit')}
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
