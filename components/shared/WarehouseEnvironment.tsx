export default function WarehouseEnvironment() {
  return (
    <>
      {/* Warehouse Wall */}
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(to_bottom,#1a1a1a_0%,#111111_35%,#090909_100%)] opacity-70" />

      {/* Wall Panels */}
      <div className="absolute inset-x-0 top-[120px] h-px bg-white/5" />
      <div className="absolute inset-x-0 top-[240px] h-px bg-white/5" />
      <div className="absolute inset-x-0 top-[360px] h-px bg-white/5" />

      <div className="absolute inset-y-0 left-[25%] w-px bg-white/5" />
      <div className="absolute inset-y-0 left-[50%] w-px bg-white/5" />
      <div className="absolute inset-y-0 left-[75%] w-px bg-white/5" />

      {/* Left Shelf */}
      <div className="absolute left-8 top-24 hidden h-72 w-28 border border-white/10 bg-zinc-950/80 md:block">
        <div className="h-1/3 border-b border-white/10 bg-black/30" />
        <div className="h-1/3 border-b border-white/10 bg-black/20" />
      </div>

      {/* Right Crate */}
      <div className="absolute right-10 bottom-28 hidden h-40 w-56 rotate-[1deg] border border-white/10 bg-zinc-950/80 md:block" />

      {/* Forklift Sign */}
      <div className="absolute left-16 bottom-28 hidden rotate-[-3deg] border border-yellow-500/30 bg-yellow-950/20 px-6 py-4 text-xs uppercase tracking-[0.2em] text-yellow-500/70 md:block">
        Forklift
        <br />
        Unavailable
      </div>

      {/* Bay Number */}
      <div className="absolute right-12 top-32 hidden text-right text-6xl font-black uppercase leading-none text-white/10 md:block">
        Bay
        <br />
        07
      </div>
    </>
  );
}