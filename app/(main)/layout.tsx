import React from "react";
import Header from "./_components/header/Header";
import Footer from "./_components/Footer";
import type { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  return {
    title: "Modern Real Estate Listings | Buy & Rent Properties",
    description:
      "Discover modern residential and commercial properties. Browse apartments, houses, and investment opportunities with detailed listings and real prices.",

    metadataBase: new URL(siteUrl),

    alternates: {
      canonical: siteUrl,
    },

    openGraph: {
      title: "Modern Real Estate Listings | Buy & Rent Properties",
      description:
        "Browse the best residential and commercial real estate listings.",
      url: siteUrl,
      siteName: "Next Real Estate",
      type: "website",
      images: [
        {
          url: "/og-home.webp",
          width: 1200,
          height: 630,
          alt: "Modern Real Estate Platform",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Modern Real Estate Listings",
      description:
        "Find apartments, houses and commercial real estate with real prices.",
      images: ["/og-home.jpg"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Next Real Estate",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target:
        process.env.NEXT_PUBLIC_SITE_URL +
        "/properties?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white text-black p-2 z-50"
      >
        Skip to content
      </a>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white text-black p-2 z-50"
      >
        Skip to content
      </a>
      <header role="banner" className="absolute top-0 left-0 w-full z-30">
        <Header />
      </header>
      <main id="main-content" className="min-h-screen ">
        {children}
      </main>
      <footer role="contentinfo">
        <Footer />
      </footer>
    </>
  );
}
