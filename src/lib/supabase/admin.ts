import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only: uses the Supabase service role key, which bypasses RLS.
// Every query built on top of this MUST filter by the Clerk user id itself.
export const createAdminClient = () => {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
};
