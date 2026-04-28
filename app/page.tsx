"use client";

import { Navbar } from "@/components/navbar";
import Grid from "@/components/effect/grid";
import Vignette from "@/components/effect/vignette";
import Glow from "@/components/effect/glow";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import FeedbackSection from "@/components/feedback-section";
import Divider from "@/components/ui/divider";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080808] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 hidden md:block">
        <Glow />
        <Grid />
        <Vignette />
      </div>

      <Navbar />
      <Hero />
      <Divider />
      <FeedbackSection />
      <Footer />
    </main>
  );
}
