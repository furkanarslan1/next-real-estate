import { createBrowserClient } from "@supabase/ssr";

// Tarayıcı tarafında çalışan (use client) bileşenler için
// For components running on the browser side
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
