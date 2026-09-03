# 10,000 Hours of Play

把《10,000小時的遊戲》工作手冊改造成一個角色成長儀表板。使用者透過「簡單→中等→困難」循序解鎖的問答，逐步建立自己的英雄角色卡並跨裝置同步進度。

v1 範圍：手冊 Phase I（第1章～第4.2章，共 6 個章節）。

## 技術棧

- Next.js 16（App Router）+ TypeScript + Tailwind CSS v4
- Clerk（登入，僅 Google OAuth）
- Supabase（Postgres 資料庫，僅用 service role key 從伺服器端存取，不經 RLS／anon key）
- 部署：Vercel

## 本機開發

```bash
yarn install
yarn dev
```

在設定好 Clerk／Supabase 之前，`/login`、`/dashboard`、`/chapters/*` 會顯示「尚未完成環境設定」的提示，`/`（首頁）可以正常瀏覽。

## 設定 Clerk（登入，只開 Google）

1. 到 [clerk.com](https://clerk.com) 建立一個新專案（免費方案即可）。
2. 到 Configure → SSO Connections，開啟 **Google**。
3. 到 Configure → Email, Phone, Username，把 Email／密碼登入關掉，只留 Google，讓登入畫面只顯示「Continue with Google」。
4. 到 API Keys 頁面，複製 **Publishable key** 與 **Secret key**，填進 `.env.local`：

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
   CLERK_SECRET_KEY=sk_test_xxxxx
   ```

## 設定 Supabase（資料庫，跨裝置同步）

1. 到 [supabase.com](https://supabase.com) 建立一個新專案（免費方案即可）。
2. 進到專案的 SQL Editor，貼上並執行 [`supabase/schema.sql`](./supabase/schema.sql)（建立 `profiles`／`chapter_progress`／`answers` 三張表）。這個 schema 全部用 `create table if not exists`，是冪等的（idempotent）——重複執行不會清空既有資料，只有第一次真的會建表。**它不會幫你做結構變更**：如果之後要改欄位型別或加欄位，要另外寫 `alter table` 遷移語句，不能靠重跑這份 schema。
3. 到 Settings → API，複製 **Project URL** 與 **service_role secret key**（不是 anon key——這把 key 會繞過 RLS，只能在伺服器端用，絕對不要加 `NEXT_PUBLIC_` 前綴、不要出現在任何會送到瀏覽器的程式碼裡）。
4. 填進 `.env.local`：

   ```
   SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=xxxxx
   ```

5. 重啟 `yarn dev`，`/login` 應該會顯示 Clerk 的 Google 登入畫面了。

## 部署到 Vercel

1. 把這個 repo 推上 GitHub。
2. 在 Vercel 匯入這個 repo。
3. 在 Vercel 專案的 Environment Variables 加入跟上面 `.env.local` 一樣的四個變數。
4. 部署完成後，回到 Clerk 的 Configure → Domains，把 Vercel 網址加進允許的網域。

## 專案結構重點

- `src/data/chapters.ts` — 6 個章節、每章 3 個層級（簡單/中等/困難）的題目內容，改題目就改這裡。
- `src/types/content.ts` — 題型定義（textarea / list / table）。
- `src/lib/progress.ts` — 章節解鎖邏輯（完成簡單才解鎖中等，以此類推）。
- `src/app/chapters/[chapterId]/actions.ts` — 存草稿／完成關卡的 Server Actions，透過 Clerk 的 `auth()` 取得使用者 id。
- `src/lib/supabase/admin.ts` — 唯一建立 Supabase client 的地方，用 service role key，只能在伺服器端程式碼（Server Component／Server Action）呼叫。
- `supabase/schema.sql` — 資料庫結構，Supabase 專案建好後手動執行一次。

## 待辦（下一步）

- [ ] 使用者自行建立 Clerk 專案（開 Google、關 Email）並完成上面的設定步驟
- [ ] 使用者提供 Supabase service role key，跑一次新版 `supabase/schema.sql`
- [ ] 推上 GitHub、串接 Vercel 部署
- [ ] 端對端測試 Google 登入 + 跨裝置同步
- [ ] Phase II（第5～9章：技能、人脈、里程碑、全面對齊）視使用狀況決定是否擴充
