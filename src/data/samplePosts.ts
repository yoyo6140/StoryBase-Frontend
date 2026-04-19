export type SamplePost = {
  id: string;
  title: string;
  content: string;
};

export const SAMPLE_POSTS: readonly SamplePost[] = [
  {
    id: "1",
    title: "週會紀錄：產品路線圖更新",
    content:
      "本週與設計、工程對齊 Q2 重點功能。接下來會先完成貼文列表與會員中心流程，再安排測試與上線時程。",
  },
  {
    id: "2",
    title: "讀書筆記｜使用者研究訪談技巧",
    content:
      "訪談前準備腳本但不照本宣科；多問「為什麼」與具體情境；結束前留時間給受訪者補充，常能挖到意外洞見。",
  },
  {
    id: "3",
    title: "草稿：StoryBase 首頁改版想法",
    content:
      "希望首屏能一眼說明價值主張，並用一張示意圖帶出「故事／貼文」的整理方式。此則仍為草稿，歡迎留言補充。",
  },
];
