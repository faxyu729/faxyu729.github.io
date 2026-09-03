import { works } from '../content.js'
import { motion } from 'framer-motion'
import { useMotionPreference } from '../hooks/useMotionPreference.js'

export default function Works() {
  const { motionEnabled } = useMotionPreference()
  const titleId = 'works-title'

  const cardMotion = motionEnabled
    ? {
        initial: { opacity: 0, y: 48, scale: 0.96 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, amount: 0.28 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }
    : { initial: false }

  return (
    <section
      id="works"
      role="region"
      aria-labelledby={titleId}
      className="bg-white px-6 py-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <h2 id={titleId} className="mb-14 text-4xl font-semibold text-coffee">
          我的作品
        </h2>
        <div className="flex flex-col gap-10">
          {works.map((work, index) => (
            <motion.article
              key={work.name}
              {...cardMotion}
              className={`group grid min-h-[420px] overflow-hidden rounded-3xl border border-coffee-pale bg-gray-100 transition-shadow hover:border-coffee hover:shadow-2xl hover:shadow-coffee/10 md:grid-cols-2 ${
                index % 2 === 1 ? 'md:[&>div:first-child]:order-2' : ''
              }`}
            >
              <div className="relative self-center p-4 md:p-6">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-coffee-pale bg-white shadow-inner">
                {work.image ? (
                  <motion.img
                    src={work.image}
                    alt={work.imageAlt}
                    loading="lazy"
                    initial={motionEnabled ? { scale: 1.03 } : false}
                    whileInView={motionEnabled ? { scale: 1 } : undefined}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-contain opacity-95 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full border border-coffee-pale" />
                    <div className="absolute h-24 w-24 rounded-full border border-coffee-pale/60" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-coffee/20 to-transparent" />
                <div className="absolute left-6 top-6 rounded-full bg-white/80 px-4 py-2 text-xs text-coffee shadow-sm">
                  作品 0{index + 1}
                </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-8 md:p-10">
                <p className="mb-3 text-xs text-coffee-light">{work.note}</p>
                <h3 className="mb-4 text-3xl font-bold leading-tight text-coffee">
                  {work.name}
                </h3>
                <p className="mb-8 text-base leading-relaxed text-coffee-light">
                  {work.description}
                </p>
                <ul className="mb-6 flex flex-wrap gap-2">
                  {work.tags.map((tag, tagIndex) => (
                    <motion.li
                      key={tag}
                      initial={motionEnabled ? { opacity: 0, y: 10 } : false}
                      whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ delay: tagIndex * 0.12 + 0.2, duration: 0.4 }}
                      className="rounded-full bg-white px-3 py-1 text-xs text-coffee-light ring-1 ring-coffee-pale"
                    >
                      {tag}
                    </motion.li>
                  ))}
                </ul>
                <a
                  href={work.pdf}
                  className="mt-auto inline-flex w-fit rounded-full border border-coffee-pale px-5 py-3 text-sm text-coffee transition-colors hover:border-coffee hover:bg-white focus-visible:ring-2 focus-visible:ring-coffee"
                >
                  查看 PDF
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
