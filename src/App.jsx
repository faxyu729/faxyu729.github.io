import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { works, contact } from "./content";
import {
  MotionPreferenceProvider,
  useMotionPreference,
} from "./hooks/useMotionPreference";
import SequenceCanvas from "./components/SequenceCanvas";
import useStoryMotion from "./hooks/useStoryMotion";
const Arrow = ({ diagonal = false }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const names = ["序章", "關於", "成長", "拆解", "作品", "聯絡"],
  ids = ["home", "about", "observation", "archive", "works", "contact"];

function WorkCard({ work, index }) {
  const [open, setOpen] = useState(false),
    { motionEnabled } = useMotionPreference();
  return (
    <motion.article
      className={`work-card work-${index}`}
      onFocusCapture={(event) => {
        if (!motionEnabled || window.innerWidth <= 900) return;
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        if (rect.left >= 0 && rect.right <= window.innerWidth) return;
        const section = card.closest('#works');
        const track = card.parentElement;
        const viewport = track.parentElement;
        const travel = track.scrollWidth - viewport.clientWidth;
        if (travel <= 0) return;
        const progress = Math.min(1, card.offsetLeft / travel);
        const top = window.scrollY + section.getBoundingClientRect().top;
        window.scrollTo({ top: top + progress * (section.offsetHeight - window.innerHeight), behavior: 'smooth' });
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
        <div className="work-actions">
          <a
            className="text-link"
            href={work.pdf}
            target="_blank"
            rel="noreferrer"
          >
            閱讀作品 <Arrow diagonal />
          </a>
          <motion.button
            whileTap={motionEnabled ? { scale: 0.92 } : undefined}
            onClick={() => setOpen((v) => !v)}
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
                  {work.tags.map((t) => (
                    <li key={t}>{t}</li>
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

const topologyNodes = [
  { id: 0, x: 120, y: 230, normal: "邏輯", hover: "C++", group: "left" },
  { id: 1, x: 290, y: 100, normal: "基礎", hover: "Python", group: "left" },
  { id: 2, x: 305, y: 350, normal: "好奇", hover: "語法", group: "left" },
  { id: 3, x: 490, y: 230, normal: "環境工具", hover: "VS Code", group: "center", isCore: true },
  { id: 4, x: 675, y: 100, normal: "實作", hover: "標註", group: "right" },
  { id: 5, x: 685, y: 360, normal: "拆解", hover: "系統", group: "right" },
  { id: 6, x: 860, y: 230, normal: "落地", hover: "專案", group: "right" },
];

const topologyEdges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 6],
  [5, 6],
  [1, 4],
  [2, 5],
];

function Portfolio() {
  const page = useRef(null),
    core = useRef(null),
    archive = useRef(null),
    { motionEnabled, toggleMotion } = useMotionPreference();
  const [active, setActive] = useState(0),
    [menu, setMenu] = useState(false),
    [scrolled, setScrolled] = useState(false),
    [hoveredNode, setHoveredNode] = useState(null);
  useStoryMotion(page, core, archive, motionEnabled);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 35);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const sections = ids.map((id) => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(sections.indexOf(e.target));
        }),
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    // Fragment targets do not exist until React mounts on an initial deep link.
    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        const id = window.location.hash.slice(1);
        if (ids.includes(id) || id === 'main') {
          document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      });
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, []);
  useEffect(() => {
    const elements = document.querySelectorAll(".scramble-text");
    if (!elements.length) return;
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

    const scramble = (el) => {
      const target = el.dataset.text || el.textContent;
      const len = target.length;
      if (!motionEnabled) {
        el.textContent = target;
        return;
      }
      const scrambleDuration = 600;
      const resolveStep = 180;
      const startTime = performance.now();

      const frame = (now) => {
        const elapsed = now - startTime;
        if (elapsed < scrambleDuration) {
          let s = "";
          for (let i = 0; i < len; i++) {
            s += chars[Math.floor(Math.random() * chars.length)];
          }
          el.textContent = s;
          requestAnimationFrame(frame);
        } else {
          const resolveElapsed = elapsed - scrambleDuration;
          const resolvedCount = Math.min(len, Math.floor(resolveElapsed / resolveStep));
          let s = "";
          for (let i = 0; i < len; i++) {
            if (i < resolvedCount) {
              s += target[i];
            } else {
              s += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          el.textContent = s;
          if (resolvedCount < len) {
            requestAnimationFrame(frame);
          } else {
            el.textContent = target;
          }
        }
      };
      requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scramble(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [motionEnabled]);

  useEffect(() => {
    const glow = document.querySelector(".cursor-glow");
    if (!glow || typeof window === "undefined" || window.matchMedia("(hover: none)").matches) return;

    let mouseX = -100,
      mouseY = -100,
      currX = -100,
      currY = -100,
      rafId = null,
      visible = false;

    const loop = () => {
      currX += (mouseX - currX) * 0.2;
      currY += (mouseY - currY) * 0.2;
      glow.style.setProperty("--cursor-x", `${currX}px`);
      glow.style.setProperty("--cursor-y", `${currY}px`);

      if (Math.abs(mouseX - currX) > 0.1 || Math.abs(mouseY - currY) > 0.1) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    };

    const onPointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        glow.classList.add("is-visible");
      }
      const interactive = e.target?.closest(
        "a, button, [role='button'], input, textarea, select, .pill, .contact-link"
      );
      if (interactive) {
        glow.classList.add("is-hover");
      } else {
        glow.classList.remove("is-hover");
      }
      if (rafId === null) rafId = requestAnimationFrame(loop);
    };

    const onPointerLeave = () => {
      visible = false;
      glow.classList.remove("is-visible");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);
  useEffect(() => {
    const el = document.getElementById("observation");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("growth-visible");
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const navItems = [
    ["home", "首頁"],
    ["about", "關於我"],
    ["observation", "成長軌跡"],
    ["works", "精選作品"],
    ["contact", "聯絡我"],
  ];
  const currentNavId =
    ids[active] === "archive"
      ? "works"
      : ids[active];
  return (
    <div
      ref={page}
      className={`portfolio ${motionEnabled ? "motion-on" : "motion-off"}`}
    >
      <a href="#main" className="skip-link">
        跳到主要內容
      </a>
      <div className="reading-progress" aria-hidden="true" />
      <header className={`site-nav glass ${scrolled ? "is-scrolled" : ""}`}>
        <a href="#home" className="brand" onClick={() => setMenu(false)}>
          <span className="brand-mark" aria-hidden="true">
            ✳
          </span>
          <span>
            范芯瑜<span className="brand-sub">流光檔案館</span>
          </span>
        </a>
        <nav
          aria-label="主導覽"
          className={menu ? "nav-links is-open" : "nav-links"}
        >
          {navItems.map(([id, label]) => {
            const isCurrent = currentNavId === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  setMenu(false);
                  const target = document.getElementById(id);
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", `#${id}`);
                  }
                }}
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
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-label="切換導覽選單"
          >
            {menu ? "關閉" : "選單"}
          </button>
        </div>
      </header>
      <aside className="chapter-nav" aria-label="章節導覽">
        {ids.map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === i ? "active" : ""}
            aria-label={`${i + 1} ${names[i]}`}
            aria-current={active === i ? "location" : undefined}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            <i />
          </a>
        ))}
      </aside>
      <main id="main">
        <section
          id="home"
          className="hero scroll-scene"
          aria-labelledby="hero-title"
        >
          <div className="scene-sticky hero-stage">
            <div className="hero-aurora" aria-hidden="true" />
            <div className="hero-grid" aria-hidden="true" />
            <div className="hero-copy">
              <p className="eyebrow">
                — 資訊工程與系統開發紀錄
              </p>
              <h1 id="hero-title">
                想法，
                <br />
                正在<span className="scramble-text" data-text="編譯">編譯</span>成形。
              </h1>
              <p className="hero-description">
                從日常的好奇念頭，
                <br />
                到一行行嚴謹的系統實作。
              </p>
            </div>
            <div className="hero-sequence">
              <SequenceCanvas
                ref={core}
                scene="core"
                label="冰藍與淡紫的原創立體核心，隨滾動旋轉展開"
                eager
              />
              <span className="object-label object-label-a">
                ——觀察｜數據解析與需求洞察
              </span>
              <span className="object-label object-label-c">
                ——創造｜系統架構與程式實作
              </span>
              <span className="object-label object-label-b">
                ——連結｜軟硬整合與團隊協作
              </span>
            </div>
            <div className="hero-second">
              <p className="eyebrow">— 專注於邏輯解析與跨域探索</p>
              <h2>
                <span className="hero-second-line">讓好奇，</span>
                <br />
                <span className="hero-second-line">
                  長出<span className="scramble-text" data-text="邏輯">邏輯</span>的形狀。
                </span>
              </h2>
              <p className="hero-description">
                結合數據洞察與開發技術，
                <br />
                記錄每一次從無到有的實作軌跡。
              </p>
              <a className="pill primary" href="#works">
                探索我的作品 <Arrow />
              </a>
            </div>
            <div className="hero-footer">
              <span>澎湖科技大學 · 資訊工程</span>
              <span className="scroll-invitation">
                向下捲動，展開故事 <span>↓</span>
              </span>
              <span>01 — 06</span>
            </div>
          </div>
        </section>
        <section
          id="about"
          className="about-section"
          aria-labelledby="about-title"
        >
          <div className="portal" aria-hidden="true" />
          <div className="about-orbit" aria-hidden="true" />
          <div className="section-top reveal">
            <span className="eyebrow">01 / 關於我</span>
            <span className="small-note">在學習中，持續探索。</span>
          </div>
          <div className="about-content">
            <h2 id="about-title" className="about-statement">
              <span className="about-line">從底層架構到系統資安。</span>
              <br />
              <span className="about-line">實踐理論，</span>
              <br />
              <span className="about-line">為進階學術研究奠基。</span>
            </h2>
            <div className="about-bio reveal">
              <span className="profile-symbol" aria-hidden="true">
                瑜
              </span>
              <div>
                <h3>你好，我是范芯瑜。</h3>
                <p>
                  現就讀澎湖科大資工系二年級。專注於系統架構與資訊安全，正準備 IPAS 認證，並以攻讀碩士為長遠目標。
                  <br />
                  <br />
                  近期帶領「腦動開發」團隊參與女捷思大賽，主導 ELK 系統架構與視覺化設計。這裡收錄我的專案實作與理論探索，為未來的學術研究奠定基礎。
                </p>
              </div>
            </div>
          </div>
          <div className="about-index reveal">
            <div>
              <span>01</span>
              <strong>系統與資安</strong>
              <small>底層架構與安全防護</small>
            </div>
            <div>
              <span>02</span>
              <strong>實作與競賽</strong>
              <small>團隊協作與 ELK 系統設計</small>
            </div>
            <div>
              <span>03</span>
              <strong>研究與認證</strong>
              <small>IPAS 準備與學術深造</small>
            </div>
          </div>
        </section>
        <section
          id="observation"
          className="observation scroll-scene"
          aria-labelledby="observation-title"
        >
          <div className="scene-sticky observation-stage">
            <div className="observation-heading reveal">
              <div>
                <span className="observation-eyebrow">02 / 成長軌跡</span>
                <h2 id="observation-title">
                  在複雜之中，
                  <br />
                  <span>找到線索。</span>
                </h2>
              </div>
              <p>
                從基礎的程式語法，到動手解決真實問題。
                <br />
                記錄每一個階段的探索與實作。
              </p>
            </div>

            <div className="graph-wrap">
              <svg
                className="system-graph"
                viewBox="0 0 980 460"
                role="img"
                aria-label="成長軌跡系統拓樸示意圖"
              >
                <defs>
                  <linearGradient id="line-gradient">
                    <stop stopColor="#4c8be8" />
                    <stop offset="1" stopColor="#9b83d2" />
                  </linearGradient>
                </defs>
                {topologyEdges.map(([a, b], i) => {
                  const nodeA = topologyNodes[a];
                  const nodeB = topologyNodes[b];
                  const isEdgeActive =
                    hoveredNode !== null &&
                    (a === hoveredNode || b === hoveredNode);
                  return (
                    <path
                      className="graph-line"
                      key={i}
                      d={`M${nodeA.x} ${nodeA.y} Q${(nodeA.x + nodeB.x) / 2} ${
                        nodeA.y
                      } ${nodeB.x} ${nodeB.y}`}
                      fill="none"
                      stroke="url(#line-gradient)"
                      strokeWidth={isEdgeActive ? "2.2" : "1.5"}
                      strokeOpacity={isEdgeActive ? 0.95 : 0.65}
                      pathLength="1"
                      strokeDasharray="1"
                    />
                  );
                })}
                {topologyNodes.map((node) => {
                  const isHovered = hoveredNode === node.id;
                  const isCore = !!node.isCore;
                  return (
                    <g
                      className={`graph-node ${isCore ? "is-core" : ""} ${
                        isHovered ? "is-hover" : ""
                      }`}
                      key={node.id}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      role="img"
                      aria-label={`${node.normal}，對應技能：${node.hover}`}
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isCore ? 58 : 38}
                        fill={isCore ? "#e3edff" : "#f9fbff"}
                        stroke="#adc5e7"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isCore ? 70 : 48}
                        fill="none"
                        stroke="#dbe6f6"
                        strokeWidth="1"
                      />
                      <text
                        x={node.x}
                        y={node.y + 5}
                        textAnchor="middle"
                        className="node-text node-text-normal"
                      >
                        {node.normal}
                      </text>
                      <text
                        x={node.x}
                        y={node.y + 5}
                        textAnchor="middle"
                        className="node-text node-text-hover"
                      >
                        {node.hover}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="observation-bottom">
              <div className="observation-points">
                <div className="observation-point">
                  <strong>收集</strong>
                  <small>邏輯根基與日常觀察</small>
                </div>
                <div className="observation-point">
                  <strong>連結</strong>
                  <small>工具掌握與環境串聯</small>
                </div>
                <div className="observation-point">
                  <strong>理解</strong>
                  <small>專案實踐與問題拆解</small>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="archive"
          className="archive scroll-scene"
          aria-labelledby="archive-title"
        >
          <div className="scene-sticky archive-stage">
            <div className="archive-wash" aria-hidden="true" />
            <div className="section-top">
              <span className="eyebrow">03 / 展開想法</span>
              <span className="small-note">從封面，走進內容。</span>
            </div>
            <div className="archive-heading">
              <h2 id="archive-title">
                每一層，
                <br />
                都有新的理解。
              </h2>
              <p>讓作品展開，也讓思考的脈絡浮現。</p>
            </div>
            <div className="archive-sequence">
              <SequenceCanvas
                ref={archive}
                scene="archive"
                label="以現有作品簡報製作的立體檔案，隨滾動旋轉並分層展開"
              />
            </div>
            <div className="archive-captions">
              {[
                ["看見主題", "一個值得追問的問題"],
                ["整理脈絡", "讓散落的資訊彼此連結"],
                ["呈現理解", "把發現整理成完整作品"],
              ].map(([t, d], i) => (
                <div className="archive-caption glass" key={t}>
                  <span>0{i + 1}</span>
                  <strong>{t}</strong>
                  <small>{d}</small>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="works"
          className="gallery scroll-scene"
          aria-labelledby="works-title"
        >
          <div className="scene-sticky gallery-stage">
            <div className="gallery-warm" aria-hidden="true" />
            <div className="gallery-cool" aria-hidden="true" />
            <div className="gallery-heading">
              <div>
                <p className="eyebrow">04 / 精選作品</p>
                <h2 id="works-title">
                  不同的探索，
                  <br />
                  同樣的好奇。
                </h2>
              </div>
              <p>
                在系統、架構與天空之間，
                <br />
                敘事傳遞分享的喜悅。
              </p>
            </div>
            <div className="gallery-window">
              <div className="gallery-track">
                {works.map((work, index) => (
                  <WorkCard work={work} index={index} key={work.name} />
                ))}
              </div>
            </div>
            <div className="gallery-footer">
              <span>三份作品，三個觀察世界的角度。</span>
              <span className="desktop-only">繼續向下，向右探索 ⟶</span>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div className="contact-light" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <div className="contact-ray" key={i} style={{ "--i": i }} />
            ))}
          </div>
          <div className="contact-content">
            <p className="eyebrow reveal">05 / 保持連結</p>
            <h2 id="contact-title" className="reveal">
              下一個想法，
              <br />
              <span>從一句你好開始。</span>
            </h2>
            <p className="contact-intro reveal">
              關於作品、學習，或一個有趣的點子。
              <br />
              歡迎與我聊聊。
            </p>
            <div className="contact-links">
              {contact.items.map((item, i) => (
                <div className="contact-reveal" key={item.label}>
                  <motion.a
                    className="contact-link glass"
                    href={item.href}
                    key={item.label}
                    whileHover={
                      motionEnabled ? { y: -7, scale: 1.015 } : undefined
                    }
                    whileTap={motionEnabled ? { scale: 0.97 } : undefined}
                    transition={{ type: "spring", stiffness: 290, damping: 19 }}
                  >
                    <span className="contact-icon" aria-hidden="true">
                      {["@", "⌘", "↗"][i]}
                    </span>
                    <div>
                      <small>{item.label}</small>
                      <span>{item.value}</span>
                    </div>
                    <Arrow diagonal />
                  </motion.a>
                </div>
              ))}
            </div>
          </div>
          <footer>
            <a className="brand" href="#home">
              <span className="brand-mark" aria-hidden="true">
                ✳
              </span>
              范芯瑜
            </a>
            <span>流光檔案館 · 學習與作品的持續記錄</span>
            <a href="#home">回到頂端 ↑</a>
          </footer>
        </section>
      </main>
      <div className="cursor-glow" aria-hidden="true" />
    </div>
  );
}
export default function App() {
  return (
    <MotionPreferenceProvider>
      <Portfolio />
    </MotionPreferenceProvider>
  );
}
