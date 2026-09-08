import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * Industries Hub — discovery / recognition / routing page.
 *
 * Single shared Revenue Infrastructure system. Three service-business
 * operating environments. Routes into the dedicated child industry pages.
 *
 * Locked industries (no others may be added without approval):
 *   01 Home Services
 *   02 Financial Advisors & RIAs
 *   03 Insurance Agencies
 *
 * Child routes are kept as the live app's existing flat paths
 * (do not orphan existing routes):
 *   /home-services
 *   /financial-advisors
 *   /insurance-agencies
 */

// ─── Shared layout primitives ─────────────────────────────────────────────────
// Site shell max 1120px / 96px desktop gutter; use a wider 1200–1280px container
// only for the editorial routing band per the locked spec.
const HUB_CONTAINER = "max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16";

function SectionLabel({ label }: { label: string }) {
  return (
    <h3 className="text-[18px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
      {label}
    </h3>
  );
}

function RevealOnScroll({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
      }}
      ref={(el) => {
        if (!el || visible) return;
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                setVisible(true);
                obs.disconnect();
              }
            });
          },
          { threshold: 0.12 }
        );
        obs.observe(el);
      }}
    >
      {children}
    </div>
  );
}

// ─── Section 01 — Industries Hero ─────────────────────────────────────────────

function IndustriesHero() {
  // Single shared hub on the left, three service-business nodes fanning right.
  // Pure SVG, no animation, no parallax. Distinguishes industries by content +
  // composition, NOT by per-industry brand color.
  return (
    <section
      aria-labelledby="industries-h1"
      className="bg-surface pt-[112px] md:pt-[144px] pb-[72px] md:pb-[88px] border-b border-[#D8D5CE]"
    >
      <div className={HUB_CONTAINER}>
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">
          {/* Copy column */}
          <div className="max-w-[680px]">
            <h3 className="industries-hero-eyebrow text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
              Who GWS Serves
            </h3>
            <h1
              id="industries-h1"
              className="font-serif font-normal text-gray-900 leading-[1.08] tracking-tight text-[40px] md:text-[60px] mb-6"
              style={{ textWrap: "balance" }}
            >
              Revenue Infrastructure for <span className="text-[#841617] italic">founder-led</span> service businesses.
            </h1>
            <p className="text-[18px] md:text-[20px] leading-[1.6] text-gray-900 mb-6 max-w-[620px]">
              GrowthWorks Systems works with service businesses where revenue depends on being found, responding quickly, converting opportunities consistently, and understanding what is working across the full customer journey.
            </p>
            <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-500 mb-10 max-w-[600px]">
              Explore how those challenges show up in your industry.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/revenue-diagnostic"
                className="industries-hero-cta inline-flex items-center justify-center min-h-[48px] px-7 rounded-none bg-crimson hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
              >
                Book a Revenue Diagnostic
              </a>
            </div>
          </div>

          {/* Concept visual: one system → three service environments */}
          <div
            className="relative w-full max-w-[560px] mx-auto lg:ml-auto"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 560 460"
              className="w-full h-auto"
              role="img"
              aria-label="One shared Revenue Infrastructure system branching into three service-business operating environments"
            >
              {/* Center hub */}
              <g>
                <circle cx={120} cy={230} r={76} fill="#FFFFFF" stroke="#DDD6CC" strokeWidth={1.2} />
                <circle cx={120} cy={230} r={56} fill="#F8F5EC" stroke="#841617" strokeWidth={1.2} />
                <text
                  x={120}
                  y={222}
                  textAnchor="middle"
                  fill="#2B2B2B"
                  fontFamily="'DM Serif Display', Georgia, serif"
                  fontSize="14"
                  fontWeight={400}
                  letterSpacing="0.04em"
                >
                  Revenue
                </text>
                <text
                  x={120}
                  y={242}
                  textAnchor="middle"
                  fill="#2B2B2B"
                  fontFamily="'DM Serif Display', Georgia, serif"
                  fontSize="14"
                  fontWeight={400}
                  letterSpacing="0.04em"
                >
                  Infrastructure
                </text>
                <text
                  x={120}
                  y={260}
                  textAnchor="middle"
                  fill="#841617"
                  fontFamily="'DM Sans', sans-serif"
                  fontSize="9"
                  fontWeight={700}
                  letterSpacing="0.18em"
                >
                  ONE SYSTEM
                </text>
              </g>

              {/* Branches + three destinations */}
              {[
                { y: 80,  label: "01", name: "HOME SERVICES",         desc: "Local demand · Speed-to-lead" },
                { y: 230, label: "02", name: "FINANCIAL ADVISORS & RIAs", desc: "Trust · Research · Inquiry" },
                { y: 380, label: "03", name: "INSURANCE AGENCIES",    desc: "Lead flow · Lifecycle" },
              ].map((node, i) => {
                const x1 = 196;
                const y1 = 230;
                const x2 = 460;
                const y2 = node.y;
                const cx1 = 320;
                const cy1 = y1;
                const cx2 = 320;
                const cy2 = y2;
                return (
                  <g key={i}>
                    <path
                      d={`M ${x1} ${y1} C ${cx1} ${cy1} ${cx2} ${cy2} ${x2 - 28} ${y2}`}
                      fill="none"
                      stroke="#841617"
                      strokeOpacity="0.35"
                      strokeWidth={1.2}
                    />
                    <rect
                      x={432}
                      y={y2 - 26}
                      width={120}
                      height={52}
                      rx={6}
                      fill="#FFFFFF"
                      stroke="#DDD6CC"
                    />
                    <text
                      x={444}
                      y={y2 - 10}
                      fill="#841617"
                      fontFamily="'DM Sans', sans-serif"
                      fontSize="9"
                      fontWeight={700}
                      letterSpacing="0.16em"
                    >
                      {node.label}
                    </text>
                    <text
                      x={444}
                      y={y2 + 4}
                      fill="#2B2B2B"
                      fontFamily="'DM Sans', sans-serif"
                      fontSize="10"
                      fontWeight={700}
                      letterSpacing="0.04em"
                    >
                      {node.name}
                    </text>
                    <text
                      x={444}
                      y={y2 + 18}
                      fill="#625E59"
                      fontFamily="'DM Sans', sans-serif"
                      fontSize="9"
                    >
                      {node.desc}
                    </text>
                  </g>
                );
              })}

              {/* Side label */}
              <text
                x={120}
                y={30}
                textAnchor="middle"
                fill="#625E59"
                fontFamily="'DM Sans', sans-serif"
                fontSize="10"
                fontWeight={600}
                letterSpacing="0.2em"
              >
                ONE REVENUE INFRASTRUCTURE SYSTEM
              </text>
              <text
                x={460}
                y={30}
                textAnchor="middle"
                fill="#625E59"
                fontFamily="'DM Sans', sans-serif"
                fontSize="10"
                fontWeight={600}
                letterSpacing="0.2em"
              >
                THREE OPERATING ENVIRONMENTS
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 02 — Shared Revenue-System Context ──────────────────────────────

function SharedContextSection() {
  return (
    <section
      aria-labelledby="shared-context-h2"
      className="bg-white py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={HUB_CONTAINER}>
        <RevealOnScroll>
          <h3 className="industries-section-label text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">Shared Revenue-System Context</h3>
          <h2
            id="shared-context-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            One framework. Different operating environments.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-900 mb-5 max-w-[680px]">
            The Revenue Infrastructure framework applies across industries. The implementation varies according to:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 mb-10 max-w-[820px]">
            {[
              "Buyer behavior",
              "Trust requirements",
              "Response expectations",
              "Service or sales journey",
              "Operational handoffs",
              "Regulatory context where applicable",
              "Acquisition channels",
              "Measurement needs",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[16px] md:text-[17px] leading-[1.6] text-gray-900"
              >
                <span
                  aria-hidden="true"
                  className="mt-[10px] w-[6px] h-[6px] shrink-0 rounded-full bg-crimson"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="/framework"
            className="inline-flex items-center gap-2 border-b border-[#841617] pb-1 text-[#841617] font-sans font-semibold text-[15px] hover:text-[#721315] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
          >
            Explore the Revenue Infrastructure Framework
            <span aria-hidden="true">→</span>
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── Section 03 — Industry Discovery / Routing ───────────────────────────────

const INDUSTRIES = [
  {
    num: "01",
    name: "Home Services",
    href: "/home-services",
    cta: "Explore Home Services",
    desc: "When local demand, speed-to-lead, scheduling, follow-up, and sales execution need to operate as one system.",
    orientation: [
      "Local discovery",
      "High-intent demand",
      "Speed-to-lead",
      "Scheduling",
      "Estimates & service",
      "Follow-up",
      "Measurable booked revenue",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v10h14V10" />
        <path d="M10 20v-6h4v6" />
      </svg>
    ),
  },
  {
    num: "02",
    name: "Financial Advisors & RIAs",
    href: "/financial-advisors",
    cta: "Explore Financial Advisors & RIAs",
    desc: "When trust, discoverability, inquiry handling, advisor follow-up, and pipeline visibility need to work together.",
    orientation: [
      "Discovery & research",
      "Trust & expertise",
      "Consideration",
      "Qualified inquiry",
      "Advisor routing",
      "Longer follow-up cycle",
      "Pipeline visibility",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    num: "03",
    name: "Insurance Agencies",
    href: "/insurance-agencies",
    cta: "Explore Insurance Agencies",
    desc: "When lead generation, response, quoting, producer follow-up, renewals, and performance visibility become fragmented.",
    orientation: [
      "Multi-channel inquiry",
      "Response",
      "Producer ownership",
      "Quote progression",
      "Follow-up",
      "Renewals",
      "Lifecycle visibility",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
] as const;

function IndustryRoutingSection() {
  return (
    <section
      id="industry-routes"
      aria-labelledby="industry-routing-h2"
      className="bg-surface py-[88px] md:py-[144px] border-b border-[#D8D5CE]"
    >
      <div className={HUB_CONTAINER}>
        <RevealOnScroll>
          <h3 className="industries-section-label text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">Explore the Three Priority Industries</h3>
          <h2
            id="industry-routing-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            Choose the operating environment that looks like yours.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-12 max-w-[680px]">
            Each route below opens a dedicated industry page with deeper context on the buyer, the journey, and where revenue typically leaks.
          </p>
        </RevealOnScroll>

        {/* Three destination panels — stacked editorial cards. They share the
            site palette; industries are distinguished by content, copy, and
            composition, never by per-industry color. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {INDUSTRIES.map((ind, i) => (
            <RevealOnScroll key={ind.num} delay={i * 80}>
              <article className="group relative flex flex-col h-full bg-white border border-gray-200 rounded-none p-7 md:p-8 transition-shadow hover:shadow-[0_12px_28px_rgba(43,43,43,0.08)] focus-within:shadow-[0_12px_28px_rgba(43,43,43,0.08)]">
                <header className="flex items-start justify-between gap-4 mb-5">
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center w-11 h-11 rounded-none border border-gray-200 text-[#841617]"
                  >
                    {ind.icon}
                  </span>
                  <span className="font-sans font-bold text-[12px] tracking-[0.18em] text-gray-500">
                    {ind.num}
                  </span>
                </header>

                <h3
                  className="font-serif font-normal text-gray-900 leading-[1.25] text-[24px] md:text-[28px] mb-3"
                  style={{ textWrap: "balance" }}
                >
                  {ind.name}
                </h3>

                <p className="text-[16px] md:text-[17px] leading-[1.65] text-gray-900 mb-5">
                  {ind.desc}
                </p>

                <ul className="mb-7 space-y-2">
                  {ind.orientation.map((theme) => (
                    <li
                      key={theme}
                      className="flex items-start gap-2 text-[14px] leading-[1.45] text-gray-500 font-sans font-medium"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-crimson/70"
                      />
                      <span>{theme}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  <a
                    href={ind.href}
                    aria-label={`${ind.cta} — opens industry page`}
                    className="inline-flex items-center gap-2 min-h-[48px] px-5 rounded-none border border-[#841617] text-[#841617] bg-transparent hover:bg-[#F2E7E3] active:bg-[#E9D8D3] transition-colors font-sans font-semibold text-[15px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2B2B2B] focus-visible:outline-offset-[3px]"
                  >
                    {ind.cta}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 04 — How the Challenge Changes by Industry ───────────────────────

const COMPARISON = [
  {
    name: "Home Services",
    pressure: "Speed + local demand + scheduling & operational handoffs",
    journey: [
      "Local discovery",
      "Inquiry",
      "Response",
      "Schedule",
      "Service / estimate",
      "Follow-up",
      "Revenue",
    ],
  },
  {
    name: "Financial Advisors & RIAs",
    pressure: "Trust + research + qualified conversation + longer consideration",
    journey: [
      "Discovery",
      "Research",
      "Trust evaluation",
      "Inquiry",
      "Qualification",
      "Advisor conversation",
      "Decision",
    ],
  },
  {
    name: "Insurance Agencies",
    pressure: "Multi-channel lead flow + producer ownership + quoting + lifecycle follow-up",
    journey: [
      "Discovery / referral",
      "Inquiry",
      "Response",
      "Producer assignment",
      "Quote / conversation",
      "Follow-up",
      "Policy decision",
    ],
  },
] as const;

function ComparisonSection() {
  return (
    <section
      aria-labelledby="comparison-h2"
      className="bg-white py-[72px] md:py-[112px] border-b border-[#D8D5CE]"
    >
      <div className={HUB_CONTAINER}>
        <RevealOnScroll>
          <h3 className="industries-section-label text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">How the Challenge Changes by Industry</h3>
          <h2
            id="comparison-h2"
            className="font-serif font-normal text-gray-900 leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px]"
          >
            Same systemic philosophy. Different revenue journey.
          </h2>
          <p className="text-[18px] leading-[1.65] text-gray-500 mb-12 max-w-[680px]">
            A short comparative read on what each priority industry is pressured by — and how the buyer moves through the system. Use it to choose where to go next.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {COMPARISON.map((row, i) => (
            <RevealOnScroll key={row.name} delay={i * 60}>
              <div className="flex flex-col h-full border border-gray-200 rounded-none bg-surface p-7 md:p-8">
                <span className="font-sans font-bold text-[12px] tracking-[0.18em] text-[#841617] mb-3">
                  0{i + 1}
                </span>
                <h3
                  className="font-serif font-normal text-gray-900 leading-[1.25] text-[22px] md:text-[24px] mb-4"
                >
                  {row.name}
                </h3>

                <div className="mb-5">
                  <p className="text-[14px] font-sans font-semibold tracking-[0.12em] uppercase text-gray-500 mb-1">
                    Primary pressure
                  </p>
                  <p className="text-[16px] leading-[1.6] text-gray-900">
                    {row.pressure}
                  </p>
                </div>

                <div>
                  <p className="text-[14px] font-sans font-semibold tracking-[0.12em] uppercase text-gray-500 mb-3">
                    Typical journey
                  </p>
                  <ol className="space-y-2">
                    {row.journey.map((step, idx) => (
                      <li
                        key={step}
                        className="flex items-start gap-3 text-[15px] leading-[1.5] text-gray-900"
                      >
                        <span
                          aria-hidden="true"
                          className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border border-[#841617]/50 text-[10px] font-sans font-bold text-[#841617] mt-[1px]"
                        >
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 05 — Closing CTA ─────────────────────────────────────────────────

function ClosingCTASection() {
  return (
    <section
      aria-labelledby="industries-closing-cta"
      className="bg-gws-dark text-white py-[88px] md:py-[144px] relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[260px] bg-crimson/15 blur-[100px] pointer-events-none"
      />

      <div className={`${HUB_CONTAINER} relative z-10 text-center`}>
        <h3 className="industries-section-label text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617]">
          Start with the system
        </h3>
        <h2
          id="industries-closing-cta"
          className="font-serif font-normal text-white leading-[1.15] text-[32px] md:text-[44px] mb-6 max-w-[720px] mx-auto"
        >
          Find where your infrastructure is helping — or limiting — growth.
        </h2>
        <p className="text-[18px] md:text-[20px] leading-[1.6] text-white/70 mb-10 max-w-[600px] mx-auto">
          A Revenue Diagnostic maps the system behind your revenue. No replacement funnels. No quick wins. Just a clear read on what to fix first.
        </p>
        <a
          href="/revenue-diagnostic"
          className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-none bg-crimson hover:bg-[#721315] active:bg-[#611012] transition-colors text-white font-sans font-semibold text-[16px] leading-[1.2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[3px]"
        >
          Book a Revenue Diagnostic
        </a>
        <p className="text-white/40 text-[14px] mt-12 tracking-wide">
          One system. Real alignment. Predictable revenue.
        </p>
      </div>
    </section>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function Industries() {
  return (
    <div className="min-h-full antialiased">
      <SiteHeader />
      <main>
        <IndustriesHero />
        <SharedContextSection />
        <IndustryRoutingSection />
        <ComparisonSection />
        <ClosingCTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
