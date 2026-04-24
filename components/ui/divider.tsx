export default function Divider() {
  return (
    <div className="relative z-10 mx-auto my-20 flex w-full max-w-7xl items-center justify-center px-6">
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/20 to-white/60" />
      <div className="mx-4 flex items-center justify-center">
        <div className="h-3 w-3 rotate-45 border border-white/70 bg-white/10 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.65)]" />
      </div>
      <div className="h-px flex-1 bg-linear-to-l from-transparent via-white/20 to-white/60" />
    </div>
  );
}
