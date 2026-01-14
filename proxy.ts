import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy function (formerly middleware)
 * All admin access control and session management happens here.
 * Tüm admin erişim kontrolü ve oturum yönetimi burada gerçekleşir.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
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

  // Get current user session / Mevcut kullanıcı oturumunu al
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ADMIN ACCESS CONTROL / ADMİN ERİŞİM KONTROLÜ
  // If the path starts with /admin, check user privileges
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // 1. Check if user is logged in / Giriş yapılmış mı?
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 2. Check if user has admin role / Admin yetkisi var mı?
    // Note: This requires 'role' column in your profiles table
    // Not: Bu, profiles tablonuzda 'role' sütunu olmasını gerektirir
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      // If not admin, send to homepage
      // Admin değilse ana sayfaya gönder
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

/**
 * Config to match specific paths
 * Belirli yolları eşleştirmek için yapılandırma
 */
export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
