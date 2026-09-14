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

export function AIRecommendationMechanicsSection() {
  return (
    <section aria-label="AI Recommendation Mechanics" className="diagnostic-section section--white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <SectionNumber num="06" />
              <div className="lg:mt-3">
                <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">Recommendation Mechanics</p>
              </div>
            </div>
            <div className="max-w-[720px]">
              <CrimsonRule />
              <h2 className="font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6">How AI Forms a <span className="heading-accent">Recommendation</span></h2>
              <p className="text-[17px] md:text-[18px] leading-[1.65] text-gray-900 mb-6">
                AI recommendations don't come from a single ranking score. They emerge from a cascade of judgments — about relevance, credibility, and fit — made at each stage of the process. Improving visibility requires addressing all of them, not just one.
              </p>
              <ol className="ai-cards" aria-label="Five-stage recommendation flow" style={{ listStyle: 'none', padding: 0, gap: '14px' }}>
                {[
                  { stage: '01', label: 'Buyer Question', detail: 'The user asks a real, domain-specific problem question.' },
                  { stage: '02', label: 'Intent', detail: 'AI identifies the underlying intent: what the buyer actually needs.' },
                  { stage: '03', label: 'Retrieval', detail: 'AI pulls from sources it considers authoritative and relevant.' },
                  { stage: '04', label: 'Understanding', detail: 'Sources are interpreted, entities matched, relationships mapped.' },
                  { stage: '05', label: 'Recommendation', detail: 'The final recommendation or shortlist is generated and presented.' },
                ].map((s, idx) => (
                  <li key={s.stage} className="ai-card-outline" style={{ animation: `cardReveal 550ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 100}ms forwards` }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="ai-card-num" style={{ width: '28px', height: '28px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.06em' }}>{s.stage}</span>
                      <h3 className="ai-card-title" style={{ margin: 0, fontSize: '17px' }}>{s.label}</h3>
                    </span>
                    <p className="ai-card-body" style={{ marginTop: '8px' }}>{s.detail}</p>
                  </li>
                ))}
              </ol>
              <p className="ai-source-note">
                Source-dependency note: Detailed scoring weights, platform-specific retrieval logic, and exact recommendation thresholds are not defined in approved source material. Confirm before production.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
