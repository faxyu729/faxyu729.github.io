import { motion, useScroll, useSpring } from 'framer-motion'
import { useMotionPreference } from '../hooks/useMotionPreference.js'

export default function ScrollProgress() {
  const { motionEnabled } = useMotionPreference()
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.2,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-coffee"
      style={{ scaleX: motionEnabled ? smoothProgress : scrollYProgress }}
    />
  )
}
