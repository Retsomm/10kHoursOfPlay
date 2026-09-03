# 10,000 Hours of Play

把《10,000小時的遊戲》工作手冊改造成一個角色成長儀表板。使用者透過「簡單→中等→困難」循序解鎖的問答，逐步建立自己的英雄角色卡並跨裝置同步進度。

v1 範圍：手冊 Phase I（第1章～第4.2章，共 6 個章節）。

## 技術棧

- Next.js 16（App Router）+ TypeScript + Tailwind CSS v4
- Supabase（Postgres + Auth，Email Magic Link 登入）
- 部署：Vercel

## 本機開發

```bash
yarn install
yarn dev
```

在設定好 Supabase 之前，`/login`、`/dashboard`、`/chapters/*` 會顯示「尚未設定 Supabase」的提示，`/`（首頁）可以正常瀏覽。

## 設定 Supabase（跨裝置同步的必要步驟）

1. 到 [supabase.com](https://supabase.com) 建立一個新專案（免費方案即可）。
2. 進到專案的 SQL Editor，貼上並執行 [`supabase/schema.sql`](./supabase/schema.sql)（建立 `profiles`／`chapter_progress`／`answers` 三張表與 RLS 政策）。
3. 到 Authentication → Providers，確認 Email 登入是開啟的（預設即可，不需要密碼，走 Magic Link）。
4. 到 Authentication → URL Configuration，把 Site URL 與 Redirect URLs 設成你的網址（本機開發用 `http://localhost:3000/auth/callback`，正式站用 `https://<你的網域>/auth/callback`）。
5. 到 Settings → API，複製 **Project URL** 與 **anon public key**。
6. 複製 `.env.local.example` 為 `.env.local`，把上面兩個值填進去：

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
   ```

7. 重啟 `yarn dev`，`/login` 應該可以正常寄送登入連結了。

## 部署到 Vercel

1. 把這個 repo 推上 GitHub。
2. 在 Vercel 匯入這個 repo。
3. 在 Vercel 專案的 Environment Variables 加入跟上面 `.env.local` 一樣的兩個變數。
4. 部署完成後，回到 Supabase 的 Authentication → URL Configuration，把 Vercel 網址也加進 Redirect URLs。

## 專案結構重點

- `src/data/chapters.ts` — 6 個章節、每章 3 個層級（簡單/中等/困難）的題目內容，改題目就改這裡。
- `src/types/content.ts` — 題型定義（textarea / list / table）。
- `src/lib/progress.ts` — 章節解鎖邏輯（完成簡單才解鎖中等，以此類推）。
- `src/app/chapters/[chapterId]/actions.ts` — 存草稿／完成關卡的 Server Actions。
- `supabase/schema.sql` — 資料庫結構與 RLS 政策，Supabase 專案建好後手動執行一次。

## 待辦（下一步）

- [ ] 使用者自行建立 Supabase 專案並完成上面的設定步驟
- [ ] 推上 GitHub、串接 Vercel 部署
- [ ] 端對端測試登入 + 跨裝置同步
- [ ] Phase II（第5～9章：技能、人脈、里程碑、全面對齊）視使用狀況決定是否擴充
