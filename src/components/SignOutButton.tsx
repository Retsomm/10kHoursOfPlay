"use client";

import { useTransition } from "react";
import { signOut } from "@/app/dashboard/actions";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => signOut())}
      className="text-sm text-dim hover:text-[var(--color-accent)] disabled:opacity-50"
    >
      登出
    </button>
  );
}
