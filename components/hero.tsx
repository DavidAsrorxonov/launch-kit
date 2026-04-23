import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Badge } from "./ui/badge";
import { useEffect, useRef } from "react";
import { tech } from "@/constants/tech";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 30;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-start justify-center px-6 pb-24 pt-32 md:px-10"
      style={{ "--mx": "0px", "--my": "0px" } as React.CSSProperties}
    >
      {/* Badge */}
      <div className="mb-8 animate-fade-in-up [animation-delay:0ms]">
        <Badge
          variant="outline"
          className="gap-2 border-[#5e49ba]/40 bg-[#5e49ba]/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#9d8fe0]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5e49ba] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5e49ba]" />
          </span>
          Built for solo developers
        </Badge>
      </div>

      <h1 className="animate-fade-in-up [animation-delay:80ms] max-w-4xl font-serif text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-tight">
        <span className="block text-white">Launch your</span>
        <span className="block italic text-[#5e49ba]">Next.js starter</span>
        <span className="block text-white/60">in minutes.</span>
      </h1>

      <p className="animate-fade-in-up [animation-delay:160ms] mt-8 max-w-xl text-base leading-relaxed text-white/40 sm:text-lg">
        Generate a production-ready starter with clean architecture, optional
        database modules, and a faster path from idea to&nbsp;working&nbsp;app.
      </p>

      <div className="animate-fade-in-up [animation-delay:240ms] mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          asChild
          size="lg"
          className="group bg-[#5e49ba] text-white hover:bg-[#6e58cc]"
        >
          <Link href="/wizard" className="flex items-center gap-2">
            Generate Starter
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="group border-white/10 bg-transparent text-white/50 hover:border-white/20 hover:bg-transparent hover:text-white/80"
        >
          <Play className="mr-2 h-4 w-4 text-[#5e49ba]" />
          See How It Works
        </Button>
      </div>

      <div className="animate-fade-in-up [animation-delay:320ms] mt-12 flex flex-wrap gap-2">
        {tech.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="border-white/10 bg-white/4 text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </section>
  );
};

export default Hero;
