'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectStackProps {
  images: string[]
  isRTL?: boolean
}

export default function ProjectStack({ images, isRTL }: ProjectStackProps) {
  const [stack, setStack] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (images?.length) {
      // Ensure absolute uniqueness inside the component as well
      const uniqueImages = Array.from(new Set(images.filter(Boolean)))
      setStack(uniqueImages)
    }
  }, [images])

  const sendToBack = useCallback(() => {
    setStack((prev) => {
      const newStack = [...prev]
      const top = newStack.shift()
      if (top) newStack.push(top)
      return newStack
    })
  }, [])

  useEffect(() => {
    if (isPaused || selectedIndex !== null) return
    const timer = setInterval(() => {
      sendToBack()
    }, 3000)
    return () => clearInterval(timer)
  }, [sendToBack, isPaused, selectedIndex])

  if (!stack.length) return null

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-4/3 md:aspect-video flex items-center justify-center">
      <div 
        className="relative w-full h-full flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="popLayout">
          {stack.slice(0, 5).map((img, index) => (
            <motion.div
              key={img}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: 1 - index * 0.2, 
                scale: 1 - index * 0.05,
                y: index * -20,
                zIndex: stack.length - index,
                rotate: index % 2 === 0 ? index * 1.5 : index * -1.5
              }}
              exit={{ 
                opacity: 0, 
                scale: 1.1, 
                x: isRTL ? -200 : 200, 
                rotate: isRTL ? -10 : 10,
                filter: "blur(10px)"
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => sendToBack()}
              className="absolute w-[90%] h-[90%] rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-white/10 group"
            >
              <img 
                src={img} 
                alt="Project Image" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const realIndex = images.indexOf(img)
                    setSelectedIndex(realIndex)
                  }}
                  className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-accent hover:text-primary transition-all scale-75 group-hover:scale-100"
                >
                  <Maximize2 size={24} />
                </button>
              </div>

              {/* Stack Indicator */}
              {index === 0 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 z-10 pointer-events-none">
                  <p className={cn(
                    "text-white/60 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap",
                    isRTL && "font-arabic tracking-normal"
                  )}>
                    {isRTL ? 'اضغط لتدوير الصور' : 'Click to rotate stack'}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox / Popup */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-100 bg-primary/95 backdrop-blur-3xl flex items-center justify-center p-8 cursor-pointer"
          >
            <button 
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex(null)
              }}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-20"
            >
              <X size={40} />
            </button>

            <div 
              className="relative w-full h-full flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={images[selectedIndex]}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              />

              {/* Navigation */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
                <button
                  onClick={() => {
                    setSelectedIndex((prev) => (prev! === 0 ? images.length - 1 : prev! - 1))
                  }}
                  className="p-4 bg-white/5 backdrop-blur-lg rounded-full text-white hover:bg-accent hover:text-primary transition-all pointer-events-auto"
                >
                  {isRTL ? <ChevronRight size={32} /> : <ChevronLeft size={32} />}
                </button>
                <button
                  onClick={() => {
                    setSelectedIndex((prev) => (prev! === images.length - 1 ? 0 : prev! + 1))
                  }}
                  className="p-4 bg-white/5 backdrop-blur-lg rounded-full text-white hover:bg-accent hover:text-primary transition-all pointer-events-auto"
                >
                  {isRTL ? <ChevronLeft size={32} /> : <ChevronRight size={32} />}
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 font-mono text-sm tracking-widest">
                {selectedIndex + 1} <span className="mx-2">/</span> {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
