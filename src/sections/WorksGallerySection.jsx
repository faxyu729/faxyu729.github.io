import WorkCard from "../components/WorkCard";
import { works } from "../portfolioContent";

export default function WorksGallerySection() {
  return (
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
  );
}
