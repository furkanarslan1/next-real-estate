"use server";

import { createClient } from "@/lib/supabase/server";
import { signupSchema, SignupValues } from "@/schemas/authSchema";
import { redirect } from "next/navigation";
import { success } from "zod";

export async function signUpAction(values: SignupValues) {
  //Veriyi sunucu tarafında tekrar doğrula / Re-validate data on the server
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields. Please check your data." };
  }

  const { email, password, fullName } = validatedFields.data;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // fullName'i user_metadata içine koyuyoruz ki Trigger bunu alabilsin
      // We put fullName into user_metadata so the Trigger can capture it
      data: {
        full_name: fullName,
      },
    },
  });
  if (error) {
    console.error("Auth Error:", error.message);
    return { error: error.message };
  }

  // Başarılı / Success
  // Not: E-posta onayı açıksa kullanıcıdan onay istenir.
  redirect("/login");
}
