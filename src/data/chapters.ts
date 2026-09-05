import type { ChapterContent } from "@/types/content";

const nameReplyColumns = [
  { key: "name", label: "姓名", placeholder: "例如：小美" },
  { key: "reply", label: "他們的回覆", placeholder: "例如：她說我很會鼓勵人，總是能看到別人的優點" },
];

const nameSharedColumns = [
  { key: "name", label: "姓名（朋友／家人／同事）", placeholder: "例如：小明" },
  { key: "shared", label: "已分享", placeholder: "例如：已經約時間聊過，對方給了不錯的回饋" },
];

// 天賦金字塔（戒指／基座）的預設屬性選項——不確定要填什麼時可以參考，
// 使用者仍然可以自由輸入清單以外的文字。分成三大類：認知分析思考、
// 人際情感溝通、意志韌性執行力，這裡只保留簡短的屬性名稱當建議選項，
// 完整說明留在使用者自己的參考資料裡，不需要塞進表單。
const TALENT_ATTRIBUTE_SUGGESTIONS = [
  // 一、認知、分析與思考類屬性
  "聯想思維（Associative Thinking）",
  "學以致用轉換率（Learn-Use Conversion）",
  "事件圖樣識別（Pattern Recognition - Events）",
  "視覺模型創建（Visual Models Creation）",
  "深層直覺（Profound Intuition）",
  "求知好奇心（Intellectual Curiosity）",
  "學習敏捷度（Learning Agility）",
  "體驗敏感度（Experience Sensitivity）",
  "創新思維（Innovative Thinking）",
  // 二、人際、情感與溝通類屬性
  "同理心智能（Empathetic Intelligence）",
  "人際說服力（Interpersonal Speaking）",
  "賦能他人（Empowerment）",
  "真實性（Authenticity）",
  "無私撫育（Selfless Nurturing）",
  "迷人魅力（Charming Persona）",
  "古怪幽默（Corky Humor）",
  "願景（Vision）",
  // 三、意志、韌性與執行力屬性
  "熱情毅力（Passionate Perseverance）",
  "情感堅韌（Emotional Resilience）",
  "堅持完美主義（Persistent Perfectionism）",
  "冒險精神（Adventurous Risk-taking）",
  "資源充沛／隨機應變（Resourcefulness）",
  "自我重塑（Self-Reinvention）",
  "對抗性主動（Confrontational Proactivity）",
  "目標執念（Goal Obsession）",
  "執行力（Execution）",
  "樂觀（Optimism）",
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
          {
            type: "textarea",
            key: "lifestyle",
            label: "你的生活型態會是什麼樣子？",
            placeholder: "例如：每天不用鬧鐘自然醒，工作是自己真正想做的事，時間彈性可以陪家人。",
          },
          {
            type: "textarea",
            key: "daily",
            label: "你每天都會做些什麼事？",
            placeholder: "例如：早上運動、專心做一份有意義的工作、晚上跟朋友或家人相處。",
          },
          {
            type: "textarea",
            key: "perception",
            label: "別人會怎麼看待你？",
            placeholder: "例如：朋友會覺得我活得很踏實，做的事情跟我說的話一致。",
          },
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
              { key: "score", label: "分數（1～10）", placeholder: "例如：7" },
              {
                key: "note",
                label: "說明 / 可能如何拖累目標",
                placeholder: "例如：這步驟做得不錯，但還沒真正落地執行",
              },
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
          {
            type: "textarea",
            key: "obstacles",
            label: "你人生中目前有哪些阻礙與摩擦？",
            placeholder: "例如：工作忙碌、時間不夠，不知道從何開始改變。",
          },
          {
            type: "textarea",
            key: "role_models",
            label: "你能想到有哪些玩家曾經克服過類似的挑戰嗎？他們是怎麼做到的？",
            placeholder: "例如：某位創業家也是從資源很少開始，靠著每天堅持一點點累積起來。",
          },
          {
            type: "textarea",
            key: "lessons",
            label: "從那些克服類似挑戰的玩家故事中，你能學到什麼教訓？",
            placeholder: "例如：慢慢來也是一種前進，重要的是不要停下腳步。",
          },
          {
            type: "textarea",
            key: "resilience",
            label: "你的這些掙扎，可能如何幫助你培養出獨特的屬性或韌性？",
            placeholder: "例如：這些掙扎讓我學會在壓力下保持冷靜、想辦法解決問題。",
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
            itemLabels: ["例如：寫作或做設計相關的事", "例如：教別人東西，看到對方因此成長"],
          },
          {
            type: "textarea",
            key: "most_alive",
            label: "哪一件讓你覺得最有活力？",
            placeholder: "例如：跟人分享我學到的東西，看到對方眼睛一亮的那一刻。",
          },
          {
            type: "textarea",
            key: "excited",
            label: "什麼事情會讓你興奮到願意早起或熬夜？",
            placeholder: "例如：想到能解決一個困難的問題，就會捨不得睡覺。",
          },
        ],
        takeaway:
          "了解真正讓你感到興奮的事，能幫你找到選擇人生遊戲的根基——一個由熱情而非義務所驅動的任務。",
      },
      medium: {
        intro: "運用本章介紹的四種方法，來縮小你的人生遊戲範圍。認真回答以下問題，找出關於你終極任務的線索。",
        fields: [
          {
            type: "textarea",
            key: "passion",
            label: "你對什麼事情充滿熱情？",
            placeholder: "例如：我對幫助別人成長、把複雜的事情變簡單很有熱情。",
          },
          {
            type: "textarea",
            key: "inspired",
            label: "什麼事情讓你感到興奮、受到啟發？",
            placeholder: "例如：看到別人克服逆境、活出自己想要的樣子。",
          },
          {
            type: "textarea",
            key: "no_money",
            label: "如果完全不用擔心錢，你會做什麼？",
            placeholder: "例如：我會花更多時間寫作、旅行、學新技能。",
          },
          {
            type: "textarea",
            key: "admire",
            label: "你最欣賞誰的人生或作品？為什麼？",
            placeholder: "例如：某位作家，因為他把困難的道理講得很平易近人。",
          },
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
          {
            type: "textarea",
            key: "easy_things",
            label: "有哪些事情是你不太費力就能做得很好？",
            placeholder: "例如：整理雜亂的資訊、找出重點，別人常說我很會歸納。",
          },
          {
            type: "textarea",
            key: "compliments",
            label: "你曾經收到過哪些關於自身優點的稱讚？",
            placeholder: "例如：朋友說我很擅長傾聽，總是能安撫大家的情緒。",
          },
          {
            type: "list",
            key: "flow_activities",
            label: "有哪些活動會讓你因為太投入而忘記時間？（至少列出五項你自己認同的屬性）",
            itemCount: 5,
            itemLabels: ["例如：畫畫", "例如：寫程式", "例如：跟朋友深聊", "例如：整理房間", "例如：運動"],
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
          "打造屬於你的「10K HP天賦金字塔」，把你的屬性依三個層級整理：王牌（Edge，你最獨特、最強大的單一屬性）、戒指（Ring，2～5項能襯托王牌的強項屬性）、基座（Base，5～15項你表現在平均水準以上的屬性）。把這想像成一座金字塔：王牌在頂端，戒指在中間，基座則是最底層的地基。不確定要填什麼也沒關係，下面每個欄位打字時都會跳出參考屬性選項，選一個或自己輸入都可以。",
        fields: [
          { type: "textarea", key: "your_name", label: "你的名字", placeholder: "例如：小明" },
          {
            type: "list",
            key: "edge",
            label: "王牌（Edge）：你最獨特、最強大的屬性是什麼？",
            itemCount: 1,
            itemLabels: ["輸入或從建議中選擇一項"],
            suggestions: TALENT_ATTRIBUTE_SUGGESTIONS,
          },
          {
            type: "list",
            key: "ring",
            label: "戒指（Ring）：列出2～5項能襯托王牌的強項屬性",
            itemCount: 5,
            suggestions: TALENT_ATTRIBUTE_SUGGESTIONS,
          },
          {
            type: "list",
            key: "base",
            label: "基座（Base）：列出5～15項你表現在平均水準以上的屬性",
            itemCount: 10,
            suggestions: TALENT_ATTRIBUTE_SUGGESTIONS,
          },
        ],
        takeaway: "這項練習能幫助你了解自己的優勢，以及如何把這些優勢與你的人生遊戲對齊。",
        dashboardHint: "完成這一關，你的「天賦金字塔」才會出現在總覽跟人生旅程頁。",
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
          {
            type: "textarea",
            key: "natural_strengths",
            label: "你天生擅長哪些領導屬性？",
            placeholder: "例如：我很擅長聆聽團隊成員的想法，讓大家都覺得被重視。",
          },
          {
            type: "textarea",
            key: "weaknesses",
            label: "哪些領導屬性對你來說比較像是弱點？",
            placeholder: "例如：遇到衝突時容易迴避，不太敢直接指出問題。",
          },
          {
            type: "textarea",
            key: "focus_ring",
            label: "你最想強化哪一個圈層？",
            placeholder: "例如：我想加強「勇於做決定」這個部分。",
          },
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
          {
            type: "textarea",
            key: "op_attributes",
            label: "我最強的OP領導屬性是哪些？",
            placeholder: "例如：願景、賦能他人。",
          },
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
          {
            type: "textarea",
            key: "want_to_strengthen",
            label: "你想強化哪些領導屬性或領導人格？",
            placeholder: "例如：我想強化「對抗性主動」，比較敢直接面對衝突。",
          },
          {
            type: "textarea",
            key: "action_steps",
            label: "你會採取哪些明確、可執行的步驟來強化這些方面？",
            placeholder: "例如：這個月至少主動提出兩次不同意見，練習表達立場。",
          },
          {
            type: "textarea",
            key: "ally_strategy",
            label: "你會採取什麼策略，讓自己身邊圍繞著能幫助你成長的盟友？",
            placeholder: "例如：找一位敢直言的朋友，定期給我回饋。",
          },
          {
            type: "textarea",
            key: "timeline",
            label: "你為這份行動計畫設定了什麼時程？",
            placeholder: "例如：接下來三個月，每兩週檢視一次進度。",
          },
          {
            type: "textarea",
            key: "accountability_partner",
            label: "誰是你的課責夥伴？他們會如何支持你？",
            placeholder: "例如：我的好朋友小華，他會每週問我進度。",
          },
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
          {
            type: "list",
            key: "aspiration",
            label: "你的抱負是什麼？（寫三句話）",
            itemCount: 3,
            itemLabels: ["例如：成為能幫助他人成長的人", "例如：做出讓自己驕傲的作品", "例如：活出真實的自己"],
          },
          {
            type: "list",
            key: "identity",
            label: "你的身份是什麼？（寫三句話）",
            itemCount: 3,
            itemLabels: ["例如：一個樂於分享的人", "例如：值得信任的夥伴", "例如：持續學習的人"],
          },
          {
            type: "list",
            key: "career",
            label: "你的職業是什麼？（寫三句話）",
            itemCount: 3,
            itemLabels: ["例如：目前是一名工程師", "例如：業餘接一些設計案", "例如：正在學習新的專業技能"],
          },
          {
            type: "list",
            key: "specialty",
            label: "你的專精是什麼？（寫三句話）",
            itemCount: 3,
            itemLabels: [
              "例如：擅長把複雜的問題拆解清楚",
              "例如：擅長跟不同的人溝通協調",
              "例如：擅長快速學習新工具",
            ],
          },
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
            placeholder: "例如：目前的工作發揮了我擅長溝通的優勢，但創意這塊發揮得不多。",
          },
          {
            type: "textarea",
            key: "better_role",
            label:
              "如果這些角色沒有讓你的屬性與技能發揮到最大，那你應該扮演什麼角色，才能更接近人生遊戲的終點線？",
            placeholder: "例如：一個能同時發揮溝通與創意的角色，像是產品企劃。",
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
          {
            type: "textarea",
            key: "archetypes",
            label: "有哪些特質或原型（archetype）能啟發你？",
            placeholder: "例如：智者、開拓者，這類原型讓我很有共鳴。",
          },
          {
            type: "list",
            key: "role_models",
            label: "有哪些你欣賞的榜樣、虛構英雄或歷史人物？",
            itemCount: 3,
            itemLabels: ["例如：甘道夫", "例如：某位歷史上的改革者", "例如：家人裡最勇敢的那個人"],
          },
          {
            type: "textarea",
            key: "hero_name",
            label: "你的英雄名字是什麼？",
            placeholder: "例如：晨曦行者",
          },
          {
            type: "textarea",
            key: "why_name",
            label: "為什麼這個英雄名字能呼應你的旅程？",
            placeholder: "例如：代表著即使在黑暗中也願意先踏出第一步。",
          },
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
            itemLabels: ["例如：誠實", "例如：勇氣", "例如：成長", "例如：同理心", "例如：自由"],
          },
          {
            type: "textarea",
            key: "mission",
            label: "寫下你的使命（你的終極目的）",
            placeholder: "例如：幫助更多人找到屬於自己的人生遊戲。",
          },
          {
            type: "textarea",
            key: "ultimate_purpose",
            label: "你這場遊戲的終極目的是什麼？",
            placeholder: "例如：讓身邊的人因為認識我而變得更好。",
          },
          {
            type: "textarea",
            key: "impact",
            label: "你想透過什麼方式產生影響力？",
            placeholder: "例如：透過分享跟教學，讓更多人少走一些彎路。",
          },
          {
            type: "textarea",
            key: "line_never_cross",
            label: "無論如何你絕不會跨越的底線是什麼？",
            placeholder: "例如：不會為了利益犧牲他人的信任。",
          },
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
            columns: [
              {
                key: "note",
                label: "對你的意義／具體做法",
                placeholder: "例如：每天誠實面對自己的進度，不隱瞞卡關的地方",
              },
            ],
            rowCount: 5,
            rowLabels: [
              "誠信（Integrity）",
              "勇氣（Courage）",
              "同理心（Compassion）",
              "創新（Innovation）",
              "堅持（Perseverance）",
            ],
          },
          {
            type: "textarea",
            key: "mission",
            label: "使命（Mission）",
            placeholder: "例如：幫助更多人找到屬於自己的人生遊戲。",
          },
          {
            type: "list",
            key: "non_negotiables",
            label: "不可妥協的底線（Non-Negotiables）",
            itemCount: 5,
            itemLabels: [
              "例如：不說謊",
              "例如：不放棄承諾過的事",
              "例如：不犧牲健康換取短期效率",
              "例如：不忽視家人",
              "例如：不停止學習",
            ],
          },
          {
            type: "list",
            key: "daily_practices",
            label: "每日實踐（Daily Practices）",
            itemCount: 5,
            itemLabels: [
              "例如：每天寫下三件感恩的事",
              "例如：運動30分鐘",
              "例如：閱讀15分鐘",
              "例如：檢視今天的待辦清單",
              "例如：睡前反思今天的表現",
            ],
          },
          {
            type: "list",
            key: "accountability_measures",
            label: "課責措施（Accountability Measures）",
            itemCount: 5,
            itemLabels: [
              "例如：每週跟夥伴回報進度",
              "例如：把目標公開在社群上",
              "例如：設定提醒工具",
              "例如：定期自我檢核表",
              "例如：找教練或導師追蹤",
            ],
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
          {
            type: "list",
            key: "ring_skills",
            label: "戒指技能（前5名）",
            itemCount: 5,
            itemLabels: ["例如：簡報表達", "例如：專案管理", "例如：資料分析", "例如：寫作", "例如：溝通協調"],
          },
          {
            type: "list",
            key: "base_skills",
            label: "基座技能（其他表現在平均水準以上、但重要性稍低的技能）",
            itemCount: 7,
            itemLabels: [
              "例如：基礎程式能力",
              "例如：時間管理",
              "例如：基本設計美感",
              "例如：英文閱讀",
              "例如：團隊合作",
              "例如：簡單的財務規劃",
              "例如：基礎行銷概念",
            ],
          },
        ],
        takeaway: "這能讓你清楚了解自己現有的優勢，以及它們目前如何塑造你的人生遊戲。",
        dashboardHint: "完成這一關，你的「技能金字塔」才會出現在總覽跟人生旅程頁。",
      },
      medium: {
        intro:
          "打造你的「目標技能金字塔」，想一位已經在你渴望的角色上取得成功的「頂尖大師」，找出你為了人生遊戲需要精通的技能。",
        fields: [
          { type: "textarea", key: "your_name", label: "你的名字：", placeholder: "例如：小明" },
          {
            type: "textarea",
            key: "top_target_skill",
            label: "頂尖目標技能（Top Target Skill）",
            placeholder: "例如：公開演講能力",
          },
          {
            type: "list",
            key: "ring_skills",
            label: "戒指技能（主要技能）",
            itemCount: 4,
            itemLabels: ["例如：故事化表達", "例如：臨場反應", "例如：投影片設計", "例如：控場能力"],
          },
          {
            type: "list",
            key: "base_skills",
            label: "基座技能（支援技能）",
            itemCount: 8,
            itemLabels: [
              "例如：發音咬字",
              "例如：肢體語言",
              "例如：時間掌控",
              "例如：問答應對",
              "例如：緊張情緒調節",
              "例如：資料整理",
              "例如：觀眾分析",
              "例如：麥克風使用",
            ],
          },
        ],
        takeaway:
          "比較你目前的技能金字塔與目標技能金字塔，能清楚看出你還需要加強或學習哪些技能。",
      },
      hard: {
        intro:
          "擬定一份行動計畫，提升你的技能，縮小目前技能金字塔與目標技能金字塔之間的差距。選出一項關鍵技能，作為未來三到六個月的優先目標。",
        fields: [
          {
            type: "textarea",
            key: "priority_skill",
            label: "選出一項未來3～6個月要優先發展的關鍵技能。",
            placeholder: "例如：公開演講能力",
          },
          {
            type: "textarea",
            key: "growth_strategy",
            label: "設計成長這項技能的策略：找一門課程、一位導師，或一個能挑戰你的專案。",
            placeholder: "例如：報名一堂演講課，並每月上台練習一次。",
          },
          {
            type: "textarea",
            key: "deliberate_practice",
            label: "規劃每天或每週的刻意練習。",
            placeholder: "例如：每週三晚上錄影練習一次五分鐘的簡短演講。",
          },
          {
            type: "textarea",
            key: "reflection",
            label: "反思這項技能如何補強你的其他優勢，並與你的核心屬性相互呼應。",
            placeholder: "例如：這項技能能幫助我把想法更有效傳達給團隊，跟我擅長溝通的屬性互相呼應。",
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
        intro:
          "檢視「現實人生遊戲技能」表，找出你已經擁有的技能並寫下來。如果你已經在「提升技能」章節填過戒指／基座技能，這裡會自動帶入，可以直接編輯或補充。",
        fields: [
          {
            type: "textarea",
            key: "owned_skills",
            label: "列出你已經擁有的現實人生遊戲技能。",
            placeholder: "例如：溝通協調、資料分析、簡報表達。",
          },
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
            itemLabels: [
              "例如：用簡報說服主管採用新方案",
              "例如：協調兩個部門解決衝突",
              "例如：用資料分析找出問題根因",
              "例如：帶新人快速上手",
              "例如：臨時上場代打完成簡報",
            ],
          },
        ],
        dashboardHint: "完成這一關，你的「技能網雷達圖」才會出現在總覽頁。",
      },
      medium: {
        intro: "找出一項你需要升級的現實人生遊戲技能，研究或找出一位在你渴望角色上表現傑出的「頂尖大師」。",
        fields: [
          {
            type: "textarea",
            key: "skill_to_upgrade",
            label: "有哪一項現實人生遊戲技能是你需要升級的？",
            placeholder: "例如：資料分析能力",
          },
          {
            type: "textarea",
            key: "top_master",
            label: "你研究了哪位在你渴望角色上表現傑出的頂尖大師？",
            placeholder: "例如：公司裡資料團隊的主管",
          },
          {
            type: "textarea",
            key: "master_skills",
            label: "這位頂尖大師精通哪些現實人生遊戲技能？",
            placeholder: "例如：能快速從一堆數據裡看出關鍵趨勢，並用簡單的方式解釋給大家聽。",
          },
          {
            type: "textarea",
            key: "most_important",
            label: "這些技能中，哪些對你的成長最重要？",
            placeholder: "例如：把複雜數據簡化成好懂的重點，這對我目前的工作最有幫助。",
          },
        ],
      },
      hard: {
        intro:
          "展開一場「技能任務」，在接下來四週內積極練習並精進一項關鍵的現實人生遊戲技能，並承諾進行可量化的練習計畫。",
        fields: [
          {
            type: "textarea",
            key: "skill_quest",
            label: "在接下來四週，你要精通哪一項現實人生遊戲技能？",
            placeholder: "例如：資料分析能力",
          },
          {
            type: "textarea",
            key: "quantifiable_plan",
            label: "你會承諾採用什麼可量化的練習計畫？",
            placeholder: "例如：每週練習一個真實資料集，四週後能獨立完成一份分析報告。",
          },
          {
            type: "textarea",
            key: "share_with",
            label: "你會把成果分享給誰，以取得回饋與課責？",
            placeholder: "例如：我的主管，請他幫我 review。",
          },
          {
            type: "textarea",
            key: "tracking",
            label: "你要如何在這四週追蹤自己的進度？",
            placeholder: "例如：每週五在筆記本記錄這週學到什麼、卡在哪裡。",
          },
          {
            type: "textarea",
            key: "learned",
            label: "在你的技能任務結束時，你對自己的成長學到了什麼？",
            placeholder: "例如：發現自己其實可以透過刻意練習快速進步，不用等到「準備好」才開始。",
          },
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
          "找出你目前在人生遊戲中，已經加入的陣營、公會、隊伍與夥伴，寫下每個聯盟目前為止對你的遊戲做出了什麼貢獻。四種分類大致上是：陣營（Faction）——因為理念或方向相近而聚在一起的較大群體，例如認同的產業社群、一般興趣類的 Discord 社群；公會（Guild）——圍繞特定技能或專業、互相切磋成長的群體，例如寫作社群、程式交流會、以技能為主的 Discord 社群；隊伍（Party）——為了特定目標一起合作的小團隊，例如專案小組；夥伴關係（Partnership）——一對一或少數人的個人支持關係，例如導師、摯友。不確定該歸在哪一類也沒關係，選哪個都不影響其他功能運作。",
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
        dashboardHint: "完成這一關，你的「聯盟名冊」才會出現在人生旅程頁。",
      },
      medium: {
        intro:
          "採取行動，加入一個符合你目前遊戲方向的新陣營、公會或團隊。記住，展現主動積極，也是成為有價值盟友的關鍵。",
        fields: [
          {
            type: "textarea",
            key: "new_alliance",
            label: "你決定加入哪個新的陣營、公會或團隊？",
            placeholder: "例如：加入一個線上讀書會社群。",
          },
          {
            type: "textarea",
            key: "why_chosen",
            label: "你為什麼選擇這個團體？它如何與你的人生遊戲契合？",
            placeholder: "例如：這個社群的方向跟我想學習的技能很契合。",
          },
          {
            type: "textarea",
            key: "first_experience",
            label: "你在第一次聚會或互動中的體驗如何？",
            placeholder: "例如：第一次參加有點緊張，但大家都很友善，也認識了幾個新朋友。",
          },
          {
            type: "textarea",
            key: "proactive",
            label: "你如何積極參與，或展現出主動積極的態度？",
            placeholder: "例如：主動在群組裡分享自己的心得，並幫忙回答其他人的問題。",
          },
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
              { key: "name", label: "姓名", placeholder: "例如：王老師" },
              { key: "meaning", label: "他們對你的意義", placeholder: "例如：曾經指導過我很多職涯上的方向" },
            ],
            rowCount: 3,
          },
          {
            type: "table",
            key: "admired_traits",
            label: "你欣賞他們的哪一點？（請具體說明）",
            columns: [
              { key: "reason", label: "欣賞的地方", placeholder: "例如：面對困難總是很冷靜，而且很願意分享經驗" },
            ],
            rowCount: 3,
            rowLabels: ["第一位", "第二位", "第三位"],
          },
          {
            type: "table",
            key: "messages_sent",
            label: "你傳給他們的個人化訊息內容是什麼？",
            columns: [
              {
                key: "message",
                label: "訊息內容",
                placeholder: "例如：老師好，我是您以前的學生，最近想重新請教您一些職涯上的問題……",
              },
            ],
            rowCount: 3,
            rowLabels: ["第一位", "第二位", "第三位"],
          },
          {
            type: "table",
            key: "outreach_results",
            label: "你有收到回覆嗎？對方的回覆或結果是什麼？主動出擊的感覺如何？",
            columns: [
              {
                key: "result",
                label: "結果與感受",
                placeholder: "例如：對方隔天就回覆了，還約了時間線上聊聊，感覺很不錯",
              },
            ],
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
          {
            type: "textarea",
            key: "person",
            label: "你選擇重新聯繫的人是誰？",
            placeholder: "例如：大學時期的室友",
          },
          {
            type: "textarea",
            key: "message",
            label: "你傳給他們的訊息內容是什麼？",
            placeholder: "例如：嗨，好久不見！最近在做一個自我成長的計畫，突然想到你，最近過得如何？",
          },
          {
            type: "textarea",
            key: "response",
            label: "他們怎麼回應？重新建立聯繫讓你有什麼感受？",
            placeholder: "例如：對方很開心收到訊息，我們約了時間視訊聊近況。",
          },
        ],
        takeaway: "這是一種簡單卻強大的方式，能重新點燃有價值的人際連結。",
      },
      medium: {
        intro:
          "找出線上可能對你的遊戲很關鍵的高階玩家。運用「刺拳、直拳、上鉤拳」技巧，在接下來四週內主動聯繫並至少跟進三次。",
        fields: [
          {
            type: "list",
            key: "advanced_players",
            label: "你找出哪些高階玩家想要連結？（列出幾個名字）",
            itemCount: 3,
            itemLabels: ["例如：業界前輩小陳", "例如：某個 Podcast 主持人", "例如：曾經合作過的客戶"],
          },
          {
            type: "textarea",
            key: "jab",
            label: "你如何運用「刺拳」技巧？",
            placeholder: "例如：在對方的貼文底下留下真誠的回饋。",
          },
          {
            type: "textarea",
            key: "cross",
            label: "你如何運用「直拳」技巧？",
            placeholder: "例如：私訊分享一個對方可能有興趣的資源。",
          },
          {
            type: "textarea",
            key: "hook",
            label: "你如何運用「上鉤拳」技巧？",
            placeholder: "例如：邀請對方喝杯咖啡聊聊近況。",
          },
          {
            type: "textarea",
            key: "response",
            label: "在持續跟進後，你收到了什麼樣的回應（如果有的話）？",
            placeholder: "例如：對方很訝異我還記得他分享過的東西，很快就回覆了。",
          },
          {
            type: "textarea",
            key: "progress",
            label: "持續跟進之後，你們的關係有什麼進展？",
            placeholder: "例如：我們約好之後每個月聯絡一次。",
          },
        ],
        takeaway:
          "這項練習讓你持續聯繫第6章「困難模式」中所提到的相同對象，這次確保你的努力持之以恆且前後一致。",
      },
      hard: {
        intro:
          "走進現實世界，報名參加一場能認識新朋友的當地活動。透過以下步驟征服「無害之龍」：1.有精神地眼神交流並打招呼 2.進行簡短、有意義的對話 3.表示樂意保持聯絡並收集聯絡方式 4.對盡可能多的人重複步驟1–3 5.活動後24小時內跟進聯繫 6.兩個月後再次主動聯繫，維繫關係。",
        fields: [
          {
            type: "textarea",
            key: "event",
            label: "你參加了什麼樣的當地活動？",
            placeholder: "例如：一場產業交流的實體聚會",
          },
          {
            type: "list",
            key: "people_met",
            label: "你認識了誰？（列出一些名字或描述）",
            itemCount: 2,
            itemLabels: ["例如：現場認識的一位創業者", "例如：另一位同樣是新手的參加者"],
          },
          {
            type: "textarea",
            key: "count",
            label: "你打招呼、進行有意義對話並收集聯絡方式的人數有多少？（填入數字）",
            placeholder: "例如：3",
          },
          {
            type: "textarea",
            key: "followup_24h",
            label: "你24小時內的跟進訊息進行得如何？你說了什麼？",
            placeholder: "例如：隔天傳訊息謝謝對方當天的分享，並附上聯絡方式。",
          },
          {
            type: "textarea",
            key: "followup_2mo",
            label: "兩個月後，你採取了什麼行動來維繫這些新關係？",
            placeholder: "例如：兩個月後傳訊息詢問對方近況，順便分享自己的進度。",
          },
          {
            type: "textarea",
            key: "lesson",
            label: "透過這次經驗，你對征服「無害之龍」學到了什麼？",
            placeholder: "例如：主動打招呼其實沒有想像中困難，大家都樂於交流。",
          },
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
          {
            type: "list",
            key: "milestones",
            label: "列出三到五個塑造了你的主要任務（里程碑或成就）。",
            itemCount: 5,
            itemLabels: [
              "例如：第一次上台簡報成功",
              "例如：完成一場馬拉松",
              "例如：換到理想的工作",
              "例如：克服公開演講的恐懼",
              "例如：學會一項新語言",
            ],
          },
          {
            type: "textarea",
            key: "why_important",
            label: "為什麼這些里程碑對你的成長很重要？",
            placeholder: "例如：這些經驗讓我知道，只要持續累積，困難的事情也能做到。",
          },
          {
            type: "textarea",
            key: "lessons",
            label: "你從這些任務中獲得了哪些教訓或技能？",
            placeholder: "例如：學會了拆解大目標成小步驟，一步步前進。",
          },
        ],
        dashboardHint: "完成這一關，你的「過去里程碑」才會出現在人生旅程頁。",
      },
      medium: {
        intro:
          "找出一個你想在下個月完成的目標，並把它轉化為一個SMART的「次要任務」：具體（Specific）、可衡量（Measurable）、可達成（Achievable）、相關（Relevant）、有時限（Time-bound）。",
        fields: [
          {
            type: "textarea",
            key: "goal",
            label: "你想在下個月達成的目標是什麼？（次要任務）",
            placeholder: "例如：完成一份完整的產品提案",
          },
          {
            type: "textarea",
            key: "specific",
            label: "把你的目標變得具體（Specific）：",
            placeholder: "例如：針對A產品線，寫出一份包含市場分析與執行計畫的提案。",
          },
          {
            type: "textarea",
            key: "measurable",
            label: "把你的目標變得可衡量（Measurable）：",
            placeholder: "例如：提案至少包含3個具體數據佐證。",
          },
          {
            type: "textarea",
            key: "achievable",
            label: "把你的目標變得可達成（Achievable）：",
            placeholder: "例如：每週投入5小時，一個月內可以完成。",
          },
          {
            type: "textarea",
            key: "relevant",
            label: "把你的目標變得相關（Relevant）：",
            placeholder: "例如：這跟我今年想爭取升遷的目標直接相關。",
          },
          {
            type: "textarea",
            key: "time_bound",
            label: "把你的目標變得有時限（Time-bound）：",
            placeholder: "例如：一個月內，也就是這個月底前完成。",
          },
          {
            type: "textarea",
            key: "reward",
            label: "你會為達成進度里程碑設定什麼星星獎勵？（小小的獎勵，慶祝小小的勝利！）",
            placeholder: "例如：完成後犒賞自己一頓好吃的晚餐。",
          },
          {
            type: "textarea",
            key: "accountability_allies",
            label: "你會找哪兩位信任的盟友，分享你的次要任務以取得課責監督？",
            placeholder: "例如：我的主管跟同事小美。",
          },
        ],
      },
      hard: {
        intro:
          "放大格局，規劃你的「五年目標」，並拆解成主要任務與次要任務。探索所需的各類任務：學習任務（獲得新技能）、聯盟任務（建立人脈）、職涯任務（提升個人形象）、健康任務（維持最佳狀態）。",
        fields: [
          {
            type: "list",
            key: "five_year_goals",
            label: "你的五年目標是什麼？（放膽去夢想！）",
            itemCount: 3,
            itemLabels: ["例如：成為部門主管", "例如：完成一場全馬", "例如：出版一本書"],
          },
          {
            type: "list",
            key: "task_breakdown",
            label: "把每個目標拆解成更小的主要任務與次要任務。（清楚列出）",
            itemCount: 6,
            itemLabels: [
              "例如：先完成一個代表性專案",
              "例如：主動爭取跨部門合作機會",
              "例如：每週練跑三次",
              "例如：報名馬拉松訓練營",
              "例如：每月寫一篇文章累積內容",
              "例如：找出版社洽談合作",
            ],
          },
          {
            type: "list",
            key: "task_categories",
            label: "你需要完成哪些學習、聯盟、職涯與健康任務？",
            itemCount: 4,
            itemLabels: [
              "例如：學習任務：進修管理課程",
              "例如：聯盟任務：認識業界前輩",
              "例如：職涯任務：爭取重要專案",
              "例如：健康任務：維持規律運動",
            ],
          },
          {
            type: "list",
            key: "timeline",
            label: "為你的主要任務與次要任務指定時程。（請具體說明）",
            itemCount: 5,
            itemLabels: [
              "例如：半年內完成代表性專案",
              "例如：一年內爭取到跨部門合作",
              "例如：持續每週運動三次",
              "例如：兩年內出版第一本書",
              "例如：五年內達成升遷目標",
            ],
          },
          {
            type: "textarea",
            key: "visual_roadmap",
            label: "描述你的視覺化路線圖。（你要如何以視覺方式追蹤你的任務？）",
            placeholder: "例如：用一張時間軸海報貼在書桌前，每完成一項就打勾。",
          },
        ],
        dashboardHint: "完成這一關，你的「五年目標」才會出現在人生旅程頁。",
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
        intro:
          "回顧你目前在「10K HP」旅程六個步驟中的進度，先為每個步驟打分（1～5星），再寫下具體反思。其中「追求任務」這一題提到的 SMART 原則，是指：具體（Specific，目標講清楚是什麼）、可衡量（Measurable，有數字或明確標準可以判斷）、可達成（Achievable，以你現有的時間與資源真的做得到）、相關（Relevant，跟你真正在乎的目標有關聯）、有時限（Time-bound，有明確的截止日期）。第8章中等關就是專門練習把一個目標拆解成 SMART 格式的地方，可以先去那邊練習過，回頭答這一題會更有感覺。",
        fields: [
          { type: "rating", key: "right_game_rating", label: "你正在玩對的遊戲嗎？（自評分數）" },
          {
            type: "textarea",
            key: "right_game",
            label: "你正在玩對的遊戲嗎？",
            placeholder: "例如：大致上是，但偶爾還是會懷疑自己的選擇。",
          },
          { type: "rating", key: "attributes_rating", label: "你有效理解並運用你的屬性嗎？（自評分數）" },
          {
            type: "textarea",
            key: "attributes",
            label: "你有效理解並運用你的屬性嗎？",
            placeholder: "例如：有意識地在用，但還沒完全發揮到極致。",
          },
          { type: "rating", key: "role_rating", label: "你確定了自己的角色了嗎？（自評分數）" },
          {
            type: "textarea",
            key: "role",
            label: "你確定了自己的角色了嗎？",
            placeholder: "例如：方向大致確定，細節還在調整。",
          },
          { type: "rating", key: "skills_rating", label: "你正在建立並磨練你需要的技能嗎？（自評分數）" },
          {
            type: "textarea",
            key: "skills",
            label: "你正在建立並磨練你需要的技能嗎？",
            placeholder: "例如：持續在練習，但還沒有具體的計畫。",
          },
          { type: "rating", key: "allies_rating", label: "你身邊圍繞著對的盟友嗎？（自評分數）" },
          {
            type: "textarea",
            key: "allies",
            label: "你身邊圍繞著對的盟友嗎？",
            placeholder: "例如：身邊有幾位很棒的夥伴，但可以再多認識一些。",
          },
          { type: "rating", key: "quests_rating", label: "你正在追求有意義且符合SMART原則的任務嗎？（自評分數）" },
          {
            type: "textarea",
            key: "quests",
            label: "你正在追求有意義且符合SMART原則的任務嗎？",
            placeholder: "例如：目前的任務大致符合SMART原則，但時限抓得不夠緊。",
          },
        ],
        dashboardHint: "完成這一關，你的「六步驟對齊雷達圖」才會出現在總覽頁。",
      },
      medium: {
        intro:
          "擬定一份行動計畫，讓你的人生遊戲完全對齊，朝「OP模式」邁進：選出你目前最失衡的兩個領域，定義具體、可執行的步驟。",
        fields: [
          {
            type: "list",
            key: "imbalanced_areas",
            label: "你覺得自己最失衡的兩個領域是什麼？",
            itemCount: 2,
            itemLabels: ["例如：建立聯盟", "例如：提升技能"],
          },
          {
            type: "list",
            key: "action_steps",
            label: "你會採取什麼具體、可執行的步驟，來修正每個領域？",
            itemCount: 2,
            itemLabels: ["例如：每個月主動認識一位新朋友", "例如：每週安排兩小時刻意練習"],
          },
          {
            type: "list",
            key: "milestones_timeline",
            label: "針對這些行動，你設定了什麼里程碑與時程？",
            itemCount: 2,
            itemLabels: ["例如：三個月內認識五位新夥伴", "例如：半年內完成一項技能認證"],
          },
          {
            type: "list",
            key: "how_it_helps",
            label: "讓這些領域重新對齊，將如何幫助你更接近「OP模式」？",
            itemCount: 2,
            itemLabels: [
              "例如：讓我在遇到困難時有更多資源可以求助",
              "例如：讓我更有信心接下更有挑戰性的任務",
            ],
          },
        ],
      },
      hard: {
        intro:
          "與他人合作，強化你的對齊程度，放大你的成果：找一位信任的盟友，一起面對挑戰，分享行動計畫並互相督促課責。",
        fields: [
          {
            type: "textarea",
            key: "accountability_ally",
            label: "誰是你要合作、互相課責的信任盟友？",
            placeholder: "例如：我的好朋友小華",
          },
          {
            type: "textarea",
            key: "joint_steps",
            label: "你們會一起採取哪些步驟來強化對齊？",
            placeholder: "例如：每週互相回報進度，遇到卡關時互相討論。",
          },
          {
            type: "textarea",
            key: "community",
            label: "你會加入哪個公會、社群或支持團體，來強化你的旅程？",
            placeholder: "例如：加入一個線上成長社群，定期參加聚會。",
          },
          {
            type: "textarea",
            key: "acceleration",
            label: "與他人合作，會如何加速你朝「OP模式」邁進的進度？",
            placeholder: "例如：有人一起討論，能更快發現盲點、少走冤枉路。",
          },
          {
            type: "textarea",
            key: "coach",
            label: "你會考慮找一位10K HP教練嗎？為什麼會或為什麼不會？",
            placeholder: "例如：會考慮，因為有人引導可以少走一些彎路，加快進度。",
          },
        ],
      },
    },
  },
];

export const getChapter = (id: string): ChapterContent | undefined => {
  return CHAPTERS.find((c) => c.id === id);
};
