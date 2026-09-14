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

export function AIEntityOptimizationSection() {
  return (
    <section id="entity-optimization" aria-label="Entity Optimization" className="diagnostic-section section--gray">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
          <div className="flex lg:block items-baseline gap-3">
            <SectionNumber num="05" />
            <div className="lg:mt-3">
              <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">Entity Optimization</p>
            </div>
          </div>
          <div className="max-w-[720px]">
            <CrimsonRule />
            <h2 className="text-left font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6">How AI <span className="heading-accent">Understands</span> Who You Are</h2>
            <p className="text-left text-[17px] md:text-[18px] leading-[1.65] text-gray-900 mb-6">
              AI systems don't read pages the way people do. They interpret entities — discrete units of meaning: your business, your offering, your expertise, your market — and the relationships between them. Entity optimization is the work of making those units unambiguous, well-supported, and trustworthy across the entire web.
            </p>
            <div className="ai-cards">
              {[
                { title: 'Disambiguation', desc: 'Your brand is recognized as one specific entity — not confused with similarly named or related businesses.' },
                { title: 'Authority Signals', desc: 'Author, expertise, and citation patterns reinforce what your entity is and what it can be trusted on.' },
                { title: 'Relationship Mapping', desc: 'Connected entities — services, industries, locations, founders — establish the full context AI systems need to understand your role.' },
                { title: 'Source Consistency', desc: 'The same information appears reliably across authoritative third-party sources that AI systems trust.' },
              ].map((item, idx) => (
                <article key={item.title} className="ai-card ai-card--crimson" style={{ animation: `cardReveal 550ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 100}ms forwards` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span aria-hidden="true" style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: 'var(--gws-crimson)',
                      boxShadow: '0 0 0 3px rgba(132, 22, 23, 0.12)',
                      flexShrink: 0,
                      animation: 'pulseGlow 2.6s ease-in-out infinite',
                      animationDelay: `${idx * 220 + 600}ms`,
                    }} />
                    <h3 className="ai-card-title">{item.title}</h3>
                  </div>
                  <p className="ai-card-body">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
