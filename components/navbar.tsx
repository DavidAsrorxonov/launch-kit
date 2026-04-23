"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Logo from "./logo";
import { navLinks } from "@/constants/nav-links";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-[#080808]/90 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button asChild key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <Button
          asChild
          size="sm"
          className="group bg-[#5e49ba] text-white !hover:bg-[#6e58cc]"
        >
          <Link href="/wizard" className="flex items-center gap-1.5">
            Generate Starter
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
