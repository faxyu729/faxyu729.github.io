const BASE = import.meta.env.BASE_URL;

export const works = [
  {
    name: '抓出讓系統卡頓的元兇',
    description: '以 ELK 與圖論建模觀察系統異常行為，整理選課系統卡頓原因與改善方向。',
    tags: ['ELK', '系統觀測', '資料分析'],
    metrics: [
      { label: '日誌量級', value: '10萬+ 筆' },
      { label: '排查效率', value: '+40%' },
      { label: '競賽肯定', value: '女捷思入圍' },
    ],
    image: `${BASE}works/system-observation.png`,
    imageAlt: '抓出讓系統卡頓的元兇簡報封面縮圖',
    pdf: `${BASE}works/system-observation.pdf`,
    note: '共同製作作品',
  },
  {
    name: '澎湖博物館之旅報導',
    description: '整理澎湖生活博物館參訪內容，記錄在地建築、漁業文化與民俗信仰。',
    tags: ['在地文化', '報告整理', '簡報設計'],
    metrics: [
      { label: '走訪調研', value: '3大展區' },
      { label: '脈絡整合', value: '深度文史' },
      { label: '成果表現', value: '課堂優等' },
    ],
    image: `${BASE}works/penghu-museum-report.png`,
    imageAlt: '澎湖博物館之旅報導簡報封面縮圖',
    pdf: `${BASE}works/penghu-museum-report.pdf`,
    note: '課堂參訪報告',
  },
  {
    name: '無人機與澎湖飛行安全指南',
    description: '將無人機操作安全、空域規範與澎湖飛行限制整理成易讀的學習簡報。',
    tags: ['資訊整理', '安全教育', '法規閱讀'],
    metrics: [
      { label: '空域圖資', value: '澎湖全域' },
      { label: '法規條文', value: '無人機專章' },
      { label: '安全指引', value: '結構化拆解' },
    ],
    image: `${BASE}works/drone-safety-guide.png`,
    imageAlt: '無人機與澎湖飛行安全指南簡報封面縮圖',
    pdf: `${BASE}works/drone-safety-guide.pdf`,
    note: '含引用素材，來源見原簡報',
  },
]

export const resume = {
  name: '范芯瑜',
  title: '資訊工程學系學生 · 系統架構與資安探索',
  school: '國立澎湖科技大學 資訊工程學系（大二）',
  email: 'xinyu960729@gmail.com',
  github: 'https://github.com/faxyu729',
  phone: '0963509184',
  summary: '現就讀澎湖科大資工系二年級，專注於系統架構、效能觀測與資訊安全防護。具備 ELK Stack 實戰架構與日誌分析經驗，曾帶領「腦動開發」團隊入圍女捷思大賽。正積極準備 iPAS 資訊安全工程師認證，致力於結合理論與系統工程，並以攻讀碩士持續深造為長遠目標。',
  pdfUrl: `${BASE}resume.pdf`,
  skills: [
    { category: '核心程式語言', items: ['Python', 'C / C++', 'JavaScript (ES6+)', 'HTML5 / CSS3'] },
    { category: '系統架構與工具', items: ['ELK Stack (Elasticsearch, Logstash, Kibana)', 'Linux 伺服器環境', 'Git / GitHub 版本控制', 'Docker 基礎容器化'] },
    { category: '專業領域與方法', items: ['系統效能觀測與瓶頸定位', '網路與資訊安全基礎', '圖論建模與結構化分析', '技術簡報與知識架構呈現'] },
  ],
  education: [
    {
      degree: '資訊工程學系 學士在讀',
      school: '國立澎湖科技大學',
      period: '2023 - 現今',
      details: '主修計算機概論、資料結構、演算法、物件導向程式設計、作業系統概論，專注系統底層與資安防禦。',
    },
  ],
  experiences: [
    {
      title: '女捷思資安競賽 — 「腦動開發」團隊隊長兼架構師',
      period: '2024 - 2025',
      description: '帶領團隊以 ELK Stack 與圖論建模進行「選課系統卡頓元兇」專題，採集與分析逾 10 萬筆系統日誌，定位高並發請求下的效能瓶頸，成果榮獲競賽入圍認可。',
    },
    {
      title: '澎湖生活文化與無人機飛行安全科普專題',
      period: '2024',
      description: '結合在地空域法規與民航安全手冊，將龐雜條文拆解為清晰直觀的視覺化指引，獲課堂評鑑優等。',
    },
  ],
  certifications: [
    { name: '經濟部 iPAS 資訊安全工程師初級認證', status: '備考推進中（預計 2025 年應試）' },
    { name: '澎湖科技大學 書卷獎 / 學業績優', status: '持續保持' },
  ],
};

export const contact = {
  title: '聯絡我',
  items: [
    { label: '電子郵件', value: 'xinyu960729@gmail.com', href: 'mailto:xinyu960729@gmail.com' },
    { label: 'GitHub', value: 'faxyu729', href: 'https://github.com/faxyu729' },
    { label: '電話', value: '0963509184', href: 'tel:0963509184' },
  ],
}
