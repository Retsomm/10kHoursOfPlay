"use client";

import type { Field } from "@/types/content";
import StarRating from "../StarRating";

type ListValue = string[];
type TableValue = Record<string, string>[];
type ClassRatingValue = Record<string, number>;
type ContactListValue = { name: string; relationship: string; trust?: string; note?: string }[];

const FieldRenderer = ({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (next: unknown) => void;
}) => {
  if (field.type === "textarea") {
    const v = typeof value === "string" ? value : "";
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium">{field.label}</label>
        <textarea
          rows={4}
          value={v}
          onChange={(e) => onChange(e.target.value)}
          placeholder="寫下你的答案……"
        />
      </div>
    );
  }

  if (field.type === "list") {
    const v: ListValue = Array.isArray(value)
      ? (value as ListValue)
      : Array.from({ length: field.itemCount }, () => "");
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium">{field.label}</label>
        <div className="space-y-2">
          {Array.from({ length: field.itemCount }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-dim text-sm w-6 shrink-0 text-right">
                {field.itemLabels ? "" : i + 1}
              </span>
              <input
                value={v[i] ?? ""}
                placeholder={field.itemLabels?.[i] ?? `第 ${i + 1} 項`}
                onChange={(e) => {
                  const next = [...v];
                  next[i] = e.target.value;
                  onChange(next);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "rating") {
    const max = field.max ?? 5;
    const v = typeof value === "number" ? value : 0;
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium">{field.label}</label>
        <StarRating filled={v} total={max} onRate={(n) => onChange(n)} />
      </div>
    );
  }

  if (field.type === "classRating") {
    const v: ClassRatingValue = typeof value === "object" && value !== null ? (value as ClassRatingValue) : {};
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium">{field.label}</label>
        <div className="space-y-2">
          {field.classes.map((cls) => (
            <div key={cls.key} className="flex items-center justify-between gap-2">
              <span className="text-sm text-dim">{cls.label}</span>
              <StarRating
                filled={v[cls.key] ?? 0}
                total={5}
                onRate={(n) => onChange({ ...v, [cls.key]: n })}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "contactList") {
    const v: ContactListValue = Array.isArray(value)
      ? (value as ContactListValue)
      : Array.from({ length: field.itemCount }, () => ({ name: "", relationship: "" }));
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium">{field.label}</label>
        <div className="space-y-2">
          {Array.from({ length: field.itemCount }).map((_, i) => {
            const row = v[i] ?? { name: "", relationship: "" };
            const setRow = (next: Partial<ContactListValue[number]>) => {
              const nextList = [...v];
              nextList[i] = { ...row, ...next };
              onChange(nextList);
            };
            return (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2">
                <input
                  placeholder="姓名"
                  value={row.name}
                  onChange={(e) => setRow({ name: e.target.value })}
                />
                <select
                  value={row.relationship}
                  onChange={(e) => setRow({ relationship: e.target.value })}
                >
                  <option value="">類型</option>
                  {field.relationshipOptions.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <input
                  placeholder="備註（貢獻/連結方式）"
                  value={row.note ?? ""}
                  onChange={(e) => setRow({ note: e.target.value })}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // table
  const columns = field.columns;
  const v: TableValue = Array.isArray(value)
    ? (value as TableValue)
    : Array.from({ length: field.rowCount }, () => ({}));

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{field.label}</label>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <tbody>
            {Array.from({ length: field.rowCount }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {field.rowLabels && (
                  <td className="pr-3 align-top text-dim text-xs w-40 pt-2">
                    {field.rowLabels[rowIdx]}
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="pr-2 align-top min-w-[160px]">
                    <input
                      placeholder={col.label}
                      value={v[rowIdx]?.[col.key] ?? ""}
                      onChange={(e) => {
                        const next = v.map((row) => ({ ...row }));
                        next[rowIdx] = { ...next[rowIdx], [col.key]: e.target.value };
                        onChange(next);
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FieldRenderer;
