export const site = {
  name: '范芯瑜',
  tagline: '資工系二甲學生',
  nav: [
    { id: 'home', label: '首頁' },
    { id: 'about', label: '關於' },
    { id: 'growth', label: '成長' },
    { id: 'origin', label: '初衷' },
    { id: 'works', label: '作品' },
    { id: 'contact', label: '聯絡' },
  ],
  motionLabelOn: '關閉動態效果',
  motionLabelOff: '開啟動態效果',
}

export const about = {
  title: '關於我',
  paragraphs: [
    '現就讀澎湖科大資工系二年級。專注於系統架構與資訊安全，正準備 IPAS 認證，並以攻讀碩士為長遠目標。',
    '近期帶領「腦動開發」團隊參與女捷思大賽，主導 ELK 系統架構與視覺化設計。這裡收錄我的專案實作與理論探索，為未來的學術研究奠定基礎。',
  ],
}

const BASE = import.meta.env.BASE_URL;

export const works = [
  {
    name: '抓出讓系統卡頓的元兇',
    description: '以 ELK 與圖論建模觀察系統異常行為，整理選課系統卡頓原因與改善方向。',
    tags: ['ELK', '系統觀測', '資料分析'],
    image: `${BASE}works/system-observation.png`,
    imageAlt: '抓出讓系統卡頓的元兇簡報封面縮圖',
    pdf: `${BASE}works/system-observation.pdf`,
    frames: [
      `${BASE}works/frames/system-01.png`,
      `${BASE}works/frames/system-02.png`,
      `${BASE}works/frames/system-03.png`,
      `${BASE}works/frames/system-04.png`,
    ],
    note: '共同製作作品',
  },
  {
    name: '澎湖博物館之旅報導',
    description: '整理澎湖生活博物館參訪內容，記錄在地建築、漁業文化與民俗信仰。',
    tags: ['在地文化', '報告整理', '簡報設計'],
    image: `${BASE}works/penghu-museum-report.png`,
    imageAlt: '澎湖博物館之旅報導簡報封面縮圖',
    pdf: `${BASE}works/penghu-museum-report.pdf`,
    frames: [
      `${BASE}works/frames/museum-01.png`,
      `${BASE}works/frames/museum-02.png`,
      `${BASE}works/frames/museum-03.png`,
      `${BASE}works/frames/museum-04.png`,
    ],
    note: '課堂參訪報告',
  },
  {
    name: '無人機與澎湖飛行安全指南',
    description: '將無人機操作安全、空域規範與澎湖飛行限制整理成易讀的學習簡報。',
    tags: ['資訊整理', '安全教育', '法規閱讀'],
    image: `${BASE}works/drone-safety-guide.png`,
    imageAlt: '無人機與澎湖飛行安全指南簡報封面縮圖',
    pdf: `${BASE}works/drone-safety-guide.pdf`,
    frames: [
      `${BASE}works/frames/drone-01.png`,
      `${BASE}works/frames/drone-02.png`,
      `${BASE}works/frames/drone-03.png`,
      `${BASE}works/frames/drone-04.png`,
    ],
    note: '含引用素材，來源見原簡報',
  },
]

export const contact = {
  title: '聯絡我',
  items: [
    { label: '電子郵件', value: 'xinyu960729@gmail.com', href: 'mailto:xinyu960729@gmail.com' },
    { label: 'GitHub', value: 'faxyu729', href: 'https://github.com/faxyu729' },
    { label: '電話', value: '0963509184', href: 'tel:0963509184' },
  ],
}
