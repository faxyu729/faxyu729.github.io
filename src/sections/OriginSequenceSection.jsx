import ScrollDrivenSequenceCanvas from "../components/ScrollDrivenSequenceCanvas";

const captions = [
  ["看見主題", "一個值得追問的問題"],
  ["整理脈絡", "讓散落的資訊彼此連結"],
  ["呈現理解", "把發現整理成完整作品"],
];

export default function OriginSequenceSection({ sequenceRef }) {
  return (
    <section
      id="origin"
      className="archive scroll-scene"
      aria-labelledby="origin-title"
    >
      <span id="archive" className="scroll-anchor" aria-hidden="true" />
      <div className="scene-sticky archive-stage">
        <div className="archive-wash" aria-hidden="true" />
        <div className="section-top">
          <span className="eyebrow">03 / 探索初衷</span>
          <span className="small-note">在未知中尋找秩序。</span>
        </div>
        <div className="archive-heading">
          <h2 id="origin-title">在未知中尋找秩序。</h2>
          <p>
            不只是寫程式，更是透過邏輯拆解世界，
            <br />
            將複雜的雜訊整理成清晰的脈絡。
          </p>
        </div>
        <div className="archive-sequence">
          <ScrollDrivenSequenceCanvas
            ref={sequenceRef}
            scene="archive"
            idlePreload
            label="以現有作品簡報製作的立體檔案，隨滾動旋轉並分層展開"
          />
        </div>
        <div className="archive-captions">
          {captions.map(([title, description], index) => (
            <div className="archive-caption glass" key={title}>
              <span>0{index + 1}</span>
              <strong>{title}</strong>
              <small>{description}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
