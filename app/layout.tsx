import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LaunchKit — Generate a Next.js Starter in Minutes",
  description:
    "LaunchKit helps you generate a production-ready Next.js starter with optional database modules, clean structure, and ready-to-run setup — without rebuilding from scratch.",

  keywords: [
    "Next.js starter",
    "SaaS boilerplate",
    "Next.js generator",
    "developer tools",
    "project scaffolding",
    "MongoDB starter",
    "full stack starter",
  ],

  authors: [{ name: "David Asrorxonov" }],

  openGraph: {
    title: "LaunchKit — Generate a Next.js Starter in Minutes",
    description:
      "Build faster with a clean, production-ready Next.js starter. Includes modular database setup and instant ZIP generation.",
    url: "https://launchkit.dovudkhon.com",
    siteName: "LaunchKit",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "LaunchKit Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "LaunchKit — Generate a Next.js Starter in Minutes",
    description:
      "Skip boilerplate. Generate a clean Next.js starter with optional modules and start building immediately.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <Analytics />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
