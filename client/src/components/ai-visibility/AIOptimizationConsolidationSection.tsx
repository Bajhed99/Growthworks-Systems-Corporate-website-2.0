import React from "react";

function RevealOnScroll({ children, delayMs = 0 }: { children: React.ReactNode; delayMs?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) { setVisible(true); return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } });
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `opacity 600ms ease ${delayMs}ms, transform 600ms ease ${delayMs}ms`, willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}

function SectionNumber({ num }: { num: string }) {
  return (
    <span className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight" aria-hidden="true">
      {num}
    </span>
  );
}

const CrimsonRule = () => <span aria-hidden="true" className="block mb-6 w-12 h-[2px] bg-crimson" />;

export function AIOptimizationConsolidationSection() {
  return (
    <section aria-label="SEO AEO GEO Consolidation" className="diagnostic-section section--white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <SectionNumber num="04" />
              <div className="lg:mt-3">
                <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">Consolidated View</p>
              </div>
            </div>
          <div className="max-w-[720px]">
            <CrimsonRule />
            <h2 className="text-left font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6">SEO, AEO, and GEO — <span className="heading-accent">One System</span></h2>
            <p className="text-left text-[17px] md:text-[18px] leading-[1.65] text-gray-900 mb-6">
              Rather than treating Search Engine Optimization (SEO), AI Engine Optimization (AEO), and Generative Engine Optimization (GEO) as separate disciplines, AI Visibility treats them as connected layers of the same visibility problem. The same structural, content, and credibility work that earns ranking in traditional search also strengthens inclusion in AI answers.
            </p>
            <div className="ai-dark-panel" aria-label="Optimization layers summary">
              <div>
                <span className="ai-dark-num" aria-hidden="true">01</span>
                <h3 className="text-left">SEO — Foundation</h3>
                <p className="text-left">
                  Technical health, crawlability, structured data, and authoritative content remain the baseline for any form of visibility.
                </p>
              </div>
              <div>
                <span className="ai-dark-num" aria-hidden="true">02</span>
                <h3 className="text-left">AEO — Answer Inclusion</h3>
                <p className="text-left">
                  Content must be clear, authoritative, and structured so that AI systems can extract and cite it confidently.
                </p>
              </div>
              <div>
                <span className="ai-dark-num" aria-hidden="true">03</span>
                <h3 className="text-left">GEO — Generative Presence</h3>
                <p className="text-left">
                  Brand-level entity signals — expertise, consistency, citations, relationships — determine whether AI systems recommend your business as part of their synthesized answers.
                </p>
              </div>
            </div>
            <p className="ai-source-note">
              Source-dependency note: The consolidation framework above reflects the approved conceptual alignment of SEO/AEO/GEO. Detailed scoring weights, platform-specific ranking signals, and exact citation mechanics are source-dependent and should be verified with current authoritative documentation.
            </p>
          </div>
        </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
