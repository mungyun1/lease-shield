"use client";

import {
  Header,
  Hero,
  Stats,
  Features,
  Benefits,
  HowItWorks,
  CTA,
  Footer,
} from "@/components";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <Benefits />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
