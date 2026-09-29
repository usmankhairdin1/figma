/**
 * ABox Marketplace — exact clone of Lovable app (usmankhairdin1/abox-09-07)
 * All component code taken directly from the repo source.
 * Adapted: TanStack Router → <a href>, Supabase/auth → static, motion/react → CSS.
 */
import {
  ArrowRight, ArrowUpRight, Sparkles, ShieldCheck, MessageSquareHeart,
  Users, HeartPulse, Compass, Check, BarChart3, ListChecks, Headset, Clock,
  Eye, Shield, Activity, Ambulance, BedDouble,
  Store, LifeBuoy, LogIn, ShoppingCart,
} from "lucide-react";
import { IconDental } from "@tabler/icons-react";

/* ─── cn helper ─── */
function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/* ─── AboxMark — exact from src/components/abox/logo.tsx ─── */
type LogoTone = "primary" | "sage" | "sidebar" | "foreground";
const TONES: Record<LogoTone, { bg: string; ring: string; fg: string; dot: string }> = {
  primary:    { bg: "var(--surface)",        ring: "var(--primary)",          fg: "var(--foreground)",         dot: "var(--primary)" },
  sage:       { bg: "var(--surface)",        ring: "var(--sage)",             fg: "var(--foreground)",         dot: "var(--sage)" },
  sidebar:    { bg: "var(--sidebar-accent)", ring: "var(--sidebar-primary)",  fg: "var(--sidebar-foreground)", dot: "var(--sidebar-primary)" },
  foreground: { bg: "var(--foreground)",     ring: "var(--primary)",          fg: "var(--background)",         dot: "var(--primary)" },
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

/* ─── OrbitalRings — exact from src/components/abox/decor/index.tsx ─── */
function OrbitalRings({
  className, size = 480, tone = "hairline", animated = true,
}: { className?: string; size?: number; tone?: "ink" | "ember" | "moss" | "hairline"; animated?: boolean }) {
  const strokeOf = (t: string) =>
    t === "ember" ? "var(--primary)" : t === "moss" ? "var(--sage)" : t === "hairline" ? "var(--hairline)" : "var(--ink)";
  const c = size / 2;
  const rings = [c - 20, c - 60, c - 110, c - 170, c - 236].filter((r) => r > 6);
  const stroke = strokeOf(tone);
  return (
    <svg
      aria-hidden viewBox={`0 0 ${size} ${size}`} width={size} height={size}
      className={cn("pointer-events-none absolute", animated && "animate-orbit-slow", className)}
    >
      {rings.map((r, i) => (
        <circle key={r} cx={c} cy={c} r={r}
          fill="none" stroke={stroke}
          strokeWidth={0.75} opacity={0.35 - i * 0.05} strokeDasharray={i === 1 ? "2 6" : undefined}
        />
      ))}
      {/* accent ring */}
      <circle cx={c} cy={c} r={rings[0]} fill="none" stroke="var(--primary)" strokeWidth={1} opacity={0.55} />
      {/* orbital dot */}
      <g className={cn(animated && "animate-orbit")} style={{ transformBox: "view-box" as React.CSSProperties["transformBox"], transformOrigin: `${c}px ${c}px` }}>
        <circle cx={c + (rings[0] ?? 0)} cy={c} r={4} fill="var(--primary)" />
        <circle cx={c + (rings[0] ?? 0)} cy={c} r={9} fill="none" stroke="var(--primary)" strokeWidth={0.75} opacity={0.4} />
      </g>
    </svg>
  );
}

/* ─── DotField — exact from decor/index.tsx ─── */
function DotField({ className, size = 22, tone = "hairline" }: { className?: string; size?: number; tone?: string }) {
  const stroke =
    tone === "ember" ? "var(--primary)" : tone === "moss" ? "var(--sage)" : tone === "hairline" ? "var(--hairline)" : "var(--ink)";
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]",
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(${stroke} 1px, transparent 1.5px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity: 0.6,
      }}
    />
  );
}

/* ─── Aurora — exact from decor/index.tsx ─── */
function Aurora({ className }: { className?: string }) {
  return <div aria-hidden className={cn("pointer-events-none absolute inset-0 aurora", className)} />;
}

/* ─── RadialTicks — exact from decor/index.tsx ─── */
function RadialTicks({
  className, size = 260, count = 60, tone = "hairline",
}: { className?: string; size?: number; count?: number; tone?: string }) {
  const c = size / 2, r = c - 6;
  const strokeOf = (t: string) =>
    t === "ember" ? "var(--primary)" : t === "moss" ? "var(--sage)" : t === "hairline" ? "var(--hairline)" : "var(--ink)";
  const ticks = Array.from({ length: count }, (_, i) => i);
  return (
    <svg aria-hidden viewBox={`0 0 ${size} ${size}`} width={size} height={size}
      className={cn("pointer-events-none absolute", className)}
    >
      {ticks.map((i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const x1 = parseFloat((c + Math.cos(angle) * r).toFixed(6));
        const y1 = parseFloat((c + Math.sin(angle) * r).toFixed(6));
        const long = i % 5 === 0;
        const inner = long ? r - 10 : r - 5;
        const x2 = parseFloat((c + Math.cos(angle) * inner).toFixed(6));
        const y2 = parseFloat((c + Math.sin(angle) * inner).toFixed(6));
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={long ? "var(--ink)" : strokeOf(tone)}
          strokeWidth={long ? 1 : 0.6} opacity={long ? 0.6 : 0.35} />;
      })}
    </svg>
  );
}

/* ─── CoverageWeave — exact from decor/index.tsx ─── */
function CoverageWeave({
  className, size = 260, labels = ["H", "D", "V"],
}: { className?: string; size?: number; labels?: string[] }) {
  return (
    <svg aria-hidden viewBox="0 0 260 260" width={size} height={size}
      className={cn("pointer-events-none absolute", className)}
    >
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
      {/* Back tile */}
      <g transform="translate(20 60) rotate(-6 70 70)">
        <rect width="140" height="140" rx="22" fill="url(#cw-b)" stroke="var(--hairline)" />
        <text x="18" y="118" fontFamily="var(--font-display)" fontSize="72" fill="var(--sage)" fillOpacity="0.55">{labels[1]}</text>
      </g>
      {/* Middle tile */}
      <g transform="translate(60 40) rotate(3 70 70)">
        <rect width="140" height="140" rx="22" fill="var(--card)" stroke="var(--hairline)" />
        <text x="18" y="118" fontFamily="var(--font-display)" fontSize="72" fill="var(--ink)" fillOpacity="0.35">{labels[2]}</text>
      </g>
      {/* Front tile */}
      <g transform="translate(100 20)">
        <rect width="140" height="140" rx="22" fill="url(#cw-a)" stroke="var(--primary)" strokeOpacity="0.5" />
        <text x="18" y="118" fontFamily="var(--font-display)" fontSize="72" fill="var(--primary)">{labels[0]}</text>
        <path d="M120 12 L132 12 L132 24" stroke="var(--primary)" strokeWidth="1" fill="none" />
        <path d="M120 128 L132 128 L132 116" stroke="var(--primary)" strokeWidth="1" fill="none" />
      </g>
    </svg>
  );
}

/* ─── BlueprintGrid — exact from decor/index.tsx ─── */
function BlueprintGrid({ className, tone = "hairline" }: { className?: string; tone?: string }) {
  const s =
    tone === "ember" ? "var(--primary)" : tone === "moss" ? "var(--sage)" : tone === "hairline" ? "var(--hairline)" : "var(--ink)";
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,transparent,black_18%,black_82%,transparent)]",
        className,
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, ${s} 1px, transparent 1px),
          linear-gradient(to bottom, ${s} 1px, transparent 1px),
          linear-gradient(to right, color-mix(in oklab, ${s} 50%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in oklab, ${s} 50%, transparent) 1px, transparent 1px)
        `,
        backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
        opacity: 0.55,
      }}
    />
  );
}

/* ─── Products list — exact from src/lib/products.ts ─── */
const SHOP_PRODUCTS = [
  { key: "ifp",      label: "Individual Health",   short: "Health",   icon: HeartPulse },
  { key: "dental",   label: "Dental",               short: "Dental",   icon: IconDental },
  { key: "vision",   label: "Vision",               short: "Vision",   icon: Eye },
  { key: "life",     label: "Life",                 short: "Life",     icon: Shield },
  { key: "critical", label: "Critical Illness",     short: "Critical", icon: Activity },
  { key: "accident", label: "Accident",             short: "Accident", icon: Ambulance },
  { key: "hospital", label: "Hospital Indemnity",   short: "Hospital", icon: BedDouble },
  { key: "ichra",    label: "ICHRA",                short: "ICHRA",    icon: Users },
];

/* ─── ProductSwitcher chips — exact from product-switcher.tsx ─── */
function ProductSwitcherChips({ active, labelOverrides }: { active?: string; labelOverrides?: Record<string, string> }) {
  return (
    <nav aria-label="Available products">
      <ul className="flex snap-x items-center gap-2 overflow-x-auto pb-1 md:flex-wrap md:gap-3 md:overflow-visible md:pb-0">
        {SHOP_PRODUCTS.map((p) => {
          const Icon = p.icon;
          const isActive = active === p.key;
          const short = labelOverrides?.[p.key] ?? p.short;
          return (
            <li key={p.key} className="snap-start">
              <a
                href="#"
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex items-center whitespace-nowrap rounded-full border transition-all",
                  "min-h-12 md:min-h-14 gap-2 md:gap-2.5 px-5 md:px-6 py-2.5 md:py-3 text-base md:text-lg font-semibold hover:-translate-y-0.5",
                  isActive
                    ? "border-primary bg-primary-soft text-primary shadow-card"
                    : "border-border-strong bg-card text-foreground/90 shadow-card hover:border-primary/50 hover:bg-primary/[0.04] hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
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
            <a href={href} className="relative inline-block text-sidebar-foreground/85 transition-colors hover:text-primary ember-underline">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * MarketplaceShell — nav + footer
 * Exact from src/components/abox/marketplace-shell.tsx
 * ────────────────────────────────────────────────────────────*/
function MarketplaceShell({ children, variant = "flow" }: { children: React.ReactNode; variant?: "landing" | "flow" }) {
  const brandName = "ABox";
  const brandTagline = "Agency in a Box";

  return (
    <div className="relative flex min-h-dvh flex-col bg-background text-foreground">
      <DotField className="fixed inset-0 -z-10" />

      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>

      {/* Floating pill nav */}
      <header className={cn("sticky top-4 z-30 flex flex-col items-center px-4 md:px-8", variant === "landing" && "top-6")}>
        <div className="glass flex w-full items-center justify-between gap-2 rounded-full pl-3 pr-2 py-2 md:pl-4">
          {/* Logo */}
          <a href="/" className="group flex items-center gap-2.5" aria-label={`${brandName} home`}>
            <AboxMark size={34} tone="primary" />
            <div className="hidden flex-col leading-none md:flex">
              <span className="text-display text-base tracking-tight">{brandName}</span>
              <span className="text-serial mt-0.5">{brandTagline}</span>
            </div>
          </a>

          {/* Nav links */}
          <nav aria-label="Marketplace navigation" className="flex items-center gap-1">
            {variant === "landing" && (
              <a href="/select" className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground md:inline-flex">
                <Store className="h-4 w-4" aria-hidden /> Shop plans
              </a>
            )}
            <a href="/ichra" className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground md:inline-flex">
              <Users className="h-4 w-4" aria-hidden /> ICHRA
            </a>
            <a href="/schedule" className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground md:inline-flex">
              <LifeBuoy className="h-4 w-4" aria-hidden /> Agent help
            </a>
            <a
              href="/cart"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Cart: empty"
            >
              <ShoppingCart className="h-4 w-4" aria-hidden />
              <span>Cart</span>
            </a>
            <a
              href="/auth"
              className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] min-h-10"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <LogIn className="h-4 w-4" aria-hidden />
              <span>Sign in</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      {/* Footer — exact from marketplace-shell.tsx */}
      <footer className="relative mt-24 overflow-hidden">
        <div className="mx-4 mb-4 overflow-hidden rounded-3xl bg-sidebar text-sidebar-foreground md:mx-8">
          <DotField className="opacity-40" tone="hairline" />
          <div className="relative mx-auto grid max-w-[88rem] gap-14 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-12 md:py-20">
            <div>
              <div className="flex items-center gap-3">
                <AboxMark size={40} tone="sidebar" />
                <div>
                  <p className="text-display text-xl">{brandName}</p>
                  <p className="text-serial">{brandTagline}</p>
                </div>
              </div>
              <p className="mt-6 max-w-xs text-sm text-sidebar-foreground/70">
                Insurance shopping with a guide, not a spreadsheet. Powered by JET.
              </p>
              <a
                href="/schedule"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                style={{ boxShadow: "var(--shadow-glow)" }}
              >
                Talk to a licensed agent
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <FooterCol title="Shop" links={[["Individual & family", "/select?product=ifp"], ["Dental & vision", "/select?product=dental"], ["Employer ICHRA", "/ichra"]]} />
            <FooterCol title="Help" links={[["Talk to an agent", "/schedule"], ["FAQ", "/faq"], ["Accessibility", "/accessibility"]]} />
            <FooterCol title="Trust" links={[["Privacy", "/privacy"], ["Terms", "/terms"], ["Compliance", "/compliance"]]} />
          </div>
          <div className="border-t border-sidebar-border">
            <div className="mx-auto flex max-w-[88rem] flex-col gap-2 px-6 py-5 text-xs text-sidebar-foreground/60 md:flex-row md:items-center md:justify-between md:px-12">
              <p>© {new Date().getFullYear()} JET / ABox. PlanAI guidance is educational and non-binding. Not a substitute for licensed advice. QHP displays follow federal display rules.</p>
              <p className="text-serial">v Phase 1 · IA baseline · Module 1 V4</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * Hero — exact from src/routes/index.tsx
 * ────────────────────────────────────────────────────────────*/
function Hero() {
  /* Brand values from live site */
  const headline = "Insurance, turns to you.";
  const intro = "Health, dental, vision, life — compared side by side. PlanAI helps you think it through without pushing.";
  const [headlineLead, ...headlineRest] = headline.split(",");

  return (
    <section className="relative isolate flex min-h-[calc(100svh-5.25rem)] items-center overflow-hidden pt-20 pb-8 md:pt-24 md:pb-10">
      <Aurora />
      <DotField className="opacity-30" />
      <div className="relative mx-auto grid max-w-[88rem] items-center gap-12 px-4 lg:grid-cols-[1.15fr_1fr] lg:gap-14 md:px-8">
        {/* Left */}
        <div>
          <h1 className="text-display text-4xl leading-[0.96] sm:text-5xl md:text-6xl lg:text-7xl">
            {headlineLead}{headlineRest.length > 0 && ","}
            <br />
            {headlineRest.length > 0 && (
              <span className="italic font-normal" style={{ color: "var(--primary)" }}>
                {headlineRest.join(",").trim()}
              </span>
            )}
          </h1>

          <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">{intro}</p>

          <div className="mt-10">
            <p className="text-eyebrow mb-4">Products available today</p>
            <ProductSwitcherChips labelOverrides={{ ichra: "ICHRA" }} />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/select"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-all hover:scale-[1.03] min-h-11"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              Start shopping
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="/schedule"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 text-base font-medium text-foreground transition-colors hover:bg-accent min-h-11"
            >
              Talk to an agent
            </a>
          </div>

          <ul className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-sage" aria-hidden /> Licensed in 50 states</li>
            <li className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" aria-hidden /> Guidance, not a sales pitch</li>
            <li className="inline-flex items-center gap-2"><MessageSquareHeart className="h-4 w-4 text-primary" aria-hidden /> No spam, no gotchas</li>
          </ul>
        </div>

        {/* Right — orbital instrument */}
        <div className="animate-fade-rise relative aspect-square w-full max-w-[560px] justify-self-center md:justify-self-end">
          <OrbitalRings size={560} tone="hairline" className="left-0 top-0" />
          <RadialTicks size={420} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Center console — PlanAI card */}
          <div
            className="absolute left-1/2 top-1/2 w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-3xl glass p-5 animate-drift"
            style={{ boxShadow: "var(--shadow-plate)" }}
          >
            <div className="flex items-center gap-3 border-b border-hairline pb-4">
              <AboxMark size={40} tone="primary" />
              <div className="flex-1">
                <p className="text-sm font-semibold">PlanAI</p>
                <p className="text-serial">Guidance · not binding</p>
              </div>
              <span className="rounded-full glass px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-sage">Live</span>
            </div>
            <ul className="space-y-2.5 py-4 text-sm">
              <li className="flex items-center justify-between rounded-2xl bg-background/40 px-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate font-medium">Meridian Silver PPO</p>
                  <p className="text-xs text-muted-foreground">HSA · Statewide network</p>
                </div>
                <div className="text-right">
                  <p className="text-display text-xl tabular-nums">$412</p>
                  <p className="text-[10px] text-primary">92% match</p>
                </div>
              </li>
              <li className="flex items-center justify-between rounded-2xl bg-background/40 px-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate font-medium">Aeris Silver POS</p>
                  <p className="text-xs text-muted-foreground">Regional · low deductible</p>
                </div>
                <div className="text-right">
                  <p className="text-display text-xl tabular-nums">$385</p>
                  <p className="text-[10px] text-primary">81% match</p>
                </div>
              </li>
              <li className="flex items-center justify-between rounded-2xl bg-primary/15 px-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate font-medium">BluePeak Gold HMO</p>
                  <p className="text-xs text-muted-foreground">Best fit · your PCP kept</p>
                </div>
                <div className="text-right">
                  <p className="text-display text-xl tabular-nums text-primary">$548</p>
                  <p className="text-[10px]">88% match</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
 * PathTicker — exact from src/routes/index.tsx
 * ────────────────────────────────────────────────────────────*/
function PathTicker() {
  const paths = [
    { title: "Guide me",        body: "PlanAI narrows the list to plans that fit your priorities.", to: "/select?path=guided",  icon: Sparkles },
    { title: "Browse myself",   body: "See every plan in your ZIP with filters and compare.",        to: "/select?path=browse",  icon: Compass },
    { title: "Talk to an agent",body: "A licensed human, one click away — PlanAI escalates.",       to: "/schedule",            icon: MessageSquareHeart },
  ];
  return (
    <section className="mx-auto max-w-[88rem] px-4 py-16 md:px-8 md:py-24">
      <div className="mb-10">
        <p className="text-eyebrow">Choose your path</p>
        <h2 className="text-display mt-3 text-4xl md:text-5xl">Three ways in. One outcome.</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {paths.map((p) => (
          <a
            key={p.title}
            href={p.to}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 card-brackets edge-sheen"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="relative">
              <span
                aria-hidden
                className="absolute right-0 top-0 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-hairline bg-primary/8 text-primary transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground"
              >
                <p.icon className="h-8 w-8" />
              </span>
              <h3 className="text-display max-w-[calc(100%-5rem)] pt-1 text-3xl">{p.title}</h3>
              <p className="mt-3 max-w-[calc(100%-5rem)] text-sm text-muted-foreground">{p.body}</p>
            </div>
            <div className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Enter this path
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
 * PlanOOrbital — exact from src/routes/index.tsx
 * ────────────────────────────────────────────────────────────*/
function PlanOOrbital() {
  return (
    <section className="mx-auto max-w-[88rem] px-4 py-24 md:px-8 md:py-32">
      <div className="grid items-center gap-14 md:grid-cols-[1fr_1.1fr]">
        {/* Copy */}
        <div>
          <h2 className="text-display text-4xl md:text-6xl">
            A guide,
            <br />
            <span className="italic font-normal" style={{ color: "var(--primary)" }}>
              not a recommendation engine.
            </span>
          </h2>
          <p className="mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
            PlanAI explains tradeoffs, translates jargon, and shortlists options. It never pretends to be a licensed agent, and it will hand you to one when the question calls for it.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Explains benefits in plain language",
              "Ranks by what you said mattered most",
              "Shows subsidy estimates as education, not promises",
              "Escalates to a human when it should",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stats grid */}
        <div className="relative grid grid-cols-2 gap-4">
          {([
            { label: "Plans compared",       value: "220K+",  icon: BarChart3,  tone: "primary" },
            { label: "Avg. shortlist size",  value: "3",      icon: ListChecks, tone: "primary" },
            { label: "Escalations to agent", value: "1 in 6", icon: Headset,    tone: "sage"    },
            { label: "Time to first quote",  value: "~2 min", icon: Clock,      tone: "sage"    },
          ] as const).map((s) => (
            <div
              key={s.label}
              className="relative overflow-hidden rounded-3xl border border-hairline bg-card p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <span
                aria-hidden
                className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border"
                style={{ borderColor: s.tone === "sage" ? "var(--sage)" : "var(--primary)", opacity: 0.36 }}
              >
                <s.icon className="h-6 w-6" style={{ color: s.tone === "sage" ? "var(--sage)" : "var(--primary)" }} />
              </span>
              <p className="text-eyebrow max-w-[70%]">{s.label}</p>
              <p className="text-display mt-6 text-4xl tabular-nums">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-8 text-xs text-muted-foreground">
        All numbers are illustrative placeholders. Real metrics wire in from JET analytics.
      </p>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
 * EmployerPlate — exact from src/routes/index.tsx
 * ────────────────────────────────────────────────────────────*/
function EmployerPlate() {
  return (
    <section
      className="mx-4 mb-8 overflow-hidden rounded-3xl border border-hairline bg-card text-foreground md:mx-8"
      style={{ boxShadow: "var(--shadow-plate)" }}
    >
      <div className="relative">
        <Aurora className="opacity-80" />
        <BlueprintGrid tone="hairline" className="opacity-45" />
        <CoverageWeave size={340} labels={["W", "H", "L"]} className="-right-6 -top-4 opacity-70 hidden md:block" />
        <div className="relative mx-auto grid max-w-[88rem] items-center gap-10 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:px-12 md:py-28">
          <div>
            <h2 className="text-display text-4xl md:text-6xl">
              Set an allowance.
              <br />
              <span className="italic font-normal" style={{ color: "var(--primary)" }}>
                Your team picks the plan.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              ICHRA on ABox lets you give every employee a monthly allowance to shop the individual marketplace — with PlanAI guidance and a licensed agent for anyone who wants one.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="/ichra"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03] min-h-11"
                style={{ boxShadow: "var(--shadow-glow)" }}
              >
                <Users className="h-4 w-4" aria-hidden /> Explore ICHRA
              </a>
              <a
                href="/schedule"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-base font-medium text-foreground transition-colors hover:bg-accent min-h-11"
              >
                Talk to a specialist
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-hairline bg-card/85 p-6 backdrop-blur" style={{ boxShadow: "var(--shadow-card)" }}>
            <p className="text-eyebrow">Illustrative · 24-person team · $500 allowance</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {([
                { label: "Enrolled",     value: "22 / 24"  },
                { label: "Avg. plan",    value: "Silver"   },
                { label: "Est. savings", value: "$18k / yr" },
              ] as const).map((s) => (
                <div key={s.label} className="rounded-2xl border border-hairline bg-background/65 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
                  <p className="text-display mt-1 text-xl">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
 * TrustLadder — exact from src/routes/index.tsx
 * ────────────────────────────────────────────────────────────*/
function TrustLadder() {
  const cards = [
    { icon: ShieldCheck,        title: "Every plan follows the display rules",  body: "On-exchange QHPs are shown consistent with federal display and disclosure requirements. Off-exchange is clearly labeled." },
    { icon: HeartPulse,         title: "Real doctors, real formularies",         body: "Optional provider and prescription lookup uses NPPES and formulary data — with a clear skip for shoppers who don't want to bother." },
    { icon: MessageSquareHeart, title: "A person, whenever you want one",        body: "Every screen has a licensed-agent handoff. PlanAI tells you when it's the right call — and gets out of the way." },
  ];
  return (
    <section className="relative mx-auto max-w-[88rem] px-4 py-16 md:px-8 md:py-24">
      <BlueprintGrid tone="hairline" className="opacity-30" />
      <div className="relative mb-10 max-w-xl">
        <h2 className="text-display text-4xl md:text-5xl">Built on rules, not vibes.</h2>
      </div>
      <div className="relative grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <article
            key={c.title}
            className="group relative overflow-hidden rounded-3xl border border-hairline bg-card p-7 transition-all hover:-translate-y-0.5"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <span
                className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-hairline bg-sage-soft text-sage transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
                aria-hidden
              >
                <c.icon className="h-8 w-8" />
              </span>
            </div>
            <h3 className="text-display mt-6 text-xl leading-snug">{c.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{c.body}</p>
          </article>
        ))}
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
