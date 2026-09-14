import React from "react";
import { Link } from "wouter";

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

export function AIFrameworksResourcesSection() {
  return (
    <section aria-label="Frameworks and Resources" className="diagnostic-section section--gray">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <span className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight" aria-hidden="true">15</span>
              <div className="lg:mt-3">
                <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">Frameworks & Resources</p>
              </div>
            </div>
            <div className="max-w-[720px]">
              <CrimsonRule />
              <h2 className="text-left font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6">Frameworks, Tools, and <span className="heading-accent">References</span></h2>
              <p className="text-left text-[17px] md:text-[18px] leading-[1.65] text-gray-900 mb-6">
                AI Visibility work benefits from structured frameworks and consistent reference points — the Revenue Infrastructure Framework provides the operational context, and the AI Visibility framework provides the specific visibility model.
              </p>
              <div className="ai-cards ai-cards--dark">
                <article className="ai-card ai-card--dark">
                  <h3 className="ai-card-title">Revenue Infrastructure Framework</h3>
                  <p className="ai-card-body">
                    The connected system of strategy, technology, data, process, and execution that turns market opportunity into measurable revenue. AI Visibility operates as the front-end discovery component within this system.
                  </p>
                  <Link href="/framework" className="ai-card-link">View Framework &rarr;</Link>
                </article>
                <article className="ai-card ai-card--dark">
                  <h3 className="ai-card-title">AI Visibility Framework</h3>
                  <p className="ai-card-body">
                    The structured approach to understanding, measuring, and improving how AI systems discover, understand, and recommend your business — from buyer question through recommendation.
                  </p>
                  <span className="ai-card-badge">This page</span>
                </article>
              </div>
              <p className="ai-source-note">
                Source-dependency note: Approved resource list, tool references, and external framework links should be confirmed with source-approved documentation before finalizing references.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
