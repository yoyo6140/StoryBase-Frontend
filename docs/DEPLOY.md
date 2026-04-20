# StoryBase 前端自動化部署說明

本專案為 **Vite + React** 靜態前端，建置後產出 `dist/`，可部署至任何靜態託管（GitHub Pages、Netlify、Vercel、Cloudflare Pages、S3 + CDN 等）。

## 建置前必備

### 環境變數

建置時會把變數編進 bundle，請在 CI 或託管平台設定：

| 變數 | 說明 |
|------|------|
| `VITE_API_BASE_URL` | 後端 API 根網址（**勿**結尾斜線），例如 `https://your-api.example.com` |

本機可參考專案根目錄 `.env`；**請勿**把含正式機密鑰的 `.env` 提交到 Git。

### Node.js

建議與本機開發一致：**Node.js 20 LTS 或 22**，並使用 `npm ci`（或 `npm install`）安裝依賴。

### 建置指令

```bash
npm ci
npm run build
```

成功後靜態檔在 **`dist/`**。`npm run preview` 可在本機預覽建置結果。

---

## 部署方式概覽

| 方式 | 適合情境 |
|------|----------|
| [GitHub Actions → GitHub Pages](#github-actions--github-pages) | 程式碼在 GitHub、想用免費靜態站 |
| [Vercel / Netlify](#vercel--netlify) | 要自動預覽、邊緣網路、自訂網域 |
| [手動上傳](#手動上傳-dist) | 自有主機、物件儲存 |

---

## GitHub Actions → GitHub Pages

專案內已提供工作流程：`.github/workflows/deploy-github-pages.yml`。

### 一次性設定（Repository）

1. **Settings → Secrets and variables → Actions → New repository secret**
   - 名稱：`VITE_API_BASE_URL`
   - 值：你的後端 base URL（與上表相同）。

2. **Settings → Pages**
   - **Source**：選 **GitHub Actions**（不要選 branch 直接發佈 `dist`）。

3. 將上述 workflow 檔合併進預設分支（例如 `main`），推送後 Actions 會自動建置並發佈。

### 若網址為 `https://<使用者>.github.io/<專案名>/`（專案站）

React Router 的 `BrowserRouter` 必須知道 **base path**，否則子路徑與重新整理會 404。請在該次建置加上 Vite 的 `base`：

```bash
npm run build -- --base=/<專案資料夾名稱>/
```

在 GitHub Actions 可把 `專案資料夾名稱` 改成 `${{ github.event.repository.name }}`（見 workflow 檔註解）。

若網址是 **`https://<使用者>.github.io/`**（使用者站、根路徑）或 **自訂網域掛在根路徑**，則維持預設 `base: '/'` 即可。

### SPA 在 GitHub Pages 重新整理 404

若仍發生「直接開子路徑或重新整理出現 404」，可採用其一：

- 在託管端設定「全部路徑回傳 `index.html`」（GitHub Pages 靜態站能力有限，常見作法是改用 **自訂網域 +** 前面放 **Cloudflare** 等做 rewrite），或
- 改用 **Netlify / Vercel**（見下節，一鍵 SPA fallback）。

---

## Vercel / Netlify

兩者皆支援連結 Git 後 **push 即建置**，並可設定環境變數 `VITE_API_BASE_URL`。

### 共通設定

- **Build command**：`npm run build`
- **Output directory**：`dist`
- **Install command**：`npm ci`（若平台預設為 `npm install` 亦可）

### SPA 路由（History API）

未設定 fallback 時，在子路徑（例如 `/member`）**重新整理**容易出現 **`404: NOT_FOUND`（Vercel）**。

- **Vercel**：專案根目錄已含 **`vercel.json`**，會將未命中靜態檔的請求導向 **`index.html`**。推送後在 Vercel 後台 **Redeploy** 一次即可生效。
- **Netlify**：`public/_redirects` 已內建上述規則，建置後會出現在 `dist/` 根目錄。

---

## 手動上傳 `dist`

1. 在本機或 CI 執行 `npm ci && npm run build`，並設定 `VITE_API_BASE_URL`。
2. 將 **`dist/` 內全部檔案**上傳到網站根目錄（或 CDN）。
3. 設定 Web 伺服器：**所有未命中靜態檔的請求**回傳 `index.html`（與上節 SPA 相同）。

---

## 疑難排解

- **畫面空白、Console 顯示 API 網址錯誤**：檢查建置當下的 `VITE_API_BASE_URL` 是否與後端一致（含 `https`）。
- **CORS 錯誤**：後端需允許你前端部署網域的 `Origin`。
- **`tsc -b` 在 CI 失敗**：先在本機執行 `npm run build` 修正型別錯誤再推送。

---

## 相關檔案

| 檔案 | 說明 |
|------|------|
| `package.json` | `build` = `tsc -b && vite build` |
| `vite.config.ts` | 路徑別名、`dev` 時 `/api` proxy（僅開發用） |
| `.github/workflows/deploy-github-pages.yml` | GitHub Pages 自動建置與發佈 |
