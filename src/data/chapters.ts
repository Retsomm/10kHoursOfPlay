import type { ChapterContent } from "@/types/content";

const nameReplyColumns = [
  { key: "name", label: "姓名" },
  { key: "reply", label: "他們的回覆" },
];

const nameSharedColumns = [
  { key: "name", label: "姓名（朋友／家人／同事）" },
  { key: "shared", label: "已分享" },
];

// 給地圖、連結文字這類不該暴露書本章節編號的場合用的短名詞——
// 讓沒讀過書的訪客也看得懂這一站在講什麼，不用先知道「第幾章」。
export const CHAPTER_SHORT_LABEL: Record<string, string> = {
  "ch1": "英雄覺醒",
  "ch2": "選擇使命",
  "ch3-1": "天賦",
  "ch3-2": "領導風格",
  "ch4-1": "角色定位",
  "ch4-2": "英雄準則",
  "ch5-1": "技能",
  "ch5-2": "職業技能",
  "ch6": "建立聯盟",
  "ch7": "聯盟實戰",
  "ch8": "任務里程碑",
  "ch9": "全面對齊",
};

export const CHAPTERS: ChapterContent[] = [
  {
    id: "ch1",
    number: "第1章",
    title: "你的英雄旅程展開",
    subtitle: "Your Hero Journey Begins",
    phase: "I",
    tiers: {
      easy: {
        intro:
          "在腦海中生動地想像：如果照著這本書的步驟走，你真正實現了自己最熱愛的夢想，那會是什麼樣子？想像完之後，回答以下問題：",
        fields: [
          { type: "textarea", key: "lifestyle", label: "你的生活型態會是什麼樣子？" },
          { type: "textarea", key: "daily", label: "你每天都會做些什麼事？" },
          { type: "textarea", key: "perception", label: "別人會怎麼看待你？" },
        ],
        takeaway:
          "當我們能清楚描繪出成功的畫面，就更容易保持動力、達成目標。既然當「10K HP」達成目標時，你就是最終贏家，那麼從一開始就抱持著既認真又充滿玩心的態度，才能讓你的探索旅程發揮最大潛力——少了這份態度，就等於白白放棄唾手可得的成功。",
      },
      medium: {
        intro:
          "回顧這六個步驟，找出你目前已經很擅長的部分，以及還比較欠缺的部分。把它們從最強（10分）排到最弱（1分），並想想比較弱的步驟，可能如何拖累你達成終極目標。",
        fields: [
          {
            type: "table",
            key: "steps",
            label: "六個步驟自評",
            columns: [
              { key: "score", label: "分數（1～10）" },
              { key: "note", label: "說明 / 可能如何拖累目標" },
            ],
            rowCount: 6,
            rowLabels: [
              "步驟一：選擇你的遊戲（任務）",
              "步驟二：認識你的屬性（天賦）",
              "步驟三：選擇你的角色（專長）",
              "步驟四：提升你的技能（技藝）",
              "步驟五：建立你的聯盟（人脈）",
              "步驟六：達成你的任務（里程碑）",
            ],
          },
        ],
        takeaway:
          "當你清楚了解自己的優勢與弱點，就能有意識地把心力放在強化較弱的環節上。久而久之，這會讓你在「10K HP」的旅程中，成為一個更均衡、更所向無敵的玩家。",
      },
      hard: {
        intro:
          "寫下你人生中目前遇到的阻礙與摩擦。接著，想想這些困難可能如何讓你在「10K HP」旅程中變成更強大的玩家。想想其他曾經克服類似挑戰的玩家，以及你能從他們的故事中學到什麼。",
        fields: [
          { type: "textarea", key: "obstacles", label: "你人生中目前有哪些阻礙與摩擦？" },
          {
            type: "textarea",
            key: "role_models",
            label: "你能想到有哪些玩家曾經克服過類似的挑戰嗎？他們是怎麼做到的？",
          },
          {
            type: "textarea",
            key: "lessons",
            label: "從那些克服類似挑戰的玩家故事中，你能學到什麼教訓？",
          },
          {
            type: "textarea",
            key: "resilience",
            label: "你的這些掙扎，可能如何幫助你培養出獨特的屬性或韌性？",
          },
        ],
        takeaway:
          "阻礙不是絆腳石——它們是訓練場。把挑戰重新框架成隱藏的機會，能讓你成為一個具有韌性、能隨機應變的玩家，無論遇到什麼狀況都能持續成長茁壯。",
      },
    },
  },
  {
    id: "ch2",
    number: "第2章",
    title: "選擇你的遊戲（任務）",
    subtitle: "Choose Your Game (Mission)",
    phase: "I",
    tiers: {
      easy: {
        intro:
          "回顧你的熱情所在，以及最讓你感到興奮的生活面向。寫下兩件你熱愛做的事，或是你可以想像自己願意投入好幾年人生去做的事。問問自己：這些事情之中，哪一件讓我覺得最有活力？什麼事情會讓我興奮到願意早起或熬夜？",
        fields: [
          {
            type: "list",
            key: "loves",
            label: "有哪兩件事是你熱愛去做，或願意投入好幾年人生的？",
            itemCount: 2,
          },
          { type: "textarea", key: "most_alive", label: "哪一件讓你覺得最有活力？" },
          {
            type: "textarea",
            key: "excited",
            label: "什麼事情會讓你興奮到願意早起或熬夜？",
          },
        ],
        takeaway:
          "了解真正讓你感到興奮的事，能幫你找到選擇人生遊戲的根基——一個由熱情而非義務所驅動的任務。",
      },
      medium: {
        intro: "運用本章介紹的四種方法，來縮小你的人生遊戲範圍。認真回答以下問題，找出關於你終極任務的線索。",
        fields: [
          { type: "textarea", key: "passion", label: "你對什麼事情充滿熱情？" },
          { type: "textarea", key: "inspired", label: "什麼事情讓你感到興奮、受到啟發？" },
          { type: "textarea", key: "no_money", label: "如果完全不用擔心錢，你會做什麼？" },
          { type: "textarea", key: "admire", label: "你最欣賞誰的人生或作品？為什麼？" },
        ],
      },
      hard: {
        intro:
          "宣告你的人生遊戲，並像徽章一樣戴著它。選定遊戲之後，練習清楚、有自信地向他人表達。把你的人生遊戲分享給至少三個人，包含一位新認識的人，或是你想拉進人脈網絡的盟友。",
        fields: [
          {
            type: "table",
            key: "share_list",
            label: "分享對象",
            columns: nameSharedColumns,
            rowCount: 3,
          },
        ],
        takeaway:
          "這個大膽的一步，能幫助你把人生遊戲與自我認同對齊，並吸引其他能夠支持你任務的人。",
      },
    },
  },
  {
    id: "ch3-1",
    number: "第3.1章",
    title: "認識你的屬性（天賦）",
    subtitle: "Know Your Attributes (Talents)",
    phase: "I",
    tiers: {
      easy: {
        intro:
          "屬性和技能不一樣。屬性是你天生擁有、或透過人生經歷慢慢培養出來的能力；技能則比較偏向技術性、經過專業訓練而來的能力。",
        fields: [
          { type: "textarea", key: "easy_things", label: "有哪些事情是你不太費力就能做得很好？" },
          { type: "textarea", key: "compliments", label: "你曾經收到過哪些關於自身優點的稱讚？" },
          {
            type: "list",
            key: "flow_activities",
            label: "有哪些活動會讓你因為太投入而忘記時間？（至少列出五項你自己認同的屬性）",
            itemCount: 5,
          },
        ],
        takeaway: "認清自己天生的屬性，能幫助你以真實的優勢、而不只是後天學來的技能，來打造你的人生遊戲。",
      },
      medium: {
        intro: "找3到5位朋友、家人或同事，請他們幫你找出你的屬性。",
        fields: [
          {
            type: "table",
            key: "hire_me",
            label: "如果你要在你的公司雇用我，你會請我做什麼？",
            columns: nameReplyColumns,
            rowCount: 5,
          },
          {
            type: "table",
            key: "ted_talk",
            label: "你覺得我的TED演講主題會是什麼？",
            columns: nameReplyColumns,
            rowCount: 5,
          },
          {
            type: "table",
            key: "stand_out",
            label: "有哪些特質讓我在人群中顯得與眾不同？",
            columns: nameReplyColumns,
            rowCount: 5,
          },
        ],
        takeaway: "聽聽別人怎麼看你，能揭露一些你自己可能忽略或低估的隱藏優勢。",
      },
      hard: {
        intro:
          "打造屬於你的「10K HP天賦金字塔」，把你的屬性依三個層級整理：王牌（Edge，你最獨特、最強大的單一屬性）、戒指（Ring，2～5項能襯托王牌的強項屬性）、基座（Base，5～15項你表現在平均水準以上的屬性）。把這想像成一座金字塔：王牌在頂端，戒指在中間，基座則是最底層的地基。",
        fields: [
          { type: "textarea", key: "your_name", label: "你的名字" },
          { type: "textarea", key: "edge", label: "王牌（Edge）：你最獨特、最強大的屬性是什麼？" },
          {
            type: "list",
            key: "ring",
            label: "戒指（Ring）：列出2～5項能襯托王牌的強項屬性",
            itemCount: 5,
          },
          {
            type: "list",
            key: "base",
            label: "基座（Base）：列出5～15項你表現在平均水準以上的屬性",
            itemCount: 10,
          },
        ],
        takeaway: "這項練習能幫助你了解自己的優勢，以及如何把這些優勢與你的人生遊戲對齊。",
      },
    },
  },
  {
    id: "ch3-2",
    number: "第3.2章",
    title: "你的領導屬性",
    subtitle: "Your Leadership Attributes",
    phase: "I",
    tiers: {
      easy: {
        intro: "回顧你的領導人格。寫下你的想法，並想想你的優勢過去是如何幫助你為團隊做出貢獻的。",
        fields: [
          { type: "textarea", key: "natural_strengths", label: "你天生擅長哪些領導屬性？" },
          { type: "textarea", key: "weaknesses", label: "哪些領導屬性對你來說比較像是弱點？" },
          { type: "textarea", key: "focus_ring", label: "你最想強化哪一個圈層？" },
        ],
      },
      medium: {
        intro: "把「七種領導人格」框架分享給三位信任的朋友或家人，問問他們：",
        fields: [
          {
            type: "table",
            key: "share_list",
            label: "分享對象",
            columns: nameSharedColumns,
            rowCount: 3,
          },
          { type: "textarea", key: "op_attributes", label: "我最強的OP領導屬性是哪些？" },
          {
            type: "table",
            key: "leadership_type",
            label: "他們認為你是哪一種領導人格？為什麼？",
            columns: nameReplyColumns,
            rowCount: 3,
          },
          {
            type: "table",
            key: "improve_how",
            label: "他們認為你應該改善哪些屬性？該怎麼做？",
            columns: nameReplyColumns,
            rowCount: 3,
          },
        ],
        takeaway: "這種來自外部的觀點，能幫助你更了解自己的優勢與弱點。",
      },
      hard: {
        intro:
          "擬定一份行動計畫，強化你最弱的領導人格，讓自己在領導力上持續成長。找出一到兩項你想改善的屬性，並訂出清楚、可執行的強化步驟。",
        fields: [
          { type: "textarea", key: "want_to_strengthen", label: "你想強化哪些領導屬性或領導人格？" },
          { type: "textarea", key: "action_steps", label: "你會採取哪些明確、可執行的步驟來強化這些方面？" },
          {
            type: "textarea",
            key: "ally_strategy",
            label: "你會採取什麼策略，讓自己身邊圍繞著能幫助你成長的盟友？",
          },
          { type: "textarea", key: "timeline", label: "你為這份行動計畫設定了什麼時程？" },
          { type: "textarea", key: "accountability_partner", label: "誰是你的課責夥伴？他們會如何支持你？" },
        ],
        takeaway: "擬定策略，讓自己站對位置、身邊圍繞著能幫助你成長的盟友。",
      },
    },
  },
  {
    id: "ch4-1",
    number: "第4.1章",
    title: "選擇你的角色（專長）",
    subtitle: "Select Your Role (Specialty)",
    phase: "I",
    tiers: {
      easy: {
        intro:
          "把你的「角色領域」拆解成四個層次：抱負、身份、職業與專精，來定義它。針對每個層次各寫三句話，描繪出你目前與未來的角色樣貌。",
        fields: [
          { type: "list", key: "aspiration", label: "你的抱負是什麼？（寫三句話）", itemCount: 3 },
          { type: "list", key: "identity", label: "你的身份是什麼？（寫三句話）", itemCount: 3 },
          { type: "list", key: "career", label: "你的職業是什麼？（寫三句話）", itemCount: 3 },
          { type: "list", key: "specialty", label: "你的專精是什麼？（寫三句話）", itemCount: 3 },
        ],
        takeaway: "這項練習能幫助你釐清前方的道路。",
      },
      medium: {
        intro: "回顧你目前的角色，思考它們與你的屬性、抱負之間的契合程度。問問自己：",
        fields: [
          {
            type: "textarea",
            key: "current_fit",
            label: "你目前的角色，是發揮了你天生的優勢，還是壓抑了它們？",
          },
          {
            type: "textarea",
            key: "better_role",
            label:
              "如果這些角色沒有讓你的屬性與技能發揮到最大，那你應該扮演什麼角色，才能更接近人生遊戲的終點線？",
          },
        ],
        takeaway: "反思你的角色與屬性之間是否契合，能確保你把心力花在真正攸關成功的任務上。",
      },
      hard: {
        intro:
          "把「角色領域」框架分享給3位信任的家人或朋友，進行一場深入、有意義的對話。向他們解釋這個概念，並分享你的角色領域，詢問他們的看法：",
        fields: [
          {
            type: "table",
            key: "current_role_view",
            label: "他們怎麼看待你目前所扮演的角色？",
            columns: nameReplyColumns,
            rowCount: 3,
          },
          {
            type: "table",
            key: "natural_roles",
            label: "他們認為哪些角色天生適合你？",
            columns: nameReplyColumns,
            rowCount: 3,
          },
          {
            type: "table",
            key: "their_aspiration",
            label: "現在，把話題轉過來，問問他們的角色領域……他們渴望成為什麼樣的人？他們目前又扮演哪些角色？",
            columns: nameReplyColumns,
            rowCount: 3,
          },
        ],
        takeaway: "運用這些回饋來調整你的角色領域，並找出能幫助你轉換到未來角色的盟友。",
      },
    },
  },
  {
    id: "ch4-2",
    number: "第4.2章",
    title: "你的英雄名字與英雄準則",
    subtitle: "Your Hero Name & Hero Code",
    phase: "I",
    tiers: {
      easy: {
        intro:
          "腦力激盪並決定你的「英雄名字」——一個能體現你的價值觀、抱負與優勢的名字。問問自己：",
        fields: [
          { type: "textarea", key: "archetypes", label: "有哪些特質或原型（archetype）能啟發你？" },
          {
            type: "list",
            key: "role_models",
            label: "有哪些你欣賞的榜樣、虛構英雄或歷史人物？",
            itemCount: 3,
          },
          { type: "textarea", key: "hero_name", label: "你的英雄名字是什麼？" },
          { type: "textarea", key: "why_name", label: "為什麼這個英雄名字能呼應你的旅程？" },
        ],
      },
      medium: {
        intro: "打造你「英雄準則」的基礎，找出你的指導原則。寫下：",
        fields: [
          {
            type: "list",
            key: "core_values",
            label: "寫下三到五個核心價值觀（你的道德羅盤）",
            itemCount: 5,
          },
          { type: "textarea", key: "mission", label: "寫下你的使命（你的終極目的）" },
          { type: "textarea", key: "ultimate_purpose", label: "你這場遊戲的終極目的是什麼？" },
          { type: "textarea", key: "impact", label: "你想透過什麼方式產生影響力？" },
          { type: "textarea", key: "line_never_cross", label: "無論如何你絕不會跨越的底線是什麼？" },
        ],
        takeaway: "這項練習能幫助你釐清引導你在追求人生遊戲時所依循的原則。",
      },
      hard: {
        intro: "發展一套完整的「英雄準則」，以及每天實踐它的具體策略：",
        fields: [
          {
            type: "table",
            key: "core_values_detail",
            label: "核心價值",
            columns: [{ key: "note", label: "對你的意義／具體做法" }],
            rowCount: 5,
            rowLabels: [
              "誠信（Integrity）",
              "勇氣（Courage）",
              "同理心（Compassion）",
              "創新（Innovation）",
              "堅持（Perseverance）",
            ],
          },
          { type: "textarea", key: "mission", label: "使命（Mission）" },
          {
            type: "list",
            key: "non_negotiables",
            label: "不可妥協的底線（Non-Negotiables）",
            itemCount: 5,
          },
          {
            type: "list",
            key: "daily_practices",
            label: "每日實踐（Daily Practices）",
            itemCount: 5,
          },
          {
            type: "list",
            key: "accountability_measures",
            label: "課責措施（Accountability Measures）",
            itemCount: 5,
          },
          {
            type: "table",
            key: "share_list",
            label: "你會把你的英雄準則分享給哪些可信任的盟友，來做課責監督？",
            columns: nameSharedColumns,
            rowCount: 3,
          },
          {
            type: "table",
            key: "feedback",
            label: "當你把英雄名字與英雄準則分享給朋友或導師時，得到了什麼回饋？",
            columns: nameReplyColumns,
            rowCount: 3,
          },
        ],
      },
    },
  },
  {
    id: "ch5-1",
    number: "第5.1章",
    title: "提升你的技能（技藝）",
    subtitle: "Enhance Your Skills (Craft)",
    phase: "II",
    tiers: {
      easy: {
        intro:
          "找出並描繪你目前的「技能金字塔」——也就是你現有的技能。寫下你認為自己最強的五項技能（這些會構成你的「戒指技能」）。",
        fields: [
          { type: "list", key: "ring_skills", label: "戒指技能（前5名）", itemCount: 5 },
          {
            type: "list",
            key: "base_skills",
            label: "基座技能（其他表現在平均水準以上、但重要性稍低的技能）",
            itemCount: 7,
          },
        ],
        takeaway: "這能讓你清楚了解自己現有的優勢，以及它們目前如何塑造你的人生遊戲。",
      },
      medium: {
        intro:
          "打造你的「目標技能金字塔」，想一位已經在你渴望的角色上取得成功的「頂尖大師」，找出你為了人生遊戲需要精通的技能。",
        fields: [
          { type: "textarea", key: "your_name", label: "你的名字：" },
          { type: "textarea", key: "top_target_skill", label: "頂尖目標技能（Top Target Skill）" },
          { type: "list", key: "ring_skills", label: "戒指技能（主要技能）", itemCount: 4 },
          { type: "list", key: "base_skills", label: "基座技能（支援技能）", itemCount: 8 },
        ],
        takeaway:
          "比較你目前的技能金字塔與目標技能金字塔，能清楚看出你還需要加強或學習哪些技能。",
      },
      hard: {
        intro:
          "擬定一份行動計畫，提升你的技能，縮小目前技能金字塔與目標技能金字塔之間的差距。選出一項關鍵技能，作為未來三到六個月的優先目標。",
        fields: [
          { type: "textarea", key: "priority_skill", label: "選出一項未來3～6個月要優先發展的關鍵技能。" },
          {
            type: "textarea",
            key: "growth_strategy",
            label: "設計成長這項技能的策略：找一門課程、一位導師，或一個能挑戰你的專案。",
          },
          { type: "textarea", key: "deliberate_practice", label: "規劃每天或每週的刻意練習。" },
          {
            type: "textarea",
            key: "reflection",
            label: "反思這項技能如何補強你的其他優勢，並與你的核心屬性相互呼應。",
          },
        ],
      },
    },
  },
  {
    id: "ch5-2",
    number: "第5.2章",
    title: "現實人生的遊戲技能",
    subtitle: "Real-World Game Skills",
    phase: "II",
    tiers: {
      easy: {
        intro: "檢視「現實人生遊戲技能」表，找出你已經擁有的技能並寫下來。",
        fields: [
          { type: "textarea", key: "owned_skills", label: "列出你已經擁有的現實人生遊戲技能。" },
          {
            type: "classRating",
            key: "class",
            label: "根據你最強的技能，為每種「職業」評分（1～5星），找出屬於你的主要與次要職業。",
            classes: [
              { key: "warrior", label: "戰士（對抗與說服）" },
              { key: "ranger", label: "遊俠（觀察與創新）" },
              { key: "mage", label: "法師（分析與計算）" },
              { key: "rogue", label: "盜賊（實驗與優化）" },
              { key: "druid", label: "德魯伊（關懷與同理）" },
              { key: "paladin", label: "聖騎士（激勵與吸引）" },
              { key: "warlock", label: "術士（競爭與擊敗）" },
            ],
          },
          {
            type: "list",
            key: "examples",
            label: "舉例說明你曾如何運用這些技能，克服阻礙或完成一項任務。",
            itemCount: 5,
          },
        ],
      },
      medium: {
        intro: "找出一項你需要升級的現實人生遊戲技能，研究或找出一位在你渴望角色上表現傑出的「頂尖大師」。",
        fields: [
          { type: "textarea", key: "skill_to_upgrade", label: "有哪一項現實人生遊戲技能是你需要升級的？" },
          { type: "textarea", key: "top_master", label: "你研究了哪位在你渴望角色上表現傑出的頂尖大師？" },
          { type: "textarea", key: "master_skills", label: "這位頂尖大師精通哪些現實人生遊戲技能？" },
          { type: "textarea", key: "most_important", label: "這些技能中，哪些對你的成長最重要？" },
        ],
      },
      hard: {
        intro:
          "展開一場「技能任務」，在接下來四週內積極練習並精進一項關鍵的現實人生遊戲技能，並承諾進行可量化的練習計畫。",
        fields: [
          { type: "textarea", key: "skill_quest", label: "在接下來四週，你要精通哪一項現實人生遊戲技能？" },
          { type: "textarea", key: "quantifiable_plan", label: "你會承諾採用什麼可量化的練習計畫？" },
          { type: "textarea", key: "share_with", label: "你會把成果分享給誰，以取得回饋與課責？" },
          { type: "textarea", key: "tracking", label: "你要如何在這四週追蹤自己的進度？" },
          { type: "textarea", key: "learned", label: "在你的技能任務結束時，你對自己的成長學到了什麼？" },
        ],
      },
    },
  },
  {
    id: "ch6",
    number: "第6章",
    title: "建立你的聯盟（人脈）",
    subtitle: "Build Your Alliance (Network)",
    phase: "II",
    tiers: {
      easy: {
        intro:
          "找出你目前在人生遊戲中，已經加入的陣營、公會、隊伍與夥伴，寫下每個聯盟目前為止對你的遊戲做出了什麼貢獻。",
        fields: [
          {
            type: "contactList",
            key: "current_alliances",
            label: "你目前是哪些陣營、公會、隊伍或夥伴關係的一員？各自對你的人生遊戲做出了什麼貢獻？",
            itemCount: 5,
            relationshipOptions: [
              { key: "faction", label: "陣營（Faction）" },
              { key: "guild", label: "公會（Guild）" },
              { key: "party", label: "隊伍（Party）" },
              { key: "partnership", label: "夥伴關係（Partnership）" },
            ],
          },
        ],
      },
      medium: {
        intro:
          "採取行動，加入一個符合你目前遊戲方向的新陣營、公會或團隊。記住，展現主動積極，也是成為有價值盟友的關鍵。",
        fields: [
          { type: "textarea", key: "new_alliance", label: "你決定加入哪個新的陣營、公會或團隊？" },
          { type: "textarea", key: "why_chosen", label: "你為什麼選擇這個團體？它如何與你的人生遊戲契合？" },
          { type: "textarea", key: "first_experience", label: "你在第一次聚會或互動中的體驗如何？" },
          { type: "textarea", key: "proactive", label: "你如何積極參與，或展現出主動積極的態度？" },
        ],
      },
      hard: {
        intro:
          "跨出舒適圈，主動聯繫陌生人，建立新的聯盟。找出能激勵你、或可能對你的成長有幫助的人——潛在的導師、領導者或榜樣，這週寄出三則真誠、個人化的訊息，不論對方是否回覆。",
        fields: [
          {
            type: "table",
            key: "contacts",
            label: "你決定聯繫哪三位人物（導師、領導者、榜樣）？",
            columns: [
              { key: "name", label: "姓名" },
              { key: "meaning", label: "他們對你的意義" },
            ],
            rowCount: 3,
          },
          {
            type: "table",
            key: "admired_traits",
            label: "你欣賞他們的哪一點？（請具體說明）",
            columns: [{ key: "reason", label: "欣賞的地方" }],
            rowCount: 3,
            rowLabels: ["第一位", "第二位", "第三位"],
          },
          {
            type: "table",
            key: "messages_sent",
            label: "你傳給他們的個人化訊息內容是什麼？",
            columns: [{ key: "message", label: "訊息內容" }],
            rowCount: 3,
            rowLabels: ["第一位", "第二位", "第三位"],
          },
          {
            type: "table",
            key: "outreach_results",
            label: "你有收到回覆嗎？對方的回覆或結果是什麼？主動出擊的感覺如何？",
            columns: [{ key: "result", label: "結果與感受" }],
            rowCount: 3,
            rowLabels: ["第一位", "第二位", "第三位"],
          },
        ],
      },
    },
  },
  {
    id: "ch7",
    number: "第7章",
    title: "建立聯盟的實戰手冊",
    subtitle: "The Alliance Playbook",
    phase: "II",
    tiers: {
      easy: {
        intro:
          "在你的聯絡人中，找一位你已經一段時間沒聯絡的人。主動聯繫他們，分享你正在進行「10K HP」的旅程，讓他們知道，他們一直是你人生中重要的盟友，並詢問你能如何支持他們。",
        fields: [
          { type: "textarea", key: "person", label: "你選擇重新聯繫的人是誰？" },
          { type: "textarea", key: "message", label: "你傳給他們的訊息內容是什麼？" },
          { type: "textarea", key: "response", label: "他們怎麼回應？重新建立聯繫讓你有什麼感受？" },
        ],
        takeaway: "這是一種簡單卻強大的方式，能重新點燃有價值的人際連結。",
      },
      medium: {
        intro:
          "找出線上可能對你的遊戲很關鍵的高階玩家。運用「刺拳、直拳、上鉤拳」技巧，在接下來四週內主動聯繫並至少跟進三次。",
        fields: [
          { type: "list", key: "advanced_players", label: "你找出哪些高階玩家想要連結？（列出幾個名字）", itemCount: 3 },
          { type: "textarea", key: "jab", label: "你如何運用「刺拳」技巧？" },
          { type: "textarea", key: "cross", label: "你如何運用「直拳」技巧？" },
          { type: "textarea", key: "hook", label: "你如何運用「上鉤拳」技巧？" },
          { type: "textarea", key: "response", label: "在持續跟進後，你收到了什麼樣的回應（如果有的話）？" },
          { type: "textarea", key: "progress", label: "持續跟進之後，你們的關係有什麼進展？" },
        ],
        takeaway:
          "這項練習讓你持續聯繫第6章「困難模式」中所提到的相同對象，這次確保你的努力持之以恆且前後一致。",
      },
      hard: {
        intro:
          "走進現實世界，報名參加一場能認識新朋友的當地活動。透過以下步驟征服「無害之龍」：1.有精神地眼神交流並打招呼 2.進行簡短、有意義的對話 3.表示樂意保持聯絡並收集聯絡方式 4.對盡可能多的人重複步驟1–3 5.活動後24小時內跟進聯繫 6.兩個月後再次主動聯繫，維繫關係。",
        fields: [
          { type: "textarea", key: "event", label: "你參加了什麼樣的當地活動？" },
          { type: "list", key: "people_met", label: "你認識了誰？（列出一些名字或描述）", itemCount: 2 },
          {
            type: "textarea",
            key: "count",
            label: "你打招呼、進行有意義對話並收集聯絡方式的人數有多少？（填入數字）",
          },
          { type: "textarea", key: "followup_24h", label: "你24小時內的跟進訊息進行得如何？你說了什麼？" },
          { type: "textarea", key: "followup_2mo", label: "兩個月後，你採取了什麼行動來維繫這些新關係？" },
          { type: "textarea", key: "lesson", label: "透過這次經驗，你對征服「無害之龍」學到了什麼？" },
        ],
      },
    },
  },
  {
    id: "ch8",
    number: "第8章",
    title: "達成你的任務（里程碑）",
    subtitle: "Achieve Your Quests (Milestones)",
    phase: "II",
    tiers: {
      easy: {
        intro:
          "回顧你人生中那些對塑造今天的你，產生重大影響的「主要任務」，寫下三到五個讓你印象深刻的重要里程碑或成就。",
        fields: [
          { type: "list", key: "milestones", label: "列出三到五個塑造了你的主要任務（里程碑或成就）。", itemCount: 5 },
          { type: "textarea", key: "why_important", label: "為什麼這些里程碑對你的成長很重要？" },
          { type: "textarea", key: "lessons", label: "你從這些任務中獲得了哪些教訓或技能？" },
        ],
      },
      medium: {
        intro:
          "找出一個你想在下個月完成的目標，並把它轉化為一個SMART的「次要任務」：具體（Specific）、可衡量（Measurable）、可達成（Achievable）、相關（Relevant）、有時限（Time-bound）。",
        fields: [
          { type: "textarea", key: "goal", label: "你想在下個月達成的目標是什麼？（次要任務）" },
          { type: "textarea", key: "specific", label: "把你的目標變得具體（Specific）：" },
          { type: "textarea", key: "measurable", label: "把你的目標變得可衡量（Measurable）：" },
          { type: "textarea", key: "achievable", label: "把你的目標變得可達成（Achievable）：" },
          { type: "textarea", key: "relevant", label: "把你的目標變得相關（Relevant）：" },
          { type: "textarea", key: "time_bound", label: "把你的目標變得有時限（Time-bound）：" },
          {
            type: "textarea",
            key: "reward",
            label: "你會為達成進度里程碑設定什麼星星獎勵？（小小的獎勵，慶祝小小的勝利！）",
          },
          {
            type: "textarea",
            key: "accountability_allies",
            label: "你會找哪兩位信任的盟友，分享你的次要任務以取得課責監督？",
          },
        ],
      },
      hard: {
        intro:
          "放大格局，規劃你的「五年目標」，並拆解成主要任務與次要任務。探索所需的各類任務：學習任務（獲得新技能）、聯盟任務（建立人脈）、職涯任務（提升個人形象）、健康任務（維持最佳狀態）。",
        fields: [
          { type: "list", key: "five_year_goals", label: "你的五年目標是什麼？（放膽去夢想！）", itemCount: 3 },
          {
            type: "list",
            key: "task_breakdown",
            label: "把每個目標拆解成更小的主要任務與次要任務。（清楚列出）",
            itemCount: 6,
          },
          {
            type: "list",
            key: "task_categories",
            label: "你需要完成哪些學習、聯盟、職涯與健康任務？",
            itemCount: 4,
          },
          {
            type: "list",
            key: "timeline",
            label: "為你的主要任務與次要任務指定時程。（請具體說明）",
            itemCount: 5,
          },
          {
            type: "textarea",
            key: "visual_roadmap",
            label: "描述你的視覺化路線圖。（你要如何以視覺方式追蹤你的任務？）",
          },
        ],
      },
    },
  },
  {
    id: "ch9",
    number: "第9章",
    title: "達成10K HP的全面對齊",
    subtitle: "Achieving Total 10K HP Alignment",
    phase: "II",
    tiers: {
      easy: {
        intro: "回顧你目前在「10K HP」旅程六個步驟中的進度，先為每個步驟打分（1～5星），再寫下具體反思：",
        fields: [
          { type: "rating", key: "right_game_rating", label: "你正在玩對的遊戲嗎？（自評分數）" },
          { type: "textarea", key: "right_game", label: "你正在玩對的遊戲嗎？" },
          { type: "rating", key: "attributes_rating", label: "你有效理解並運用你的屬性嗎？（自評分數）" },
          { type: "textarea", key: "attributes", label: "你有效理解並運用你的屬性嗎？" },
          { type: "rating", key: "role_rating", label: "你確定了自己的角色了嗎？（自評分數）" },
          { type: "textarea", key: "role", label: "你確定了自己的角色了嗎？" },
          { type: "rating", key: "skills_rating", label: "你正在建立並磨練你需要的技能嗎？（自評分數）" },
          { type: "textarea", key: "skills", label: "你正在建立並磨練你需要的技能嗎？" },
          { type: "rating", key: "allies_rating", label: "你身邊圍繞著對的盟友嗎？（自評分數）" },
          { type: "textarea", key: "allies", label: "你身邊圍繞著對的盟友嗎？" },
          { type: "rating", key: "quests_rating", label: "你正在追求有意義且符合SMART原則的任務嗎？（自評分數）" },
          { type: "textarea", key: "quests", label: "你正在追求有意義且符合SMART原則的任務嗎？" },
        ],
      },
      medium: {
        intro:
          "擬定一份行動計畫，讓你的人生遊戲完全對齊，朝「OP模式」邁進：選出你目前最失衡的兩個領域，定義具體、可執行的步驟。",
        fields: [
          { type: "list", key: "imbalanced_areas", label: "你覺得自己最失衡的兩個領域是什麼？", itemCount: 2 },
          {
            type: "list",
            key: "action_steps",
            label: "你會採取什麼具體、可執行的步驟，來修正每個領域？",
            itemCount: 2,
          },
          {
            type: "list",
            key: "milestones_timeline",
            label: "針對這些行動，你設定了什麼里程碑與時程？",
            itemCount: 2,
          },
          {
            type: "list",
            key: "how_it_helps",
            label: "讓這些領域重新對齊，將如何幫助你更接近「OP模式」？",
            itemCount: 2,
          },
        ],
      },
      hard: {
        intro:
          "與他人合作，強化你的對齊程度，放大你的成果：找一位信任的盟友，一起面對挑戰，分享行動計畫並互相督促課責。",
        fields: [
          { type: "textarea", key: "accountability_ally", label: "誰是你要合作、互相課責的信任盟友？" },
          { type: "textarea", key: "joint_steps", label: "你們會一起採取哪些步驟來強化對齊？" },
          { type: "textarea", key: "community", label: "你會加入哪個公會、社群或支持團體，來強化你的旅程？" },
          { type: "textarea", key: "acceleration", label: "與他人合作，會如何加速你朝「OP模式」邁進的進度？" },
          { type: "textarea", key: "coach", label: "你會考慮找一位10K HP教練嗎？為什麼會或為什麼不會？" },
        ],
      },
    },
  },
];

export const getChapter = (id: string): ChapterContent | undefined => {
  return CHAPTERS.find((c) => c.id === id);
};
