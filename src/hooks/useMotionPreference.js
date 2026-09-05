import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const MotionPreferenceContext = createContext(null)

export function MotionPreferenceProvider({ children }) {
  const reducedQuery = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null
  )

  const getInitial = useCallback(() => {
    try {
      const stored = localStorage.getItem('agy_motion_preference')
      if (stored !== null) return stored === 'true'
    } catch {
      // ignore
    }
    return true
  }, [])

  const [motionEnabled, setMotionEnabled] = useState(getInitial)

  useEffect(() => {
    const query = reducedQuery.current
    if (!query) return undefined
    const onChange = () => {
      try {
        if (localStorage.getItem('agy_motion_preference') === null) {
          setMotionEnabled(!query.matches)
        }
      } catch {
        setMotionEnabled(!query.matches)
      }
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggleMotion = useCallback(() => {
    setMotionEnabled((prev) => {
      const next = !prev
      try {
        localStorage.setItem('agy_motion_preference', String(next))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  const value = useMemo(() => ({ motionEnabled, toggleMotion }), [motionEnabled, toggleMotion])

  return createElement(MotionPreferenceContext.Provider, { value }, children)
}

export function useMotionPreference() {
  const context = useContext(MotionPreferenceContext)
  if (!context) {
    return { motionEnabled: true, toggleMotion: () => {} }
  }
  return context
}

export default useMotionPreference
