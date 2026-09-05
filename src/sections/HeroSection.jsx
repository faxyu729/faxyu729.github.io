import ArrowIcon from "../components/ArrowIcon";
import ScrollDrivenSequenceCanvas from "../components/ScrollDrivenSequenceCanvas";

export default function HeroSection({ sequenceRef }) {
  return (
    <section
      id="home"
      className="hero scroll-scene"
      aria-labelledby="hero-title"
    >
      <div className="scene-sticky hero-stage">
        <div className="hero-aurora" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">— 資訊工程與系統開發紀錄</p>
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
          <ScrollDrivenSequenceCanvas
            ref={sequenceRef}
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
            探索我的作品 <ArrowIcon />
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
  );
}
