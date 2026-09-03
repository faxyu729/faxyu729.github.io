import { useEffect, useState } from 'react'
import { site } from '../content.js'
import useMotionPreference from '../hooks/useMotionPreference.js'

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const { motionEnabled, toggleMotion } = useMotionPreference()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        scrolled
          ? 'border-b border-coffee-pale bg-gray-100/80 backdrop-blur'
          : 'bg-gray-100/80 backdrop-blur'
      }`}
    >
      <nav
        aria-label="主導覽"
        className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4"
      >
        <a
          href="#home"
          className="rounded text-lg font-bold text-coffee focus-visible:ring-2 focus-visible:ring-coffee"
        >
          {site.name}
        </a>
        <ul className="flex items-center gap-6">
          {site.nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="rounded text-sm text-coffee-light transition-colors hover:text-coffee focus-visible:ring-2 focus-visible:ring-coffee"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-pressed={!motionEnabled}
          onClick={toggleMotion}
          className="rounded-full border border-coffee-pale px-3 py-1 text-xs text-coffee-light transition-colors hover:border-coffee hover:text-coffee focus-visible:ring-2 focus-visible:ring-coffee"
        >
          {motionEnabled ? '關閉動態效果' : '開啟動態效果'}
        </button>
      </nav>
    </header>
  )
}