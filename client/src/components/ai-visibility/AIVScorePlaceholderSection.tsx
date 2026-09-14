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

const CrimsonRule = () => <span aria-hidden="true" className="block mb-6 w-12 h-[2px] bg-crimson" />;

export function AIVScorePlaceholderSection() {
  return (
    <section aria-label="AI Visibility Score" className="diagnostic-section section--white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <span className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight" aria-hidden="true">10</span>
              <div className="lg:mt-3">
                <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">Visibility Score</p>
              </div>
            </div>
            <div className="max-w-[720px]">
              <CrimsonRule />
              <h2 className="text-left font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6">AI Visibility <span className="heading-accent">Score</span> — Source-Dependent Metrics</h2>
              <p className="text-left text-[17px] md:text-[18px] leading-[1.65] text-gray-900 mb-6">
                A structured visibility score provides a consistent way to measure improvement over time. The score considers multiple dimensions: entity clarity, citation eligibility, source coherence, recommendation presence, and cross-source consistency.
              </p>
              <div className="ai-card" aria-label="Seven-dimension score framework">
                <h3 className="ai-card-title" style={{ fontSize: '20px', marginBottom: '12px' }}>Seven-Weighted Dimensions (Conceptual)</h3>
                <p className="ai-card-body" style={{ fontSize: '15px', color: '#334155', marginBottom: '12px' }}>
                  The score framework is designed to cover the full visibility lifecycle — from being indexed to being recommended. Each dimension reflects a specific capability that AI systems require before recommending a business in response to a buyer's question.
                </p>
                <p style={{ fontFamily: '"DM Sans", Arial, sans-serif', fontSize: '13px', color: '#475569', lineHeight: 1.6, fontStyle: 'italic' }}>
                  Source-dependency guard: Specific dimension weights, descriptor names, scoring ranges, and interpretation rules are source-dependent and should be confirmed with the approved AI Visibility Score specification before any production use. This section is intentionally not fabricated with synthetic weights or synthetic descriptors.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
