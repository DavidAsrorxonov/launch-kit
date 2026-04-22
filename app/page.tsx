import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20 md:px-10">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground">
            Build for solo developers
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Launch your Next.js starter in minutes
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Generate a production-ready starter with clean structure, optional
            database modules, and a faster path from idea to working app.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/wizard">Generate Starter</Link>
            </Button>

            <Button variant="outline" size="lg">
              See How It Works
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="rounded-full border px-3 py-1">Next.js</span>
            <span className="rounded-full border px-3 py-1">MongoDB</span>
            <span className="rounded-full border px-3 py-1">Modular</span>
            <span className="rounded-full border px-3 py-1">Fast setup</span>
          </div>
        </div>
      </section>
    </main>
  );
}
