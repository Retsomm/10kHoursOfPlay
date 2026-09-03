import type { ChapterContent } from "@/types/content";

const nameReplyColumns = [
  { key: "name", label: "姓名" },
  { key: "reply", label: "他們的回覆" },
];

const nameSharedColumns = [
  { key: "name", label: "姓名（朋友／家人／同事）" },
  { key: "shared", label: "已分享" },
];

export const CHAPTERS: ChapterContent[] = [
  {
    id: "ch1",
    number: "第1章",
    title: "你的英雄旅程展開",
    subtitle: "Your Hero Journey Begins",
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
            rowLabel: (i) =>
              [
                "步驟一：選擇你的遊戲（任務）",
                "步驟二：認識你的屬性（天賦）",
                "步驟三：選擇你的角色（專長）",
                "步驟四：提升你的技能（技藝）",
                "步驟五：建立你的聯盟（人脈）",
                "步驟六：達成你的任務（里程碑）",
              ][i],
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
            rowLabel: (i) =>
              ["誠信（Integrity）", "勇氣（Courage）", "同理心（Compassion）", "創新（Innovation）", "堅持（Perseverance）"][
                i
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
];

export const getChapter = (id: string): ChapterContent | undefined => {
  return CHAPTERS.find((c) => c.id === id);
};
