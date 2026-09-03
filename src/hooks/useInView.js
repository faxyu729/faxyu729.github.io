import { useEffect, useRef, useState } from 'react'

export function useInView({ enabled = true, threshold = 0.2, rootMargin = '0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) {
      setInView(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [enabled, threshold, rootMargin])

  return [ref, inView]
}

export default useInView
