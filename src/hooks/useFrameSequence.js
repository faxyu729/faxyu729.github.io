import { useEffect, useState } from 'react'

export function useFrameSequence(frameCount, { enabled = true, interval = 700 } = {}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!enabled || frameCount <= 1) {
      setIndex(0)
      return undefined
    }

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % frameCount)
    }, interval)

    return () => window.clearInterval(id)
  }, [enabled, frameCount, interval])

  return index
}

export default useFrameSequence
