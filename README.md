# StoryBase Frontend

貼文小站的前端：以 **React 19**、**Vite 8**、**TypeScript**、**Tailwind CSS 4** 與 **React Router** 建置，串接後端 REST API（註冊／登入等）。

## 環境需求

- [Node.js](https://nodejs.org/)（建議 LTS）
- npm（或相容的套件管理工具）

## 安裝與啟動

```bash
git clone <此儲存庫網址>
cd StoryBase-Frontend
npm install
```

在專案根目錄建立 **`.env`**（勿將含正式網址／金鑰的檔案提交至公開儲存庫）：

```env
# 後端根網址，不要加結尾斜線；前端會組成「此網址 + /api/v1/...」
VITE_API_BASE_URL=https://your-backend.example.com
```

啟動開發伺服器：

```bash
npm run dev
```

瀏覽器開啟終端機顯示的本機網址（預設多為 `http://localhost:5173`）。

## 可用指令

| 指令            | 說明                 |
| --------------- | -------------------- |
| `npm run dev`   | 開發模式（熱重載）   |
| `npm run build` | TypeScript 檢查並建置正式版 |
| `npm run preview` | 在本機預覽建置結果 |
| `npm run lint`  | 執行 ESLint          |
| `npm run format` | 以 Prettier 格式化 `src` 等路徑 |

## 專案結構（精簡）

- `src/pages/` — 各頁面（登入、註冊、會員、貼文列表／詳情／編輯、錯誤頁）
- `src/components/` — 版面與 UI 元件
- `src/hooks/useAuth.ts` — 登入／註冊 API 與 `localStorage` 存 token
- `src/data/samplePosts.ts` — 貼文列表／詳情目前使用的範例資料（可改為呼叫後端）

路徑別名：`@/` 對應 `src/`（見 `vite.config.ts`）。

## 路由一覽

| 路徑 | 說明 |
| ---- | ---- |
| `/` | 導向 `/login` |
| `/login` | 登入 |
| `/register` | 註冊 |
| `/member` | 會員資料（需通過版面路由；實際保護邏輯可依需求加上） |
| `/posts` | 貼文列表 |
| `/posts/:postId` | 貼文詳情 |
| `/posts/:postId/edit` | 編輯貼文 |
| `*` | 未定義路徑：版面內為錯誤頁，版面外導向登入 |

## 與後端整合

- **登入**：`POST {VITE_API_BASE_URL}/api/v1/login`  
  成功時將 `access_token` 寫入 `localStorage`（鍵名：`access_token`）。
- **註冊**：`POST {VITE_API_BASE_URL}/api/v1/register`

錯誤回應若為 JSON 且含 `detail`（例如 FastAPI），會當作錯誤訊息顯示於表單。

## 授權

若未於儲存庫中註明，預設以專案擁有者為準。
