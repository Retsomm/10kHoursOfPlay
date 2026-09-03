# 進度紀錄

## 2026-09-03 — 登入改用 Clerk（僅 Google），Supabase 改當純資料庫

**架構變更：**
- 認證從 Supabase Auth（Magic Link）換成 Clerk，登入方式限定 Google OAuth（要在 Clerk 後台把 Email/密碼關掉，只留 Google）
- Supabase 不再處理認證，改成純資料庫：伺服器端一律用 **service role key**（`src/lib/supabase/admin.ts`），繞過 RLS，由程式碼自己保證每次查詢都用 Clerk 的 `userId` 過濾
- `supabase/schema.sql` 改寫：`user_id` 從 `uuid references auth.users` 改成 `text`（存 Clerk user id，如 `user_2abc...`），拿掉 `auth.uid()` 那組 RLS 政策——RLS 保持開啟但**不建立任何 policy**，等於 anon key 完全被擋在外面，只有 service role key（純伺服器端）能存取，這是刻意的安全設計，不是漏做
- 移除：`src/lib/supabase/{client,server,middleware}.ts`、`src/app/auth/callback/route.ts`、`src/app/login/page.tsx`（Magic Link 表單）、`src/components/SignOutButton.tsx`
- 新增：`src/app/login/[[...rest]]/page.tsx`（Clerk 官方 `<SignIn/>` 元件，catch-all 路由是 Clerk 的標準用法）、`middleware.ts` 改用 `clerkMiddleware()`
- `src/lib/env.ts` 新增 `clerkConfigured()`／`appConfigured()`，`SetupNotice` 元件現在會分別列出缺 Clerk 還是缺 Supabase 設定
- 環境變數全部改名：`NEXT_PUBLIC_SUPABASE_URL`/`ANON_KEY` → `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY`（拿掉 `NEXT_PUBLIC_` 前綴，因為現在只有伺服器端會用到），新增 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`/`CLERK_SECRET_KEY`

**查證方式（避免用到過時的 Clerk API）：** 這次 `@clerk/nextjs` 裝到的是 7.9.0，版本比我原本記憶中的還新，`appearance.variables` 的欄位名稱（`colorForeground`/`colorInput` 而非舊的 `colorText`/`colorInputBackground`）、`UserButton` 的 `afterSignOutUrl` 已搬到 `ClerkProvider` 層級，都是查了 node_modules 裡實際的型別定義跟官方文件才確認，不是憑記憶硬寫。

**本機驗證：** `tsc --noEmit`、`yarn lint`、`yarn build` 全過；dev server 在 Clerk／Supabase 金鑰都是空值時，`/`、`/login`、`/dashboard` 全部正常回 200 並顯示「尚未完成環境設定」提示，沒有噴錯。

**尚未驗證（需要使用者操作）：**
- 使用者還沒建立 Clerk 專案，Google 登入、`<SignIn/>` 元件實際畫面、OAuth 完整流程完全沒測過
- Supabase service role key 還沒拿到，新版 schema（text user_id）還沒在使用者的 Supabase 專案上跑過
- 這個 session 沒有瀏覽器可用，UI／RWD 沒有肉眼看過

## 2026-09-03 — 套件管理改用 yarn、統一箭頭函式寫法

- 套件管理工具從 npm 改為 yarn（`package-lock.json` 刪除、產生 `yarn.lock`），README 指令同步更新
- 全部 `function`/`async function` 宣告改成 `const foo = () => {}` 箭頭函式寫法（元件、Server Actions、middleware、lib 工具函式全部涵蓋）
- 重新跑過 `tsc --noEmit`、`yarn lint`、`yarn build`、dev server curl 檢查，全部通過

## 2026-09-03 — v1 骨架完成

**已完成：**
- Next.js 16 + TypeScript + Tailwind v4 專案骨架，深色科幻藍主題（Orbitron + Noto Sans TC）
- Phase I 六章節（第1、2、3.1、3.2、4.1、4.2章）完整題目資料，逐字對照手冊 PDF 轉錄，見 `src/data/chapters.ts`
- 通用題型引擎：textarea / list / table 三種欄位型別，見 `src/types/content.ts` + `src/components/fields/FieldRenderer.tsx`
- 章節內簡單→中等→困難循序解鎖邏輯，見 `src/lib/progress.ts`
- Supabase 串接骨架：browser/server client、middleware session 刷新、Email Magic Link 登入流程、auth callback route
- 資料庫 schema（`supabase/schema.sql`）：`profiles` / `chapter_progress` / `answers` 三表 + RLS（僅本人可讀寫）
- 角色卡首頁（六章節進度總覽 + 整體進度條 + 可編輯英雄名字）、章節作答頁（含儲存草稿／完成解鎖）
- 未設定 Supabase 環境變數時，`/login`／`/dashboard`／`/chapters/*` 顯示友善提示而非噴錯（`src/lib/env.ts` + `SetupNotice`）
- 本機驗證：`tsc --noEmit` 通過、`npm run lint` 通過、`npm run build` 通過、dev server 手動 curl 驗證各路由狀態碼與導引訊息正確

**尚未驗證（環境限制，需要使用者操作）：**
- 沒有瀏覽器可用（Claude in Chrome 擴充功能未連線），UI 視覺效果、RWD、互動流程都沒有實際在瀏覽器裡看過，只驗證了 HTML 內容與路由狀態碼
- Supabase 專案尚未建立，登入（Magic Link）、答案儲存、跨裝置同步、RLS 政策是否正確全部未經實測
- 尚未推上 GitHub、尚未部署 Vercel

**下一步（等使用者操作）：**
1. 使用者建立 Supabase 專案，跑 `supabase/schema.sql`，設定 Email Auth 與 Redirect URLs（步驟見 README）
2. 使用者確認要不要推上 GitHub（本機尚未 push，等使用者同意）
3. 推上 GitHub 後接 Vercel 部署，加環境變數
4. 使用者實際在瀏覽器測試登入、填答、跨裝置同步 → 回報是否正常
5. 視使用狀況決定是否擴充 Phase II（第5～9章）
