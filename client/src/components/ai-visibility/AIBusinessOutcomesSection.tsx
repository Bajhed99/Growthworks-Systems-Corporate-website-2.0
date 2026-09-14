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

export function AIBusinessOutcomesSection() {
  return (
    <section aria-label="Business Outcomes" className="diagnostic-section section--gray">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <span className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight" aria-hidden="true">13</span>
              <div className="lg:mt-3">
                <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">Business Outcomes</p>
              </div>
            </div>
            <div className="max-w-[720px]">
              <CrimsonRule />
              <h2 className="text-left font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6">From Discoverability to <span className="heading-accent">Revenue Growth</span></h2>
              <p className="text-left text-[17px] md:text-[18px] leading-[1.65] text-gray-900 mb-6">
                AI Visibility isn't just about being found. It's about being found at the right time, by the right buyer, with the right authority — and turning that discovery into business outcomes that compound over time.
              </p>
              <div className="ai-cards" aria-label="Five-step outcomes chain">
                {[
                  { step: '01', title: 'Discoverability', desc: 'Your business is found when buyers ask relevant questions.' },
                  { step: '02', title: 'Recognition', desc: 'AI systems correctly understand what you do and who you serve.' },
                  { step: '03', title: 'Recommendation', desc: 'You appear in the recommendation shortlist for qualified buyers.' },
                  { step: '04', title: 'Engagement', desc: 'Buyers reach out with context — they already know you.' },
                  { step: '05', title: 'Revenue Growth', desc: 'Qualified pipeline improves; acquisition cost decreases; growth compounds.' },
                ].map(s => (
                  <div key={s.step} className="ai-card" aria-label={`${s.title}: ${s.desc}`}>
                    <span className="ai-card-num">{s.step}</span>
                    <h3 className="ai-card-title">{s.title}</h3>
                    <p className="ai-card-body">{s.desc}</p>
                  </div>
                ))}
              </div>
              <p className="ai-source-note">
                Source-dependency note: The five-step outcomes chain is presented at the conceptual level. Specific intermediate stages, measurement methods, and outcome tracking criteria should be verified with source-approved business outcomes documentation.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
