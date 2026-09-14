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

export function AILifecyclePlaceholderSection() {
  return (
    <section aria-label="Operating Lifecycle" className="diagnostic-section section--gray">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <span className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight" aria-hidden="true">11</span>
              <div className="lg:mt-3">
                <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">Operating Lifecycle</p>
              </div>
            </div>
            <div className="max-w-[720px]">
              <CrimsonRule />
              <h2 className="text-left font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6"><span className="heading-accent">Seven-Stage</span> Operating Lifecycle</h2>
              <p className="text-left text-[17px] md:text-[18px] leading-[1.65] text-gray-900 mb-6">
                A canonical operating lifecycle describes the seven stages through which AI Visibility is built, sustained, and improved over time. The lifecycle provides the long-arc structure within which tactical improvement work happens.
              </p>
              <div className="ai-card">
                <p className="ai-card-body" style={{ fontSize: '15px', color: '#334155', marginBottom: '10px' }}>
                  The seven stages establish the structural sequence of AI Visibility work — from initial discoverability through sustained authority — without prescribing the tactical steps within each stage.
                </p>
                <p style={{ fontFamily: '"DM Sans", Arial, sans-serif', fontSize: '13px', color: '#475569', lineHeight: 1.6, fontStyle: 'italic' }}>
                  Source-dependency guard: Stage names, descriptors, and entry/exit criteria are source-dependent and not fabricated here. Confirm with the approved Seven-Stage Operating Lifecycle specification before production.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
