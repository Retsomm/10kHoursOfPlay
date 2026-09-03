"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const updateHeroName = async (heroName: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("尚未登入");

  const supabase = createAdminClient();
  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: userId,
      hero_name: heroName,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) throw error;

  revalidatePath("/dashboard");
};
