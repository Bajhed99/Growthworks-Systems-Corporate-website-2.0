import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/* ─── Tokens (sitewide) ─────────────────────────────────────────────── */
const CRIMSON = "#841617";
const CRIMSON_HOVER = "#721315";
const CRIMSON_ACTIVE = "#611012";
const CREAM = "#F8F5EC";
const CHARCOAL = "#2B2B2B";
const BORDER = "#DDD6CC";
const MUTED = "#625E59";
const WHITE = "#FFFFFF";

const CONTAINER = "max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16";

const FONT_SERIF = '"DM Serif Display", Georgia, serif';
const FONT_SANS = '"DM Sans", system-ui, sans-serif';

const SECTION_DEFAULT = "py-[72px] md:py-[112px]";
const SECTION_HERO = "py-[88px] md:py-[128px]";

const H1_CLASS = "font-normal text-[40px] md:text-[60px] leading-[1.10]";
const H2_CLASS = "font-normal text-[32px] md:text-[44px] leading-[1.15]";
const H3_CLASS = "font-normal text-[24px] md:text-[28px] leading-[1.25]";
const H4_CLASS = "font-normal text-[20px] md:text-[21px] leading-[1.30]";

/* ─── Reveal-on-scroll ──────────────────────────────────────────────── */
function RevealOnScroll({
  children,
  delayMs = 0,
  className = "",
}: {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 600ms ease ${delayMs}ms, transform 600ms ease ${delayMs}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

const SectionLabel = ({ num, label }: { num: string; label: string }) => (
  <p
    className="text-[14px] font-semibold tracking-[0.18em] uppercase mb-3"
    style={{ color: MUTED, fontFamily: FONT_SANS }}
  >
    {num}&ensp;{label}
  </p>
);

const CrimsonRule = () => (
  <span
    aria-hidden="true"
    className="block mb-6"
    style={{ width: 48, height: 2, background: CRIMSON }}
  />
);

/* ─── Primary CTA (48px) ────────────────────────────────────────────── */
const PrimaryLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    className="inline-flex items-center justify-center gap-2 rounded-none text-white font-semibold transition-colors"
    style={{
      minHeight: 48,
      padding: "0 24px",
      background: CRIMSON,
      fontFamily: FONT_SANS,
      fontSize: 16,
      textDecoration: "none",
      outlineOffset: 3,
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = CRIMSON_HOVER)}
    onMouseLeave={(e) => (e.currentTarget.style.background = CRIMSON)}
    onMouseDown={(e) => (e.currentTarget.style.background = CRIMSON_ACTIVE)}
    onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 3px ${CHARCOAL}`)}
    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
  >
    {children}
  </a>
);

const SecondaryLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="inline-flex items-center justify-center gap-2 rounded-none font-semibold transition-colors"
    style={{
      minHeight: 48,
      padding: "0 22px",
      background: "transparent",
      color: CHARCOAL,
      border: `1px solid ${BORDER}`,
      fontFamily: FONT_SANS,
      fontSize: 16,
      textDecoration: "none",
      outlineOffset: 3,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = CREAM;
      e.currentTarget.style.borderColor = CHARCOAL;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.borderColor = BORDER;
    }}
    onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 3px ${CHARCOAL}`)}
    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
  >
    {children}
  </a>
);

/* ─── Data ──────────────────────────────────────────────────────────── */
const APPROACH = [
  {
    n: "01",
    t: "Conversion Architecture",
    d: "Information hierarchy, page structure, and content sequencing engineered to move qualified visitors from awareness to trust to action — not merely to describe what the business does.",
  },
  {
    n: "02",
    t: "AI Indexing & Structured Data",
    d: "Schema markup, semantic HTML, content architecture, and machine-readable structure designed to help AI-assisted discovery environments interpret, retrieve, and represent the business accurately.",
  },
  {
    n: "03",
    t: "Trust & Authority Signals",
    d: "Reviews, proof, credentials, case context, and evidence-based credibility surfaced in the places qualified buyers expect to evaluate them.",
  },
  {
    n: "04",
    t: "Speed & Core Web Vitals",
    d: "Technical performance, page weight, render paths, and user-experience metrics aligned to current Core Web Vitals standards.",
  },
  {
    n: "05",
    t: "Accessibility & Compliance",
    d: "Accessible implementation, semantic structure, contrast and keyboard behavior oriented to current WCAG expectations — supporting both users and assistive technology.",
  },
  {
    n: "06",
    t: "Local & Entity Authority",
    d: "Business entity clarity, consistent name / address / phone, Google Business Profile context, local schema, and related discoverability foundations.",
  },
];

const OUTCOMES = [
  {
    t: "Higher conversion rates from qualified traffic",
    d: "A site structured to support trust, clarity, and decision — with measurement as the operating baseline. Conversion is treated as an outcome of system design, not a headline metric.",
  },
  {
    t: "Improved suitability for AI citation and recommendation",
    d: "Greater readiness for machine retrieval, understanding, and representation in AI-assisted buying and discovery environments. Not a guarantee that a specific system will recommend the business.",
  },
  {
    t: "Faster speed-to-trust",
    d: "The first visit carries weight. Authority, proof, and clarity appear in the moments qualified buyers form their initial judgment — reducing the friction of moving from awareness to inquiry.",
  },
  {
    t: "Systematic lead capture",
    d: "Forms, qualification prompts, scheduling, and routing configured to convert intent into trackable, attributable opportunity — not to capture everything indiscriminately.",
  },
  {
    t: "Measurable performance baseline",
    d: "Speed, behavior, and conversion baselines established so future improvement can be evaluated against real numbers rather than assumption.",
  },
];

const PROBLEMS = [
  "Visitors arrive but do not convert because trust is not sufficiently established",
  "AI systems may struggle to understand or cite the website when structured information and authoritative content are weak",
  "Slow performance can damage both user experience and discovery",
  "Systematic lead capture and qualification may be absent",
  "The site may be visually attractive without functioning as part of a revenue system",
];

const CALL_STEPS = [
  "Structured diagnostic conversation — not a sales presentation",
  "Assessment of current Revenue Infrastructure",
  "Identification of highest-impact improvement opportunities",
  "A specific, actionable next-step recommendation",
];

/* ─── Section: Hero ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      aria-labelledby="ai-ready-h1"
      className={SECTION_HERO}
      style={{ background: CREAM }}
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <p
            className="text-[14px] font-semibold tracking-[0.18em] uppercase mb-5"
            style={{ color: CRIMSON, fontFamily: FONT_SANS }}
          >
            AI-Ready Website
          </p>
          <h1
            id="ai-ready-h1"
            className={`${H1_CLASS} mb-6 max-w-[820px]`}
            style={{ color: CHARCOAL, fontFamily: FONT_SERIF }}
          >
            A website is not a brochure. It is a revenue asset.
          </h1>
          <p
            className="text-[18px] md:text-[20px] leading-[1.60] mb-10 max-w-[720px]"
            style={{ color: CHARCOAL, fontFamily: FONT_SANS }}
          >
            An AI-Ready Website is the conversion engine at the center of your
            Revenue Infrastructure. It establishes authority, earns trust, and
            moves qualified prospects toward a decision — for both human
            visitors and AI-assisted buying and discovery environments.
          </p>
          <div className="flex flex-wrap gap-3">
            <PrimaryLink href="/revenue-diagnostic">
              Book a Revenue Diagnostic
              <ArrowRight size={16} />
            </PrimaryLink>
            <SecondaryLink href="/revenue-diagnostic">
              Request a Website Audit
            </SecondaryLink>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ─── Section: Business Problem ─────────────────────────────────────── */
function BusinessProblemSection() {
  return (
    <section
      aria-labelledby="ai-ready-problem-h2"
      className={SECTION_DEFAULT}
      style={{ background: WHITE }}
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-8 lg:gap-16">
            <div>
              <SectionLabel num="01" label="The Business Problem" />
            </div>
            <div className="max-w-[720px]">
              <CrimsonRule />
              <h2
                id="ai-ready-problem-h2"
                className={`${H2_CLASS} mb-6`}
                style={{ color: CHARCOAL, fontFamily: FONT_SERIF }}
              >
                Most websites describe services. Qualified buyers need to trust
                the firm.
              </h2>
              <p
                className="text-[18px] leading-[1.65] mb-6"
                style={{ color: CHARCOAL, fontFamily: FONT_SANS }}
              >
                Most service-business websites explain what the company does.
                Qualified buyers need more than service descriptions. They need
                enough evidence, authority, and clarity to trust that the
                business is the right choice.
              </p>
              <ul
                className="space-y-4"
                style={{ color: CHARCOAL, fontFamily: FONT_SANS, fontSize: 17, lineHeight: 1.65 }}
              >
                {PROBLEMS.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[10px] inline-block shrink-0 rounded-full"
                      style={{ width: 6, height: 6, background: CRIMSON }}
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ─── Section: GWS Approach (6 items) ───────────────────────────────── */
function ApproachSection() {
  return (
    <section
      aria-labelledby="ai-ready-approach-h2"
      className={SECTION_DEFAULT}
      style={{ background: CREAM }}
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-8 lg:gap-16">
            <div>
              <SectionLabel num="02" label="The GWS Approach" />
            </div>
            <div className="max-w-[820px]">
              <CrimsonRule />
              <h2
                id="ai-ready-approach-h2"
                className={`${H2_CLASS} mb-4`}
                style={{ color: CHARCOAL, fontFamily: FONT_SERIF }}
              >
                Engineered for conversions, AI indexing, and executive
                credibility.
              </h2>
              <p
                className="text-[18px] leading-[1.65] mb-10"
                style={{ color: CHARCOAL, fontFamily: FONT_SANS }}
              >
                Six interconnected components — each one a distinct discipline
                that an AI-Ready Website must perform well.
              </p>
              <ol
                className="divide-y"
                style={{ borderColor: BORDER }}
              >
                {APPROACH.map((row, i) => (
                  <RevealOnScroll key={row.n} delayMs={i * 40}>
                    <li
                      className="grid grid-cols-1 md:grid-cols-[64px_220px_1fr] gap-4 md:gap-6 py-6 first:pt-0"
                      style={{ borderTop: i === 0 ? "none" : `1px solid ${BORDER}` }}
                    >
                      <span
                        className="text-[16px] font-semibold tracking-[0.12em]"
                        style={{ color: CRIMSON, fontFamily: FONT_SANS }}
                      >
                        {row.n}
                      </span>
                      <h3
                        className={H4_CLASS}
                        style={{ color: CHARCOAL, fontFamily: FONT_SERIF }}
                      >
                        {row.t}
                      </h3>
                      <p
                        className="text-[16px] md:text-[17px] leading-[1.65]"
                        style={{ color: MUTED, fontFamily: FONT_SANS }}
                      >
                        {row.d}
                      </p>
                    </li>
                  </RevealOnScroll>
                ))}
              </ol>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ─── Section: Expected Outcomes (5 items) ─────────────────────────── */
function OutcomesSection() {
  return (
    <section
      aria-labelledby="ai-ready-outcomes-h2"
      className={SECTION_DEFAULT}
      style={{ background: WHITE }}
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-8 lg:gap-16">
            <div>
              <SectionLabel num="03" label="Expected Business Outcomes" />
            </div>
            <div className="max-w-[820px]">
              <CrimsonRule />
              <h2
                id="ai-ready-outcomes-h2"
                className={`${H2_CLASS} mb-6`}
                style={{ color: CHARCOAL, fontFamily: FONT_SERIF }}
              >
                A website that works as hard as your best salesperson.
              </h2>
              <p
                className="text-[18px] leading-[1.65] mb-10"
                style={{ color: CHARCOAL, fontFamily: FONT_SANS }}
              >
                What the system is designed to deliver — treated as outcomes to
                engineer for, not guarantees to claim.
              </p>
              <ul className="space-y-6">
                {OUTCOMES.map((o, i) => (
                  <RevealOnScroll key={o.t} delayMs={i * 40}>
                    <li
                      className="rounded-none p-6 md:p-7"
                      style={{
                        background: CREAM,
                        border: `1px solid ${BORDER}`,
                      }}
                    >
                      <div className="flex items-baseline gap-4 mb-2">
                        <span
                          className="text-[14px] font-semibold tracking-[0.12em]"
                          style={{ color: CRIMSON, fontFamily: FONT_SANS }}
                        >
                          0{i + 1}
                        </span>
                        <h3
                          className={H4_CLASS}
                          style={{ color: CHARCOAL, fontFamily: FONT_SERIF }}
                        >
                          {o.t}
                        </h3>
                      </div>
                      <p
                        className="text-[16px] md:text-[17px] leading-[1.65]"
                        style={{ color: MUTED, fontFamily: FONT_SANS }}
                      >
                        {o.d}
                      </p>
                    </li>
                  </RevealOnScroll>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ─── Section: Audit / Diagnostic CTA (left copy + right dark panel) ─ */
function AuditCTASection() {
  return (
    <section
      aria-labelledby="ai-ready-audit-h2"
      className={SECTION_DEFAULT}
      style={{ background: CREAM }}
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            {/* Left: copy + actions */}
            <div>
              <p
                className="text-[14px] font-semibold tracking-[0.18em] uppercase mb-3"
                style={{ color: CRIMSON, fontFamily: FONT_SANS }}
              >
                Website Audit
              </p>
              <h2
                id="ai-ready-audit-h2"
                className={`${H2_CLASS} mb-5 max-w-[480px]`}
                style={{ color: CHARCOAL, fontFamily: FONT_SERIF }}
              >
                Is your website working as a revenue asset?
              </h2>
              <p
                className="text-[18px] leading-[1.65] mb-6 max-w-[520px]"
                style={{ color: CHARCOAL, fontFamily: FONT_SANS }}
              >
                A focused evaluation of conversion architecture, technical
                performance, AI readiness, and authority signals — followed by
                prioritized remediation you can act on.
              </p>
              <ul
                className="space-y-3 mb-8"
                style={{ color: CHARCOAL, fontFamily: FONT_SANS, fontSize: 16, lineHeight: 1.6 }}
              >
                {[
                  "Conversion architecture review",
                  "Technical performance & Core Web Vitals",
                  "AI indexing & structured data readiness",
                  "Authority and trust signal audit",
                  "Prioritized remediation roadmap",
                ].map((it, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[8px] inline-block shrink-0 rounded-full"
                      style={{ width: 6, height: 6, background: CRIMSON }}
                    />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <PrimaryLink href="/revenue-diagnostic">
                  Book a Revenue Diagnostic
                  <ArrowRight size={16} />
                </PrimaryLink>
                <SecondaryLink href="/revenue-diagnostic">
                  Request a Website Audit
                </SecondaryLink>
              </div>
            </div>

            {/* Right: dark informational panel */}
            <div
              className="rounded-none p-7 md:p-9"
              style={{
                background: CHARCOAL,
                color: WHITE,
                border: `1px solid ${CHARCOAL}`,
              }}
            >
              <p
                className="text-[14px] font-semibold tracking-[0.18em] uppercase mb-5"
                style={{ color: "rgba(255,255,255,0.55)", fontFamily: FONT_SANS }}
              >
                What Happens on the Call
              </p>
              <ol className="space-y-5">
                {CALL_STEPS.map((s, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[28px_1fr] gap-3 items-start"
                  >
                    <span
                      className="text-[14px] font-semibold tracking-[0.10em] mt-[2px]"
                      style={{
                        color: CRIMSON,
                        fontFamily: FONT_SANS,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <p
                      className="text-[16px] md:text-[17px] leading-[1.60]"
                      style={{
                        color: "rgba(255,255,255,0.88)",
                        fontFamily: FONT_SANS,
                      }}
                    >
                      {s}
                    </p>
                  </li>
                ))}
              </ol>
              <div
                className="mt-7 pt-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.16)" }}
              >
                <p
                  className="text-[14px] leading-[1.55]"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: FONT_SANS,
                  }}
                >
                  60 minutes · Focused on your constraint · No obligation
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ─── Section: Dark Closing Band ────────────────────────────────────── */
function ClosingBand() {
  return (
    <section
      aria-labelledby="ai-ready-closing-h2"
      className="py-[80px] md:py-[112px]"
      style={{ background: CHARCOAL }}
    >
      <div className={CONTAINER}>
        <RevealOnScroll>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <p
              className="text-[14px] font-semibold tracking-[0.18em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.55)", fontFamily: FONT_SANS }}
            >
              The Next Step
            </p>
            <h2
              id="ai-ready-closing-h2"
              className={`${H2_CLASS} mb-6`}
              style={{ color: WHITE, fontFamily: FONT_SERIF }}
            >
              Your business doesn't have a marketing problem. It has a Revenue
              Infrastructure problem.
            </h2>
            <p
              className="text-[18px] leading-[1.65] mb-9"
              style={{
                color: "rgba(255,255,255,0.78)",
                fontFamily: FONT_SANS,
              }}
            >
              A website is one part of that infrastructure. The Revenue
              Diagnostic examines how all the parts work together — and which
              improvement will create the most meaningful business impact first.
            </p>
            <PrimaryLink href="/revenue-diagnostic">
              Book a Revenue Diagnostic
              <ArrowRight size={16} />
            </PrimaryLink>
            <p
              className="mt-5 text-[14px]"
              style={{
                color: "rgba(255,255,255,0.55)",
                fontFamily: FONT_SANS,
              }}
            >
              60 minutes · No obligation · Focused on your constraint
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */
export default function AIReadyWebsite() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <BusinessProblemSection />
        <ApproachSection />
        <OutcomesSection />
        <AuditCTASection />
        <ClosingBand />
      </main>
      <SiteFooter />
    </>
  );
}
