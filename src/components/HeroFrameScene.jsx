import { AnimatePresence, motion } from 'framer-motion'
import { useFrameSequence } from '../hooks/useFrameSequence.js'
import { useMotionPreference } from '../hooks/useMotionPreference.js'

const frames = [
  { label: '起點', nodes: 1, lines: 0, grid: false },
  { label: '整理', nodes: 3, lines: 2, grid: false },
  { label: '連結', nodes: 5, lines: 4, grid: true },
  { label: '作品', nodes: 7, lines: 6, grid: true },
]

export default function HeroFrameScene() {
  const { motionEnabled } = useMotionPreference()
  const index = useFrameSequence(frames.length, { enabled: motionEnabled, interval: 780 })
  const frame = frames[index]

  return (
    <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(184,138,90,0.42),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(209,201,195,0.22),transparent_35%)]" />
      {frame.grid && <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />}
      <AnimatePresence mode="wait">
        <motion.div
          key={frame.label}
          initial={motionEnabled ? { opacity: 0, scale: 0.96 } : false}
          animate={{ opacity: 1, scale: 1 }}
          exit={motionEnabled ? { opacity: 0, scale: 1.02 } : undefined}
          transition={{ duration: 0.35 }}
          className="relative h-full"
        >
          {Array.from({ length: frame.lines }).map((_, lineIndex) => (
            <span
              key={`line-${lineIndex}`}
              className="absolute h-px origin-left bg-gradient-to-r from-coffee-pale/80 to-transparent"
              style={{
                left: `${16 + lineIndex * 9}%`,
                top: `${28 + (lineIndex % 4) * 13}%`,
                width: `${28 + lineIndex * 4}%`,
                transform: `rotate(${lineIndex % 2 === 0 ? 18 : -22}deg)`,
              }}
            />
          ))}
          {Array.from({ length: frame.nodes }).map((_, nodeIndex) => (
            <span
              key={`node-${nodeIndex}`}
              className="absolute grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-coffee-pale/20 text-xs text-white shadow-lg shadow-black/20"
              style={{
                left: `${12 + (nodeIndex * 19) % 70}%`,
                top: `${14 + (nodeIndex * 23) % 72}%`,
              }}
            >
              {nodeIndex + 1}
            </span>
          ))}
          <div className="absolute bottom-0 left-0 rounded-full bg-white/15 px-4 py-2 text-sm text-white">
            {frame.label} / 學習影格 0{index + 1}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
