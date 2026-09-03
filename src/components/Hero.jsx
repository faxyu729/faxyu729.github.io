import { site } from '../content.js'
import { useMotionPreference } from '../hooks/useMotionPreference.js'

export default function Hero() {
  const { motionEnabled } = useMotionPreference()
  const titleId = 'home-title'

  return (
    <section
      id="home"
      role="region"
      aria-labelledby={titleId}
      className="flex min-h-screen items-center bg-gray-100 px-6 pt-24"
    >
      <div className="mx-auto grid w-full max-w-3xl gap-12 md:grid-cols-2 md:items-center">
        <div
          className={`flex flex-col gap-6 ${
            motionEnabled ? 'animate-[fade-up_0.6s_ease-out_both]' : ''
          }`}
        >
          <h1 id={titleId} className="text-5xl font-bold text-coffee">
            {site.name}
          </h1>
          <p className="text-xl leading-relaxed text-coffee-light">
            {site.tagline}
          </p>
        </div>

        <div
          aria-hidden="true"
          className={`relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-coffee via-coffee-light to-coffee-pale ${
            motionEnabled ? 'animate-[fade-in_0.8s_ease-out_both]' : ''
          }`}
        >
          <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-white/20" />
          <div className="absolute bottom-10 right-10 h-28 w-28 rounded-full bg-white/10" />
          <div className="absolute right-4 top-4 h-12 w-12 rounded-full bg-white/25" />
        </div>
      </div>
    </section>
  )
}