"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema, SignupValues } from "@/schemas/authSchema";
import { signUpAction } from "@/app/(actions)/auth/signupAction";
import { toast } from "sonner";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  // 1. Form tanımlaması / Form definition
  // react-hook-form kullanarak Zod şeması ile bağlantı kuruyoruz.
  // We link the form with the Zod schema using react-hook-form.
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Form gönderimi / Form submission logic
  async function onSubmit(values: SignupValues) {
    // 1. İşlem başladığında bilgi ver / Inform when process starts
    const loadingToast = toast.loading("Creating your account...");
    try {
      const result = await signUpAction(values);
      if (result?.error) {
        console.error(result.error);
        toast.error("Registration failed", {
          description: result.error,
          id: loadingToast, // Mevcut toast'u güncellemek için id kullanıyoruz
        });
        return;
      }

      // Başarılı / Success
      toast.success("Account created successfully!", {
        description: "Please check your email to verify your account.",
        id: loadingToast,
      });

      // Formu temizle / Reset the form
      form.reset();
    } catch (error) {
      toast.error("An unexpected error occurred", {
        id: loadingToast,
      });
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Shadcn UI'ın Form bileşeni context'i sağlar / Shadcn UI's Form component provides context */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {/* Full Name Field */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />{" "}
                  {/* Hata mesajları burada görünür / Error messages appear here */}
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  {/* Kullanıcıya şifre kriterlerini hatırlatıyoruz */}
                  <p className="text-[0.8rem] text-muted-foreground">
                    At least 8 characters, one uppercase letter and one number.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3 pt-2">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>
            </div>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
