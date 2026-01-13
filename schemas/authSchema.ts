import * as z from "zod";

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: "Full name must be at least 3 characters long." })
      .max(50, { message: "Full name is too long." })
      .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ ]+$/, {
        message: "Full name can only contain letters and spaces.",
      }), // İsimde sayı veya özel karakter istemeyiz.

    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// Login Schema (Yeni ekliyoruz)
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export type SignupValues = z.infer<typeof signupSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
