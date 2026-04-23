"use client";

import { useState } from "react";
import { ArrowRight, Database, FolderCog, Sparkles } from "lucide-react";

import { Navbar } from "@/components/navbar";
import Glow from "@/components/effect/glow";
import Grid from "@/components/effect/grid";
import Vignette from "@/components/effect/vignette";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function WizardPage() {
  const [projectName, setProjectName] = useState("");
  const [db, setDb] = useState<"" | "mongodb">("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setError("");

    if (!projectName.trim()) {
      setError("Please enter a project name.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName,
          db: db || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate project");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${projectName || "launchkit-project"}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while generating your starter.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080808] text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <Glow />
        <Grid />
        <Vignette />
      </div>

      <Navbar />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32 md:px-10">
        <div className="mb-10">
          <Badge
            variant="outline"
            className="mb-5 gap-2 border-[#5e49ba]/40 bg-[#5e49ba]/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#9d8fe0]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Starter wizard
          </Badge>

          <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Configure your starter
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            Choose your project name and modules, then generate a clean Next.js
            starter that is ready to install and run.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <Card className="border-white/10 bg-white/3 shadow-2xl backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-white">Project setup</CardTitle>
              <CardDescription className="text-white/40">
                Start with the essentials. More modules can come later.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8 p-6">
              <div className="space-y-3">
                <Label htmlFor="project-name" className="text-white/80">
                  Project name
                </Label>
                <Input
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="launchkit-app"
                  className="h-12 border-white/10 bg-black/30 text-white placeholder:text-white/25 focus-visible:ring-[#5e49ba]"
                />
                <p className="text-xs text-white/35">
                  This will be used in the generated package name and README.
                </p>
              </div>

              <div className="space-y-4">
                <Label className="text-white/80">Database</Label>

                <div className="grid gap-4 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setDb("")}
                    className={`rounded-2xl border p-4 text-left transition ${
                      db === ""
                        ? "border-[#5e49ba]/70 bg-[#5e49ba]/10"
                        : "border-white/10 bg-white/2 hover:border-white/20"
                    }`}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <FolderCog className="h-4 w-4 text-[#9d8fe0]" />
                      <span className="font-medium text-white">
                        No database
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-white/40">
                      Generate the base starter only.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDb("mongodb")}
                    className={`rounded-2xl border p-4 text-left transition ${
                      db === "mongodb"
                        ? "border-[#5e49ba]/70 bg-[#5e49ba]/10"
                        : "border-white/10 bg-white/2 hover:border-white/20"
                    }`}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <Database className="h-4 w-4 text-[#9d8fe0]" />
                      <span className="font-medium text-white">MongoDB</span>
                    </div>
                    <p className="text-sm leading-6 text-white/40">
                      Add Mongoose, a DB helper, starter model, and test route.
                    </p>
                  </button>
                </div>
              </div>

              {error ? (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  size="lg"
                  className="group bg-[#5e49ba] text-white hover:bg-[#6e58cc]"
                >
                  {isLoading ? "Generating..." : "Generate Starter"}
                  {!isLoading && (
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  )}
                </Button>

                <p className="text-sm text-white/35">
                  Downloads a zip instantly from your current configuration.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/10 bg-white/3 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Live summary</CardTitle>
                <CardDescription className="text-white/40">
                  A quick look at what will be generated.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 text-sm">
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="mb-2 text-xs uppercase tracking-widest text-white/30">
                    Project
                  </p>
                  <p className="font-medium text-white">
                    {projectName.trim() || "launchkit-app"}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="mb-2 text-xs uppercase tracking-widest text-white/30">
                    Database
                  </p>
                  <p className="font-medium text-white">
                    {db === "mongodb" ? "MongoDB" : "None"}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="mb-3 text-xs uppercase tracking-widest text-white/30">
                    Output files
                  </p>

                  <div className="space-y-2 text-white/45">
                    <div>app/page.tsx</div>
                    <div>app/layout.tsx</div>
                    <div>README.md</div>
                    <div>package.json</div>
                    <div>.env</div>

                    {db === "mongodb" && (
                      <>
                        <div>lib/db.ts</div>
                        <div>models/User.ts</div>
                        <div>app/api/test-db/route.ts</div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#5e49ba]/30 bg-[#5e49ba]/10 backdrop-blur-xl">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-[#d7cff7]">
                  Current scope: one framework, one core DB option, one-click
                  zip generation.
                </p>
                <p className="mt-2 text-sm leading-6 text-[#d7cff7]/70">
                  That is exactly the right amount for v1.0.0.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
