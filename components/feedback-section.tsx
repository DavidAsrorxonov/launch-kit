"use client";
import { MessageSquare, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
        <CardContent className="grid gap-0 p-0 md:grid-cols-2">
          <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-white/10 bg-black/30 text-white placeholder:text-white/30"
              />

              <Textarea
                placeholder="What should LaunchKit improve?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="resize-none overflow-hidden border-white/10 bg-black/30 text-white placeholder:text-white/30"
              />

              <Button
                type="submit"
                disabled={loading}
                className="group bg-[#5e49ba] text-white hover:bg-[#6e58cc]"
              >
                {loading ? "Sending..." : "Send Feedback"}
                {!loading && <Send className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#5e49ba]/40 bg-[#5e49ba]/10">
              <MessageSquare className="h-5 w-5 text-[#9d8fe0]" />
            </div>

            <h2 className="font-serif text-3xl text-white sm:text-4xl">
              Help shape LaunchKit
            </h2>

            <p className="text-sm leading-7 text-white/45 sm:text-base">
              LaunchKit is still early. If something feels confusing, broken, or
              missing, your feedback will directly help improve the next
              version.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
