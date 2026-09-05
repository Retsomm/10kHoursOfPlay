"use client";

import { useState, useTransition } from "react";
import { updateHeroName } from "@/app/dashboard/actions";

const HeroNameEditor = ({ initialName }: { initialName: string }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [isPending, startTransition] = useTransition();

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="text-left group"
      >
        <h1 className="font-display text-2xl md:text-3xl font-bold group-hover:text-[var(--color-accent)] group-hover:glow-accent transition">
          {name || "未命名英雄"}
        </h1>
        <span className="text-sm text-dim">點擊編輯英雄名字</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="輸入你的英雄名字"
        className="font-display text-lg max-w-xs"
        autoFocus
      />
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await updateHeroName(name);
            setEditing(false);
          })
        }
        className="btn-primary rounded-lg text-sm px-3 py-2"
      >
        儲存
      </button>
    </div>
  );
};

export default HeroNameEditor;
