import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2, RotateCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'

interface ProjectStackProps {
  images: string[]
  isRTL?: boolean
}

export default function ProjectStack({ images, isRTL: propIsRTL }: ProjectStackProps) {
  const { language, isRTL: contextIsRTL } = useLanguage()
  const isRTL = propIsRTL ?? contextIsRTL

  const [stack, setStack] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [rotation, setRotation] = useState(0)

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
    }, 4000) // Slightly slower rotation
    return () => clearInterval(timer)
  }, [sendToBack, isPaused, selectedIndex])

  if (!stack.length) return null

  const handleCardClick = (img: string, index: number) => {
    if (index === 0) {
      const realIndex = images.indexOf(img)
      setSelectedIndex(realIndex)
      setRotation(0) // Reset rotation when opening
    } else {
      sendToBack()
    }
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto min-h-[500px] md:min-h-[700px] flex items-center justify-center py-10">
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
                opacity: 1 - index * 0.15, 
                scale: 1 - index * 0.05,
                y: index * -15,
                zIndex: stack.length - index,
                rotate: index % 2 === 0 ? index * 1.5 : index * -1.5
              }}
              exit={{ 
                opacity: 0, 
                scale: 1.1, 
                x: isRTL ? -300 : 300, 
                rotate: isRTL ? -15 : 15,
                filter: "blur(10px)"
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={() => handleCardClick(img, index)}
              className={cn(
                "absolute w-full aspect-3/4 md:aspect-video rounded-3xl md:rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/10 group",
                index === 0 ? "scale-100" : "scale-95"
              )}
            >
              <img 
                src={img} 
                alt="Project Image" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay Controls */}
              {index === 0 && (
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-4 bg-white/20 backdrop-blur-xl rounded-full text-white border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 size={24} />
                  </div>
                </div>
              )}

              {/* Stack Indicator */}
              {index === 0 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className={cn(
                    "text-white text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap",
                    language === 'ar' && "font-arabic tracking-normal"
                  )}>
                    {language === 'ar' ? 'إضغط للتكبير' : 'Click to Expand'}
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
            className="fixed inset-0 z-100 bg-primary/98 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-12 overflow-hidden"
          >
            {/* Header Controls */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
              <div className="flex gap-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    setRotation(prev => (prev + 90) % 360)
                  }}
                  className="p-3 bg-white/5 hover:bg-accent hover:text-primary rounded-full text-white/70 transition-all border border-white/10"
                  title="Rotate Image"
                >
                  <RotateCw size={24} />
                </button>
              </div>
              <button 
                onClick={() => setSelectedIndex(null)}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all border border-white/10"
              >
                <X size={24} />
              </button>
            </div>

            <div 
              className="relative w-full h-full flex-1 flex items-center justify-center overflow-hidden"
              onClick={() => setSelectedIndex(null)}
            >
              <div 
                className="relative transition-transform duration-500 ease-out flex items-center justify-center"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  width: rotation % 180 !== 0 ? 'auto' : '100%',
                  height: rotation % 180 !== 0 ? 'auto' : '100%'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  key={`${selectedIndex}-${rotation}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={images[selectedIndex]}
                  className={cn(
                    "max-w-screen max-h-screen object-contain shadow-[0_0_100px_rgba(0,0,0,0.6)]",
                    rotation % 180 !== 0 ? "h-[90vw] w-auto max-w-[95vh]" : "w-full h-full"
                  )}
                />
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="w-full max-w-md mt-4 md:mt-8 flex flex-col items-center gap-6 pb-6">
              <div className="flex items-center gap-12">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedIndex((prev) => (prev! === 0 ? images.length - 1 : prev! - 1))
                  }}
                  className="group p-4 bg-white/5 hover:bg-accent text-white hover:text-primary rounded-full transition-all border border-white/10"
                >
                  {isRTL ? <ChevronRight size={32} /> : <ChevronLeft size={32} />}
                </button>

                <div className="text-white/40 font-mono text-sm tracking-[0.3em]">
                  <span className="text-accent font-bold">{selectedIndex + 1}</span>
                  <span className="mx-3">/</span>
                  <span>{images.length}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedIndex((prev) => (prev! === images.length - 1 ? 0 : prev! + 1))
                  }}
                  className="group p-4 bg-white/5 hover:bg-accent text-white hover:text-primary rounded-full transition-all border border-white/10"
                >
                  {isRTL ? <ChevronLeft size={32} /> : <ChevronRight size={32} />}
                </button>
              </div>
            </div>

            {/* Hint for landscape */}
            {rotation === 90 && (
              <div className="fixed bottom-6 text-white/30 text-[10px] uppercase tracking-widest hidden md:block">
                Tip: Use rotation for landscape orientation
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
