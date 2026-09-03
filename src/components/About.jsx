import { about } from '../content.js'
import { useMotionPreference } from '../hooks/useMotionPreference.js'
import { useInView } from '../hooks/useInView.js'

export default function About() {
  const { motionEnabled } = useMotionPreference()
  const [ref, inView] = useInView({ enabled: motionEnabled })
  const titleId = 'about-title'

  const revealClass = motionEnabled
    ? `transition-all duration-700 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`
    : 'opacity-100'

  return (
    <section
      id="about"
      role="region"
      aria-labelledby={titleId}
      className="bg-white px-6 py-24"
    >
      <div
        ref={ref}
        className={`mx-auto w-full max-w-3xl ${revealClass}`}
      >
        <h2 id={titleId} className="mb-8 text-3xl font-semibold text-coffee">
          {about.title}
        </h2>
        <div className="flex flex-col gap-6">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-coffee-light">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}