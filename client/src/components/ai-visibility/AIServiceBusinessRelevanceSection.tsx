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

export function AIServiceBusinessRelevanceSection() {
  return (
    <section aria-label="Service Business Relevance" className="diagnostic-section section--white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <span className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight" aria-hidden="true">08</span>
              <div className="lg:mt-3">
                <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">Service-Business Relevance</p>
              </div>
            </div>
            <div className="max-w-[720px]">
              <CrimsonRule />
              <h2 className="text-left font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6">AI Visibility Is <span className="heading-accent">Not Optional</span> Anymore</h2>
              <p className="text-left text-[17px] md:text-[18px] leading-[1.65] text-gray-900 mb-6">
                Service businesses — agencies, consultancies, professional practices — are disproportionately affected by AI-driven discovery. Your potential clients are already asking AI systems for recommendations before they've visited a single website. If you're not understood by those systems, you're invisible at the exact moment a buying decision is being made.
              </p>
              <div className="ai-info-panel">
                <h3>The Revenue Infrastructure Context</h3>
                <p>
                  AI Visibility doesn't operate in isolation. It's connected to how buyers discover your business, how they build trust before contact, and how your systems manage the relationship from first recommendation to closed revenue. Within the Revenue Infrastructure Framework, AI Visibility is the front end of the buyer relationship — the moment before the relationship begins.
                </p>
                <a href="/framework" className="text-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Explore the Revenue Infrastructure Framework &rarr;
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
