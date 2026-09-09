import React from "react";
import { ArrowRight } from "lucide-react";
import { AnchorLink } from "./AnchorLink";

export function AIServiceBusinessRelevanceSection() {
  return (
    <section aria-label="Service Business Relevance" className="diagnostic-section section--white">
      <div className="site-shell">
        <p className="section-kicker">Why It Matters for Service Businesses</p>
        <h2 className="font-serif">AI Visibility Is <span className="heading-accent">Not Optional</span> Anymore</h2>
        <p className="section-intro">
          Service businesses — agencies, consultancies, professional practices — are disproportionately affected by AI-driven discovery. Your potential clients are already asking AI systems for recommendations before they've visited a single website. If you're not understood by those systems, you're invisible at the exact moment a buying decision is being made.
        </p>
        <div className="ai-info-panel">
          <h3>The Revenue Infrastructure Context</h3>
          <p>
            AI Visibility doesn't operate in isolation. It's connected to how buyers discover your business, how they build trust before contact, and how your systems manage the relationship from first recommendation to closed revenue. Within the Revenue Infrastructure Framework, AI Visibility is the front end of the buyer relationship — the moment before the relationship begins.
          </p>
          <AnchorLink href="/framework" className="text-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            Explore the Revenue Infrastructure Framework <ArrowRight size={14} />
          </AnchorLink>
        </div>
      </div>
    </section>
  );
}
