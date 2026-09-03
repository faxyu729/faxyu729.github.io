import { AnimatePresence, motion } from 'framer-motion'
import { useFrameSequence } from '../hooks/useFrameSequence.js'
import { useMotionPreference } from '../hooks/useMotionPreference.js'

export default function FrameSequence({ frames, alt, interval = 850, className = '' }) {
  const { motionEnabled } = useMotionPreference()
  const index = useFrameSequence(frames.length, { enabled: motionEnabled, interval })
  const src = frames[index] ?? frames[0]

  return (
    <div className={`relative aspect-video overflow-hidden rounded-2xl bg-white ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={src}
          src={src}
          alt={`${alt}，第 ${index + 1} 張影格`}
          loading="lazy"
          initial={motionEnabled ? { opacity: 0, scale: 1.02 } : false}
          animate={{ opacity: 1, scale: 1 }}
          exit={motionEnabled ? { opacity: 0, scale: 0.99 } : undefined}
          transition={{ duration: 0.35 }}
          className="h-full w-full object-contain"
        />
      </AnimatePresence>
      <div className="absolute bottom-3 left-3 flex gap-1.5" aria-hidden="true">
        {frames.map((frame, dotIndex) => (
          <span
            key={frame}
            className={`h-1.5 rounded-full transition-all ${
              dotIndex === index ? 'w-6 bg-coffee' : 'w-1.5 bg-coffee-pale'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
