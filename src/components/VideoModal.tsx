'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, Loader2, ChevronRight, ChevronLeft } from 'lucide-react'
import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
// Import the type for the ref
import ReactPlayerType from 'react-player'
// Import the component dynamically to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })
import { cn } from '@/lib/utils'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
}

export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  // Player state
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [played, setPlayed] = useState(0)
  const [duration, setDuration] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Refs
  const playerRef = useRef<ReactPlayerType>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  // Format time (seconds -> mm:ss)
  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2, '0')
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`
    }
    return `${mm}:${ss}`
  }

  // Handle controls visibility
  const handleMouseMove = useCallback(() => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (playing) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }, [playing])

  // Initial setup & cleanup
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setPlaying(true)
      setShowControls(true)
    } else {
      document.body.style.overflow = 'unset'
      setPlaying(false)
    }
    return () => {
      document.body.style.overflow = 'unset'
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    }
  }, [isOpen])

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault()
          setPlaying(prev => !prev)
          handleMouseMove()
          break
        case 'm':
          setMuted(prev => !prev)
          handleMouseMove()
          break
        case 'f':
          toggleFullscreen()
          break
        case 'arrowright':
          if (playerRef.current) {
            const currentTime = playerRef.current.getCurrentTime()
            playerRef.current.seekTo(currentTime + 5, 'seconds')
            handleMouseMove()
          }
          break
        case 'arrowleft':
          if (playerRef.current) {
            const currentTime = playerRef.current.getCurrentTime()
            playerRef.current.seekTo(currentTime - 5, 'seconds')
            handleMouseMove()
          }
          break
        case 'escape':
          if (isFullscreen) {
            toggleFullscreen()
          } else {
            onClose()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isFullscreen, onClose, handleMouseMove])

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Handle seek
  const handleSeekMouseDown = () => {
    setSeeking(true)
  }

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value))
  }

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    setSeeking(false)
    if (playerRef.current) {
      playerRef.current.seekTo(parseFloat((e.target as HTMLInputElement).value))
    }
  }

  // Progress update
  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played)
    }
    if (isLoading && state.played > 0) {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            ref={containerRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-7xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10 group"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => playing && setShowControls(false)}
          >


            {/* Video Player */}
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              width="100%"
              height="100%"
              playing={playing}
              volume={volume}
              muted={muted}
              onProgress={handleProgress}
              onDuration={setDuration}
              onBuffer={() => setIsLoading(true)}
              onBufferEnd={() => setIsLoading(false)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              style={{ position: 'absolute', top: 0, left: 0 }}
            />

            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <Loader2 className="w-12 h-12 text-white/50 animate-spin" />
              </div>
            )}

            {/* Big Center Play Button (Overlay) */}
            <AnimatePresence>
              {!playing && !isLoading && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-20 bg-black/20"
                  onClick={() => setPlaying(true)}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl shadow-black/50 hover:bg-accent/80 hover:border-accent transition-colors"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Top Bar Controls */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 right-0 p-6 flex justify-end z-30 bg-linear-to-b from-black/60 to-transparent pointer-events-none"
            >
              <button
                onClick={onClose}
                className="pointer-events-auto p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>

            {/* Bottom Controls Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 z-30 bg-linear-to-t from-black/90 via-black/50 to-transparent px-6 pb-6 pt-20"
            >
              <div className="flex flex-col gap-4">
                {/* Progress Bar */}
                <div 
                  className="relative group/progress h-1 hover:h-2 transition-all duration-200 bg-white/20 rounded-full cursor-pointer"
                  onClick={(e) => {
                    if (!progressBarRef.current || !playerRef.current) return
                    const rect = progressBarRef.current.getBoundingClientRect()
                    const pos = (e.clientX - rect.left) / rect.width
                    playerRef.current.seekTo(pos)
                    setPlayed(pos)
                  }}
                  ref={progressBarRef}
                >
                  <div 
                    className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]"
                    style={{ width: `${played * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg scale-0 group-hover/progress:scale-100" />
                  </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between gap-4">
                  {/* Left Controls */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setPlaying(!playing)}
                      className="text-white hover:text-accent transition-colors p-2 hover:bg-white/5 rounded-full"
                    >
                      {playing ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 fill-current" />
                      )}
                    </button>

                    <div className="flex items-center gap-2 text-sm font-medium text-white/90 font-mono tracking-wider">
                      <span>{formatTime(played * duration)}</span>
                      <span className="text-white/30">/</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-4">
                    {/* Volume */}
                    <div className="flex items-center gap-2 group/volume">
                      <button
                        onClick={() => setMuted(!muted)}
                        className="text-white hover:text-accent transition-colors p-2 hover:bg-white/5 rounded-full"
                      >
                        {muted || volume === 0 ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                      <div className="w-0 overflow-hidden group-hover/volume:w-24 transition-all duration-300 ease-out">
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={muted ? 0 : volume}
                          onChange={(e) => {
                            setVolume(parseFloat(e.target.value))
                            setMuted(false)
                          }}
                          className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:bg-accent"
                        />
                      </div>
                    </div>

                    <div className="w-px h-4 bg-white/20 mx-2" />

                    {/* Playback Speed could go here */}

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      className="text-white hover:text-accent transition-colors p-2 hover:bg-white/5 rounded-full"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-5 h-5" />
                      ) : (
                        <Maximize2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
