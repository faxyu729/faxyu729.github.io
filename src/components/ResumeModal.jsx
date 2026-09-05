import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resume } from "../portfolioContent";
import { useMotionPreference } from "../hooks/useMotionPreference";

export default function ResumeModal({ isOpen, onClose }) {
  const { motionEnabled } = useMotionPreference();

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="resume-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionEnabled ? 0.22 : 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-dialog-title"
        >
          <motion.div
            className="resume-modal-window"
            initial={motionEnabled ? { scale: 0.95, opacity: 0, y: 16 } : false}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={motionEnabled ? { scale: 0.95, opacity: 0, y: 16 } : { opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 26,
              duration: motionEnabled ? 0.28 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Controls */}
            <div className="resume-modal-bar">
              <div className="resume-bar-title">
                <span className="resume-badge">CV</span>
                <span>個人簡歷檔案</span>
              </div>
              <div className="resume-modal-actions">
                <button
                  type="button"
                  className="resume-btn resume-btn-ghost"
                  onClick={() => window.print()}
                  title="列印或另存為 PDF"
                >
                  <span aria-hidden="true">🖨️</span> 列印 / 存為 PDF
                </button>
                <a
                  className="resume-btn resume-btn-primary"
                  href={resume.pdfUrl}
                  download="范芯瑜_個人簡歷.pdf"
                  title="下載 PDF 簡歷檔案"
                >
                  <span aria-hidden="true">📥</span> 下載 PDF
                </a>
                <button
                  type="button"
                  className="resume-btn resume-btn-close"
                  onClick={onClose}
                  aria-label="關閉簡歷"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Printable Resume Document */}
            <div className="resume-sheet">
              <header className="resume-sheet-header">
                <div>
                  <h2 id="resume-dialog-title" className="resume-name">
                    {resume.name}
                    <span className="resume-en-name">Fan, Xin-Yu</span>
                  </h2>
                  <p className="resume-subtitle">{resume.title}</p>
                  <p className="resume-school">{resume.school}</p>
                </div>
                <div className="resume-contact-block">
                  <div>
                    <span className="contact-k">信箱：</span>
                    <a href={`mailto:${resume.email}`}>{resume.email}</a>
                  </div>
                  <div>
                    <span className="contact-k">GitHub：</span>
                    <a href={resume.github} target="_blank" rel="noreferrer">
                      github.com/faxyu729
                    </a>
                  </div>
                  <div>
                    <span className="contact-k">電話：</span>
                    <span>{resume.phone}</span>
                  </div>
                </div>
              </header>

              <hr className="resume-divider" />

              {/* Summary */}
              <section className="resume-section">
                <h3 className="resume-section-title">
                  <span className="sec-num">01</span> 個人概述
                </h3>
                <p className="resume-summary-text">{resume.summary}</p>
              </section>

              {/* Skills */}
              <section className="resume-section">
                <h3 className="resume-section-title">
                  <span className="sec-num">02</span> 核心技能矩陣
                </h3>
                <div className="resume-skills-grid">
                  {resume.skills.map((cat) => (
                    <div className="resume-skill-group" key={cat.category}>
                      <h4>{cat.category}</h4>
                      <div className="resume-tags">
                        {cat.items.map((it) => (
                          <span className="resume-tag" key={it}>
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Projects & Competitions */}
              <section className="resume-section">
                <h3 className="resume-section-title">
                  <span className="sec-num">03</span> 專案與競賽經歷
                </h3>
                <div className="resume-timeline">
                  {resume.experiences.map((exp) => (
                    <div className="resume-item" key={exp.title}>
                      <div className="resume-item-top">
                        <h4 className="resume-item-title">{exp.title}</h4>
                        <span className="resume-item-period">{exp.period}</span>
                      </div>
                      <p className="resume-item-desc">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education & Certifications */}
              <section className="resume-section">
                <h3 className="resume-section-title">
                  <span className="sec-num">04</span> 學歷背景與資格認證
                </h3>
                <div className="resume-timeline">
                  {resume.education.map((edu) => (
                    <div className="resume-item" key={edu.school}>
                      <div className="resume-item-top">
                        <h4 className="resume-item-title">
                          {edu.school} · {edu.degree}
                        </h4>
                        <span className="resume-item-period">{edu.period}</span>
                      </div>
                      <p className="resume-item-desc">{edu.details}</p>
                    </div>
                  ))}
                  <div className="resume-cert-list">
                    {resume.certifications.map((cert) => (
                      <div className="resume-cert-item" key={cert.name}>
                        <span className="cert-mark">✦</span>
                        <strong className="cert-name">{cert.name}</strong>
                        <span className="cert-status">（{cert.status}）</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
