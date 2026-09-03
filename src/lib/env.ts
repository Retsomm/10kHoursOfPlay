export const clerkConfigured = (): boolean => {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  );
};

export const supabaseConfigured = (): boolean => {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
};

export const appConfigured = (): boolean => clerkConfigured() && supabaseConfigured();
