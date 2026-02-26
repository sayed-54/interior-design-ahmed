'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { submitPackageReservation } from '@/app/(website)/packages/actions'
import { cn } from '@/lib/utils'

interface PackageReservationModalProps {
  isOpen: boolean
  onClose: () => void
  packageName: string
}

interface FormState {
  customerName: string
  email: string
  phone: string
  city: string
  message: string
}

export default function PackageReservationModal({ isOpen, onClose, packageName }: PackageReservationModalProps) {
  const { t, isRTL } = useLanguage()
  const [formData, setFormData] = useState<FormState>({
    customerName: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  })
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const validate = () => {
    const newErrors: Partial<FormState> = {}
    if (!formData.customerName) newErrors.customerName = t('contact.required')
    if (!formData.email) {
      newErrors.email = t('contact.required')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.invalidEmail')
    }
    if (!formData.phone) newErrors.phone = t('contact.required')
    if (!formData.city) newErrors.city = t('contact.required')
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    
    const form = new FormData()
    Object.entries(formData).forEach(([key, value]) => form.append(key, value))
    form.append('selectedPackage', packageName)
    
    const result = await submitPackageReservation(form)
    
    if (result.success) {
      setStatus('success')
      setFormData({ customerName: '', email: '', phone: '', city: '', message: '' })
      setTimeout(() => {
        setStatus('idle')
        onClose()
      }, 2000)
    } else {
      setStatus('error')
    }
  }

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-sans focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all placeholder:text-white/20 text-sm"
  const labelClasses = "block text-accent/60 text-[10px] uppercase tracking-widest mb-2 font-bold"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-100 transition-all"
          />
          <div className="fixed inset-0 z-101 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn(
                "bg-[#2A2520] border border-white/10 p-8 rounded-3xl w-full max-w-lg shadow-2xl relative pointer-events-auto",
                isRTL && "text-right"
              )}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <button
                onClick={onClose}
                className={cn(
                  "absolute top-6 text-white/50 hover:text-white transition-colors",
                  isRTL ? "left-6" : "right-6"
                )}
              >
                <X size={24} />
              </button>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center"
                >
                  <CheckCircle2 size={64} className="text-accent mb-6" />
                  <h3 className="text-2xl text-accent font-serif mb-2">{t('packagesPage.success')}</h3>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8 pr-8">
                    <h2 className="text-2xl text-white font-serif mb-2">{t('packagesPage.modalTitle')}</h2>
                    <p className="text-white/60 text-sm">{t('packagesPage.modalSubtitle')}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className={labelClasses}>{t('packagesPage.selectedPackage')}</label>
                      <input
                        type="text"
                        value={packageName}
                        disabled
                        className={cn(inputClasses, "opacity-50 cursor-not-allowed")}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClasses}>{t('contact.name')}</label>
                        <input
                          type="text"
                          value={formData.customerName}
                          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                          className={inputClasses}
                        />
                        {errors.customerName && <p className="text-red-400 text-xs mt-1">{errors.customerName}</p>}
                      </div>
                      <div>
                        <label className={labelClasses}>{t('contact.phone')}</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={inputClasses}
                        />
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClasses}>{t('contact.email')}</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClasses}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className={labelClasses}>{t('packagesPage.city')}</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className={inputClasses}
                        />
                        {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>{t('contact.message')}</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className={cn(inputClasses, "resize-none")}
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className={cn(
                          "w-full bg-accent text-primary px-6 py-4 rounded-xl font-sans text-[10px] md:text-sm uppercase tracking-[0.2em] font-bold transition-all hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed",
                          status === 'submitting' && "animate-pulse"
                        )}
                      >
                        {status === 'submitting' ? t('packagesPage.sending') : t('packagesPage.reserveNow')}
                      </button>
                      {status === 'error' && (
                        <p className="text-red-400 text-center text-xs mt-2">{t('packagesPage.error')}</p>
                      )}
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
