import React from "react";
import AboutHero from "./_components/AboutHero";
import AboutStats from "./_components/AboutStats";
import AboutStory from "./_components/AboutStory";
import AboutValues from "./_components/AboutValues";

export default function page() {
  return (
    <div>
      <AboutHero />
      <AboutStats />
      <AboutStory />
      <AboutValues />
    </div>
  );
}
