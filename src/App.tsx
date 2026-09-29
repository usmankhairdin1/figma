/**
 * ABox Marketplace
 * Reverted to original content, structure, and icons.
 * Applied Jet Health Marketplace aesthetic (colors, spacing, and styling).
 */
import { useState, useEffect } from "react";
import {
  ArrowRight, ArrowUpRight, Sparkles, ShieldCheck, MessageSquareHeart,
  Users, HeartPulse, Compass, Check, BarChart3, ListChecks, Headset, Clock,
  Eye, Shield, Activity, Ambulance, BedDouble,
  Store, LifeBuoy, LogIn, ShoppingCart,
} from "lucide-react";
import { IconDental } from "@tabler/icons-react";

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/* ─── AboxMark — exact from repo but with Jet Health Blue scheme ─── */
type LogoTone = "primary" | "sage" | "sidebar" | "foreground";
const TONES: Record<LogoTone, { bg: string; ring: string; fg: string; dot: string }> = {
  primary:    { bg: "white",               ring: "#2563eb",         fg: "#0f172a",         dot: "#2563eb" },
  sage:       { bg: "white",               ring: "#059669",         fg: "#0f172a",         dot: "#059669" },
  sidebar:    { bg: "#1e293b",             ring: "#64748b",         fg: "white",           dot: "#64748b" },
  foreground: { bg: "#0f172a",             ring: "#2563eb",         fg: "white",           dot: "#2563eb" },
};
function AboxMark({ className, size = 36, tone = "primary" }: { className?: string; size?: number; tone?: LogoTone }) {
  const t = TONES[tone];
  return (
    <span className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 40 40" width={size} height={size}>
        <circle cx="20" cy="20" r="19" fill={t.bg} stroke="var(--hairline)" strokeWidth="1" />
        <circle cx="20" cy="20" r="13" fill="none" stroke={t.ring} strokeWidth="1.2" opacity="0.9" />
        <circle cx="20" cy="20" r="16" fill="none" stroke={t.ring} strokeWidth="0.6" strokeDasharray="1.4 2.4" opacity="0.55" />
        <circle cx="34" cy="20" r="2.2" fill={t.dot} />
        <path d="M13.5 25 L20 12 L26.5 25" fill="none" stroke={t.fg} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 21.5 H23.5" stroke={t.fg} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* ─── OrbitalRings — exact from repo ─── */
function OrbitalRings({ className, size = 480, tone = "hairline", animated = true }: { className?: string; size?: number; tone?: string; animated?: boolean }) {
  const strokeOf = (t: string) =>
    t === "ember" ? "#2563eb" : t === "moss" ? "#059669" : t === "hairline" ? "var(--hairline)" : "var(--ink)";
  const c = size / 2;
  const rings = [c - 20, c - 60, c - 110, c - 170, c - 236].filter((r) => r > 6);
  const stroke = strokeOf(tone);
  return (
    <svg aria-hidden viewBox={`0 0 ${size} ${size}`} width={size} height={size}
      className={cn("pointer-events-none absolute", animated && "animate-orbit-slow", className)}
    >
      {rings.map((r, i) => (
        <circle key={r} cx={c} cy={c} r={r} fill="none" stroke={stroke}
          strokeWidth={0.75} opacity={0.15 - i * 0.02} strokeDasharray={i === 1 ? "2 6" : undefined} />
      ))}
      <circle cx={c} cy={c} r={rings[0]} fill="none" stroke="#2563eb" strokeWidth={1} opacity={0.2} />
      <g className={cn(animated && "animate-orbit")} style={{ transformOrigin: `${c}px ${c}px` }}>
        <circle cx={c + (rings[0] ?? 0)} cy={c} r={4} fill="#2563eb" />
        <circle cx={c + (rings[0] ?? 0)} cy={c} r={9} fill="none" stroke="#2563eb" strokeWidth={0.75} opacity={0.4} />
      </g>
    </svg>
  );
}

/* ─── DotField — exact from repo ─── */
function DotField({ className, size = 22, tone = "hairline" }: { className?: string; size?: number; tone?: string }) {
  const stroke =
    tone === "ember" ? "#2563eb" : tone === "moss" ? "#059669" : tone === "hairline" ? "var(--hairline)" : "var(--ink)";
  return (
    <div aria-hidden
      className={cn("pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]", className)}
      style={{ backgroundImage: `radial-gradient(${stroke} 1px, transparent 1.5px)`, backgroundSize: `${size}px ${size}px`, opacity: 0.6 }}
    />
  );
}

/* ─── Aurora ─── */
function Aurora({ className }: { className?: string }) {
  return <div aria-hidden className={cn("pointer-events-none absolute inset-0 aurora", className)} />;
}

/* ─── RadialTicks — exact from repo ─── */
function RadialTicks({ className, size = 260, count = 60, tone = "hairline" }: { className?: string; size?: number; count?: number; tone?: string }) {
  const c = size / 2, r = c - 6;
  const strokeOf = (t: string) =>
    t === "ember" ? "#2563eb" : t === "moss" ? "#059669" : t === "hairline" ? "var(--hairline)" : "var(--ink)";
  return (
    <svg aria-hidden viewBox={`0 0 ${size} ${size}`} width={size} height={size}
      className={cn("pointer-events-none absolute", className)}
    >
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const x1 = parseFloat((c + Math.cos(angle) * r).toFixed(6));
        const y1 = parseFloat((c + Math.sin(angle) * r).toFixed(6));
        const long = i % 5 === 0;
        const inner = long ? r - 10 : r - 5;
        const x2 = parseFloat((c + Math.cos(angle) * inner).toFixed(6));
        const y2 = parseFloat((c + Math.sin(angle) * inner).toFixed(6));
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={long ? "var(--ink)" : strokeOf(tone)}
          strokeWidth={long ? 1 : 0.6} opacity={long ? 0.15 : 0.08} />;
      })}
    </svg>
  );
}

/* ─── CoverageWeave — exact from repo ─── */
function CoverageWeave({ className, size = 260, labels = ["H", "D", "V"] }: { className?: string; size?: number; labels?: string[] }) {
  return (
    <svg aria-hidden viewBox="0 0 260 260" width={size} height={size} className={cn("pointer-events-none absolute", className)}>
      <defs>
        <linearGradient id="cw-a" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#2563eb" stopOpacity="0.16" />
          <stop offset="1" stopColor="#2563eb" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="cw-b" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#059669" stopOpacity="0.14" />
          <stop offset="1" stopColor="#059669" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <g transform="translate(20 60) rotate(-6 70 70)">
        <rect width="140" height="140" rx="22" fill="url(#cw-b)" stroke="var(--hairline)" />
        <text x="18" y="118" fontFamily="var(--font-display)" fontSize="72" fill="#059669" fillOpacity="0.55">{labels[1]}</text>
      </g>
      <g transform="translate(60 40) rotate(3 70 70)">
        <rect width="140" height="140" rx="22" fill="var(--card)" stroke="var(--hairline)" />
        <text x="18" y="118" fontFamily="var(--font-display)" fontSize="72" fill="var(--ink)" fillOpacity="0.35">{labels[2]}</text>
      </g>
      <g transform="translate(100 20)">
        <rect width="140" height="140" rx="22" fill="url(#cw-a)" stroke="#2563eb" strokeOpacity="0.5" />
        <text x="18" y="118" fontFamily="var(--font-display)" fontSize="72" fill="#2563eb">{labels[0]}</text>
        <path d="M120 12 L132 12 L132 24" stroke="#2563eb" strokeWidth="1" fill="none" />
        <path d="M120 128 L132 128 L132 116" stroke="#2563eb" strokeWidth="1" fill="none" />
      </g>
    </svg>
  );
}

/* ─── BlueprintGrid — exact from repo ─── */
function BlueprintGrid({ className, tone = "hairline" }: { className?: string; tone?: string }) {
  const s = tone === "ember" ? "#2563eb" : tone === "moss" ? "#059669" : tone === "hairline" ? "var(--hairline)" : "var(--ink)";
  return (
    <div aria-hidden
      className={cn("pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,transparent,black_18%,black_82%,transparent)]", className)}
      style={{
        backgroundImage: `linear-gradient(to right,color-mix(in oklab,${s} 25%,transparent) 1px,transparent 1px),linear-gradient(to bottom,color-mix(in oklab,${s} 25%,transparent) 1px,transparent 1px),linear-gradient(to right,color-mix(in oklab,${s} 8%,transparent) 1px,transparent 1px),linear-gradient(to bottom,color-mix(in oklab,${s} 8%,transparent) 1px,transparent 1px)`,
        backgroundSize: "120px 120px,120px 120px,24px 24px,24px 24px",
        opacity: 0.4,
      }}
    />
  );
}

/* ─── Products list ─── */
const SHOP_PRODUCTS = [
  { key: "ifp",      label: "Individual Health", short: "Health",   icon: HeartPulse },
  { key: "dental",   label: "Dental",             short: "Dental",   icon: IconDental },
  { key: "vision",   label: "Vision",             short: "Vision",   icon: Eye },
  { key: "life",     label: "Life",               short: "Life",     icon: Shield },
  { key: "critical", label: "Critical Illness",   short: "Critical", icon: Activity },
  { key: "accident", label: "Accident",           short: "Accident", icon: Ambulance },
  { key: "hospital", label: "Hospital Indemnity", short: "Hospital", icon: BedDouble },
  { key: "ichra",    label: "ICHRA",              short: "ICHRA",    icon: Users },
];

/* ─── ProductSwitcher — Restored to exact previous implementation + elevated prominence ─── */
function ProductSwitcherChips({ labelOverrides }: { labelOverrides?: Record<string, string> }) {
  return (
    <nav aria-label="Available products">
      <ul className="flex snap-x items-center gap-2 overflow-x-auto pb-1 md:flex-wrap md:gap-3 md:overflow-visible md:pb-0">
        {SHOP_PRODUCTS.map((p) => {
          const Icon = p.icon;
          const short = labelOverrides?.[p.key] ?? p.short;
          return (
            <li key={p.key} className="snap-start">
              <a href="#"
                className={cn(
                  "inline-flex items-center whitespace-nowrap rounded-full border transition-all duration-300",
                  "min-h-12 gap-2.5 px-5 py-2.5 text-sm md:text-base font-semibold",
                  "border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600 hover:shadow-md",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span>{short}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ─── Footer column ─── */
function FooterCol({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div>
      <p className="text-eyebrow mb-5 text-slate-400">{title}</p>
      <ul className="space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="relative inline-block text-slate-400 transition-colors hover:text-blue-400">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ════════════════════════════════════════
 * MarketplaceShell (Reverted exact header nav)
 * ════════════════════════════════════════*/
function MarketplaceShell({ children, variant = "flow" }: { children: React.ReactNode; variant?: "landing" | "flow" }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col bg-[#FAFAFA] text-slate-900 selection:bg-blue-600 selection:text-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>

      {/* Floating pill nav - Fixed at top, overlays hero */}
      <header className={cn("fixed inset-x-0 top-4 z-50 flex flex-col items-center px-4 md:px-8 transition-all duration-300", variant === "landing" && "top-6")}>
        <div className={cn("flex w-full items-center justify-between gap-2 rounded-full pl-3 pr-2 py-2 md:pl-4 transition-all duration-300", scrolled ? "glass" : "bg-transparent border-transparent")}>
          <a href="/" className="group flex items-center gap-2.5">
            <AboxMark size={34} tone="primary" />
            <div className="hidden flex-col leading-none md:flex">
              <span className="text-display text-base tracking-tight text-slate-900">ABox</span>
              <span className="text-serial mt-0.5 text-slate-500">Agency in a Box</span>
            </div>
          </a>
          <nav className="flex items-center gap-1">
            {variant === "landing" && (
              <a href="/select" className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:inline-flex">
                <Store className="h-4 w-4" /> Shop plans
              </a>
            )}
            <a href="/ichra" className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:inline-flex">
              <Users className="h-4 w-4" /> ICHRA
            </a>
            <a href="/schedule" className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:inline-flex">
              <LifeBuoy className="h-4 w-4" /> Agent help
            </a>
            <a href="/cart" className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
              <ShoppingCart className="h-4 w-4" /><span>Cart</span>
            </a>
            <a href="/auth" className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03] min-h-10 shadow-[0_4px_14px_rgba(37,99,235,0.25)]">
              <LogIn className="h-4 w-4" /><span>Sign in</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Removed pt-24 so Hero starts at the very top */}
      <main id="main" className="flex-1">{children}</main>

      {/* Footer (Reverted structure, updated colors) */}
      <footer className="relative mt-16 overflow-hidden">
        <div className="mx-4 mb-4 overflow-hidden rounded-3xl bg-slate-900 text-white md:mx-8">
          <DotField className="opacity-40" tone="hairline" />
          <div className="relative mx-auto grid max-w-[88rem] gap-14 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-12 md:py-16">
            <div>
              <div className="flex items-center gap-3">
                <AboxMark size={40} tone="sidebar" />
                <div>
                  <p className="text-display text-xl">ABox</p>
                  <p className="text-serial text-slate-400">Agency in a Box</p>
                </div>
              </div>
              <p className="mt-5 max-w-xs text-sm text-slate-400 leading-relaxed">
                Insurance shopping with a guide, not a spreadsheet. Powered by JET.
              </p>
              <a href="/schedule" className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.03] shadow-[0_4px_14px_rgba(37,99,235,0.25)]">
                Talk to a licensed agent <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <FooterCol title="Shop" links={[["Individual & family", "/select?product=ifp"], ["Dental & vision", "/select?product=dental"], ["Employer ICHRA", "/ichra"]]} />
            <FooterCol title="Help" links={[["Talk to an agent", "/schedule"], ["FAQ", "/faq"], ["Accessibility", "/accessibility"]]} />
            <FooterCol title="Trust" links={[["Privacy", "/privacy"], ["Terms", "/terms"], ["Compliance", "/compliance"]]} />
          </div>
          <div className="border-t border-slate-800">
            <div className="mx-auto flex max-w-[88rem] flex-col gap-2 px-6 py-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-12">
              <p>© {new Date().getFullYear()} JET / ABox. PlanAI guidance is educational and non-binding. Not a substitute for licensed advice.</p>
              <p className="text-serial text-slate-500">v Phase 1 · IA baseline · Module 1 V4</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating PlanAI Chat Widget (Restored per request) */}
      <button 
        aria-label="Open PlanAI Chat"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-transform hover:scale-110 active:scale-95 border-2 border-white"
      >
        <MessageSquareHeart className="h-6 w-6" />
      </button>
    </div>
  );
}

/* ════════════════════════════════════════
 * Hero — Reverted content, updated colors, starts at top
 * ════════════════════════════════════════*/
function Hero() {
  const headline = "Insurance, turns to you.";
  const intro = "Health, dental, vision, life — compared side by side. PlanAI helps you think it through without pushing.";
  const [headlineLead, ...headlineRest] = headline.split(",");

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-32 pb-10 md:pt-40 md:pb-14 bg-[#FAFAFA]">
      {/* Background Soft Glows (Jet Health Style) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[15%] right-[5%] w-[800px] h-[800px] rounded-full bg-blue-400/10 blur-[120px]" />
        <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-400/5 blur-[100px]" />
      </div>

      {/* Very subtle horizontal lines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(180deg,#0f172a 0 1px,transparent 1px 80px)" }} />
      {/* Dot field — fades toward edges */}
      <DotField className="opacity-[0.1]" tone="hairline" />

      <div className="relative mx-auto grid w-full max-w-[88rem] items-center gap-10 px-4 lg:grid-cols-[1.15fr_1fr] lg:gap-14 md:px-8">
        {/* Left Content */}
        <div>
          {/* Badge pill */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-blue-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse-ring inline-block" />
            Open Enrollment · Compare Plans Free
          </div>

          <h1 className="text-display text-4xl leading-[1.05] text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
            {headlineLead},
            <br />
            {headlineRest.length > 0 && (
              <span className="italic font-normal text-blue-600">
                {headlineRest.join(",").trim()}
              </span>
            )}
          </h1>

          <p className="mt-5 max-w-xl text-base text-slate-600 md:text-lg">{intro}</p>

          <div className="mt-8">
            <p className="text-eyebrow mb-3 text-slate-500">Products available today</p>
            <ProductSwitcherChips labelOverrides={{ ichra: "ICHRA" }} />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="/select"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-base font-semibold text-white transition-transform hover:scale-[1.03] min-h-11 shadow-[0_4px_14px_rgba(37,99,235,0.25)]">
              Start shopping <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="/schedule"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 min-h-11">
              Talk to an agent
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2.5 text-sm text-slate-500">
            <li className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Licensed in 50 states</li>
            <li className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-blue-500" /> Guidance, not a sales pitch</li>
            <li className="inline-flex items-center gap-2"><MessageSquareHeart className="h-4 w-4 text-rose-500" /> No spam, no gotchas</li>
          </ul>
        </div>

        {/* Right — Orbital instrument (Reverted content, polished look) */}
        <div className="animate-fade-rise relative aspect-square w-full max-w-[560px] justify-self-center md:justify-self-end">
          {/* Orbital rings */}
          <OrbitalRings size={560} tone="hairline" animated className="left-0 top-0" />
          <RadialTicks size={420} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" tone="hairline" />

          {/* Beautiful Bluish Glow behind the card */}
          <div className="absolute left-1/2 top-1/2 w-[80%] h-[80%] -translate-x-1/2 -translate-y-1/2 bg-blue-500/25 blur-[70px] rounded-full animate-drift" />

          {/* PlanAI card - Jet Health Slate Gradient Theme */}
          <div className="absolute left-1/2 top-1/2 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] p-6 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.2)] animate-drift bg-gradient-to-br from-[#808C9E] to-[#5F6A7D] border border-white/20 text-white">
            <div className="flex items-center gap-3 pb-5 border-b border-white/10">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-900/20">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">PlanAI</p>
                <p className="text-xs text-blue-50">Guidance · not binding</p>
              </div>
              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-400/20 border border-emerald-400/30">
                Verified
              </span>
            </div>
            
            <ul className="space-y-3 pt-5 text-sm">
              {[
                { name: "Meridian Silver PPO", sub: "HSA · Statewide network",    price: "$412", match: "92% match", hot: false },
                { name: "Aeris Silver POS",    sub: "Regional · low deductible",  price: "$385", match: "81% match", hot: false },
                { name: "BluePeak Gold HMO",   sub: "Best fit · your PCP kept",   price: "$548", match: "88% match", hot: true  },
              ].map(({ name, sub, price, match, hot }) => (
                <li key={name} className={cn("flex items-center justify-between rounded-2xl px-4 py-3 transition-colors", hot ? "bg-white/20 border border-white/30 shadow-inner" : "bg-white/5 border border-white/5")}>
                  <div className="min-w-0">
                    <p className={cn("truncate font-semibold text-[13px]", hot ? "text-white" : "text-slate-100")}>{name}</p>
                    <p className={cn("text-xs", hot ? "text-blue-100" : "text-slate-300")}>{sub}</p>
                  </div>
                  <div className="text-right ml-2 shrink-0">
                    <p className={cn("font-display text-xl tabular-nums font-bold", hot ? "text-white" : "text-white")}>{price}</p>
                    <p className={cn("text-[10px] font-medium", hot ? "text-blue-100" : "text-slate-300")}>{match}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Floating Badge 1: Savings (Moved outside, Emerald tint) */}
          <div className="absolute -left-[5%] md:-left-[15%] top-[10%] z-20 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/90 backdrop-blur p-4 shadow-[0_15px_40px_-10px_rgba(16,185,129,0.25)] border border-emerald-200/60 animate-drift" style={{ animationDelay: "0.5s", animationDuration: "7s" }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700/80">Est. Savings</p>
            <p className="font-display text-2xl font-bold text-emerald-600 mt-0.5">$340/mo</p>
          </div>

          {/* Floating Badge 2: Matches (Moved outside, Indigo tint) */}
          <div className="absolute -right-[2%] md:-right-[12%] bottom-[16%] z-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/90 backdrop-blur p-4 shadow-[0_15px_40px_-10px_rgba(99,102,241,0.25)] border border-indigo-200/60 rotate-[4deg] animate-drift" style={{ animationDelay: "1.5s", animationDuration: "8s" }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-700/80">Plans Analyzed</p>
            <p className="font-display text-2xl font-bold text-indigo-700 mt-0.5">220K+</p>
          </div>

          {/* Floating Pill: Verified Match (Moved outside, Bottom center-left) */}
          <div className="absolute left-[15%] md:left-[5%] -bottom-[4%] z-20 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)] animate-drift" style={{ animationDelay: "2.5s", animationDuration: "6s" }}>
            + AI Verified Match
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
 * PathTicker — Reverted exact content
 * ════════════════════════════════════════*/
function PathTicker() {
  const paths = [
    { title: "Guide me",         body: "PlanAI narrows the list to plans that fit your priorities.",  to: "/select?path=guided", icon: Sparkles },
    { title: "Browse myself",    body: "See every plan in your ZIP with filters and compare.",         to: "/select?path=browse", icon: Compass },
    { title: "Talk to an agent", body: "A licensed human, one click away — PlanAI escalates.",        to: "/schedule",           icon: MessageSquareHeart },
  ];
  return (
    <section className="relative bg-white border-b border-slate-100">
      <div className="mx-auto w-full max-w-[88rem] px-4 py-14 md:px-8 md:py-24">
        <div className="mb-10">
          <p className="text-eyebrow text-slate-500">Choose your path</p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">Three ways in. One outcome.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {paths.map((p) => (
            <a key={p.title} href={p.to}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200">
              <div className="relative">
                <span aria-hidden className="absolute right-0 top-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="font-display max-w-[calc(100%-4rem)] pt-1 text-2xl font-bold text-slate-900">{p.title}</h3>
                <p className="mt-3 max-w-[calc(100%-2rem)] text-sm text-slate-600 leading-relaxed">{p.body}</p>
              </div>
              <div className="relative mt-10 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                Enter this path
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
 * PlanOOrbital — Reverted content
 * ════════════════════════════════════════*/
function PlanOOrbital() {
  const stats = [
    { label: "Plans compared",       value: "220K+",  icon: BarChart3,  tone: "primary" },
    { label: "Avg. shortlist size",  value: "3",      icon: ListChecks, tone: "primary" },
    { label: "Escalations to agent", value: "1 in 6", icon: Headset,    tone: "sage"    },
    { label: "Time to first quote",  value: "~2 min", icon: Clock,      tone: "sage"    },
  ] as const;

  return (
    <section className="mx-auto w-full max-w-[88rem] px-4 py-14 md:px-8 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
            A guide,
            <br />
            <span className="italic font-normal text-blue-600">not a recommendation engine.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-slate-600 leading-relaxed">
            PlanAI explains tradeoffs, translates jargon, and shortlists options. It never pretends to be a licensed agent, and it will hand you to one when the question calls for it.
          </p>
          <ul className="mt-8 space-y-3.5 text-sm">
            {["Explains benefits in plain language","Ranks by what you said mattered most","Shows subsidy estimates as education, not promises","Escalates to a human when it should"].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 font-bold" />
                <span className="text-slate-700 font-medium">{line}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className={cn("group relative overflow-hidden rounded-3xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl", s.tone === "sage" ? "border-slate-200 hover:border-emerald-300 hover:shadow-emerald-100/50" : "border-slate-200 hover:border-blue-300 hover:shadow-blue-100/50")}>
              <span aria-hidden className={cn(
                "absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105",
                s.tone === "sage"
                  ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white"
                  : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
              )}>
                <s.icon className="h-6 w-6" />
              </span>
              <p className="text-eyebrow max-w-[70%] relative z-10 text-slate-500">{s.label}</p>
              <p className="font-display mt-8 text-4xl font-bold tabular-nums relative z-10 text-slate-900">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-8 text-xs font-medium text-slate-400">All numbers are illustrative placeholders. Real metrics wire in from JET analytics.</p>
    </section>
  );
}

/* ════════════════════════════════════════
 * EmployerPlate — Reverted content
 * ════════════════════════════════════════*/
function EmployerPlate() {
  return (
    <section className="mx-4 mb-8 overflow-hidden rounded-[2.5rem] bg-slate-900 text-white md:mx-8 shadow-2xl relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      
      <div className="relative mx-auto grid max-w-[88rem] items-center gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:px-12 md:py-24">
        <div>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            Set an allowance.
            <br />
            <span className="italic font-normal text-blue-400">Your team picks the plan.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-slate-300 leading-relaxed">
            ICHRA on ABox lets you give every employee a monthly allowance to shop the individual marketplace — with PlanAI guidance and a licensed agent for anyone who wants one.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="/ichra" className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105 active:scale-95">
              <Users className="h-5 w-5" /> Explore ICHRA
            </a>
            <a href="/schedule" className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-8 py-4 text-base font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20">
              Talk to a specialist
            </a>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-800/50 p-8 backdrop-blur-xl shadow-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">Illustrative · 24-person team · $500 allowance</p>
          <div className="grid grid-cols-3 gap-4">
            {[{ label: "Enrolled", value: "22 / 24" }, { label: "Avg. plan", value: "Silver" }, { label: "Est. savings", value: "$18k / yr" }].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{s.label}</p>
                <p className="font-display mt-2 text-2xl font-bold text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
 * TrustLadder — Reverted content
 * ════════════════════════════════════════*/
function TrustLadder() {
  const cards = [
    { icon: ShieldCheck,        title: "Every plan follows the display rules", body: "On-exchange QHPs are shown consistent with federal display and disclosure requirements. Off-exchange is clearly labeled." },
    { icon: HeartPulse,         title: "Real doctors, real formularies",        body: "Optional provider and prescription lookup uses NPPES and formulary data — with a clear skip for shoppers who don't want to bother." },
    { icon: MessageSquareHeart, title: "A person, whenever you want one",       body: "Every screen has a licensed-agent handoff. PlanAI tells you when it's the right call — and gets out of the way." },
  ];
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] border-t border-slate-100">
      <div className="mx-auto w-full max-w-[88rem] px-4 py-16 md:px-8 md:py-24 pb-32">
        <div className="mb-12 max-w-xl">
          <h2 className="font-display text-3xl text-slate-900 md:text-4xl lg:text-5xl font-bold tracking-tight">Built on rules, not vibes.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <article key={c.title}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 hover:border-emerald-200">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                <c.icon className="h-7 w-7" />
              </span>
              <h3 className="font-display mt-8 text-xl font-bold text-slate-900 leading-snug">{c.title}</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <MarketplaceShell>
      <Hero />
      <PathTicker />
      <PlanOOrbital />
      <EmployerPlate />
      <TrustLadder />
    </MarketplaceShell>
  );
}
