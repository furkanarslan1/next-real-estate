"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, LoginValues } from "@/schemas/authSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction(values: LoginValues) {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email or password format." };
  }

  const { email, password } = validatedFields.data;
  const supabase = await createClient();

  // 2. Giriş İşlemi / Sign In Process
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !user) {
    return { error: "Invalid credentials. Please try again." };
  }
  // 2. Kullanıcının rolünü profilden çek / Fetch user role from profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError) return { error: "Profile not found." };

  // 3. Cache Temizleme ve Yönlendirme / Revalidate and Sync
  // Kullanıcı giriş yaptığı için layout ve header verilerinin yenilenmesini sağlarız.
  revalidatePath("/", "layout");

  // 4. Role göre yönlendir / Redirect based on role
  if (profile.role === "admin") {
    redirect("/admin");
  } else {
    redirect("/");
  }
}
