import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMotionPreference } from "../hooks/useMotionPreference";

const chapters = [
  ["home", "首頁", "序章"],
  ["about", "關於我", "關於"],
  ["growth", "成長軌跡", "成長"],
  ["origin", "探索初衷", "初衷"],
  ["works", "精選作品", "作品"],
  ["contact", "保持連結", "保持連結"],
];

export default function PortfolioNavigation({ onOpenResume }) {
  const { motionEnabled, toggleMotion } = useMotionPreference();
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 35);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const sections = chapters
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(sections.indexOf(entry.target));
        }),
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));

    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        const hash = window.location.hash.slice(1);
        const id =
          hash === "observation"
            ? "growth"
            : hash === "archive"
              ? "origin"
              : hash;
        if (chapters.some(([chapterId]) => chapterId === id) || id === "main") {
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "instant", block: "start" });
        }
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, []);

  const navigate = (event, id) => {
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <>
      <a href="#main" className="skip-link">
        跳到主要內容
      </a>
      <div className="reading-progress" aria-hidden="true" />
      <header className={`site-nav glass ${scrolled ? "is-scrolled" : ""}`}>
        <a href="#home" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            ✳
          </span>
          <span>
            范芯瑜<span className="brand-sub">流光檔案館</span>
          </span>
        </a>
        <nav
          aria-label="主導覽"
          className={menuOpen ? "nav-links is-open" : "nav-links"}
        >
          {chapters.map(([id, label], index) => {
            const isCurrent = active === index;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(event) => navigate(event, id)}
                aria-current={isCurrent ? "location" : undefined}
                className="nav-link-item"
              >
                {isCurrent && motionEnabled && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="nav-link-label">{label}</span>
              </a>
            );
          })}
        </nav>
        <div className="nav-tools">
          <motion.button
            whileTap={motionEnabled ? { scale: 0.94 } : undefined}
            className="resume-nav-btn"
            onClick={onOpenResume}
            aria-label="檢視個人簡歷"
          >
            <span className="resume-icon" aria-hidden="true">
              📄
            </span>
            <span>簡歷 / CV</span>
          </motion.button>
          <motion.button
            whileTap={motionEnabled ? { scale: 0.94 } : undefined}
            className="motion-toggle"
            aria-pressed={motionEnabled}
            onClick={toggleMotion}
            aria-label={motionEnabled ? "關閉動態效果" : "開啟動態效果"}
          >
            <span aria-hidden="true">{motionEnabled ? "◉" : "○"}</span>
            <span>動態{motionEnabled ? "開啟" : "關閉"}</span>
          </motion.button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label="切換導覽選單"
          >
            {menuOpen ? "關閉" : "選單"}
          </button>
        </div>
      </header>
      <aside className="chapter-nav" aria-label="章節導覽">
        {chapters.map(([id, , name], index) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(event) => navigate(event, id)}
            className={active === index ? "active" : ""}
            aria-label={`${index + 1} ${name}`}
            aria-current={active === index ? "location" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <i />
          </a>
        ))}
      </aside>
    </>
  );
}
