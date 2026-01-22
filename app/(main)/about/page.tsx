import React from "react";
import type { Metadata } from "next";
import AboutHero from "./_components/AboutHero";
import AboutStats from "./_components/AboutStats";
import AboutStory from "./_components/AboutStory";
import AboutValues from "./_components/AboutValues";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title: "About Us | Modern Real Estate Experts",
    description:
      "Learn more about our real estate company, our mission, values, and experience in residential and commercial property listings.",

    alternates: {
      canonical: `${siteUrl}/about`,
    },

    openGraph: {
      title: "About Us | Modern Real Estate Experts",
      description:
        "Discover our story, values, and expertise in modern real estate.",
      url: `${siteUrl}/about`,
      siteName: "Next Real Estate",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "About Us | Modern Real Estate Experts",
      description: "Meet the team behind a modern real estate platform.",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Next Real Estate",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    description:
      "A modern real estate platform offering residential and commercial properties.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        <AboutHero />
        <AboutStats />
        <AboutStory />
        <AboutValues />
      </div>
    </>
  );
}
