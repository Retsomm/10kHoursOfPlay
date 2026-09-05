"use client";

import { QUEST_TYPE_OPTIONS, type QuestScope } from "@/lib/quests";

export interface QuestFieldsValue {
  title: string;
  scope: QuestScope;
  questType: string;
  star1: string;
  star2: string;
  star3: string;
  dueDate: string;
  reward: string;
}

export const EMPTY_QUEST_FIELDS: QuestFieldsValue = {
  title: "",
  scope: "task",
  questType: "",
  star1: "",
  star2: "",
  star3: "",
  dueDate: "",
  reward: "",
};

// 新增任務／編輯任務共用同一組欄位，避免兩處各自維護一份、SMART 標籤改了卻漏改另一邊。
const QuestFields = ({
  value,
  onChange,
  showSmartIntro = true,
}: {
  value: QuestFieldsValue;
  onChange: (patch: Partial<QuestFieldsValue>) => void;
  showSmartIntro?: boolean;
}) => {
  return (
    <>
      {showSmartIntro && (
        <p className="text-sm text-dim leading-relaxed">
          設定任務時可以套用 SMART 原則：具體（Specific，目標講清楚是什麼）、可衡量（Measurable，用星星門檻定義做到什麼程度）、
          可達成（Achievable，門檻要符合你現在的時間與資源）、相關（Relevant，跟你真正在乎的方向有關）、
          有時限（Time-bound，設一個明確的截止日）。下面每個欄位旁邊標示了對應到哪個原則，
          不是每一項都必填，但填得越完整，之後越容易判斷有沒有真的做到。
        </p>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium">任務名稱（S 具體）</label>
        <input
          value={value.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="例如：完成一份完整的產品提案"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="block text-sm font-medium">範疇</label>
          <select value={value.scope} onChange={(e) => onChange({ scope: e.target.value as QuestScope })}>
            <option value="task">任務 Task</option>
            <option value="minor_quest">次要任務 Minor Quest</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">類型（選填）</label>
          <select value={value.questType} onChange={(e) => onChange({ questType: e.target.value })}>
            <option value="">不指定</option>
            {QUEST_TYPE_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">1 星門檻（M 可衡量／A 可達成，選填）</label>
        <textarea rows={2} value={value.star1} onChange={(e) => onChange({ star1: e.target.value })} placeholder="做到什麼程度算 1 星？" />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">2 星門檻（M 可衡量／A 可達成，選填）</label>
        <textarea rows={2} value={value.star2} onChange={(e) => onChange({ star2: e.target.value })} placeholder="做到什麼程度算 2 星？" />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">3 星門檻（M 可衡量／A 可達成，選填）</label>
        <textarea rows={2} value={value.star3} onChange={(e) => onChange({ star3: e.target.value })} placeholder="做到什麼程度算 3 星？" />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">時限（T 有時限，選填）</label>
        <input type="date" value={value.dueDate} onChange={(e) => onChange({ dueDate: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">獎勵（選填）</label>
        <input value={value.reward} onChange={(e) => onChange({ reward: e.target.value })} placeholder="達成後要給自己什麼獎勵？" />
      </div>
    </>
  );
};

export default QuestFields;
