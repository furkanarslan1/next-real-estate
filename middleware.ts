import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Bu fonksiyon her istekte (request) çalışır / This function runs on every request
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 1. Supabase istemcisini oluşturuyoruz / Creating the Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Cookie'leri hem request hem de response'a set ediyoruz
          // Setting cookies to both request and response for sync
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 2. Kullanıcı verisini güvenli bir şekilde alıyoruz / Securely getting the user data
  // getUser() her zaman veritabanı ile doğrulama yapar / getUser() always validates with the DB
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 3. Yetkilendirme Kontrolü (Admin Paneli Koruması) / Authorization Check
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminPage) {
    // Giriş yapmamışsa login sayfasına at / Redirect to login if not authenticated
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Rolü 'admin' değilse ana sayfaya at / Redirect to home if user role is not admin
    // app_metadata içindeki rolü kontrol ediyoruz / Checking role in app_metadata
    const userRole = user?.app_metadata?.role;
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

// Middleware'in hangi sayfalarda çalışacağını filtreliyoruz / Filtering paths for Middleware
export const config = {
  matcher: [
    /*
     * Aşağıdaki path'ler DIŞINDAKİ her istekte çalışır:
     * - _next/static (statik dosyalar)
     * - _next/image (resim optimizasyonu)
     * - favicon.ico, sitemap, robots (metadata dosyaları)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
