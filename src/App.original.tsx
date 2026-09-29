/**
 * ABox Marketplace — refined working copy (locked clone: App.locked.tsx)
 * Layout & content identical to locked version.
 * Improvements: dark hero, visual rhythm, tighter spacing, premium depth.
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

/* ─── AboxMark — exact from repo ─── */
type LogoTone = "primary" | "sage" | "sidebar" | "foreground";
const TONES: Record<LogoTone, { bg: string; ring: string; fg: string; dot: string }> = {
  primary:    { bg: "var(--surface)",        ring: "var(--primary)",         fg: "var(--foreground)",         dot: "var(--primary)" },
  sage:       { bg: "var(--surface)",        ring: "var(--sage)",            fg: "var(--foreground)",         dot: "var(--sage)" },
  sidebar:    { bg: "var(--sidebar-accent)", ring: "var(--sidebar-primary)", fg: "var(--sidebar-foreground)", dot: "var(--sidebar-primary)" },
  foreground: { bg: "var(--foreground)",     ring: "var(--primary)",         fg: "var(--background)",         dot: "var(--primary)" },
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
    t === "ember" ? "var(--primary)" : t === "moss" ? "var(--sage)" : t === "hairline" ? "var(--hairline)" : "var(--ink)";
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
      <circle cx={c} cy={c} r={rings[0]} fill="none" stroke="var(--primary)" strokeWidth={1} opacity={0.2} />
      <g className={cn(animated && "animate-orbit")} style={{ transformOrigin: `${c}px ${c}px` }}>
        <circle cx={c + (rings[0] ?? 0)} cy={c} r={4} fill="var(--primary)" />
        <circle cx={c + (rings[0] ?? 0)} cy={c} r={9} fill="none" stroke="var(--primary)" strokeWidth={0.75} opacity={0.4} />
      </g>
    </svg>
  );
}

/* ─── DotField — exact from repo ─── */
function DotField({ className, size = 22, tone = "hairline" }: { className?: string; size?: number; tone?: string }) {
  const stroke =
    tone === "ember" ? "var(--primary)" : tone === "moss" ? "var(--sage)" : tone === "hairline" ? "var(--hairline)" : "var(--ink)";
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
    t === "ember" ? "var(--primary)" : t === "moss" ? "var(--sage)" : t === "hairline" ? "var(--hairline)" : "var(--ink)";
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
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--primary)" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="cw-b" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--sage)" stopOpacity="0.14" />
          <stop offset="1" stopColor="var(--sage)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <g transform="translate(20 60) rotate(-6 70 70)">
        <rect width="140" height="140" rx="22" fill="url(#cw-b)" stroke="var(--hairline)" />
        <text x="18" y="118" fontFamily="var(--font-display)" fontSize="72" fill="var(--sage)" fillOpacity="0.55">{labels[1]}</text>
      </g>
      <g transform="translate(60 40) rotate(3 70 70)">
        <rect width="140" height="140" rx="22" fill="var(--card)" stroke="var(--hairline)" />
        <text x="18" y="118" fontFamily="var(--font-display)" fontSize="72" fill="var(--ink)" fillOpacity="0.35">{labels[2]}</text>
      </g>
      <g transform="translate(100 20)">
        <rect width="140" height="140" rx="22" fill="url(#cw-a)" stroke="var(--primary)" strokeOpacity="0.5" />
        <text x="18" y="118" fontFamily="var(--font-display)" fontSize="72" fill="var(--primary)">{labels[0]}</text>
        <path d="M120 12 L132 12 L132 24" stroke="var(--primary)" strokeWidth="1" fill="none" />
        <path d="M120 128 L132 128 L132 116" stroke="var(--primary)" strokeWidth="1" fill="none" />
      </g>
    </svg>
  );
}

/* ─── BlueprintGrid — exact from repo ─── */
function BlueprintGrid({ className, tone = "hairline" }: { className?: string; tone?: string }) {
  const s = tone === "ember" ? "var(--primary)" : tone === "moss" ? "var(--sage)" : tone === "hairline" ? "var(--hairline)" : "var(--ink)";
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

/* ─── ProductSwitcher — light (sections) ─── */
function ProductSwitcherChips({ labelOverrides }: { labelOverrides?: Record<string, string> }) {
  return (
    <nav aria-label="Available products">
      <ul className="flex snap-x items-center gap-2 overflow-x-auto pb-1 md:flex-wrap md:gap-2.5 md:overflow-visible md:pb-0">
        {SHOP_PRODUCTS.map((p) => {
          const Icon = p.icon;
          const short = labelOverrides?.[p.key] ?? p.short;
          return (
            <li key={p.key} className="snap-start">
              <a href="#"
                className={cn(
                  "inline-flex items-center whitespace-nowrap rounded-full border transition-all",
                  "min-h-11 md:min-h-12 gap-2 px-4 md:px-5 py-2 md:py-2.5 text-sm md:text-base font-semibold hover:-translate-y-0.5",
                  "border-border-strong bg-card text-foreground/90 shadow-card hover:border-primary/50 hover:bg-primary/[0.04] hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
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
      <p className="text-eyebrow mb-5 text-sidebar-foreground/60">{title}</p>
      <ul className="space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="relative inline-block text-sidebar-foreground/75 transition-colors hover:text-primary ember-underline">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ════════════════════════════════════════
 * MarketplaceShell
 * ════════════════════════════════════════*/
function MarketplaceShell({ children, variant = "flow" }: { children: React.ReactNode; variant?: "landing" | "flow" }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col bg-background text-foreground">
      <DotField className="fixed inset-0 -z-10" />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>

      {/* Floating pill nav */}
      <header className={cn("fixed inset-x-0 top-4 z-50 flex flex-col items-center px-4 md:px-8 transition-all duration-300", variant === "landing" && "top-6", scrolled ? "translate-y-0" : "translate-y-0")}>
        <div className={cn("flex w-full items-center justify-between gap-2 rounded-full pl-3 pr-2 py-2 md:pl-4 transition-all duration-300", scrolled ? "glass" : "bg-transparent border-transparent")}>
          <a href="/" className="group flex items-center gap-2.5">
            <AboxMark size={34} tone="primary" />
            <div className="hidden flex-col leading-none md:flex">
              <span className="text-display text-base tracking-tight">ABox</span>
              <span className="text-serial mt-0.5">Agency in a Box</span>
            </div>
          </a>
          <nav className="flex items-center gap-1">
            {variant === "landing" && (
              <a href="/select" className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground md:inline-flex">
                <Store className="h-4 w-4" /> Shop plans
              </a>
            )}
            <a href="/ichra" className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground md:inline-flex">
              <Users className="h-4 w-4" /> ICHRA
            </a>
            <a href="/schedule" className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground md:inline-flex">
              <LifeBuoy className="h-4 w-4" /> Agent help
            </a>
            <a href="/cart" className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <ShoppingCart className="h-4 w-4" /><span>Cart</span>
            </a>
            <a href="/auth" className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] min-h-10" style={{ boxShadow: "var(--shadow-glow)" }}>
              <LogIn className="h-4 w-4" /><span>Sign in</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="relative mt-16 overflow-hidden">
        <div className="mx-4 mb-4 overflow-hidden rounded-3xl bg-sidebar text-sidebar-foreground md:mx-8">
          <DotField className="opacity-40" tone="hairline" />
          <div className="relative mx-auto grid max-w-[88rem] gap-14 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-12 md:py-16">
            <div>
              <div className="flex items-center gap-3">
                <AboxMark size={40} tone="sidebar" />
                <div>
                  <p className="text-display text-xl">ABox</p>
                  <p className="text-serial">Agency in a Box</p>
                </div>
              </div>
              <p className="mt-5 max-w-xs text-sm text-sidebar-foreground/70 leading-relaxed">
                Insurance shopping with a guide, not a spreadsheet. Powered by JET.
              </p>
              <a href="/schedule" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 active:scale-95" style={{ boxShadow: "var(--shadow-glow)" }}>
                Talk to a licensed agent <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <FooterCol title="Shop" links={[["Individual & family", "/select?product=ifp"], ["Dental & vision", "/select?product=dental"], ["Employer ICHRA", "/ichra"]]} />
            <FooterCol title="Help" links={[["Talk to an agent", "/schedule"], ["FAQ", "/faq"], ["Accessibility", "/accessibility"]]} />
            <FooterCol title="Trust" links={[["Privacy", "/privacy"], ["Terms", "/terms"], ["Compliance", "/compliance"]]} />
          </div>
          <div className="border-t border-sidebar-border">
            <div className="mx-auto flex max-w-[88rem] flex-col gap-2 px-6 py-4 text-xs text-sidebar-foreground/50 md:flex-row md:items-center md:justify-between md:px-12">
              <p>© {new Date().getFullYear()} JET / ABox. PlanAI guidance is educational and non-binding. Not a substitute for licensed advice.</p>
              <p className="text-serial">v Phase 1 · IA baseline · Module 1 V4</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════
 * Hero — light with soft gradient washes
 * ════════════════════════════════════════*/
function Hero() {
  const headline = "Insurance, turns to you.";
  const intro = "Health, dental, vision, life — compared side by side. PlanAI helps you think it through without pushing.";
  const [headlineLead, ...headlineRest] = headline.split(",");

  return (
    <section className="relative isolate flex min-h-[calc(100svh)] items-center overflow-hidden pt-32 pb-10 md:pt-40 md:pb-14 bg-surface/60">
      {/* Very subtle horizontal lines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: "repeating-linear-gradient(180deg,var(--hairline) 0 1px,transparent 1px 80px)" }} />
      {/* Dot field — fades toward edges */}
      <DotField className="opacity-[0.15]" tone="hairline" />

      <div className="relative mx-auto grid w-full max-w-[88rem] items-center gap-10 px-4 lg:grid-cols-[1.15fr_1fr] lg:gap-14 md:px-8">
        {/* Left */}
        <div>
          {/* Badge pill — light */}
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-ring inline-block" />
            Open Enrollment · Compare Plans Free
          </div>

          <h1 className="mt-5 text-display text-4xl leading-[0.96] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {headlineLead},
            <br />
            {headlineRest.length > 0 && (
              <span className="italic font-normal text-primary">
                {headlineRest.join(",").trim()}
              </span>
            )}
          </h1>

          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">{intro}</p>

          <div className="mt-7">
            <p className="text-eyebrow mb-3">Products available today</p>
            <ProductSwitcherChips labelOverrides={{ ichra: "ICHRA" }} />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="/select"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:scale-[1.03] min-h-11"
              style={{ boxShadow: "var(--shadow-glow)" }}>
              Start shopping <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="/schedule"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-accent/60 min-h-11">
              Talk to an agent
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2.5 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-sage" /> Licensed in 50 states</li>
            <li className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Guidance, not a sales pitch</li>
            <li className="inline-flex items-center gap-2"><MessageSquareHeart className="h-4 w-4 text-primary" /> No spam, no gotchas</li>
          </ul>
        </div>

        {/* Right — orbital instrument */}
        <div className="animate-fade-rise relative aspect-square w-full max-w-[560px] justify-self-center md:justify-self-end">
          {/* Orbital rings — dark strokes on light */}
          <OrbitalRings size={560} tone="hairline" animated className="left-0 top-0" />

          {/* Radial ticks */}
          <RadialTicks size={420} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" tone="hairline" />

          {/* PlanAI card */}
          <div className="absolute left-1/2 top-1/2 w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-3xl p-5 animate-drift"
            style={{ background: "color-mix(in oklab,var(--card) 92%,transparent)", backdropFilter: "blur(20px) saturate(150%)", border: "1px solid var(--hairline)", boxShadow: "var(--shadow-elevated)" }}>
            <div className="flex items-center gap-3 pb-4" style={{ borderBottom: "1px solid var(--hairline)" }}>
              <AboxMark size={40} tone="primary" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">PlanAI</p>
                <p className="text-serial">Guidance · not binding</p>
              </div>
              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-sage"
                style={{ background: "var(--sage-soft)", border: "1px solid oklch(0.55 0.085 195/0.3)" }}>Live</span>
            </div>
            <ul className="space-y-2 py-4 text-sm">
              {[
                { name: "Meridian Silver PPO", sub: "HSA · Statewide network",    price: "$412", match: "92% match", hot: false },
                { name: "Aeris Silver POS",    sub: "Regional · low deductible",  price: "$385", match: "81% match", hot: false },
                { name: "BluePeak Gold HMO",   sub: "Best fit · your PCP kept",   price: "$548", match: "88% match", hot: true  },
              ].map(({ name, sub, price, match, hot }) => (
                <li key={name} className="flex items-center justify-between rounded-2xl px-3 py-2.5"
                  style={{ background: hot ? "var(--primary-soft)" : "var(--surface)" }}>
                  <div className="min-w-0">
                    <p className={cn("truncate font-medium text-[13px]", hot ? "text-primary" : "text-foreground")}>{name}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                  <div className="text-right ml-2 shrink-0">
                    <p className={cn("text-display text-xl tabular-nums", hot ? "text-primary" : "text-foreground")}>{price}</p>
                    <p className="text-[10px] text-muted-foreground">{match}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
 * PathTicker — bg-surface for visual break
 * ════════════════════════════════════════*/
function PathTicker() {
  const paths = [
    { title: "Guide me",         body: "PlanAI narrows the list to plans that fit your priorities.",  to: "/select?path=guided", icon: Sparkles },
    { title: "Browse myself",    body: "See every plan in your ZIP with filters and compare.",         to: "/select?path=browse", icon: Compass },
    { title: "Talk to an agent", body: "A licensed human, one click away — PlanAI escalates.",        to: "/schedule",           icon: MessageSquareHeart },
  ];
  return (
    <section className="relative bg-background">
      <div className="mx-auto w-full max-w-[88rem] px-4 py-14 md:px-8 md:py-20">
        <div className="mb-8">
          <p className="text-eyebrow">Choose your path</p>
          <h2 className="text-display mt-2 text-3xl md:text-4xl lg:text-5xl">Three ways in. One outcome.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {paths.map((p) => (
            <a key={p.title} href={p.to}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 card-brackets edge-sheen"
              style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="relative">
                <span aria-hidden className="absolute right-0 top-0 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-hairline bg-primary/[0.07] text-primary transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                  <p.icon className="h-8 w-8" />
                </span>
                <h3 className="text-display max-w-[calc(100%-5rem)] pt-1 text-3xl">{p.title}</h3>
                <p className="mt-3 max-w-[calc(100%-5rem)] text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
              <div className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
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
 * PlanOOrbital
 * ════════════════════════════════════════*/
function PlanOOrbital() {
  const stats = [
    { label: "Plans compared",       value: "220K+",  icon: BarChart3,  tone: "primary" },
    { label: "Avg. shortlist size",  value: "3",      icon: ListChecks, tone: "primary" },
    { label: "Escalations to agent", value: "1 in 6", icon: Headset,    tone: "sage"    },
    { label: "Time to first quote",  value: "~2 min", icon: Clock,      tone: "sage"    },
  ] as const;

  return (
    <section className="mx-auto w-full max-w-[88rem] px-4 py-14 md:px-8 md:py-20">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="text-display text-3xl md:text-5xl">
            A guide,
            <br />
            <span className="italic font-normal" style={{ color: "var(--primary)" }}>not a recommendation engine.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base text-muted-foreground">
            PlanAI explains tradeoffs, translates jargon, and shortlists options. It never pretends to be a licensed agent, and it will hand you to one when the question calls for it.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm">
            {["Explains benefits in plain language","Ranks by what you said mattered most","Shows subsidy estimates as education, not promises","Escalates to a human when it should"].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-foreground/80">{line}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className={cn("group relative overflow-hidden rounded-3xl border border-hairline bg-card p-6 transition-all duration-300 hover:-translate-y-1", s.tone === "sage" ? "hover:border-sage/50" : "hover:border-primary/50")} style={{ boxShadow: "var(--shadow-card)" }}>
              <span aria-hidden className={cn(
                "absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105",
                s.tone === "sage"
                  ? "border-sage/30 bg-sage/[0.07] text-sage group-hover:bg-sage group-hover:text-background"
                  : "border-primary/30 bg-primary/[0.07] text-primary group-hover:bg-primary group-hover:text-primary-foreground"
              )}>
                <s.icon className="h-6 w-6" />
              </span>
              <p className="text-eyebrow max-w-[70%] relative z-10">{s.label}</p>
              <p className="text-display mt-6 text-4xl tabular-nums relative z-10">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">All numbers are illustrative placeholders. Real metrics wire in from JET analytics.</p>
    </section>
  );
}

/* ════════════════════════════════════════
 * EmployerPlate — subtle inset-section treatment
 * ════════════════════════════════════════*/
function EmployerPlate() {
  return (
    <section className="mx-4 mb-6 overflow-hidden rounded-3xl border border-hairline bg-card text-foreground md:mx-8" style={{ boxShadow: "var(--shadow-plate)" }}>
      <div className="relative">
        <Aurora className="opacity-80" />
        <BlueprintGrid tone="hairline" className="opacity-45" />
        <CoverageWeave size={340} labels={["W", "H", "L"]} className="-right-6 -top-4 opacity-70 hidden md:block" />
        <div className="relative mx-auto grid max-w-[88rem] items-center gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:px-12 md:py-20">
          <div>
            <h2 className="text-display text-3xl md:text-5xl">
              Set an allowance.
              <br />
              <span className="italic font-normal" style={{ color: "var(--primary)" }}>Your team picks the plan.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base text-muted-foreground">
              ICHRA on ABox lets you give every employee a monthly allowance to shop the individual marketplace — with PlanAI guidance and a licensed agent for anyone who wants one.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/ichra" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 active:scale-95 min-h-11" style={{ boxShadow: "var(--shadow-glow)" }}>
                <Users className="h-4 w-4" /> Explore ICHRA
              </a>
              <a href="/schedule" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-accent min-h-11">
                Talk to a specialist
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-hairline bg-card/85 p-6 backdrop-blur" style={{ boxShadow: "var(--shadow-card)" }}>
            <p className="text-eyebrow mb-4">Illustrative · 24-person team · $500 allowance</p>
            <div className="grid grid-cols-3 gap-3">
              {[{ label: "Enrolled", value: "22 / 24" }, { label: "Avg. plan", value: "Silver" }, { label: "Est. savings", value: "$18k / yr" }].map((s) => (
                <div key={s.label} className="rounded-2xl border border-hairline bg-background/65 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
                  <p className="text-display mt-1 text-lg">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
 * TrustLadder — soft primary-tinted section
 * ════════════════════════════════════════*/
function TrustLadder() {
  const cards = [
    { icon: ShieldCheck,        title: "Every plan follows the display rules", body: "On-exchange QHPs are shown consistent with federal display and disclosure requirements. Off-exchange is clearly labeled." },
    { icon: HeartPulse,         title: "Real doctors, real formularies",        body: "Optional provider and prescription lookup uses NPPES and formulary data — with a clear skip for shoppers who don't want to bother." },
    { icon: MessageSquareHeart, title: "A person, whenever you want one",       body: "Every screen has a licensed-agent handoff. PlanAI tells you when it's the right call — and gets out of the way." },
  ];
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto w-full max-w-[88rem] px-4 py-14 md:px-8 md:py-20">
        <div className="mb-8 max-w-xl">
          <h2 className="text-display text-3xl text-foreground md:text-4xl lg:text-5xl">Built on rules, not vibes.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((c) => (
            <article key={c.title}
              className="group relative overflow-hidden rounded-3xl bg-card p-7 transition-all hover:-translate-y-0.5 card-brackets"
              style={{ border: "1px solid var(--hairline)", boxShadow: "var(--shadow-card)" }}>
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-sage/30 bg-sage-soft text-sage transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                <c.icon className="h-8 w-8" />
              </span>
              <h3 className="text-display mt-6 text-xl leading-snug text-foreground">{c.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── App root ─── */
export default function App() {
  return (
    <MarketplaceShell variant="landing">
      <Hero />
      <PathTicker />
      <PlanOOrbital />
      <EmployerPlate />
      <TrustLadder />
    </MarketplaceShell>
  );
}
