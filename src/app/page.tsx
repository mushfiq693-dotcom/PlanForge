"use client";

import React from "react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingShowcase } from "@/components/landing/LandingShowcase";
import { LandingHowItWorks } from "@/components/landing/LandingHowItWorks";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-text font-sans selection:bg-primary/20 selection:text-primary">
      {/* Sticky Navigation */}
      <LandingNavbar />

      {/* Main Landing Flow */}
      <main className="flex-1 flex flex-col">
        <LandingHero />
        <LandingFeatures />
        <LandingShowcase />
        <LandingHowItWorks />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
