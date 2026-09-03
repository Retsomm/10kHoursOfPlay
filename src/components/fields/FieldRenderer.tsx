"use client";

import type { Field } from "@/types/content";

type ListValue = string[];
type TableValue = Record<string, string>[];

export default function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
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
                {field.itemLabel ? "" : i + 1}
              </span>
              <input
                value={v[i] ?? ""}
                placeholder={field.itemLabel ? field.itemLabel(i) : `第 ${i + 1} 項`}
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
                {field.rowLabel && (
                  <td className="pr-3 align-top text-dim text-xs w-40 pt-2">
                    {field.rowLabel(rowIdx)}
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
}
