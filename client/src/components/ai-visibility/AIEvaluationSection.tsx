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

export function AIEvaluationSection() {
  return (
    <section aria-label="AI Visibility Evaluation" className="diagnostic-section section--gray">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <span className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight" aria-hidden="true">09</span>
              <div className="lg:mt-3">
                <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">Evaluation</p>
              </div>
            </div>
            <div className="max-w-[720px]">
              <CrimsonRule />
              <h2 className="text-left font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6">How Visibility Is <span className="heading-accent">Assessed</span></h2>
              <p className="text-left text-[17px] md:text-[18px] leading-[1.65] text-gray-900 mb-6">
                Assessing AI Visibility requires more than running an SEO audit. It requires understanding how AI systems interpret your business, what entities and sources they associate with you, and whether you're being included in the recommendations that actually matter to your buyers.
              </p>
              <ul className="ai-evaluation-list" aria-label="Evaluation criteria">
                {[
                  'Buyer-question simulation: how AI systems answer the questions your buyers are actually asking',
                  'Entity recognition: whether your business is correctly identified and disambiguated',
                  'Source inclusion: whether authoritative third-party sources mention and validate your business',
                  'Citation eligibility: whether your content is structured to be cited by AI answer systems',
                  'Recommendation shortlist presence: whether you appear in the final recommendations AI systems give to buyers',
                ].map((item, idx) => (
                  <li key={idx} className="ai-evaluation-item" style={{ animation: `listReveal 500ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 90}ms forwards` }}>
                    <span className="ai-evaluation-badge" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="ai-evaluation-text">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="ai-source-note">
                Source-dependency note: Evaluation criteria and weightings above are presented at the conceptual level. Specific scoring rubrics, evaluation question sets, and platform-specific assessment methods should be confirmed with source-approved evaluation documentation.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
