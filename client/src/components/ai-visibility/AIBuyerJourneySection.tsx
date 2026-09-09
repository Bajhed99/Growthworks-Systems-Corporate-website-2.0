import React from "react";
import { AnchorLink } from "./AnchorLink";

export function AIBuyerJourneySection() {
  return (
    <section aria-label="From Search to Recommendation" className="diagnostic-section section--white">
      <div className="site-shell">
        <p className="section-kicker">Buyer Journey</p>
        <h2 className="font-serif">From Search to <span className="heading-accent">Recommendation</span></h2>
        <p className="section-intro">
          Modern buyer journeys no longer start on your website. They start inside AI systems — where questions are interpreted, entities are matched, and recommendations are formed before any human sees your homepage.
        </p>
        <div className="ai-cards" aria-label="Five-stage AI recommendation flow">
          {[
            { num: '01', label: 'Buyer Question', desc: 'A real buyer asks a problem-focused question.' },
            { num: '02', label: 'Intent', desc: 'AI parses intent, context, and domain signals.' },
            { num: '03', label: 'Retrieval', desc: 'Knowledge sources are retrieved and ranked.' },
            { num: '04', label: 'Understanding', desc: 'Entities and relationships are interpreted.' },
            { num: '05', label: 'Recommendation', desc: 'The buyer receives a curated recommendation.' },
          ].map(step => (
            <div key={step.num} className="ai-card" aria-label={`${step.label}: ${step.desc}`}>
              <span className="ai-card-num">{step.num}</span>
              <h3 className="ai-card-title">{step.label}</h3>
              <p className="ai-card-body">{step.desc}</p>
            </div>
          ))}
        </div>
        <p className="ai-source-note">
          Source-dependency note: Stage descriptors above reflect the approved conceptual flow (Buyer Question → Intent → Retrieval → Understanding → Recommendation/Shortlist) as specified. Detailed descriptor weights, entity-level scoring, and platform-specific recommendation logic are not fabricated; confirm with source-approved score definitions before production.
        </p>
      </div>
    </section>
  );
}
