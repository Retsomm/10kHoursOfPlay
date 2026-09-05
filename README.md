# 10,000 Hours of Play

把《10,000小時的遊戲》工作手冊改造成一個「英雄角色卡」成長儀表板。每章提供簡單／中等／困難三種不同深度的練習，完成任一種即可通關，逐步認識自己（Phase I）、持續成長（Phase II），並跨裝置同步進度、追蹤任務與成長軌跡。

**正式站：** https://10k-hours-of-play.vercel.app/

## 功能總覽

- **英雄角色卡**：手冊全 12 個章節（Phase I 六章 + Phase II 六章），每章分簡單／中等／困難三種不同深度的練習，三個都能直接填、不用照順序，完成任一個就算這個章節通關。
- **英雄狀態儀表板**（`/dashboard/profile`）：等級徽章（NPC → 10K HP Player → OP Player → OP Hero）、天賦／技能金字塔、六步驟對齊雷達圖、技能網雷達圖（7 個 Gameful Skill Class）、六步驟旅程路標、「建議下一步」橫幅——全部依真實填答資料算出，沒有額外的圖表套件，圖表都是手刻 inline SVG。
- **任務追蹤器**（`/quests`）：書中的三星成就制，自訂 1～3 星門檻，完成後回報結果；0 星會觸發兩週冷卻期。
- **人生旅程**（`/dashboard/journey`）：成長路線地圖（時間軸＋下一站標記）、天賦／技能金字塔、聯盟名冊、過去里程碑與五年目標。
- **互動式首頁**（`/`）：Neon Arcade 風格的單頁式介紹——sticky HUD（捲動進度＋目前區塊）、視差背景、打字機標語、滾動顯現動畫、NPC／HERO 對比滑桿、六步驟節點、章節關卡選單、等級路線（手機直排／桌機橫排的響應式時間軸）。
- **登入**（`/login`）：Clerk，僅 Google 一鍵登入。

## 技術棧

- Next.js 16（App Router，Turbopack）+ TypeScript + Tailwind CSS v4
- Clerk（登入，僅 Google OAuth）
- Supabase（Postgres 資料庫，僅用 service role key 從伺服器端存取，不經 RLS／anon key）
- 字體：Orbitron／Noto Sans TC（介面本文）+ Press Start 2P／Share Tech Mono（像素風標籤，僅用在拉丁字母／數字，中文字會自動退回 Orbitron／Noto）
- 部署：Vercel

## 本機開發

```bash
yarn install
yarn dev
```

在設定好 Clerk／Supabase 之前，`/login`、`/dashboard/*`、`/chapters/*`、`/quests` 會顯示「尚未完成環境設定」的提示，`/`（首頁）可以正常瀏覽。

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
2. 進到專案的 SQL Editor，貼上並執行 [`supabase/schema.sql`](./supabase/schema.sql)（建立 `profiles`／`chapter_progress`／`answers`／`quests` 四張表）。這個 schema 全部用 `create table if not exists`，是冪等的（idempotent）——重複執行不會清空既有資料。**它不會幫你做結構變更**：之後如果要改既有表的欄位型別或加欄位，要另外寫 `alter table` 遷移語句，不能靠重跑這份 schema。
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
5. 若要開放給自己以外的人使用，Clerk 免費方案的 Development instance（`pk_test_`）有使用量限制，需要另外在 Clerk 後台申請 Production instance（`pk_live_`）。

## 專案結構重點

**內容資料**
- `src/data/chapters.ts` — 12 個章節、每章 3 個層級（簡單/中等/困難）的題目內容，改題目就改這裡。
- `src/types/content.ts` — 題型定義（textarea / list / table / rating / classRating / contactList）與 Tier／Phase 常數。
- `src/lib/progress.ts` — 章節解鎖邏輯（完成簡單才解鎖中等，以此類推）。

**英雄狀態與六步驟**
- `src/lib/heroStatus.ts` — 依填答資料算出等級、雷達圖軸線、天賦/技能金字塔、聯盟名冊、旅程時間軸等衍生資料。
- `src/lib/sixSteps.ts` — 書中六步驟（選遊戲/認天賦/選角色/練技能/建盟友/達任務）跟章節的對應與完成度。
- `src/lib/nextStep.ts` — 綜合六步驟／全面對齊／任務資料，算出「建議下一步」文字與連結。
- `src/components/hero/*` — 對應上面資料的視覺元件（雷達圖、金字塔、旅程地圖、路標等）。

**任務追蹤器**
- `src/lib/quests.ts` — 三星成就制的型別與門檻/冷卻邏輯。
- `src/app/quests/actions.ts` — 建立任務、回報結果、重新開始、放棄的 Server Actions。

**認證與資料庫**
- `src/app/chapters/[chapterId]/actions.ts` — 存草稿／完成關卡的 Server Actions，透過 Clerk 的 `auth()` 取得使用者 id。
- `src/lib/supabase/admin.ts` — 唯一建立 Supabase client 的地方，用 service role key，只能在伺服器端程式碼（Server Component／Server Action）呼叫。
- `supabase/schema.sql` — 資料庫結構，Supabase 專案建好後手動執行一次。

**首頁與視覺主題**
- `src/app/page.tsx` — 互動式首頁（client component），內含 sticky HUD、視差背景、滾動顯現動畫等邏輯。
- `src/app/globals.css` — Neon Arcade 主題的顏色 token、字體、`.panel`／`.btn-primary`／`.xp-track` 等共用樣式。
- `public/brand/` — 像素心 logo 素材（`src/app/icon.svg` 同一份，作為網站 favicon）。

## 目前狀態

Phase I + II 全 12 章節內容、英雄狀態儀表板、任務追蹤器、互動式首頁皆已完成並部署上線，Clerk／Supabase 皆已在正式站設定完成。若要繼續擴充，可考慮：

- [ ] 手機版 PWA（底部固定分頁列、安全區、觸控尺寸調整）
- [ ] 刻意練習時數記錄、課責提醒等 Phase 3 選配延伸功能
- [ ] 開放給自己以外的使用者前，Clerk 切換到 Production instance
