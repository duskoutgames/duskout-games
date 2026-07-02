"use client";

import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { Anton, Bangers } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: "400" });
const bangers = Bangers({ subsets: ["latin"], weight: "400" });

const barcodeBars = [2, 4, 1, 3, 2, 5, 1, 4, 2, 3, 1, 5, 2, 4, 3, 1, 2, 5, 3, 1];

const facilityDirectory = [
  { label: "Warehouse Entrance", href: "#top", icon: "home" },
  { label: "Employee Handbook", href: "#about", icon: "book" },
  { label: "Assignment Room", href: "#assignment", icon: "clipboard" },
  { label: "Mission Control", href: "#recovery-loop", icon: "target" },
  { label: "Employee Records", href: "#haulers", icon: "id" },
  { label: "HR Office", href: "#hr", icon: "person" },
  { label: "Clock Out", href: "#footer", icon: "power" },
];

const directoryIcons: Record<string, ReactNode> = {
  home: (
    <path d="M3 10.5 12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5" />
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5V5.5" />
      <path d="M8 8h8M8 11h8" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="1.5" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 11h6M9 15h6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
  id: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6 16c.7-1.7 2-2.5 3-2.5s2.3.8 3 2.5M14 9h5M14 13h5" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21c1.2-4 4-6 7-6s5.8 2 7 6" />
    </>
  ),
  power: (
    <>
      <path d="M12 3v8" />
      <path d="M7 6a8 8 0 1 0 10 0" />
    </>
  ),
};

const lockedLocations = [
  { file: "Location File #071", name: "Shipwreck", threat: "?????" },
  { file: "Location File #133", name: "Carnival", threat: "?????" },
  { file: "Location File #198", name: "Hospital", threat: "?????" },
];

const residents = [
  {
    name: "The Curator",
    desc: "Patrols the galleries. Moves faster when angered.",
    tip: "Don't touch what you don't own.",
    icon: "curator",
  },
  {
    name: "The Living Statue",
    desc: "Motionless while seen. Gets closer over time.",
    tip: "Keep an eye on the statues.",
    icon: "statue",
  },
  {
    name: "The Painter",
    desc: "Enters and exits paintings. Can attack from inside.",
    tip: "Not all art is... visual.",
    icon: "painter",
  },
  {
    name: "The Fossil",
    desc: "Attracted to loud sounds. Destroys objects when enraged.",
    tip: "Silence is survival.",
    icon: "fossil",
  },
  {
    name: "The Lost Child",
    desc: "Does not attack. Leads you deep into the museum.",
    tip: "Don't follow strangers.",
    icon: "child",
  },
  {
    name: "The Archivist",
    desc: "Reorganizes the museum. Changes room layouts.",
    tip: "Remember nothing.",
    icon: "archivist",
  },
];

const residentIcons: Record<string, ReactNode> = {
  curator: (
    <path d="M7 18h10M7.5 18c0-1.2.2-2.2.7-3h7.6c.5.8.7 1.8.7 3M9 15V9a3 3 0 0 1 6 0v6M8 9h8" />
  ),
  statue: (
    <>
      <circle cx="12" cy="6" r="2.5" />
      <path d="M8.5 21v-5a3.5 3.5 0 0 1 7 0v5M5.5 21h13" />
    </>
  ),
  painter: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </>
  ),
  fossil: (
    <path d="M6.5 8.5a2 2 0 1 1 2.7-2.9 2 2 0 0 1-.3 2.9l6.6 6.6a2 2 0 1 1-2.7 2.9 2 2 0 0 1 .3-2.9z" />
  ),
  child: (
    <>
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="7" cy="6.5" r="1.8" />
      <circle cx="17" cy="6.5" r="1.8" />
    </>
  ),
  archivist: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5V5.5M8 8h8M8 11h5" />
    </>
  ),
};

const haulers = [
  {
    name: "Rookie",
    role: "Analyst",
    id: "NH-4040-R",
    image: "/assets/haulers/rookie.png",
    quote: "If it's more than 5 pounds... that's your problem.",
    personality:
      "Quiet, observant, and a little sarcastic. Prefers spreadsheets over small talk. Will absolutely side-eye anyone who complains about carrying capacity.",
    roleSummary:
      "Scans, surveys, and provides valuable intel for the team. Finds what others might miss.",
    ability: {
      name: "Survey",
      cooldown: "45s",
      desc: "Scans the area to reveal valuable information.",
      bullets: [
        "Highlights valuable loot",
        "Reveals hidden shortcuts",
        "Marks objectives",
        "Displays threat indicators",
      ],
    },
    weakness: {
      name: "Lightweight",
      desc: "Can only carry items that weigh 5 lb (2.3 kg) or less.",
      quote: "My back says 'no thank you.'",
    },
    lore: "Rookie used to think field work would be easy. Now they know better. Still wouldn't trade the team for anything. (Well... maybe a bigger bag.)",
    gear: ["Clipboard", "Survey Tablet", "Messenger Bag", "Employee Badge"],
  },
  {
    name: "Squeaky",
    role: "Scout",
    id: "NH-0122-S",
    image: "/assets/haulers/squeaky.png",
    quote: "If I'm fast, we all get home in one piece!",
    personality:
      "Energetic and fearless. Loves exploring new places, even if they're haunted. Acts first, thinks later, usually apologizes after.",
    roleSummary:
      "Fast and agile. Explores ahead and finds the safest path for the team.",
    ability: {
      name: "Zoom",
      cooldown: "25s",
      desc: "Dash forward in a burst of speed.",
      bullets: [
        "Move faster",
        "Vault quicker",
        "Quick escape",
        "Great for kiting",
      ],
    },
    weakness: {
      name: "Low Endurance",
      desc: "Gets tired quickly. Stamina drains faster than the rest of the team.",
      quote: "Need a sec.. my legs are on break.",
    },
    lore: "Squeaky grew up watching adventure movies and dreamed of being the hero. Night Haulers was the closest thing to that dream. Now she runs through haunted places so the team doesn't have to.",
    gear: ["Flashlight", "Whistle", "Energy Drink", "Band-Aid", "Carrot Charm"],
  },
  {
    name: "Rex",
    role: "Hauler",
    id: "NH-0830-R",
    image: "/assets/haulers/rex.png",
    quote: "Big things don't scare me. Doors do.",
    personality:
      "Strong, loyal, and good-natured. Always volunteers to carry the heavy stuff. Doesn't complain (about much). Scared of doors.",
    roleSummary:
      "Carries the heaviest loot and transports large items for the team.",
    ability: {
      name: "Heavy Hauler",
      cooldown: null,
      desc: "Carries the heaviest loot in the game.",
      bullets: [
        "Increased carry weight",
        "Reduced slow down when carrying heavy items",
      ],
    },
    weakness: {
      name: "Door Trouble",
      desc: "His tiny arms make interacting with doors, keypads, levers, and small mechanisms slower.",
      quote: "Pull? Push? Why door so hard...",
    },
    lore: "Rex used to work at his uncle's moving company. Haunted places just pay better. Still doesn't understand why doors refuse to cooperate.",
    gear: ["Backpack+", "Crowbar", "Utility Gloves", "Lucky Dino", "Energy Drink"],
  },
  {
    name: "Poke",
    role: "Chef",
    id: "NH-0711-P",
    image: "/assets/haulers/poke.png",
    quote: "Food is fuel. Boring food is just... sadness with extra steps.",
    personality:
      "Laid-back and creative. Lives for good food and new flavors. When bored, he zones out and drifts into his own world.",
    roleSummary: "Keeps the team going longer. Stamina is everything.",
    ability: {
      name: "Energy Feast",
      cooldown: "60s",
      desc: "Serves a special dish that increases teammates' stamina regeneration and max stamina for a limited time.",
      bullets: [
        "Longer stamina duration",
        "Faster stamina regen",
        "Keeps the team moving",
      ],
    },
    weakness: {
      name: "Easily Bored",
      desc: "If Poke doesn't find anything that intrigues him for too long, he gets lazy, slows down, and starts seeing things that aren't real.",
      quote: "Wait... was that a dancing meatball?",
    },
    lore: "Poke joined Night Haulers searching for the perfect ingredients. He may never find them, but he'll cook whatever he finds along the way.",
    gear: ["Chef Bag", "Cookbook", "Spice Jars", "Frying Pan", "Lucky Apron"],
  },
  {
    name: "Momo",
    role: "Support",
    id: "NH-0590-M",
    image: "/assets/haulers/momo.png",
    quote: "I'll patch you up, don't worry. Let's get back in one piece.",
    personality:
      "Kind, nurturing, and dependable. Treats every Hauler like family. Calm under pressure and always knows what to do.",
    roleSummary: "Keeps the team alive and in good shape. Always has their back.",
    ability: {
      name: "Comfort Tea",
      cooldown: "45s",
      desc: "Heals and boosts the team for a short time.",
      bullets: [
        "Heal teammates",
        "Remove minor debuffs",
        "Increase stamina regen",
        "Calm nearby Haulers",
      ],
    },
    weakness: {
      name: "Bad Hearing",
      desc: "Momo has trouble hearing important sounds. Audio cues are much harder for her to detect.",
      quote: "Huh? What was that, sweetie?",
    },
    lore: "Momo keeps a photo of her \"grand-haulers\" in her bag. She may act sweet, but she won't hesitate to scold anyone who puts the team in danger.",
    gear: ["Med Kit", "Tea Thermos", "Bandages", "Bunny Slippers", "Photo Charm"],
  },
];

const loop = [
  {
    n: 1,
    title: "Clock In",
    color: "purple",
    points: ["Badge scan at the door.", "Grab today's assignment sheet."],
  },
  {
    n: 2,
    title: "Get Assigned",
    color: "lime",
    points: ["Pick your Hauler.", "No duplicates on shift."],
  },
  {
    n: 3,
    title: "Deploy",
    color: "purple",
    points: ["Load into the van.", "Approach the unknown."],
  },
  {
    n: 4,
    title: "Explore",
    color: "lime",
    points: ["Search for cargo.", "Solve what's in your way."],
  },
  {
    n: 5,
    title: "Recover Relic",
    color: "amber",
    points: ["Locate the priority relic.", "This is the job. Don't forget it."],
  },
  {
    n: 6,
    title: "Extract",
    color: "red",
    points: ["Everyone reaches the van.", "No Hauler left behind."],
  },
  {
    n: 7,
    title: "Clock Out",
    color: "purple",
    points: ["Badge scan on the way out.", "Repeat tomorrow."],
  },
];

const colorMap: Record<
  string,
  { border: string; bg: string; glow: string; badge: string }
> = {
  purple: {
    border: "border-purple-400/30 hover:border-purple-300/60",
    bg: "bg-purple-950/20 hover:bg-purple-950/40",
    glow: "hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]",
    badge: "bg-purple-400 text-purple-950",
  },
  lime: {
    border: "border-lime-300/30 hover:border-lime-300/60",
    bg: "bg-lime-950/10 hover:bg-lime-950/20",
    glow: "hover:shadow-[0_0_25px_rgba(190,242,100,0.2)]",
    badge: "bg-lime-300 text-lime-950",
  },
  amber: {
    border: "border-amber-400/40 hover:border-amber-300/70",
    bg: "bg-amber-950/20 hover:bg-amber-950/40",
    glow: "hover:shadow-[0_0_25px_rgba(251,191,36,0.25)]",
    badge: "bg-amber-400 text-amber-950",
  },
  red: {
    border: "border-red-400/30 hover:border-red-300/60",
    bg: "bg-red-950/20 hover:bg-red-950/40",
    glow: "hover:shadow-[0_0_25px_rgba(248,113,113,0.2)]",
    badge: "bg-red-400 text-red-950",
  },
};

function LoopCard({ step }: { step: (typeof loop)[0] }) {
  const c = colorMap[step.color];
  return (
    <div
      className={`group relative border ${c.border} ${c.bg} ${c.glow} p-5 shadow-[0_0_25px_rgba(168,85,247,0.05)] transition-all duration-300 hover:-translate-y-1`}
    >
      <div
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-black ${c.badge}`}
      >
        {step.n}
      </div>
      <p className="mt-3 text-sm font-black uppercase tracking-wide">
        {step.title}
      </p>
      <ul className="mt-2 space-y-0.5">
        {step.points.map((p) => (
          <li key={p} className="text-xs leading-snug text-gray-400">
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

const GATE_VERIFY_MS = 2200;
const GATE_DENY_RESET_MS = 1600;
const GATE_GRANTED_CLOSE_MS = 3000;
const GATE_DENY_CHANCE = 0.3;

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.12,
  delayMs = 0
) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioCtx();
    setTimeout(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = volume;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + duration
      );
      osc.stop(ctx.currentTime + duration);
      setTimeout(() => ctx.close(), (duration + 0.1) * 1000);
    }, delayMs);
  } catch {
    // audio unavailable, fail silently
  }
}

function playScanBeep() {
  playTone(880, 0.08, "sine", 0.1);
}

function playAccessGranted() {
  playTone(660, 0.12, "sine", 0.12);
  playTone(880, 0.16, "sine", 0.12, 110);
}

function playAccessDenied() {
  playTone(220, 0.25, "sawtooth", 0.08);
}

export default function Home() {
  const [selectedHauler, setSelectedHauler] = useState<
    (typeof haulers)[0] | null
  >(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [clockInStatus, setClockInStatus] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const [employeeNumber, setEmployeeNumber] = useState<number | null>(null);
  const [clockInTime, setClockInTime] = useState<number | null>(null);
  const [clockOutStatus, setClockOutStatus] = useState<
    "idle" | "done" | "never"
  >("idle");
  const [liveElapsed, setLiveElapsed] = useState("00:00");
  const [finalElapsed, setFinalElapsed] = useState("00:00");

  function formatElapsed(ms: number) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  useEffect(() => {
    if (!clockInTime || clockOutStatus !== "idle") return;
    const interval = setInterval(() => {
      setLiveElapsed(formatElapsed(Date.now() - clockInTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [clockInTime, clockOutStatus]);

  async function handleClockIn() {
    if (clockInStatus === "loading" || clockInStatus === "done") return;
    setClockInStatus("loading");
    try {
      const res = await fetch("/api/clock-in", { method: "POST" });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setEmployeeNumber(data.count);
      setClockInStatus("done");
      setClockInTime(Date.now());
    } catch {
      setClockInStatus("error");
    }
  }

  function handleClockOut() {
    if (clockOutStatus !== "idle") return;
    if (!clockInTime) {
      setClockOutStatus("never");
      return;
    }
    setFinalElapsed(formatElapsed(Date.now() - clockInTime));
    setClockOutStatus("done");
  }
  const [gateOpen, setGateOpen] = useState(false);
  const [gateStage, setGateStage] = useState<
    "idle" | "verifying" | "denied" | "granted"
  >("idle");

  useEffect(() => {
    const forceGate =
      new URLSearchParams(window.location.search).get("gate") === "1";
    if (forceGate) {
      setGateOpen(true);
      return;
    }
    try {
      const seen = window.localStorage.getItem("duskout_gate_seen");
      if (!seen) setGateOpen(true);
    } catch {
      setGateOpen(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen || gateOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen, gateOpen]);

  function handleBadgeScan() {
    if (gateStage !== "idle") return;
    playScanBeep();
    setGateStage("verifying");

    const willBeDenied = Math.random() < GATE_DENY_CHANCE;

    setTimeout(() => {
      if (willBeDenied) {
        playAccessDenied();
        setGateStage("denied");
        setTimeout(() => setGateStage("idle"), GATE_DENY_RESET_MS);
        return;
      }
      playAccessGranted();
      setGateStage("granted");
      try {
        window.localStorage.setItem("duskout_gate_seen", "true");
      } catch {
        // storage unavailable, gate will just show again next visit
      }
      setTimeout(() => setGateOpen(false), GATE_GRANTED_CLOSE_MS);
    }, GATE_VERIFY_MS);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* employee access checkpoint gate, shown only on a visitor's first visit */}
      {gateOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Employee access checkpoint"
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-black px-6 text-center transition-opacity duration-700 ${
            gateStage === "granted"
              ? "pointer-events-none opacity-0"
              : "opacity-100"
          }`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/assets/backgrounds/background3.png')",
            }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-black/88" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75"
          />

          <div
            aria-hidden="true"
            className="gate-flicker pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px]"
          />

          <svg
            aria-hidden="true"
            viewBox="0 0 100 110"
            className="relative h-16 w-16 text-purple-400"
            fill="currentColor"
          >
            <path d="M50 5C25 5 8 25 8 50v45l10-10 8 10 8-10 8 10 8-10 8 10 8-10 8 10 8-10V50C82 25 65 5 50 5z" />
            <circle cx="35" cy="45" r="6" fill="black" />
            <circle cx="65" cy="45" r="6" fill="black" />
          </svg>

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.5em] text-lime-300">
              Security Checkpoint
            </p>
            <h1
              className={`${anton.className} mt-3 text-3xl uppercase leading-none text-purple-300 md:text-5xl`}
            >
              New Hire Checkpoint
            </h1>
            <p className="mt-4 text-sm text-gray-400">
              Everyone starts as a new hire. Scan in to begin your shift.
            </p>
            <p className="mt-2 text-xs italic text-gray-600">
              Scanners have a mind of their own. If you&apos;re denied, just
              try again.
            </p>
          </div>

          {/* Duskout Company Badge, tap to scan */}
          <div className="relative">
            {gateStage === "idle" && (
              <>
                <span
                  aria-hidden="true"
                  className="corner-pulse absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-purple-300/70"
                />
                <span
                  aria-hidden="true"
                  className="corner-pulse absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-purple-300/70"
                />
                <span
                  aria-hidden="true"
                  className="corner-pulse absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-purple-300/70"
                />
                <span
                  aria-hidden="true"
                  className="corner-pulse absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-purple-300/70"
                />
              </>
            )}
            <button
              type="button"
              onClick={handleBadgeScan}
              disabled={gateStage !== "idle"}
              aria-label="Scan your Duskout Company badge to enter"
              className={`group relative w-64 overflow-hidden border bg-zinc-950 pt-5 text-left shadow-xl transition-all duration-300 disabled:pointer-events-none ${
                gateStage === "granted"
                  ? "border-lime-400/60 shadow-[0_0_30px_rgba(190,242,100,0.15)]"
                  : gateStage === "denied"
                    ? "border-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.15)]"
                    : gateStage === "verifying"
                      ? "border-amber-400/50 shadow-[0_0_25px_rgba(251,191,36,0.12)]"
                      : "border-white/15 hover:-translate-y-1 hover:border-purple-400/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.12)] active:translate-y-0"
              }`}
            >
              {/* lanyard punch hole */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-2 h-3 w-9 -translate-x-1/2 rounded-full border border-white/20 bg-black"
              />

              <div
                aria-hidden="true"
                className={`badge-scan-beam pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent to-transparent ${
                  gateStage === "granted"
                    ? "via-lime-300/30"
                    : gateStage === "denied"
                      ? "via-red-400/30"
                      : gateStage === "verifying"
                        ? "via-amber-300/25"
                        : "via-purple-300/15"
                }`}
              />

              <div className="border-b border-white/10 bg-purple-950/40 px-4 py-2">
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-purple-300">
                  Duskout Company Badge
                </p>
              </div>

              <div className="flex gap-3 p-4">
                <div className="flex h-16 w-14 shrink-0 items-center justify-center border border-white/10 bg-black/40">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-7 w-7 text-gray-600"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 21c1.2-4 4-6 7-6s5.8 2 7 6" />
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                    Name
                  </p>
                  <p className="text-sm font-black uppercase text-gray-200">
                    New Hire
                  </p>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-widest text-gray-500">
                    Employee ID
                  </p>
                  <p className="text-xs font-bold text-gray-400">
                    NH-000-00
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
                <div
                  className="flex h-4 items-end gap-[2px]"
                  aria-hidden="true"
                >
                  {barcodeBars.map((w, i) => (
                    <span
                      key={i}
                      className="h-full bg-white/20"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
                <span
                  className={`font-mono text-[9px] font-black uppercase tracking-widest ${
                    gateStage === "granted"
                      ? "text-lime-300"
                      : gateStage === "denied"
                        ? "text-red-400"
                        : gateStage === "verifying"
                          ? "text-amber-300"
                          : "text-gray-600"
                  }`}
                >
                  {gateStage === "granted"
                    ? "Verified"
                    : gateStage === "denied"
                      ? "Denied"
                      : gateStage === "verifying"
                        ? "Verifying"
                        : "Pending"}
                </span>
              </div>

              {gateStage === "verifying" && (
                <div className="h-[3px] w-full bg-white/5">
                  <div
                    aria-hidden="true"
                    className="verify-progress h-full bg-amber-400/70"
                    style={{ animationDuration: `${GATE_VERIFY_MS}ms` }}
                  />
                </div>
              )}
            </button>

            {gateStage === "idle" && (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="tap-bounce pointer-events-none absolute -bottom-8 left-1/2 h-6 w-6 -translate-x-1/2 text-gray-500"
              >
                <path d="M9 11.5V6a2 2 0 1 1 4 0v4.5M13 8.5a2 2 0 1 1 4 0V12M17 10a1.7 1.7 0 1 1 3.4 0v4a6 6 0 0 1-6 6h-2a6 6 0 0 1-5-2.7L4.7 13.8a1.8 1.8 0 0 1 2.6-2.5L9 13" />
              </svg>
            )}
          </div>

          {gateStage === "idle" && (
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-gray-500">
              Awaiting badge scan...
            </p>
          )}
          {gateStage === "verifying" && (
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-amber-300">
              Verifying credentials...
            </p>
          )}
          {gateStage === "denied" && (
            <p className="mt-3 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-red-400">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
              Access Denied &mdash; Try Again
            </p>
          )}
          {gateStage === "granted" && (
            <p className="mt-3 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-lime-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              Access Granted
            </p>
          )}

          <style>{`
            @keyframes gateFlicker {
              0%, 19%, 21%, 23%, 54%, 56%, 100% { opacity: 1; }
              20%, 22%, 55% { opacity: 0.45; }
            }
            @keyframes badgeScan {
              0% { top: -20%; }
              100% { top: 120%; }
            }
            @keyframes cornerPulse {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 1; }
            }
            @keyframes tapBounce {
              0%, 100% { transform: translate(-50%, 0); opacity: 0.6; }
              50% { transform: translate(-50%, 6px); opacity: 1; }
            }
            @keyframes verifyProgress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
            .gate-flicker { animation: gateFlicker 6s infinite; }
            .badge-scan-beam { position: absolute; animation: badgeScan 2.2s linear infinite; }
            .corner-pulse { animation: cornerPulse 1.8s ease-in-out infinite; }
            .tap-bounce { animation: tapBounce 1.4s ease-in-out infinite; }
            .verify-progress { animation-name: verifyProgress; animation-timing-function: linear; animation-fill-mode: forwards; }
            @media (prefers-reduced-motion: reduce) {
              .gate-flicker, .badge-scan-beam, .corner-pulse, .tap-bounce { animation: none; }
              .verify-progress { animation-duration: 0.01ms; }
            }
          `}</style>
        </div>
      )}

      {/* site-wide flickering light, like an unreliable warehouse fixture */}
      <div aria-hidden="true" className="page-flicker" />
      <style>{`
        .page-flicker {
          position: fixed;
          inset: 0;
          z-index: 44;
          pointer-events: none;
          background: rgba(0, 0, 0, 0.12);
          animation: pageFlicker 9s infinite;
        }
        @keyframes pageFlicker {
          0%, 4%, 8%, 14%, 62%, 66%, 100% { opacity: 1; }
          6%, 12%, 64% { opacity: 0.3; }
          9% { opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          .page-flicker { display: none; }
        }
      `}</style>

      {/* mobile top bar, desktop uses the facility directory sign instead */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-white/10 bg-black/90 px-4 backdrop-blur-sm lg:hidden">
        <a href="#top" className="flex items-center gap-2">
          <svg
            viewBox="0 0 100 110"
            className="h-6 w-6 text-purple-400"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M50 5C25 5 8 25 8 50v45l10-10 8 10 8-10 8 10 8-10 8 10 8-10 8 10 8-10V50C82 25 65 5 50 5z" />
            <circle cx="35" cy="45" r="6" fill="black" />
            <circle cx="65" cy="45" r="6" fill="black" />
          </svg>
          <span
            className={`${anton.className} text-sm uppercase tracking-wide text-purple-300`}
          >
            Duskout
          </span>
        </a>

        <button
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open facility directory"
          className="flex h-9 w-9 items-center justify-center text-gray-300"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {/* mobile slide-out directory panel */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/97 backdrop-blur-sm lg:hidden">
          <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lime-300">
              Duskout Facility
            </p>
            <button
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close facility directory"
              className="flex h-9 w-9 items-center justify-center text-gray-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Facility directory"
            className="flex flex-1 flex-col justify-center gap-2 px-6"
          >
            {facilityDirectory.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center gap-4 border-b border-white/5 py-4 text-lg font-black uppercase tracking-wide text-gray-300 transition hover:text-lime-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 shrink-0 text-gray-600"
                  aria-hidden="true"
                >
                  {directoryIcons[item.icon]}
                </svg>
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="https://store.steampowered.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileNavOpen(false)}
            className="mx-6 mb-8 flex items-center justify-center gap-2 border-2 border-lime-300/70 bg-lime-300/10 px-6 py-3.5 text-sm font-black uppercase tracking-[0.2em] text-lime-300"
          >
            Wishlist on Steam
          </a>
        </div>
      )}

      {/* HERO */}
      <section
        id="top"
        className="relative flex min-h-screen scroll-mt-14 items-center justify-center overflow-hidden px-6 py-24 lg:scroll-mt-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/backgrounds/background.png')",
          }}
        />

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/90" />

        {/* ambient hanging light glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl"
        />

        {/* facility directory sign, doubles as real nav */}
        <nav
          aria-label="Facility directory"
          className="absolute left-6 top-1/2 z-20 hidden w-56 -translate-y-1/2 rotate-[-1deg] border border-zinc-700 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-[0_15px_40px_rgba(0,0,0,0.5)] lg:block"
        >
          <div
            aria-hidden="true"
            className="h-1.5 w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #facc15 0, #facc15 6px, #18181b 6px, #18181b 12px)",
            }}
          />

          {/* corner rivets */}
          <span className="absolute left-2 top-3.5 h-1.5 w-1.5 rounded-full bg-zinc-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
          <span className="absolute right-2 top-3.5 h-1.5 w-1.5 rounded-full bg-zinc-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
          <span className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-zinc-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
          <span className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-zinc-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />

          <div className="p-5 pt-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lime-300">
              Duskout Facility
            </p>
            <div className="mt-3 h-px w-full bg-zinc-700" />

            <ul className="mt-4 space-y-1">
              {facilityDirectory.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group -mx-2 flex items-center gap-3 rounded-sm px-2 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-400 transition hover:bg-white/5 hover:text-lime-300"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 shrink-0 text-gray-600 transition group-hover:text-lime-300"
                      aria-hidden="true"
                    >
                      {directoryIcons[item.icon]}
                    </svg>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* atmosphere labels */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute right-8 top-1/3 hidden origin-right rotate-90 text-[10px] font-black uppercase tracking-[0.4em] text-white/10 xl:block"
        >
          Bay 07
        </p>
        <p
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 right-8 hidden text-[9px] font-black uppercase tracking-[0.3em] text-red-500/25 xl:block"
        >
          Safety Is Not Optional
        </p>

        <div className="relative z-10 text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.6em] text-lime-300">
            Employee Portal
          </p>

          <div className="mx-auto w-fit rotate-[-1deg] border border-purple-400/40 bg-zinc-950/80 px-10 py-6 shadow-[0_0_50px_rgba(168,85,247,0.25)] backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.5em] text-lime-300">
              Authorized Personnel Only
            </p>

            <h1
              className={`${anton.className} mt-4 text-5xl uppercase leading-none tracking-tight text-purple-400 md:text-7xl`}
            >
              Duskout
              <br />
              Games
            </h1>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-sm uppercase tracking-[0.25em] text-gray-300">
            Welcome back, employee. Your shift begins now.
          </p>

          {/* wishlist cta */}
          <a
            href="https://store.steampowered.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mx-auto mt-8 flex w-fit items-center gap-3 border-2 border-lime-300/70 bg-black/60 px-7 py-3.5 shadow-[0_0_25px_rgba(190,242,100,0.15)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-300 hover:shadow-[0_0_35px_rgba(190,242,100,0.3)]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5 text-lime-300"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9.5" />
              <circle cx="15" cy="9" r="2.2" />
              <path d="M4.5 14.5 10 12.2M14 10.5l1.6-2M6.8 17.2c1-.3 2-1 2.7-2" />
            </svg>
            <span className="text-sm font-black uppercase tracking-[0.2em] text-lime-300">
              Wishlist on Steam
            </span>
            <span className="border border-lime-300/50 bg-lime-300/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.15em] text-lime-300">
              Coming Soon
            </span>
          </a>

          {/* clock-in terminal kiosk */}
          <div className="mx-auto mt-10 flex justify-center">
            <div className="w-full max-w-sm rotate-[-0.5deg] border-2 border-zinc-700 bg-zinc-900 p-3 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between border-b border-zinc-700 px-1 pb-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Duskout Company Network
                </p>
                <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400 shadow-[0_0_8px_rgba(190,242,100,0.8)]" />
              </div>

              <div
                className="mt-3 border border-lime-500/20 bg-black p-4"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(rgba(190,242,100,0.04) 0px, rgba(190,242,100,0.04) 1px, transparent 1px, transparent 3px)",
                }}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                  Status
                </p>
                <p className="mt-1 flex items-center justify-center gap-2 font-mono text-sm font-bold text-lime-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                  Online
                </p>
                <p className="mt-3 font-mono text-xs text-lime-500/70">
                  {clockInStatus === "done" && employeeNumber
                    ? `Welcome aboard, NH-${String(employeeNumber).padStart(3, "0")}.`
                    : clockInStatus === "loading"
                      ? "Clocking in..."
                      : clockInStatus === "error"
                        ? "Network hiccup. Try again."
                        : "Ready to clock in..."}
                </p>
              </div>

              <button
                onClick={handleClockIn}
                disabled={clockInStatus === "loading" || clockInStatus === "done"}
                className="mt-3 w-full bg-lime-300 py-3 text-sm font-black uppercase tracking-[0.2em] text-lime-950 shadow-inner transition hover:bg-lime-200 active:scale-[0.98] disabled:opacity-70"
              >
                {clockInStatus === "done" ? "Clocked In" : "Clock In"}
              </button>

              <div className="mt-3 rotate-[-0.5deg] border border-black/20 bg-[#f3ead7] p-3 text-left text-black shadow-inner">
                <p className="text-[10px] font-black uppercase tracking-widest text-black/50">
                  Duskout Games
                </p>
                <p className="text-xs font-black uppercase">
                  Employee Time Card
                </p>
                <div className="mt-2 border-t border-dashed border-black/20 pt-2 text-[11px] font-bold">
                  <p>Shift: Night</p>
                  <p
                    className={`mt-0.5 ${
                      clockInStatus === "done"
                        ? "text-green-700"
                        : "text-amber-700"
                    }`}
                  >
                    Status:{" "}
                    {clockInStatus === "done" ? "Clocked In" : "Pending"}
                  </p>
                </div>
                <div className="mt-2 flex h-4 items-end gap-[2px]" aria-hidden="true">
                  {barcodeBars.map((w, i) => (
                    <span
                      key={i}
                      className="h-full bg-black/70"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT THE GAME */}
      <section
        id="about"
        className="relative scroll-mt-14 overflow-hidden border-t border-white/10 bg-[#0a0a0a] px-6 py-24 lg:scroll-mt-0"
      >
        {/* hanging spotlight glow, flickers like a bad fluorescent tube */}
        <div
          aria-hidden="true"
          className="light-flicker pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="light-flicker-slow pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-amber-400/5 blur-[100px]"
        />

        {/* subtle paper-grain texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 3px)",
          }}
        />

        {/* ghost mascot watermark, drifts slowly */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 110"
          className="ghost-drift pointer-events-none absolute -right-10 bottom-0 h-72 w-72 text-purple-400/[0.04] md:h-96 md:w-96"
          fill="currentColor"
        >
          <path d="M50 5C25 5 8 25 8 50v45l10-10 8 10 8-10 8 10 8-10 8 10 8-10 8 10 8-10V50C82 25 65 5 50 5z" />
          <circle cx="35" cy="45" r="6" fill="#0a0a0a" />
          <circle cx="65" cy="45" r="6" fill="#0a0a0a" />
        </svg>

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-lime-300">
                Employee Handbook
              </p>

              <h2
                className={`${anton.className} mt-5 text-4xl uppercase leading-[0.95] md:text-6xl`}
              >
                Paranormal recovery.
                <br />
                Ordinary night shift.
              </h2>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
                Night Haulers is a co-op horror recovery job. Duskout Games
                operates under a pawn shop, sending teams of Haulers into
                haunted locations to recover the Priority Relic, grab
                whatever haunted cargo they can carry, and get out before
                the paranormal activity gets out of hand. Stay too long
                chasing more loot, and the building starts fighting back.
              </p>
            </div>

            {/* classified surveillance tape, standing in for the trailer */}
            <div>
              <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-zinc-950">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, transparent 50%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.5]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="scan-sweep pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-lime-300/[0.05] to-transparent"
                />

                {/* corner readouts */}
                <div className="absolute left-3 top-3 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-red-400/80">
                    Rec
                  </span>
                </div>
                <span className="absolute right-3 top-3 font-mono text-[9px] uppercase tracking-widest text-gray-600">
                  Cam 04 &middot; Night Mode
                </span>
                <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-widest text-gray-600">
                  --:--:--
                </span>

                {/* redacted stamp, stands in for the missing footage */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rotate-[-8deg] border-2 border-red-800/60 px-4 py-2 text-center">
                    <p className="text-sm font-black uppercase tracking-[0.15em] text-red-500/70">
                      Footage
                    </p>
                    <p className="text-sm font-black uppercase tracking-[0.15em] text-red-500/70">
                      Classified
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-center text-xs font-black uppercase tracking-[0.3em] text-gray-500">
                Trailer Coming Soon
              </p>
            </div>
          </div>

          {/* pillars */}
          <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: (
                  <>
                    <circle cx="9" cy="8" r="2.5" />
                    <circle cx="17" cy="9" r="2" />
                    <path d="M4 19c.7-3 2.6-4.5 5-4.5s4.3 1.5 5 4.5M14.5 19c.4-2 1.6-3.3 3.2-3.3s3 1.3 3.3 3.3" />
                  </>
                ),
                title: "Team Up, Or Go Alone",
                body: "Full cooperative play, or take the field solo with a Hauler built for it. The Company Emergency Recovery Beacon has your back either way.",
              },
              {
                icon: (
                  <>
                    <path d="M12 3 2 20h20L12 3z" />
                    <path d="M12 10v4M12 16.5v.01" />
                  </>
                ),
                title: "Risk Versus Reward",
                body: "The longer you stay, the more valuable cargo you find, and the more dangerous the building gets. Every shift asks when to push and when to run.",
              },
              {
                icon: (
                  <>
                    <path d="M12 2 4 6v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6l-8-4z" />
                    <path d="m9 12 2 2 4-4" />
                  </>
                ),
                title: "No Hauler Left Behind",
                body: "Incapacitated teammates must be found and physically carried out. Leave someone behind and the mission fails, no matter what you recovered.",
              },
              {
                icon: (
                  <>
                    <path d="M12 2C8 6 6 10 6 13a6 6 0 0 0 12 0c0-3-2-7-6-11z" />
                  </>
                ),
                title: "Every Room Has A Story",
                body: "Haunted locations aren't just backdrops. Each one has its own hazards, entities, and escalating activity that changes the longer you're inside.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="group bg-[#0a0a0a] p-6 transition-colors duration-300 hover:bg-zinc-950"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7 text-purple-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {pillar.icon}
                </svg>
                <p className="mt-4 text-sm font-black uppercase tracking-wide">
                  {pillar.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>

          {/* House Rules — headline differentiator */}
          <div className="mt-16 border border-red-500/25 bg-red-950/10 p-8 md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-red-400">
              The Fine Print
            </p>
            <h3
              className={`${anton.className} mt-3 text-3xl uppercase leading-[0.95] text-red-100 md:text-4xl`}
            >
              Every Entity Has House Rules.
              <br />
              Break Them, Pay The Price.
            </h3>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
              It&apos;s never just a chase. Every entity in a Night Haulers
              location has its own rule &mdash; a specific thing you&apos;re
              not supposed to do. Interrupt the wrong performance. Hold the
              wrong gaze too long. Make the wrong sound in the wrong ward.
              Break it, and the punishment is never generic. It&apos;s
              personal.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                {
                  who: "The Ringmaster",
                  rule: "Don't interrupt the show, or you're the next act.",
                },
                {
                  who: "The Head Nurse",
                  rule: "Don't hold her gaze.",
                },
                {
                  who: "Code Blue",
                  rule: "Trigger it, and every ghost in the ward comes running.",
                },
              ].map((item) => (
                <div
                  key={item.who}
                  className="border border-red-400/20 bg-black/40 p-4"
                >
                  <p className="text-xs font-black uppercase tracking-wide text-red-300">
                    {item.who}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-gray-400">
                    {item.rule}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <a
            href="https://store.steampowered.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 flex w-fit items-center gap-3 border-2 border-lime-300/70 bg-black/60 px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-300 hover:shadow-[0_0_35px_rgba(190,242,100,0.25)]"
          >
            <span className="text-sm font-black uppercase tracking-[0.2em] text-lime-300">
              Wishlist on Steam
            </span>
            <span className="border border-lime-300/50 bg-lime-300/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.15em] text-lime-300">
              Coming Soon
            </span>
          </a>
        </div>

        <style>{`
          @keyframes handbookFlicker {
            0%, 19%, 21%, 23%, 54%, 56%, 100% { opacity: 1; }
            20%, 22%, 55% { opacity: 0.45; }
          }
          @keyframes handbookFlickerSlow {
            0%, 88%, 92%, 100% { opacity: 1; }
            90% { opacity: 0.5; }
          }
          @keyframes ghostDrift {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-18px); }
          }
          @keyframes scanSweep {
            0% { top: -20%; }
            100% { top: 120%; }
          }
          .light-flicker { animation: handbookFlicker 7s infinite; }
          .light-flicker-slow { animation: handbookFlickerSlow 11s infinite; }
          .ghost-drift { animation: ghostDrift 8s ease-in-out infinite; }
          .scan-sweep { position: absolute; animation: scanSweep 4s linear infinite; }
          @media (prefers-reduced-motion: reduce) {
            .light-flicker, .light-flicker-slow, .ghost-drift, .scan-sweep {
              animation: none;
            }
          }
        `}</style>
      </section>

      {/* ASSIGNMENT ROOM */}
      <section
        id="assignment"
        className="relative min-h-screen scroll-mt-14 overflow-hidden border-t border-white/10 px-6 py-24 lg:scroll-mt-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/backgrounds/background1.png')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.5em] text-lime-300">
            Assignment Room
          </p>

          <h2 className={`${anton.className} mt-4 text-5xl uppercase md:text-7xl`}>
            Today&apos;s Shift
          </h2>

          <div className="relative mx-auto mt-16 max-w-2xl">
            {/* metal clipboard clip */}
            <div className="absolute left-1/2 top-0 z-20 h-6 w-24 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-black/40 bg-gradient-to-b from-zinc-400 to-zinc-600 shadow-lg" />
            <div className="absolute left-1/2 top-0 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/50 bg-zinc-700" />

            {/* paper card, torn bottom edge via clip-path */}
            <div
              className="relative rotate-[-1deg] border border-black/10 bg-[#f3ead7] px-8 pb-14 pt-12 text-black shadow-2xl transition-transform duration-300 hover:rotate-0 md:px-12 md:pb-16 md:pt-14"
              style={{
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 97%, 98% 98%, 95% 96%, 92% 99%, 89% 97%, 86% 98%, 83% 96%, 80% 99%, 77% 97%, 74% 98%, 71% 96%, 68% 99%, 65% 97%, 62% 98%, 59% 96%, 56% 99%, 53% 97%, 50% 98%, 47% 96%, 44% 99%, 41% 97%, 38% 98%, 35% 96%, 32% 99%, 29% 97%, 26% 98%, 23% 96%, 20% 99%, 17% 97%, 14% 98%, 11% 96%, 8% 99%, 5% 97%, 2% 98%, 0% 96%)",
              }}
            >
              {/* stamp */}
              <div className="absolute right-6 top-6 rotate-[8deg] rounded border-2 border-red-800/70 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-red-800/70 md:right-10 md:top-8">
                Field Op
              </div>

              <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-700">
                Location File #205
              </p>

              <h3
                className={`${anton.className} mt-3 text-3xl uppercase leading-[0.95] md:text-4xl`}
              >
                The Blackstone
                <br />
                Museum
              </h3>

              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-black/50">
                Job #205 &mdash; Recover The Anchor Relic
              </p>

              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-black/15 bg-black/15 md:grid-cols-4">
                {[
                  { label: "Objective", value: "Anchor Relic" },
                  { label: "Threat", value: "★★★☆☆" },
                  { label: "Crew", value: "1–4" },
                  { label: "Reward", value: "$$$$" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#f3ead7] p-3">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-black/45">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-lg font-black">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-dashed border-black/25 pt-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-black/45">
                  From management
                </p>
                <p className="mt-2 text-sm font-bold italic leading-relaxed">
                  &ldquo;We're not treasure hunters. We're problem solvers.
                  Now get in, get out, and try not to die.&rdquo;
                </p>
              </div>
            </div>

            <button className="relative z-10 mx-auto -mt-4 block w-[70%] border-4 border-green-700 bg-green-100/90 py-4 text-lg font-black uppercase tracking-[0.25em] text-green-800 shadow-xl transition hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-2xl active:translate-y-0">
              Accept Shift
            </button>
          </div>

          {/* residents dossier */}
          <div className="mt-24">
            <p className="text-xs uppercase tracking-[0.5em] text-red-400">
              Residents (Not Customers)
            </p>
            <h3 className={`${anton.className} mt-3 text-3xl uppercase md:text-4xl`}>
              Know Who You&apos;re Sharing The Room With
            </h3>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {residents.map((r) => (
                <div
                  key={r.name}
                  className="group border border-red-400/20 bg-black/50 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-400/50 hover:bg-black/70 hover:shadow-[0_0_25px_rgba(248,113,113,0.15)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7 text-red-400/80"
                    aria-hidden="true"
                  >
                    {residentIcons[r.icon]}
                  </svg>
                  <p className="mt-3 text-sm font-black uppercase tracking-wide">
                    {r.name}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-gray-400">
                    {r.desc}
                  </p>
                  <p className="mt-3 border-t border-white/10 pt-2 text-[11px] font-bold uppercase tracking-wide text-red-300/80">
                    Tip: {r.tip}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* more locations tease */}
          <div className="mt-24">
            <p className="text-xs uppercase tracking-[0.5em] text-lime-300">
              Field Archive
            </p>
            <h3 className={`${anton.className} mt-3 text-3xl uppercase md:text-4xl`}>
              The Museum Isn&apos;t The Only Stop
            </h3>
            <p className="mt-3 max-w-xl text-sm text-gray-400">
              More locations are still under company review. Clearance
              pending.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {lockedLocations.map((loc) => (
                <div
                  key={loc.file}
                  className={`group relative overflow-hidden border bg-zinc-950 p-5 transition-all duration-300 ${
                    loc.name
                      ? "border-white/10 hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                      : "border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-gray-600"
                      aria-hidden="true"
                    >
                      <rect x="5" y="11" width="14" height="9" rx="1.5" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                    <span className="border border-white/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-gray-500">
                      Locked
                    </span>
                  </div>

                  <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-gray-600">
                    {loc.file}
                  </p>

                  {loc.name ? (
                    <p
                      className={`${anton.className} mt-2 text-2xl uppercase leading-none text-gray-300`}
                    >
                      {loc.name}
                    </p>
                  ) : (
                    <>
                      {/* redaction bars standing in for the unrevealed title */}
                      <div className="mt-2 h-5 w-4/5 bg-white/10" />
                      <div className="mt-1.5 h-5 w-3/5 bg-white/10" />
                    </>
                  )}

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-gray-600">
                      Threat
                    </p>
                    <p className="font-mono text-sm font-bold text-gray-500">
                      {loc.threat}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* rules strip */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-white/10 py-6 text-center">
            {[
              "You Win By Escaping Together",
              "More Loot = More Cash",
              "Dying Costs Everything",
              "No Hauler Left Behind",
            ].map((rule) => (
              <p
                key={rule}
                className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400"
              >
                {rule}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVE HAULERS */}
      <section id="haulers" className="scroll-mt-14 border-t border-white/10 bg-black px-6 py-24 lg:scroll-mt-0">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.5em] text-lime-300">
            Employee Records
          </p>

          <h2 className={`${anton.className} mt-5 text-5xl uppercase md:text-7xl`}>
            Active Haulers
          </h2>

          <p className="mt-5 max-w-2xl text-gray-400">
            Select an employee file. HR is legally required to pretend this
            is normal.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {haulers.map((hauler, index) => (
              <button
                key={hauler.name}
                onClick={() => setSelectedHauler(hauler)}
                className={`group border border-yellow-900/40 bg-[#b98b45] p-3 text-left text-black shadow-2xl transition hover:-translate-y-4 ${
                  index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"
                }`}
              >
                <div className="border border-black/20 bg-[#f3ead7] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-700">
                    Employee File
                  </p>

                  <div className="relative mt-5 h-40 overflow-hidden border border-black/20 bg-black/10">
                    <Image
                      src={hauler.image}
                      alt={hauler.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className={`${bangers.className} mt-5 text-3xl uppercase`}>
                    {hauler.name}
                  </h3>

                  <p className="mt-1 text-xs font-black uppercase tracking-[0.15em] text-black/50">
                    {hauler.role}
                  </p>

                  <p className="mt-3 line-clamp-2 text-xs italic text-black/60">
                    &ldquo;{hauler.quote}&rdquo;
                  </p>

                  <p className="mt-4 text-xs font-black text-black/50">
                    {hauler.id}
                  </p>
                </div>
              </button>
            ))}

            {/* 6th Hauler, proposed and not yet finalized */}
            <div className="relative rotate-[1deg] border border-yellow-900/40 bg-[#b98b45] p-3 text-left text-black shadow-2xl opacity-90">
              <div className="border border-black/20 bg-[#f3ead7] p-4">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-700">
                  Employee File
                </p>

                <div className="relative mt-5 flex h-40 items-center justify-center overflow-hidden border border-black/20 bg-black/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="h-14 w-14 text-black/25"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 21c1.2-4 4-6 7-6s5.8 2 7 6" />
                  </svg>
                </div>

                <h3 className={`${bangers.className} mt-5 text-3xl uppercase text-black/40`}>
                  Sparks
                </h3>

                <p className="mt-1 text-xs font-black uppercase tracking-[0.15em] text-black/40">
                  Frontline
                </p>

                <p className="mt-3 text-xs italic text-black/40">
                  &ldquo;Proposal pending management approval.&rdquo;
                </p>

                <p className="mt-4 inline-block border border-black/20 bg-black/5 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-black/40">
                  Coming Soon
                </p>
              </div>
            </div>
          </div>
        </div>

        {selectedHauler && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
            <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto border border-yellow-900/50 bg-[#f3ead7] p-6 text-black shadow-2xl">
              <button
                onClick={() => setSelectedHauler(null)}
                className="absolute right-4 top-4 border border-black/30 px-3 py-1 text-sm font-black uppercase"
              >
                Close
              </button>

              <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-700">
                Employee File
              </p>

              <div className="mt-6 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
                <div className="relative h-[420px] overflow-hidden border border-black/20 bg-black/10 md:h-[620px]">
                  <Image
                    src={selectedHauler.image}
                    alt={selectedHauler.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className={`${bangers.className} text-6xl uppercase`}>
                    {selectedHauler.name}
                  </h3>

                  <p className="mt-2 text-xl font-black uppercase text-black/50">
                    {selectedHauler.role}
                  </p>

                  <p className="mt-4 border-l-4 border-purple-700/40 pl-4 text-base italic text-black/70">
                    &ldquo;{selectedHauler.quote}&rdquo;
                  </p>

                  <p className="mt-3 w-fit rotate-[-4deg] border-4 border-green-700 px-5 py-2 text-xl font-black uppercase text-green-700">
                    Active
                  </p>

                  <div className="mt-8 grid gap-5">
                    <div className="border border-black/20 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-black uppercase text-black/40">
                          Employee ID
                        </p>
                        <p className="text-xs font-black uppercase text-black/40">
                          Personality
                        </p>
                      </div>
                      <p className="mt-2 text-2xl font-black">
                        {selectedHauler.id}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-black/70">
                        {selectedHauler.personality}
                      </p>
                    </div>

                    <div className="border border-black/20 p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-black uppercase text-black/40">
                          Ability
                        </p>
                        {selectedHauler.ability.cooldown && (
                          <span className="border border-black/20 bg-black/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-black/50">
                            Cooldown: {selectedHauler.ability.cooldown}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-lg font-black">
                        {selectedHauler.ability.name}
                      </p>
                      <p className="mt-1 text-sm text-black/70">
                        {selectedHauler.ability.desc}
                      </p>
                      <ul className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
                        {selectedHauler.ability.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-xs font-bold text-black/70"
                          >
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-purple-700" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border border-black/20 p-5">
                      <p className="text-xs font-black uppercase text-black/40">
                        Weakness
                      </p>
                      <p className="mt-2 text-lg font-black">
                        {selectedHauler.weakness.name}
                      </p>
                      <p className="mt-1 text-sm text-black/70">
                        {selectedHauler.weakness.desc}
                      </p>
                      <p className="mt-2 text-xs italic text-black/50">
                        &ldquo;{selectedHauler.weakness.quote}&rdquo;
                      </p>
                    </div>

                    <div className="border border-purple-700/30 bg-purple-200/30 p-5">
                      <p className="text-xs font-black uppercase text-purple-800">
                        Lore Note
                      </p>
                      <p className="mt-2 text-sm font-bold leading-relaxed text-purple-950">
                        {selectedHauler.lore}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase text-black/40">
                        Starting Gear
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedHauler.gear.map((g) => (
                          <span
                            key={g}
                            className="border border-black/20 bg-white/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-black/70"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* RECOVERY LOOP */}
      <section
        id="recovery-loop"
        className="relative scroll-mt-14 overflow-hidden border-t border-white/10 bg-[#050505] px-6 py-24 lg:scroll-mt-0"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(190,242,100,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(190,242,100,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.5em] text-lime-300">
            Mission Control
          </p>

          <h2 className={`${anton.className} mt-5 text-5xl uppercase md:text-7xl`}>
            Recovery Loop
          </h2>

          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-gray-500">
            Clock In → Get Assigned → Deploy → Explore → Recover Relic →
            Extract → Clock Out
          </p>

          {/* mobile: simple vertical stack */}
          <div className="mt-12 flex flex-col gap-3 md:hidden">
            {loop.map((step, i) => (
              <div key={step.n}>
                <LoopCard step={step} />
                {i < loop.length - 1 && (
                  <div className="flex justify-center py-1 text-purple-400/40">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* desktop: snake layout */}
          <div className="relative mt-16 hidden md:block">
            <div className="grid grid-cols-4 gap-6">
              {loop.map((step, i) => {
                const row = i < 4 ? 1 : 2;
                const col = i < 4 ? i + 1 : 4 - (i - 4);
                return (
                  <div
                    key={step.n}
                    className="relative"
                    style={{ gridColumn: col, gridRow: row }}
                  >
                    <LoopCard step={step} />
                    {i < 3 && (
                      <span className="absolute right-[-22px] top-1/2 -translate-y-1/2 text-lg text-purple-400/40">
                        →
                      </span>
                    )}
                    {i === 3 && (
                      <span className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-lg text-purple-400/40">
                        ↓
                      </span>
                    )}
                    {i >= 4 && i < 6 && (
                      <span className="absolute left-[-22px] top-1/2 -translate-y-1/2 text-lg text-purple-400/40">
                        ←
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex justify-center">
              <svg
                width="240"
                height="50"
                viewBox="0 0 240 50"
                fill="none"
                className="text-purple-400/40"
              >
                <path
                  d="M220 4 C220 30 20 30 20 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M14 10 L20 4 L26 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          <div className="mt-10 border border-red-400/30 bg-red-950/10 px-6 py-5 text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-red-300">
              Golden Rule
            </p>
            <p className="mt-2 text-sm font-bold uppercase tracking-wide text-gray-200">
              All Haulers must be extracted. No one gets left behind.
            </p>
          </div>

          <p className="mt-10 max-w-2xl text-gray-400">
            The job sounds simple. Clock in, recover the relic, extract with
            the crew. Management has declined to comment on why the loop
            keeps getting longer.
          </p>

          <p
            className={`${anton.className} mt-6 text-2xl uppercase leading-tight text-lime-300 md:text-3xl`}
          >
            One job. One relic. Clock out alive.
          </p>
        </div>
      </section>

      {/* HR OFFICE */}
      <section
        id="hr"
        className="relative scroll-mt-14 overflow-hidden border-t border-white/10 bg-black px-6 py-24 lg:scroll-mt-0"
      >
        <p
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[18vw] font-black uppercase leading-none text-white/[0.03] md:text-[12vw]"
        >
          Now Hiring
        </p>

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-amber-300">
            HR Office
          </p>

          <h2 className={`${anton.className} mt-5 text-5xl uppercase md:text-7xl`}>
            Join The Shift
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            Want to help build Night Haulers? Send your resume, portfolio, or
            proof you survived a haunted warehouse.
          </p>

          {/* email card */}
          <a
            href="mailto:lucas@duskoutgames.com"
            className="group mx-auto mt-10 flex w-fit items-center gap-4 rotate-[-1deg] border border-amber-400/30 bg-amber-950/10 px-8 py-5 shadow-[0_0_25px_rgba(251,191,36,0.06)] transition-all duration-300 hover:-translate-y-1 hover:rotate-0 hover:border-amber-300/60 hover:bg-amber-950/20 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]"
          >
            <span className="bg-amber-300 px-3 py-2 text-xs font-black uppercase tracking-[0.25em] text-amber-950">
              Apply
            </span>
            <span className="text-xl font-black text-amber-200 transition-colors group-hover:text-amber-300 md:text-2xl">
              lucas@duskoutgames.com
            </span>
            <span className="text-amber-400/60 transition-transform group-hover:translate-x-1 group-hover:text-amber-300">
              →
            </span>
          </a>

          {/* social / elsewhere links */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://discord.com/invite/nighthaulers"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/15 px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em] text-gray-300 transition hover:border-amber-300/50 hover:text-amber-300"
            >
              Discord
            </a>
            <a
              href="https://x.com/duskoutgames"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/15 px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em] text-gray-300 transition hover:border-amber-300/50 hover:text-amber-300"
            >
              X / Twitter
            </a>
            <a
              href="https://www.instagram.com/duskout.games"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/15 px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em] text-gray-300 transition hover:border-amber-300/50 hover:text-amber-300"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      <footer id="footer" className="scroll-mt-14 border-t border-white/10 bg-black px-6 py-16 lg:scroll-mt-0">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-10 border-b border-white/10 pb-10 md:flex-row md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-gray-600">
                Shift Complete
              </p>
              <p className="mt-4 text-2xl font-black text-purple-400">
                Duskout Games
              </p>
              <p className="mt-3 max-w-xs text-sm text-gray-500">
                Clock out. Don&apos;t bring anything home.
              </p>
            </div>

            {/* clock-out terminal, mirrors the hero terminal's status flow */}
            <div className="w-full max-w-xs border border-zinc-800 bg-zinc-950 p-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                  Shift Status
                </p>
                <span
                  className={`h-2 w-2 animate-pulse rounded-full ${
                    clockOutStatus === "done"
                      ? "bg-red-500/70"
                      : clockOutStatus === "never"
                        ? "bg-amber-400/70"
                        : clockInTime
                          ? "bg-lime-400/70"
                          : "bg-gray-600/70"
                  }`}
                />
              </div>

              {clockOutStatus === "idle" && (
                <>
                  <p
                    className={`mt-2 font-mono text-sm font-bold ${
                      clockInTime ? "text-lime-400" : "text-gray-500"
                    }`}
                  >
                    {clockInTime ? "On Shift" : "Not Clocked In"}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-gray-600">
                    {clockInTime
                      ? `Time on shift: ${liveElapsed}`
                      : "Clock in up top to start your shift."}
                  </p>
                </>
              )}

              {clockOutStatus === "done" && (
                <>
                  <p className="mt-2 font-mono text-sm font-bold text-red-400/80">
                    Offline
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-gray-600">
                    Shift complete. Total time: {finalElapsed}.
                  </p>
                </>
              )}

              {clockOutStatus === "never" && (
                <>
                  <p className="mt-2 font-mono text-sm font-bold text-amber-400">
                    Unrecognized
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-gray-600">
                    You never technically clocked in. HR has been notified.
                  </p>
                </>
              )}

              <button
                onClick={handleClockOut}
                disabled={clockOutStatus !== "idle"}
                className="mt-3 w-full border border-zinc-700 bg-zinc-900 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 transition hover:border-red-500/40 hover:text-red-400 disabled:pointer-events-none disabled:opacity-60"
              >
                {clockOutStatus === "idle" ? "Clock Out" : "Clocked Out"}
              </button>
            </div>

            <nav
              aria-label="Footer navigation"
              className="grid grid-cols-2 gap-x-10 gap-y-3 text-xs font-black uppercase tracking-widest text-gray-400"
            >
              <a href="#about" className="transition hover:text-lime-300">
                Employee Handbook
              </a>
              <a href="#assignment" className="transition hover:text-lime-300">
                Assignment Room
              </a>
              <a
                href="#recovery-loop"
                className="transition hover:text-lime-300"
              >
                Mission Control
              </a>
              <a href="#haulers" className="transition hover:text-lime-300">
                Employee Records
              </a>
              <a href="#hr" className="transition hover:text-lime-300">
                HR Office
              </a>
            </nav>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 text-[11px] uppercase tracking-widest text-gray-600 md:flex-row">
            <p>
              &copy; {new Date().getFullYear()} Duskout Games. All rights
              reserved.
            </p>
            <div className="flex gap-5">
              <a
                href="https://store.steampowered.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-lime-300"
              >
                Wishlist on Steam
              </a>
              <a
                href="https://discord.com/invite/nighthaulers"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-amber-300"
              >
                Discord
              </a>
              <a
                href="https://x.com/duskoutgames"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-amber-300"
              >
                X
              </a>
              <a
                href="https://www.instagram.com/duskout.games"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-amber-300"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
