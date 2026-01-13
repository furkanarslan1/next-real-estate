"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, LoginValues } from "@/schemas/authSchema";
import { revalidatePath } from "next/cache";

export async function signInAction(values: LoginValues) {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email or password format." };
  }

  const { email, password } = validatedFields.data;
  const supabase = await createClient();

  // 2. Giriş İşlemi / Sign In Process
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Invalid credentials. Please try again." };
  }

  // 3. Cache Temizleme ve Yönlendirme / Revalidate and Sync
  // Kullanıcı giriş yaptığı için layout ve header verilerinin yenilenmesini sağlarız.
  revalidatePath("/", "layout");
  return { success: "Welcome back! Redirecting..." };
}
