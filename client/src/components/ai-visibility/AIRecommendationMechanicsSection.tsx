import { ArrowRight } from "lucide-react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

export function AIRecommendationMechanicsSection() {
  return (
    <section aria-label="AI Recommendation Mechanics" className="diagnostic-section section--white">
      <div className="site-shell">
        <p className="section-kicker">Recommendation Mechanics</p>
        <h2>How AI Forms a Recommendation</h2>
        <p className="section-intro">
          AI recommendations don't come from a single ranking score. They emerge from a cascade of judgments — about relevance, credibility, and fit — made at each stage of the process. Improving visibility requires addressing all of them, not just one.
        </p>
        <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '32px' }} aria-label="Five-stage recommendation flow">
          {[
            { stage: '01', label: 'Buyer Question', detail: 'The user asks a real, domain-specific problem question.' },
            { stage: '02', label: 'Intent', detail: 'AI identifies the underlying intent: what the buyer actually needs.' },
            { stage: '03', label: 'Retrieval', detail: 'AI pulls from sources it considers authoritative and relevant.' },
            { stage: '04', label: 'Understanding', detail: 'Sources are interpreted, entities matched, relationships mapped.' },
            { stage: '05', label: 'Recommendation', detail: 'The final recommendation or shortlist is generated and presented.' },
          ].map(s => (
            <li key={s.stage} style={{ flex: '1 1 200px', maxWidth: '300px', padding: '20px', background: '#fff', border: '1px solid rgba(132, 22, 23, 0.10)', borderRadius: '0' }}>
              <span style={{ display: 'inline-block', fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '12px', fontWeight: 600, color: '#841617', letterSpacing: '0.05em', marginBottom: '8px' }}>{s.stage} — {s.label}</span>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '15px', color: '#334155', lineHeight: 1.60 }}>{s.detail}</p>
            </li>
          ))}
        </ol>
        <p style={{ fontSize: '14px', color: '#475569', marginTop: '24px', lineHeight: 1.6 }}>
          Source-dependency note: Detailed scoring weights, platform-specific retrieval logic, and exact recommendation thresholds are not defined in approved source material. Confirm before production.
        </p>
      </div>
    </section>
  );
}
