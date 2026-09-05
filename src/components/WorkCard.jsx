import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionPreference } from "../hooks/useMotionPreference";
import ArrowIcon from "./ArrowIcon";

export default function WorkCard({ work, index }) {
  const [open, setOpen] = useState(false);
  const { motionEnabled } = useMotionPreference();

  return (
    <motion.article
      className={`work-card work-${index}`}
      onFocusCapture={(event) => {
        if (!motionEnabled) return;
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        if (rect.left >= 0 && rect.right <= window.innerWidth) return;
        const section = card.closest("#works");
        const track = card.parentElement;
        const viewport = track.parentElement;
        const travel = track.scrollWidth - viewport.clientWidth;
        if (travel <= 0) return;
        const progress = Math.min(1, card.offsetLeft / travel);
        const top = window.scrollY + section.getBoundingClientRect().top;
        window.scrollTo({
          top: top + progress * (section.offsetHeight - window.innerHeight),
          behavior: "smooth",
        });
      }}
      layout={motionEnabled}
      transition={
        motionEnabled
          ? { type: "spring", stiffness: 220, damping: 25 }
          : { duration: 0 }
      }
    >
      <div className="work-image">
        <img
          src={work.image}
          alt={work.imageAlt}
          loading="lazy"
          width="1200"
          height="675"
        />
        <span className="work-number">0{index + 1}</span>
      </div>
      <div className="work-body">
        <span className="eyebrow">{work.note}</span>
        <h3>{work.name}</h3>
        <p>{work.description}</p>
        {work.metrics && (
          <div className="work-metrics" aria-label="成果關鍵指標">
            {work.metrics.map((metric) => (
              <span className="work-metric-badge" key={metric.label}>
                <span className="metric-label">{metric.label}</span>
                <span className="metric-value">{metric.value}</span>
              </span>
            ))}
          </div>
        )}
        <div className="work-actions">
          <a
            className="text-link"
            href={work.pdf}
            target="_blank"
            rel="noreferrer"
          >
            閱讀作品 <ArrowIcon diagonal />
          </a>
          <motion.button
            whileTap={motionEnabled ? { scale: 0.92 } : undefined}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={`details-${index}`}
            className="detail-button"
            aria-label={`${open ? "收合" : "展開"}${work.name}的作品重點`}
          >
            {open ? "−" : "＋"}
          </motion.button>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`details-${index}`}
              className="work-details"
              initial={motionEnabled ? { height: 0, opacity: 0 } : false}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={
                motionEnabled
                  ? { type: "spring", stiffness: 220, damping: 25 }
                  : { duration: 0 }
              }
            >
              <div>
                <p>作品關鍵字</p>
                <ul>
                  {work.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
