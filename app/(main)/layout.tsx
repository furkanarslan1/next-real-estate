import React from "react";
import Header from "./_components/header/Header";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  //   const supabase = await createServerSupabase();
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  return (
    <>
      {/* <header className="absolute top-0 left-0 w-full z-30"> */}
      <header className="absolute top-0 left-0 w-full z-30">
        {/* <Header user={user} /> */}
        <Header />
      </header>
      <main className="min-h-screen ">{children}</main>
      {/* <Footer /> */}
    </>
  );
}
