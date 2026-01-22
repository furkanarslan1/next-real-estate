import type { Metadata } from "next";
import React from "react";
import ContactHero from "./_components/ContactHero";
import ContactContent from "./_components/ContactContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Contact Us | Next Real Estate",
  description:
    "Get in touch with Next Real Estate for property inquiries, buying, selling, or investment opportunities in Turkey.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Next Real Estate",
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "RealEstateAgent",
      name: "Next Real Estate",
      url: siteUrl,
      areaServed: {
        "@type": "Country",
        name: "Turkey",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["English"],
      },
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <div>
        <ContactHero />
        <ContactContent />
      </div>
    </>
  );
}
