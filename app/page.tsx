"use client";

import { Navbar } from "@/components/navbar";
import Grid from "@/components/effect/grid";
import Vignette from "@/components/effect/vignette";
import Glow from "@/components/effect/glow";
import Hero from "@/components/hero";

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
      {/* ── Scroll indicator ── */}
      {/* <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 animate-fade-in-up [animation-delay:600ms]">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">
          scroll
        </span>
        <div className="h-8 w-px bg-linear-to-b from-white/20 to-transparent" />
      </div> */}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');
        .font-serif { font-family: 'DM Serif Display', Georgia, serif; }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>
    </main>
  );
}
