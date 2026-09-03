import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const MotionPreferenceContext = createContext(null)

export function MotionPreferenceProvider({ children }) {
  const reducedQuery = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null
  )

  const getInitial = useCallback(() => {
    return reducedQuery.current ? !reducedQuery.current.matches : true
  }, [])

  const [motionEnabled, setMotionEnabled] = useState(getInitial)

  useEffect(() => {
    const query = reducedQuery.current
    if (!query) return undefined
    const onChange = () => {
      setMotionEnabled(!query.matches)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggleMotion = useCallback(() => {
    setMotionEnabled((prev) => !prev)
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
