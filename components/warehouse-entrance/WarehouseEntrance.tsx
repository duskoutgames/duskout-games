import EmployeeTerminal from "@/components/shared/EmployeeTerminal";

export default function WarehouseEntrance() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05030a] px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(145,80,255,0.22),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),#05030a_85%)]" />

      <div className="absolute left-[8%] top-[20%] hidden h-[420px] w-[120px] border border-white/10 bg-white/[0.03] shadow-2xl md:block">
        <div className="h-1/3 border-b border-white/10 bg-black/30" />
        <div className="h-1/3 border-b border-white/10 bg-black/20" />
      </div>

      <div className="absolute right-[8%] top-[24%] hidden h-[360px] w-[140px] border border-white/10 bg-white/[0.03] shadow-2xl md:block">
        <div className="h-1/2 border-b border-white/10 bg-black/30" />
      </div>

      <div className="absolute bottom-16 left-[12%] hidden h-24 w-48 rotate-[-2deg] border border-yellow-500/30 bg-yellow-900/10 md:block" />
      <div className="absolute bottom-20 right-[14%] hidden h-20 w-52 rotate-[2deg] border border-white/10 bg-white/[0.04] md:block" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
        <div className="mb-8 border border-purple-400/50 bg-black/60 px-10 py-6 shadow-[0_0_60px_rgba(168,85,247,0.25)]">
          <p className="text-xs uppercase tracking-[0.5em] text-lime-300">
            Authorized Personnel Only
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase leading-none tracking-tight text-purple-300 md:text-8xl">
            Duskout
            <br />
            Games
          </h1>
        </div>

        <p className="mb-8 max-w-xl text-gray-400">
          Welcome back, employee. Your shift begins now.
        </p>

        <EmployeeTerminal />
      </div>

      <p className="absolute bottom-8 left-8 text-xs uppercase tracking-[0.35em] text-gray-600">
        Warehouse Temp: 61°F
      </p>

      <p className="absolute bottom-8 right-8 hidden text-xs uppercase tracking-[0.35em] text-gray-600 md:block">
        Management is watching.
      </p>
    </section>
  );
}