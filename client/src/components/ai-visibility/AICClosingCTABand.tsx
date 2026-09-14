import { AnchorLink } from "./AnchorLink";
import { ArrowRight } from "lucide-react";

export function AICClosingCTABand() {
  return (
    <section aria-label="AI Visibility Review" className="diagnostic-section ai-closing-cta">
      <div className="site-shell" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
        <p className="section-kicker">Next Step</p>
        <h2 id="closing-cta-title">
          Understand how your business is seen — before the buyer decides.
        </h2>
        <p className="closing-cta-body" style={{ fontFamily: '"DM Sans", Arial, sans-serif', fontSize: '18px', color: '#cbd5e1', lineHeight: 1.65, marginBottom: '32px' }}>
          An AI Visibility Review examines how AI-powered search systems understand and represent your business — identifying where you are visible, trusted, and recommended, and where improvement creates the greatest impact.
        </p>
        <AnchorLink href="/ai-visibility-review" className="gws-glowy-primary">
          Check My AI Visibility <ArrowRight size={16} />
        </AnchorLink>
        <p className="ai-closing-subtext">
          60 minutes · No obligation · Focused on your visibility and revenue constraints
        </p>
      </div>
    </section>
  );
}
