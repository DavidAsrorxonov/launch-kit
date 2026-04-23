"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  ArrowRight,
  Play,
  FolderTree,
  Database,
  FileCode2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useRef } from "react";
import { tech } from "@/constants/tech";
import { files } from "@/constants/files";

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
      className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-24 pt-32 md:px-10"
      style={{ "--mx": "0px", "--my": "0px" } as React.CSSProperties}
    >
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-start justify-center">
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
            Generate a production-ready starter with clean architecture,
            optional database modules, and a faster path from idea to working
            app.
          </p>

          <div className="animate-fade-in-up [animation-delay:240ms] mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="group bg-[#5e49ba] text-white !hover:bg-[#6e58cc]"
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
              type="button"
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
        </div>

        <div className="animate-fade-in-up [animation-delay:220ms] relative hidden lg:block">
          <div
            className="absolute -inset-10 rounded-full bg-[#5e49ba]/15 blur-3xl"
            style={{
              transform: "translate(var(--mx), var(--my))",
            }}
          />

          <Card className="relative overflow-hidden border-white/8 bg-[#0e0e0e]">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-[#5e49ba] via-[#7c6cd4] to-transparent" />

            <CardHeader className="border-b border-white/6 px-5 py-4">
              <div className="mb-4 flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-sm font-medium text-white/70">
                  launchkit.config.ts
                </CardTitle>
                <span className="rounded border border-[#5e49ba]/30 bg-[#5e49ba]/10 px-2 py-0.5 font-mono text-[10px] text-[#9d8fe0]">
                  preview
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-px p-0">
              <div className="border-b border-white/6 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <FolderTree className="h-3.5 w-3.5 text-[#5e49ba]" />
                  <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-white/30">
                    Generated structure
                  </span>
                </div>

                <div className="rounded-sm bg-black/40 px-4 py-3">
                  {files.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 py-0.75 font-mono text-[13px]"
                      style={{ paddingLeft: `${f.indent * 16}px` }}
                    >
                      {f.type === "dir" ? (
                        <>
                          <span className="text-[#5e49ba]/70">▸</span>
                          <span className="text-white/50">{f.name}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-white/15">│</span>
                          <span className="text-white/35">{f.name}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-white/6 border-b border-white/6">
                <div className="p-5">
                  <div className="mb-2.5 flex items-center gap-2">
                    <Database className="h-3.5 w-3.5 text-[#5e49ba]" />
                    <span className="text-xs font-semibold text-white/60">
                      Database
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-white/30">
                    MongoDB support with a test route and starter model
                    included.
                  </p>
                </div>

                <div className="p-5">
                  <div className="mb-2.5 flex items-center gap-2">
                    <FileCode2 className="h-3.5 w-3.5 text-[#5e49ba]" />
                    <span className="text-xs font-semibold text-white/60">
                      Output
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-white/30">
                    Download a clean starter you can install and run
                    immediately.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-[#5e49ba]/8 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5e49ba] opacity-60" />
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#5e49ba]" />
                  </span>
                  <span className="font-mono text-[11px] text-[#9d8fe0]/80">
                    Ready to generate
                  </span>
                </div>
                <span className="font-mono text-[11px] text-white/20">
                  v1.0.0
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
