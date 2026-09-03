import { contact } from '../content.js'
import { useMotionPreference } from '../hooks/useMotionPreference.js'
import { useInView } from '../hooks/useInView.js'

export default function Contact() {
  const { motionEnabled } = useMotionPreference()
  const [ref, inView] = useInView({ enabled: motionEnabled })
  const titleId = 'contact-title'

  const revealClass = motionEnabled
    ? `transition-all duration-700 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`
    : 'opacity-100'

  return (
    <section
      id="contact"
      role="region"
      aria-labelledby={titleId}
      className="bg-gray-100 px-6 py-24"
    >
      <div ref={ref} className={`mx-auto w-full max-w-3xl ${revealClass}`}>
        <h2 id={titleId} className="mb-12 text-3xl font-semibold text-coffee">
          {contact.title}
        </h2>
        <ul className="flex flex-col gap-4">
          {contact.items.map((item) => (
            <li
              key={item.label}
              className="rounded-lg bg-white p-4 ring-1 ring-coffee-pale transition-colors hover:ring-coffee"
            >
              <span className="mr-3 text-sm text-coffee-light">{item.label}</span>
              <a
                href={item.href}
                aria-label={`透過${item.label}聯絡`}
                className="rounded text-coffee underline decoration-coffee-pale underline-offset-4 transition-colors hover:text-coffee-light focus-visible:ring-2 focus-visible:ring-coffee"
              >
                {item.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}