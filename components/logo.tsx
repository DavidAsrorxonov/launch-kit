import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#5e49ba]/50 bg-[#5e49ba]/15 text-sm font-bold text-[#9d8fe0] transition-all duration-200 group-hover:border-[#5e49ba]/80 group-hover:bg-[#5e49ba]/25">
        L
      </div>
      <span className="text-sm font-semibold tracking-tight text-white/90 transition-colors group-hover:text-white">
        LaunchKit
      </span>
    </Link>
  );
};

export default Logo;
