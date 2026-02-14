'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { submitReservation } from '@/app/(website)/contact/actions'
import { cn } from '@/lib/utils'
import { getLocalizedValue } from '@/utils/i18n'

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  categories: any[]
}

export default function ReservationModal({ isOpen, onClose, categories }: ReservationModalProps) {
  const { t, language, isRTL } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    description: '',
  })
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<any>({})

  // Specialized unique categories for the dropdown
  const uniqueCategories = Array.from(new Set(categories.map(c => getLocalizedValue(c, language)))).filter(Boolean)

  const validate = () => {
    const newErrors: any = {}
    if (!formData.name) newErrors.name = t('contact.required')
    if (!formData.email) {
      newErrors.email = t('contact.required')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.invalidEmail')
    }
    if (!formData.phone) newErrors.phone = t('contact.required')
    if (!formData.description) newErrors.description = t('contact.required')
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    
    const form = new FormData()
    Object.entries(formData).forEach(([key, value]) => form.append(key, value))
    
    const result = await submitReservation(form)
    
    if (result.success) {
      setStatus('success')
      setTimeout(() => {
        onClose()
        setStatus('idle')
        setFormData({ name: '', email: '', phone: '', category: '', description: '' })
      }, 3000)
    } else {
      setStatus('error')
    }
  }

  const inputClasses = "w-full bg-primary/5 border border-primary/10 rounded-2xl px-6 py-4 text-primary font-sans focus:outline-none focus:border-accent/50 focus:bg-primary/10 transition-all placeholder:text-primary/30"
  const labelClasses = "block text-accent text-xs uppercase tracking-widest mb-3 font-bold"

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-cream w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 text-primary/40 hover:text-accent transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-12 md:p-16 max-h-[90vh] overflow-y-auto no-scrollbar">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl text-accent font-serif italic mb-4">
                  {t('reservation.title')}
                </h2>
                <p className="text-primary/60 font-sans tracking-tight">
                  {t('reservation.subtitle')}
                </p>
              </div>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center"
                >
                  <div className="text-6xl mb-6">🏛️</div>
                  <h3 className="text-2xl text-accent font-serif italic">{t('reservation.success')}</h3>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className={labelClasses}>{t('contact.name')}</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClasses}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name}</p>}
                    </div>
                    <div>
                      <label className={labelClasses}>{t('contact.email')}</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClasses}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className={labelClasses}>{t('contact.phone')}</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClasses}
                        placeholder="+20 123 456 7890"
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-2">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className={labelClasses}>{t('reservation.category')}</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={cn(inputClasses, "appearance-none bg-none")}
                      >
                        <option value="">{t('reservation.selectCategory')}</option>
                        {uniqueCategories.map((cat: any) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>{t('reservation.description')}</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className={cn(inputClasses, "resize-none")}
                      placeholder={isRTL ? "...أخبرنا عن رؤيتك" : "Tell us about your vision..."}
                    />
                    {errors.description && <p className="text-red-400 text-xs mt-2">{errors.description}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-accent text-primary py-5 rounded-2xl font-sans text-xs uppercase tracking-[0.4em] font-bold transition-all hover:bg-primary hover:text-white disabled:opacity-50"
                  >
                    {status === 'submitting' ? t('contact.sending') : t('reservation.submit')}
                  </button>
                  {status === 'error' && (
                    <p className="text-red-400 text-center text-sm">{t('contact.error')}</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
