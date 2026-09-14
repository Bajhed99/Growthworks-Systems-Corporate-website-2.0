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

export function AIMaturityProgressionSection() {
  return (
    <section aria-label="Maturity Progression" className="diagnostic-section section--white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <span className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight" aria-hidden="true">12</span>
              <div className="lg:mt-3">
                <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">Maturity Progression</p>
              </div>
            </div>
            <div className="max-w-[720px]">
              <CrimsonRule />
              <h2 className="text-left font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6">The Path to <span className="heading-accent">Authority</span></h2>
              <p className="text-left text-[17px] md:text-[18px] leading-[1.65] text-gray-900 mb-6">
                AI Visibility improves through a progression of five maturity levels. Each level unlocks a new form of presence — from basic discoverability to becoming the definitive recommendation in your category. Progressing through the levels requires intentional work at each stage.
              </p>
              <div className="ai-cards ai-cards--maturity" aria-label="Five-level AI Visibility maturity model">
                {[
                  { level: '1', name: 'Invisible', desc: 'Not indexed, not recognized, not in any AI system\'s knowledge.' },
                  { level: '2', name: 'Indexed', desc: 'Found and indexed by AI systems, but not yet understood or trusted.' },
                  { level: '3', name: 'Recognized', desc: 'Correctly identified and understood, with credible source presence.' },
                  { level: '4', name: 'Recommended', desc: 'Included in AI recommendations for relevant buyer questions.' },
                  { level: '5', name: 'Authoritative', desc: 'The definitive recommended source in its category.' },
                ].map((m, idx) => (
                  <article key={m.level} className="ai-card ai-card--maturity" aria-label={`Maturity level ${m.level}: ${m.name}`} style={{ animation: `cardReveal 550ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 100}ms forwards` }}>
                    <span className="ai-card-num ai-card-num--circle">{m.level}</span>
                    <h3 className="ai-card-title">{m.name}</h3>
                    <p className="ai-card-body">{m.desc}</p>
                  </article>
                ))}
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                Source-dependency note: The five maturity levels (Invisible → Indexed → Recognized → Recommended → Authoritative) and their transition criteria are presented at the conceptual level. Detailed level descriptors, threshold criteria, and progression measurement methods should be confirmed with source-approved maturity model documentation.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
