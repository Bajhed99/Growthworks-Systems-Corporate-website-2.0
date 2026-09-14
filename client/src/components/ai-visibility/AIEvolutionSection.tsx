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

function SectionLabel({ label }: { label: string }) {
  return <h3 className="text-left text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-[#841617] industries-section-label">{label}</h3>;
}

function SectionNumber({ num }: { num: string }) {
  return (
    <span className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight" aria-hidden="true">
      {num}
    </span>
  );
}

const CrimsonRule = () => <span aria-hidden="true" className="block mb-6 w-12 h-[2px] bg-crimson" />;

export function AIEvolutionSection() {
  return (
    <section aria-labelledby="ai-evolution-title" className="diagnostic-section section--gray">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <SectionNumber num="03" />
              <div className="lg:mt-3">
                <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">AI Search Landscape</p>
              </div>
            </div>
            <div className="max-w-[720px]">
              <CrimsonRule />
              <h2 id="ai-evolution-title" className="text-left font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6">How Search Has <span className="heading-accent">Changed</span> - And Why It Matters</h2>
              <p className="text-left text-[17px] md:text-[18px] leading-[1.65] text-gray-900 mb-6">
                The evolution from traditional search engines to AI-powered answer engines represents a fundamental shift in how buyers discover solutions. Each era introduces new requirements for visibility.
              </p>
              <div className="ai-cards">
                {[
                  { era: 'Traditional Search', years: '1990s – 2020', desc: 'Keyword-based ranking, backlink authority, and on-page optimization determine visibility.', pill: 'SEO' },
                  { era: 'AI-Enhanced Search', years: '2020 – 2023', desc: 'AI features layered onto search — featured snippets, People Also Ask, autocomplete — with richer entity recognition.', pill: 'SEO +' },
                  { era: 'AI Answer Engines', years: '2023 – Present', desc: 'Large language models synthesize answers directly from authoritative sources. Entities, citations, and source credibility determine inclusion.', pill: 'AEO' },
                  { era: 'Ambient AI', years: 'Emerging', desc: 'AI agents, voice interfaces, and autonomous systems surface recommendations without requiring a traditional web visit at all.', pill: 'GEO' },
                ].map(e => (
                  <article key={e.era} className="ai-era-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span className="ai-card-num">{e.pill}</span>
                      <span style={{ fontFamily: '"DM Sans", Arial, sans-serif', fontSize: '13px', color: '#64748b' }}>{e.years}</span>
                    </div>
                    <h3 className="ai-card-title">{e.era}</h3>
                    <p className="ai-card-body">{e.desc}</p>
                  </article>
                ))}
              </div>
              <p className="ai-source-note">
                Source-dependency note: Era year ranges, platform-specific mechanics, and citation logic are provided at the conceptual level. Confirm exact timeline markers and specific AI platform behavior with authoritative sources before production use.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
