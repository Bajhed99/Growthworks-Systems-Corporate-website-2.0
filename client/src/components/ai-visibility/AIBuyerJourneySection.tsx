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

export function AIBuyerJourneySection() {
  return (
    <section id="buyer-journey" aria-label="From Search to Recommendation" className="diagnostic-section section--white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <SectionNumber num="02" />
              <div className="lg:mt-3">
                <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">Buyer Journey</p>
              </div>
            </div>
            <div className="max-w-[720px]">
              <CrimsonRule />
              <h2 className="text-left font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6">From Search to <span className="heading-accent">Recommendation</span></h2>
              <p className="text-left text-[17px] md:text-[18px] leading-[1.65] text-gray-900 mb-6">
                Modern buyer journeys no longer start on your website. They start inside AI systems — where questions are interpreted, entities are matched, and recommendations are formed before any human sees your homepage.
              </p>
              <div className="ai-cards" aria-label="Five-stage AI recommendation flow">
                {[
                  { num: '01', label: 'Buyer Question', desc: 'A real buyer asks a problem-focused question.' },
                  { num: '02', label: 'Intent', desc: 'AI parses intent, context, and domain signals.' },
                  { num: '03', label: 'Retrieval', desc: 'Knowledge sources are retrieved and ranked.' },
                  { num: '04', label: 'Understanding', desc: 'Entities and relationships are interpreted.' },
                  { num: '05', label: 'Recommendation', desc: 'The buyer receives a curated recommendation.' },
                ].map(step => (
                  <article key={step.num} className="ai-card" aria-label={`${step.label}: ${step.desc}`}>
                    <span className="ai-card-num">{step.num}</span>
                    <h3 className="ai-card-title">{step.label}</h3>
                    <p className="ai-card-body">{step.desc}</p>
                  </article>
                ))}
              </div>
              <p className="ai-source-note">
                Source-dependency note: Stage descriptors above reflect the approved conceptual flow (Buyer Question → Intent → Retrieval → Understanding → Recommendation/Shortlist) as specified. Detailed descriptor weights, entity-level scoring, and platform-specific recommendation logic are not fabricated; confirm with source-approved score definitions before production.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
