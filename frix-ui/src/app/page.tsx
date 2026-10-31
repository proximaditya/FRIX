"use client";

/**
 * FRIX Landing Page — The Arena of Ideas
 *
 * Public landing page composing all sections.
 * Existing arena/auth functionality remains untouched at /arena/[id] routes.
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LiveArenas from "@/components/LiveArenas";
import HowItWorks from "@/components/HowItWorks";
import OrbSystem from "@/components/OrbSystem";
import Stats from "@/components/Stats";
import AuraRankings from "@/components/AuraRankings";
import Features from "@/components/Features";
import Carousel from "@/components/Carousel";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Preloader from "@/components/Preloader";

export default function LandingPage() {
  return (
    <>
      {/* Preloader animation on initial load */}
      <Preloader />

      {/* Fixed navigation bar */}
      <Navbar />

      {/* Page Sections */}
      <main>
        {/* Hero: Headline + CTA */}
        <Hero />

        {/* Live Arenas: Trending debates */}
        <LiveArenas />

        {/* How It Works: Step-by-step process */}
        <HowItWorks />

        {/* The Orb System: Strategic challenges */}
        <OrbSystem />

        {/* Animated Statistics Counter */}
        <Stats />

        {/* Aura Rankings: Leaderboard */}
        <AuraRankings />

        {/* Platform Features */}
        <Features />

        {/* Testimonial Carousel */}
        <Carousel />

        {/* FAQ Accordion */}
        <FAQ />

        {/* Newsletter Subscription */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating back-to-top button */}
      <BackToTop />
    </>
  );
}