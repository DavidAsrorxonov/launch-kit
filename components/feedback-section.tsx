"use client";

import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

export default function FeedbackSection() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (message.trim().length < 10) {
      toast.error("Invalid Feedback", {
        description: "Please write at least 10 characters.",
        duration: 4000,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit feedback.");
      }

      toast.success("Feedback submitted.", {
        description: "Thanks! Your feedback helps improve LaunchKit.",
        duration: 4000,
      });

      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to submit feedback.", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="feedback"
      className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10"
    >
      <Card className="overflow-hidden border-white/10 bg-white/3 shadow-2xl backdrop-blur-xl">
        <CardHeader className="border-b border-white/10">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-[#5e49ba]/40 bg-[#5e49ba]/10">
            <MessageSquare className="h-5 w-5 text-[#9d8fe0]" />
          </div>

          <CardTitle className="max-w-2xl font-serif text-3xl text-white sm:text-4xl">
            Help shape LaunchKit
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <p className="max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            LaunchKit is still early. If something feels confusing, broken, or
            missing, your feedback will directly help improve the next version.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="group bg-[#5e49ba] text-white hover:bg-[#6e58cc]"
            >
              <Link
                href="mailto:asrorxonovdovudxon@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Give Feedback
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
