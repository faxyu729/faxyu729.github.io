import { motion } from "framer-motion";
import ArrowIcon from "../components/ArrowIcon";
import { contact } from "../portfolioContent";
import { useMotionPreference } from "../hooks/useMotionPreference";

export default function ContactSection() {
  const { motionEnabled } = useMotionPreference();

  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="contact-light" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((index) => (
          <div className="contact-ray" key={index} style={{ "--i": index }} />
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
          {contact.items.map((item, index) => (
            <div className="contact-reveal" key={item.label}>
              <motion.a
                className="contact-link glass"
                href={item.href}
                whileHover={motionEnabled ? { y: -7, scale: 1.015 } : undefined}
                whileTap={motionEnabled ? { scale: 0.97 } : undefined}
                transition={{ type: "spring", stiffness: 290, damping: 19 }}
              >
                <span className="contact-icon" aria-hidden="true">
                  {["@", "⌘", "↗"][index]}
                </span>
                <div>
                  <small>{item.label}</small>
                  <span>{item.value}</span>
                </div>
                <ArrowIcon diagonal />
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
  );
}
