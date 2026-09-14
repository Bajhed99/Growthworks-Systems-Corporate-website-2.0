import React from "react";
import { MessageCircle } from "lucide-react";

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

export function AIFrequentlyAskedQuestionsSection() {
  return (
    <section aria-label="Frequently Asked Questions" className="diagnostic-section section--white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 items-start">
            <div className="flex lg:block items-baseline gap-3">
              <span className="font-serif font-normal text-[#841617] text-[36px] md:text-[48px] leading-[1] tracking-tight" aria-hidden="true">16</span>
              <div className="lg:mt-3">
                <p className="text-[12px] font-sans font-bold tracking-[0.18em] uppercase text-gray-500">FAQ</p>
              </div>
            </div>
            <div className="max-w-[720px]">
              <CrimsonRule />
              <h2 className="text-left font-serif font-normal text-[2rem] md:text-[2.75rem] leading-[1.15] text-gray-900 mb-6">Common <span className="heading-accent">Questions</span></h2>
              <p className="text-left text-[17px] md:text-[18px] leading-[1.65] text-gray-900 mb-6">
                The questions below clarify common misconceptions and reinforce the core premise: AI Visibility is about being understood and recommended — not about controlling AI platforms, guaranteeing rankings, or replacing strategic business work.
              </p>
              <dl style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  {
                    q: 'Does AI Visibility guarantee ranking or recommendation?',
                    a: 'No. AI Visibility improves the structural and credibility conditions that make inclusion in AI recommendations more likely. It does not control AI platform behavior, guarantee citation, or ensure specific ranking positions.',
                  },
                  {
                    q: 'Is this the same as SEO?',
                    a: 'No — though SEO is a foundation. AI Visibility includes SEO as a base layer but extends into entity optimization, source coherence, and citation eligibility — capabilities that traditional SEO was not designed for.',
                  },
                  {
                    q: 'Does this work for service businesses specifically?',
                    a: 'Yes. Service businesses face unique visibility challenges — no product catalog, complex expertise descriptions, and high-trust buying processes. The framework accounts for these conditions.',
                  },
                  {
                    q: 'Can any AI system be controlled?',
                    a: 'No. The framework does not claim control over any AI platform. It improves the conditions under which those platforms may include, understand, and recommend your business.',
                  },
                ].map((faq, i) => (
                  <div key={i} className="ai-faq-item" aria-label={`Question: ${faq.q}`}>
                    <dt className="ai-faq-question">
                      <MessageCircle size={20} style={{ flexShrink: 0, marginTop: '3px', color: '#841617' }} aria-hidden="true" />
                      {faq.q}
                    </dt>
                    <dd className="ai-faq-answer">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
