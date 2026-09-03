export function clamp(value, min, max) {
  if (min === max) return min
  return Math.min(Math.max(value, min), max)
}

export function mapRange(value, inMin, inMax, outMin, outMax) {
  const inSpan = inMax - inMin
  if (inSpan === 0) return outMin
  const ratio = (value - inMin) / inSpan
  return outMin + ratio * (outMax - outMin)
}

export function getScrollProgress(scrollY, docHeight, viewportHeight) {
  const total = docHeight - viewportHeight
  if (total <= 0) return 0
  return clamp(scrollY / total, 0, 1)
}
