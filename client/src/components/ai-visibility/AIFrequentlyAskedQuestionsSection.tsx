import { MessageCircle } from "lucide-react";

export function AIFrequentlyAskedQuestionsSection() {
  return (
    <section aria-label="Frequently Asked Questions" className="diagnostic-section section--white">
      <div className="site-shell">
        <p className="section-kicker">FAQ</p>
        <h2 className="font-serif">Common <span className="heading-accent">Questions</span></h2>
        <p className="section-intro">
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
    </section>
  );
}
