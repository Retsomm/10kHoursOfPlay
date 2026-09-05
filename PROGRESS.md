# 進度紀錄

## 目標

把《10,000小時的遊戲》工作手冊做成一個網站版的「英雄角色卡」：使用者透過簡單→中等→困難
循序解鎖的問答，逐步認識自己（Phase I）、持續成長（Phase II），資料跨裝置同步，長期用來
記錄自我成長歷程。詳細規格見 [README.md](./README.md)。

**完成的定義（v1）：**
1. 手冊全 9 章（Phase I + Phase II）內容都能在網站上填答、存檔、跨裝置同步 ← **內容已 100% 轉錄完成，見下方章節內容比對**
2. Google 登入（Clerk）+ 資料庫（Supabase）在正式環境（Vercel）跑起來，非本機 demo
3. 使用者本人實際用過一輪，確認填答體驗、視覺設計沒有阻礙使用意願

**目前卡在哪裡（2026-09-04）：**
- 已部署到 Vercel 正式環境：https://10k-hours-of-play.vercel.app/
- Clerk Google 登入在正式站已確認正常（先前踩過「本機與 Vercel 接到兩個不同 Clerk 專案」的坑，
  已修復並驗證，見 `~/my-agent/000_Agent/knowledge/learn/10kHoursOfPlay/`）
- `main`／`dev` 目前完全同步（PR #3 已合併，使用者手動確認過）
- 在原本 12 章節的填答功能之上，新增了「英雄狀態」視覺化 Dashboard（天賦/技能金字塔、
  六步驟對齊雷達圖、技能網雷達圖、聯盟名冊、人生旅程時間軸）與 Phase 3 任務追蹤器
  （`/quests`，書中三星成就制，0 星觸發兩週冷卻），細節見下方 2026-09-04 條目
- 這個 session 全程沒有瀏覽器可用（Claude in Chrome 擴充功能未連線），所有視覺／UX 判斷都是
  使用者自己測、回報問題後我再修，不是我自己看過確認的
- Ch3-1／Ch5-1／Ch5-2／Ch6／Ch8／Ch9 目前存的是**測試用假資料**（為了驗證新圖表元件而塞的
  「測試英雄」那組），還沒被使用者的真實內容覆蓋

**下一步（依序）：**
1. 使用者完整跑一輪使用者體驗測試（原本說等主功能做完再一次測，現在 Phase 1～3 都上線了）
2. 把 Ch3-1／Ch5-1／Ch5-2／Ch6／Ch8／Ch9 的測試假資料換成使用者自己的真實內容
3. 視使用狀況決定要不要做 Phase 3 的選配延伸（刻意練習時數記錄、課責提醒 UI）
4. 正式站目前用 Clerk Development instance（`pk_test_`，有使用量限制），若之後要開放
   給自己以外的人用，需要另外申請 Production instance（`pk_live_`）

**待辦：提升網站整體連貫性**（使用者回饋現在各分頁看不出彼此關聯，2026-09-04 討論定案，
依優先順序開發，做完一項再繼續下一項）：
1. ✅ **六步驟主幹**：把書中六步驟（選遊戲/認天賦/選角色/練技能/建盟友/達任務）做成貫穿
   全站的進度路標，放在總覽最上方，強化現有的 Phase I/II 分組，每一步顯示完成度、
   點下去跳到對應章節（`src/lib/sixSteps.ts` + `SixStepRoadmap`）
2. ✅ **下一步建議**：跨章節/六步驟/全面對齊/任務四種資料，運算出一句「建議下一步」文字＋
   一個按鈕，放在總覽最上方（`src/lib/nextStep.ts` + `NextStepBanner`）
3. ✅ **成長路線地圖向前看**：地圖尾端加「下一站」標記（重用 `computeNextStep` 算出的
   目標章節），不只回顧已完成的，虛線圓圈樣式跟已完成的實心圓區分
4. ✅ **加強分頁間的交叉連結**：雷達圖平均分數 < 3 時（不只完全空白）顯示「回去補強」連結；
   旅程頁的「過去與未來」區塊新增連到任務追蹤器的橋接文字

**提升網站連貫性四項全部完成（2026-09-04）**，等使用者實際體驗測試回饋。

## 2026-09-04 — 英雄狀態儀表板（Phase 1+2）、任務追蹤器（Phase 3）、Vercel 正式站 Clerk 登入修復

**Phase 1+2：英雄狀態視覺化 + 欄位引擎擴充**
- 新增三種欄位型別：`rating`（單一評分）、`classRating`（多職業評分）、`contactList`
  （聯絡人卡片），對應書中 Ch5-2 職業評分、Ch9 六步驟自評、Ch6 聯盟名冊三題
- Dashboard 新增「英雄狀態」區塊：等級徽章（NPC/10K HP Player/OP Player/OP Hero）、
  天賦金字塔、技能金字塔、六步驟對齊雷達圖、技能網雷達圖（7 個 Gameful Skill Class）、
  聯盟名冊、人生旅程時間軸（含連接線，隨寬度在水平/垂直排列間切換）
- 圖表全部手刻 inline SVG，沒有新增 npm 依賴

**Phase 3：任務追蹤器**
- 新增 `quests` 資料表與 `/quests` 頁面，實作書中三星成就制：使用者自訂 1～3 星門檻，
  回報結果後 0 星觸發兩週冷卻期（呼應書中「先強制休息、重新評估」的規則）
- 可從 Ch8 次要任務一鍵帶入標題／獎勵，Dashboard 新增任務數量摘要卡片

**RWD／程式碼健檢**
- 修掉一個 flex 版面的坑：`body`（或任何祖先容器）是 `display:flex` 時，子元素預設
  `min-width:auto` 會沿著整條 flex 鏈往上傳遞，讓 `auto-fit`／`minmax` 版面的欄數計算
  失真——拿掉 `body` 不必要的 `flex flex-col`，並在整條 flex 鏈補齊 `min-w-0`
- 兩輪 code review 修正：鍵盤 Space 誤觸捲頁、聯盟名冊無聲丟棄不合法資料、任務追蹤器
  的錯誤處理只該吞「表不存在」這個特定錯誤、`reportQuestOutcome`/`restartQuest` 補上
  伺服器端狀態防護（避免競態把任務推進不合法的狀態）

**正式站 Clerk Google 登入修復**（詳細排查過程見
`~/my-agent/000_Agent/knowledge/learn/10kHoursOfPlay/feedback-clerk-google-oauth-shared-credentials-localstorage-cache.md`）
- 根因：Vercel 環境變數的 Clerk 金鑰跟本機 `.env.local` 接到兩個不同的 Clerk 專案，
  换成同一組金鑰後，使用者已在正式站驗證 Google 登入正常顯示

**其他**：`main`／`dev` 已由使用者手動合併同步（PR #3）。

## 2026-09-03 — Phase II 內容上線（第5～9章），Dashboard/首頁改分區顯示

- 新增手冊 Phase II 全 6 章節（5.1 提升技能、5.2 現實遊戲技能、6 建立聯盟、7 聯盟實戰手冊、
  8 達成任務／里程碑、9 全面對齊），逐字轉錄自 PDF，沿用既有的 textarea/list/table 題型引擎，
  沒有新增任何機制——章節內容全部加在 `src/data/chapters.ts`
- `ChapterContent` 新增 `phase: "I" | "II"` 欄位，首頁與 Dashboard 都改成依 Phase 分兩區塊顯示
  （`PHASE I · KNOW YOURSELF` / `PHASE II · GROW YOURSELF`），見 `src/types/content.ts` 的
  `PHASE_LABEL`
- Dashboard 的章節卡（ChapterCard）拿掉「第X章」編號標籤，只留標題與副標
- 本機驗證：`tsc`／`yarn lint`／`yarn build` 全過，dev server curl 確認首頁正確顯示全部 12
  章節、兩個 Phase 標題都有出現
- **尚未驗證**：Phase II 六章節的實際填答／存檔／解鎖流程完全沒在瀏覽器測過（跟 Phase I
  用同一套元件，理論上行為一致，但沒有實測過就不能算數）
- **內容完整性覆核（同日追加）**：使用者問起還有沒有題目沒轉錄，逐章逐難度（12章 × 3難度＝
  36組）重新對照原始 PDF，確認全部題目都已轉錄，沒有遺漏。兩處刻意的結構調整（非遺漏）：
  第1章中等難度把手冊上單一空格拆成「分數／說明」兩欄；第6章困難難度把三個重複的人物提問
  區塊合併成帶列標籤的表格，資料量不變只是排版更緊湊。

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
