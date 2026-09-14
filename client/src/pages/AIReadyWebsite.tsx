import React, { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TableOfContents from "@/components/TableOfContents";
import { Seo } from "@/components/Seo";


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
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < winH && rect.bottom > 0) {
      setVisible(true);
      return;
    }
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

const SectionLabel = ({ label }: { label: string }) => (
  <p
    className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase text-[#841617] industries-section-label"
  >
    {label}
  </p>
);

function SectionNumber({ num }: { num: string }) {
  return (
    <span
      className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight"
      aria-hidden="true"
    >
      {num}
    </span>
  );
}

const CrimsonRule = () => (
  <span aria-hidden="true" className="block mb-6 w-12 h-[2px] bg-[#841617]" />
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
    className="inline-flex items-center justify-center gap-2 rounded bg-[#841617] text-white font-sans font-semibold text-[16px] h-12 px-8 hover:bg-[#721315] transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#2B2B2B]"
    style={{ fontFamily: '"DM Sans", Arial, sans-serif', color: '#ffffff' }}
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
    className="inline-flex items-center justify-center gap-2 rounded border border-gray-200 text-gray-900 font-sans font-semibold text-[16px] h-12 px-8 bg-transparent hover:border-[#841617] hover:text-[#841617] transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#2B2B2B]"
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
      aria-labelledby="ai-ready-title"
      className="gws-glowy-hero"
      style={{ minHeight: 'unset', height: 655.078 }}
    >
      <div className="gws-glowy-canvas" style={{ height: 655.078 }} />
      <div className="gws-glowy-content" style={{ paddingBottom: 108 }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
          <div className="gws-glowy-content-inner" style={{ marginTop: 0, marginBottom: 0 }}>
            <div className="gws-glowy-badge">
              AI-Ready Website
            </div>
            <h2 id="ai-ready-title" className="gws-glowy-title">
              A website is not a brochure. It is a <span style={{ color: 'var(--maroon)' }}>revenue asset.</span>
            </h2>
            <p className="gws-glowy-copy">
              An AI-Ready Website is the conversion engine at the center of your Revenue Infrastructure. It establishes authority, earns trust, and moves qualified prospects toward a decision — for both human visitors and AI-assisted buying and discovery environments.
            </p>
            <div className="gws-glowy-actions">
              <a
                href="/google-business-profile-optimization-review"
                className="gws-glowy-primary supporting-button"
                style={{ fontFamily: '"DM Sans", Arial, sans-serif', fontSize: 14 }}
              >
                Improve My Google Visibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section: Business Problem ─────────────────────────────────────── */
function BusinessProblemSection() {
  return (
    <section
      aria-labelledby="ai-ready-problem-h2"
      className="section section--white"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <SectionNumber num="01" />
              <div className="lg:mt-3">
                <SectionLabel label="The Business Problem" />
              </div>
            </div>
            <div className="max-w-[720px]">
              <CrimsonRule />
              <h2
                id="ai-ready-problem-h2"
                className="font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6"
              >
                Most websites describe services. Qualified buyers need to <span className="text-crimson">trust the firm.</span>
              </h2>
              <p
                className="text-[17px] md:text-[18px] leading-[1.65] mb-6"
              >
                Most service-business websites explain what the company does.
                Qualified buyers need more than service descriptions. They need
                enough evidence, authority, and clarity to trust that the
                business is the right choice.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROBLEMS.map((p, i) => (
                  <RevealOnScroll key={i} delayMs={i * 80}>
                    <li
                      className="group relative rounded-none border border-gray-200 bg-white p-5 md:p-6 transition-all duration-300 hover:border-gray-400 hover:shadow-lg hover:-translate-y-1 cursor-default"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[2px] inline-flex shrink-0 items-center justify-center w-7 h-7 rounded-full bg-[#841617]/10 text-[#841617] text-[12px] font-bold leading-none"
                        >
                          {i + 1}
                        </span>
                        <p className="text-[15px] md:text-[16px] leading-[1.6] text-gray-700 m-0">
                          {p}
                        </p>
                      </div>
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

/* ─── Section: GWS Approach (6 items) ───────────────────────────────── */
function ApproachSection() {
  return (
    <section
      aria-labelledby="ai-ready-approach-h2"
      className="section section--gray"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <SectionNumber num="02" />
              <div className="lg:mt-3">
                <SectionLabel label="The GWS Approach" />
              </div>
            </div>
            <div className="max-w-[820px]">
              <CrimsonRule />
              <h2
                id="ai-ready-approach-h2"
                className="font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-4"
              >
                Engineered for conversions, AI indexing, and{" "}
                <span style={{ color: '#841617' }}>executive credibility.</span>
              </h2>
              <p
                className="text-[17px] md:text-[18px] leading-[1.65] mb-10"
              >
                Six interconnected components — each one a distinct discipline
                that an AI-Ready Website must perform well.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {APPROACH.map((row, i) => (
                  <RevealOnScroll key={row.n} delayMs={i * 60}>
                    <div
                      className="group relative rounded-none border border-gray-200 bg-white p-5 md:p-6 transition-all duration-300 hover:border-gray-400 hover:shadow-lg hover:-translate-y-1 cursor-default"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#841617] text-white text-[13px] font-bold leading-none shrink-0 transition-transform duration-300 group-hover:scale-110"
                        >
                          {row.n}
                        </span>
                        <h3
                          className="font-serif font-normal text-[17px] md:text-[18px] leading-[1.30] text-gray-900 m-0"
                        >
                          {row.t}
                        </h3>
                      </div>
                      <p
                        className="text-[14px] md:text-[15px] leading-[1.6] text-gray-600 m-0 pl-[44px]"
                      >
                        {row.d}
                      </p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
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
      className="section section--white"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <SectionNumber num="03" />
              <div className="lg:mt-3">
                <SectionLabel label="Expected Business Outcomes" />
              </div>
            </div>
            <div className="max-w-[820px]">
              <CrimsonRule />
              <h2
                id="ai-ready-outcomes-h2"
                className="font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6"
              >
                A website that works as hard as your best <span className="text-crimson">salesperson.</span>
              </h2>
              <p
                className="text-[17px] md:text-[18px] leading-[1.65] mb-10"
              >
                What the system is designed to deliver — treated as outcomes to
                engineer for, not guarantees to claim.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {OUTCOMES.map((o, i) => (
                  <RevealOnScroll key={o.t} delayMs={i * 80}>
                    <li
                      className="group relative rounded-none border border-gray-200 bg-white p-5 md:p-6 transition-all duration-300 hover:border-[#841617] hover:shadow-lg hover:-translate-y-1 cursor-default"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#841617]/10 text-[#841617] text-[13px] font-bold leading-none shrink-0 transition-all duration-300 group-hover:bg-[#841617] group-hover:text-white group-hover:scale-110"
                        >
                          0{i + 1}
                        </span>
                        <h3
                          className="font-serif font-normal text-[17px] md:text-[18px] leading-[1.30] text-gray-900 m-0"
                        >
                          {o.t}
                        </h3>
                      </div>
                      <p
                        className="text-[14px] md:text-[15px] leading-[1.6] text-gray-600 m-0"
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
      className="section section--gray"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            {/* Left: copy + actions */}
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <SectionNumber num="04" />
                <SectionLabel label="Website Audit" />
              </div>
              <h2
                id="ai-ready-audit-h2"
                className="font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-5 max-w-[480px]"
              >
                Is your website working as a <span className="text-crimson">revenue asset?</span>
              </h2>
              <p
                className="text-[17px] md:text-[18px] leading-[1.65] mb-6 max-w-[520px]"
              >
                A focused evaluation of conversion architecture, technical
                performance, AI readiness, and authority signals — followed by
                prioritized remediation you can act on.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Conversion architecture review",
                  "Technical performance & Core Web Vitals",
                  "AI indexing & structured data readiness",
                  "Authority and trust signal audit",
                  "Prioritized remediation roadmap",
                ].map((it, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <span
                      aria-hidden="true"
                      className="mt-[6px] inline-flex shrink-0 items-center justify-center w-5 h-5 rounded-full bg-[#841617]/10 text-[#841617] text-[10px] font-bold group-hover:bg-[#841617] group-hover:text-white transition-colors duration-200"
                    >
                      ✓
                    </span>
                    <span className="text-[15px] leading-[1.6] text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{it}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <PrimaryLink href="/google-business-profile-optimization-review">
                  Improve My Google Visibility
                </PrimaryLink>
              </div>
            </div>

            {/* Right: dark informational panel */}
            <div
              className="group relative rounded-none p-5 md:p-7 lg:p-9 text-white border border-gray-800 flex flex-col justify-center transition-all duration-300 hover:border-[#841617]/50 hover:shadow-2xl"
              style={{ background: "var(--dark)" }}
            >
              {/* Timeline line */}
              <div className="absolute left-[19px] top-[52px] bottom-[52px] w-[2px] bg-gray-700 group-hover:bg-[#841617]/30 transition-colors duration-300" />

              <p
                className="text-[14px] font-semibold tracking-[0.18em] uppercase mb-6"

              >
                What Happens on the Call
              </p>
              <ol className="space-y-6">
                {CALL_STEPS.map((s, i) => (
                  <li
                    key={i}
                    className="relative grid grid-cols-[28px_1fr] gap-3 md:gap-4 items-start"
                  >
                    <span
                      className="relative z-10 flex items-center justify-center w-[28px] h-[28px] rounded-full border-2 border-[#841617] text-[12px] font-bold text-[#841617] transition-all duration-300 group-hover:bg-[#841617] group-hover:text-white"
                    >
                      0{i + 1}
                    </span>
                    <p
                      className="text-[15px] md:text-[16px] leading-[1.65]"

                    >
                      {s}
                    </p>
                  </li>
                ))}
              </ol>
              <div
                className="mt-8 pt-6 border-t border-gray-700"

              >
                <p
                  className="text-[14px] leading-[1.55]"

                >
                  30-45 minutes · Focused on your constraint · No obligation
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
      className="section" style={{ background: "var(--dark)", color: "#ffffff" }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="text-center">
            <h2
              id="ai-ready-closing-h2"
              className="font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-white mb-6 mx-auto max-w-[720px]"
    style={{ color: '#ffffff' }}
            >
              Your business doesn't have a marketing problem. It has a <span className="heading-accent">Revenue Infrastructure</span> problem.
            </h2>
            <p
              className="text-[17px] md:text-[18px] leading-[1.65] mb-8 mx-auto max-w-[620px]"

            >
              A website is one part of that infrastructure. The Revenue
              Diagnostic examines how all the parts work together — and which
              improvement will create the most meaningful business impact first.
            </p>
            <div className="flex flex-col items-center gap-2">
              <PrimaryLink href="/google-business-profile-optimization-review">
                Improve My Google Visibility
              </PrimaryLink>
              <p
                className="mt-2 text-[14px] text-gray-400"

              >
                30-45 minutes · No obligation · Focused on your constraint
              </p>
            </div>

            {/* Visual highlight card — left-aligned, not centered */}
            <div
              className="mt-10 rounded-none border border-gray-700 p-6 md:p-8 transition-all duration-300 hover:border-[#841617]/40 text-left"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-[13px] font-semibold tracking-[0.18em] uppercase text-[#841617] mb-4">
                What You Will Get
              </p>
              <ul className="space-y-3">
                {[
                  "A clear picture of where your revenue infrastructure is leaking",
                  "Prioritized actions — not a generic checklist",
                  "A specific recommendation you can act on immediately",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[3px] inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#841617]/20 text-[#841617] text-[10px] font-bold shrink-0">
                      ✓
                    </span>
                    <span className="text-[15px] leading-[1.6] text-gray-300">{item}</span>
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

/* ─── Page ─────────────────────────────────────────────────────────── */
export default function AIReadyWebsite() {
  return (
    <>
      <Seo canonical="/ai-ready-website" />
      <SiteHeader />
      <main id="main-content">
        <TableOfContents />
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
