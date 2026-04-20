# StoryBase Frontend

貼文小站前端：**React 19**、**Vite 8**、**TypeScript**、**Tailwind CSS 4**、**React Router 7**，以 REST API 串接後端（註冊／登入／會員／貼文）。

## 技術棧

| 類別 | 套件 |
|------|------|
| 框架 | React 19、react-router-dom 7 |
| 建置 | Vite 8、TypeScript |
| 樣式 | Tailwind CSS 4 |
| UI | Radix Slot、CVA、lucide-react |

## 環境需求

- [Node.js](https://nodejs.org/)（建議 **20／22 LTS**）
- **npm**（或相容的套件管理工具）

## 快速開始

```bash
git clone <儲存庫網址>
cd StoryBase-Frontend
npm install
```

在專案根目錄新增 **`.env`**（勿將含正式環境網址的檔案提交到公開儲存庫）：

```env
# 後端根網址，不要結尾斜線；請求會組成「此網址 + /api/v1/...」
VITE_API_BASE_URL=https://your-backend.example.com
```

啟動開發伺服器：

```bash
npm run dev
```

預設為 **http://localhost:3000**（見 `vite.config.ts`）。開發時 `/api` 會 proxy 到本機後端（預設 `http://127.0.0.1:8080`）。

## 指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 開發模式（熱重載） |
| `npm run build` | `tsc -b` 後 `vite build` 產出 `dist/` |
| `npm run preview` | 本機預覽建置結果 |
| `npm run lint` | ESLint |
| `npm run format` | Prettier（`src` 等路徑） |

## 路由

| 路徑 | 說明 |
|------|------|
| `/` | 導向 `/login` |
| `/login` | 登入（若已有 `access_token` 會導向 `/member`） |
| `/register` | 註冊 |
| `/homepage` | 首頁：公開貼文列表 |
| `/homepage/:postId` | 首頁貼文全文（公開） |
| `/member` | 會員資料（**需登入**） |
| `/posts` | 我的貼文列表（**需登入**） |
| `/posts/add` | 新增貼文（**需登入**） |
| `/posts/:postId/edit` | 編輯貼文（**需登入**） |
| `*`（在 `AppLayout` 內） | 404 錯誤頁 |
| 其餘未定義路徑 | 導向 `/login` |

**需登入**的路由由 `RequireAuth` 保護：無 `localStorage.access_token` 時會導向 `/login`。

## 專案結構

```
src/
├── pages/           # 各頁面
├── components/      # TopBar、AppLayout、RequireAuth、UI 等
├── hooks/           # useAuth、usePosts、useMember
├── assets/          # 圖片、SVG
├── lib/             # 工具函式
├── App.tsx          # 路由定義
└── main.tsx
```

路徑別名 **`@/`** 對應 **`src/`**（`vite.config.ts`）。

## 與後端整合

- **登入**：`POST {VITE_API_BASE_URL}/api/v1/login` — 成功後將 `access_token` 寫入 `localStorage`（鍵名：`access_token`）。
- **註冊**：`POST {VITE_API_BASE_URL}/api/v1/register`
- 貼文／會員等其餘端點見 `src/hooks/usePosts.ts`、`useMember.ts`。

若錯誤回應為 JSON 且含 `detail`（例如 FastAPI），前端會盡量顯示為表單錯誤訊息。

## 建置與部署

詳見 **[docs/DEPLOY.md](docs/DEPLOY.md)**（GitHub Actions、GitHub Pages、Vercel／Netlify、環境變數）。

## 授權

若儲存庫未另註明，以專案擁有者為準。
