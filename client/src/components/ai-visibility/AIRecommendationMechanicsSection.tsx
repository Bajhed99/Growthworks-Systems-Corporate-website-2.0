import React from "react";
import { AnchorLink } from "./AnchorLink";

export function AIRecommendationMechanicsSection() {
  return (
    <section aria-label="AI Recommendation Mechanics" className="diagnostic-section section--white">
      <div className="site-shell">
        <p className="section-kicker">Recommendation Mechanics</p>
        <h2 className="font-serif">How AI Forms a <span className="heading-accent">Recommendation</span></h2>
        <p className="section-intro">
          AI recommendations don't come from a single ranking score. They emerge from a cascade of judgments — about relevance, credibility, and fit — made at each stage of the process. Improving visibility requires addressing all of them, not just one.
        </p>
        <ol className="ai-cards" aria-label="Five-stage recommendation flow" style={{ listStyle: 'none', padding: 0 }}>
          {[
            { stage: '01', label: 'Buyer Question', detail: 'The user asks a real, domain-specific problem question.' },
            { stage: '02', label: 'Intent', detail: 'AI identifies the underlying intent: what the buyer actually needs.' },
            { stage: '03', label: 'Retrieval', detail: 'AI pulls from sources it considers authoritative and relevant.' },
            { stage: '04', label: 'Understanding', detail: 'Sources are interpreted, entities matched, relationships mapped.' },
            { stage: '05', label: 'Recommendation', detail: 'The final recommendation or shortlist is generated and presented.' },
          ].map(s => (
            <li key={s.stage} className="ai-card-outline">
              <span className="ai-card-num">{s.stage} — {s.label}</span>
              <p className="ai-card-body">{s.detail}</p>
            </li>
          ))}
        </ol>
        <p className="ai-source-note">
          Source-dependency note: Detailed scoring weights, platform-specific retrieval logic, and exact recommendation thresholds are not defined in approved source material. Confirm before production.
        </p>
      </div>
    </section>
  );
}
