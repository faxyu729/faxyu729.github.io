import { motion } from "framer-motion";
import ArrowIcon from "../components/ArrowIcon";
import { useMotionPreference } from "../hooks/useMotionPreference";

export default function AboutSection({ onOpenResume }) {
  const { motionEnabled } = useMotionPreference();

  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
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
            <div className="about-actions">
              <motion.button
                type="button"
                whileHover={motionEnabled ? { scale: 1.02 } : undefined}
                whileTap={motionEnabled ? { scale: 0.96 } : undefined}
                className="pill primary about-resume-btn"
                onClick={onOpenResume}
              >
                檢視個人簡歷 / CV <ArrowIcon diagonal />
              </motion.button>
            </div>
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
  );
}
