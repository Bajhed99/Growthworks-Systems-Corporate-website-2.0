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

export function AITechnicalFoundationSection() {
  return (
    <section aria-label="Technical Foundation" className="diagnostic-section section--gray">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <span className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight" aria-hidden="true">07</span>
              <div className="lg:mt-3">
                <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">Technical Foundation</p>
              </div>
            </div>
            <div className="max-w-[720px]">
              <CrimsonRule />
              <h2 className="text-left font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6">Six Layers of Technical <span className="heading-accent">Readiness</span></h2>
              <p className="text-left text-[17px] md:text-[18px] leading-[1.65] text-gray-900 mb-6">
                Technical readiness for AI Visibility spans more than crawlability. It includes structured identity, content architecture, citation pathways, and cross-source coherence — six layers that together determine whether AI systems can understand and trust your presence.
              </p>
              <div className="ai-cards">
                {[
                  { layer: '01', title: 'Structured Identity', desc: 'Schema markup, consistent naming, and entity definitions.' },
                  { layer: '02', title: 'Content Architecture', desc: 'Clear topical structure, authoritative depth, and citation-ready content.' },
                  { layer: '03', title: 'Source Consistency', desc: 'Same facts across authoritative third-party sources AI systems reference.' },
                  { layer: '04', title: 'Citation Pathways', desc: 'Clear references to evidence, expertise, and third-party validation.' },
                  { layer: '05', title: 'Relationship Mapping', desc: 'Linked entities across the business ecosystem — services, industries, locations.' },
                  { layer: '06', title: 'Cross-Source Coherence', desc: 'Consistent brand identity across all discoverable sources.' },
                ].map(l => (
                  <article key={l.layer} className="ai-card-outline">
                    <span className="ai-card-num">{l.layer}</span>
                    <h3 className="ai-card-title">{l.title}</h3>
                    <p className="ai-card-body">{l.desc}</p>
                  </article>
                ))}
              </div>
              <p className="ai-source-note">
                Source-dependency note: The six-layer framework above reflects the approved conceptual model. Detailed layer definitions, scoring logic, and cross-layer interaction rules should be confirmed from source-approved technical documentation.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
