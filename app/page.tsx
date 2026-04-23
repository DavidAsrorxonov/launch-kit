"use client";

import { Navbar } from "@/components/navbar";
import Grid from "@/components/effect/grid";
import Vignette from "@/components/effect/vignette";
import Glow from "@/components/effect/glow";
import Hero from "@/components/hero";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080808] text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <Glow />
        <Grid />
        <Vignette />
      </div>

      <Navbar />

      <Hero />

      <Footer />
    </main>
  );
}
