"use client";

import { SignOutButton as ClerkSignOutButton } from "@clerk/nextjs";

const SignOutButton = () => {
  return (
    <ClerkSignOutButton>
      <button
        type="button"
        className="text-sm text-dim hover:text-[var(--color-accent)] transition"
      >
        登出
      </button>
    </ClerkSignOutButton>
  );
};

export default SignOutButton;
