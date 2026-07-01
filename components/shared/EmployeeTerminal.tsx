export default function EmployeeTerminal() {
  return (
    <div className="w-full max-w-md rounded-sm border border-zinc-700 bg-zinc-950 p-4 shadow-[0_0_70px_rgba(132,204,22,0.12)]">
      <div className="border border-zinc-800 bg-[#151515] p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
            Duskout Company Network
          </p>
          <div className="h-3 w-3 rounded-full bg-lime-300 shadow-[0_0_15px_rgba(190,242,100,0.9)]" />
        </div>

        <div className="relative overflow-hidden border border-lime-300/30 bg-[#071007] p-5 font-mono text-lime-300">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100%_6px]" />

          <p>Status</p>
          <p className="mt-2">● Online</p>
          <p className="mt-6 animate-pulse">Ready to clock in...</p>
        </div>

        <a
          href="#assignment"
          className="mt-5 block border border-lime-300 bg-lime-300 px-6 py-4 text-center font-black uppercase tracking-[0.25em] text-black transition hover:bg-black hover:text-lime-300"
        >
          Clock In
        </a>

        <div className="mt-5 rotate-[1deg] bg-[#f3ead7] p-4 text-center text-xs font-bold text-black shadow-lg">
          <p>DUSKOUT GAMES</p>
          <p>EMPLOYEE TIME CARD</p>
          <p className="mt-3">SHIFT: NIGHT</p>
          <p>STATUS: PENDING</p>
        </div>
      </div>
    </div>
  );
}