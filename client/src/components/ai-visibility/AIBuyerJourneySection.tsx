import React from "react";
import { ArrowRight } from "lucide-react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

export function AIBuyerJourneySection() {
  return (
    <section aria-label="From Search to Recommendation" className="diagnostic-section section--white">
      <div className="site-shell">
        <p className="section-kicker">Buyer Journey</p>
        <h2>From Search to Recommendation</h2>
        <p className="section-intro">
          Modern buyer journeys no longer start on your website. They start inside AI systems — where questions are interpreted, entities are matched, and recommendations are formed before any human sees your homepage.
        </p>
        <div className="ai-flow-stages" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }} aria-label="Five-stage AI recommendation flow">
          {[
            { num: '01', label: 'Buyer Question', desc: 'A real buyer asks a problem-focused question.' },
            { num: '02', label: 'Intent', desc: 'AI parses intent, context, and domain signals.' },
            { num: '03', label: 'Retrieval', desc: 'Knowledge sources are retrieved and ranked.' },
            { num: '04', label: 'Understanding', desc: 'Entities and relationships are interpreted.' },
            { num: '05', label: 'Recommendation', desc: 'The buyer receives a curated recommendation.' },
          ].map(step => (
            <div key={step.num} className="ai-flow-card" style={{
              flex: '1 1 200px', maxWidth: '260px',
              border: '1px solid rgba(132, 22, 23, 0.12)',
              borderRadius: '0', padding: '24px 20px',
              background: '#fff'
            }} aria-label={`${step.label}: ${step.desc}`}>
              <span style={{
                display: 'inline-block', padding: '4px 10px',
                borderRadius: '6px', background: '#841617', color: '#fff',
                fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em',
                marginBottom: '12px'
              }}>{step.num}</span>
              <h3 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '20px', fontWeight: 400, lineHeight: 1.25, marginBottom: '8px', color: '#0f172a' }}>{step.label}</h3>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '15px', color: '#334155', lineHeight: 1.55 }}>{step.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '14px', color: '#475569', marginTop: '32px', lineHeight: 1.6 }}>
          Source-dependency note: Stage descriptors above reflect the approved conceptual flow (Buyer Question → Intent → Retrieval → Understanding → Recommendation/Shortlist) as specified. Detailed descriptor weights, entity-level scoring, and platform-specific recommendation logic are not fabricated; confirm with source-approved score definitions before production.
        </p>
      </div>
    </section>
  );
}
