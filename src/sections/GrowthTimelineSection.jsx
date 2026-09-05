import { useEffect, useState } from "react";

const topologyNodes = [
  { id: 0, x: 120, y: 230, normal: "邏輯", hover: "C++" },
  { id: 1, x: 290, y: 100, normal: "基礎", hover: "Python" },
  { id: 2, x: 305, y: 350, normal: "好奇", hover: "語法" },
  {
    id: 3,
    x: 490,
    y: 230,
    normal: "環境工具",
    hover: "VS Code",
    isCore: true,
  },
  { id: 4, x: 675, y: 100, normal: "實作", hover: "標註" },
  { id: 5, x: 685, y: 360, normal: "拆解", hover: "系統" },
  { id: 6, x: 860, y: 230, normal: "落地", hover: "專案" },
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

export default function GrowthTimelineSection() {
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const section = document.getElementById("growth");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) section.classList.add("growth-visible");
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="growth"
      className="observation scroll-scene"
      aria-labelledby="observation-title"
    >
      <span id="observation" className="scroll-anchor" aria-hidden="true" />
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
            {topologyEdges.map(([start, end], index) => {
              const startNode = topologyNodes[start];
              const endNode = topologyNodes[end];
              const active =
                hoveredNode !== null &&
                (start === hoveredNode || end === hoveredNode);
              return (
                <path
                  className="graph-line"
                  key={index}
                  d={`M${startNode.x} ${startNode.y} Q${(startNode.x + endNode.x) / 2} ${startNode.y} ${endNode.x} ${endNode.y}`}
                  fill="none"
                  stroke="url(#line-gradient)"
                  strokeWidth={active ? "2.2" : "1.5"}
                  strokeOpacity={active ? 0.95 : 0.65}
                  pathLength="1"
                  strokeDasharray="1"
                />
              );
            })}
            {topologyNodes.map((node) => {
              const hovered = hoveredNode === node.id;
              return (
                <g
                  className={`graph-node ${node.isCore ? "is-core" : ""} ${hovered ? "is-hover" : ""}`}
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  role="img"
                  aria-label={`${node.normal}，對應技能：${node.hover}`}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.isCore ? 58 : 38}
                    fill={node.isCore ? "#e3edff" : "#f9fbff"}
                    stroke="#adc5e7"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.isCore ? 70 : 48}
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
  );
}
