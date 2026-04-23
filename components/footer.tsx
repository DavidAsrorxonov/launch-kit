import Link from "next/link";
import { Button } from "./ui/button";
import { GitHub } from "./icon/github";

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#080808]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-10">
        <div className="text-sm text-white/40">
          <p>© {new Date().getFullYear()} LaunchKit</p>
          <p className="text-white/30">
            If LaunchKit helps you, a star on GitHub is greatly appreciated.
          </p>
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-white/10 bg-transparent text-muted-foreground"
        >
          <Link
            href="https://github.com/DavidAsrorxonov/launch-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <GitHub />
            GitHub
          </Link>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
