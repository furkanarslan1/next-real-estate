import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Sunucu bileşenlerinde veritabanına erişmek için bu fonksiyonu kullanacağız
// We will use this function to access the database in Server Components
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component içinde cookie set etmek bazen hata verebilir,
            // Middleware bunu halledecektir. / Middleware will handle this.
          }
        },
      },
    }
  );
}
