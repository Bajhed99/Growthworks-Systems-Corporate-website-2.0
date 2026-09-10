import React from "react";
import { ArrowRight } from "lucide-react";
import { AnchorLink } from "./AnchorLink";

export function AIVisibilityHero() {
  return (
    <section className="gws-glowy-hero" style={{ minHeight: 'unset', height: 655.078 }} aria-labelledby="ai-visibility-hero-title">
      <div className="gws-glowy-canvas" style={{ height: 655.078 }} />
      <div className="gws-glowy-content" style={{ paddingBottom: 108 }}>
        <div className="gws-glowy-content-inner" style={{ marginTop: 0, marginBottom: 0 }}>
          <div className="gws-glowy-badge" style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
            AI Visibility
          </div>
          <h1 id="ai-visibility-hero-title" className="gws-glowy-title">
            Be <span style={{ color: 'var(--maroon)' }}>understood</span> before the buyer ever reaches your website.
          </h1>
          <p className="gws-glowy-copy">
            AI-powered search engines now shape how buyers discover, evaluate, and choose solutions — before they ever visit your website. AI Visibility ensures your business is understood, trusted, and recommended at the moment that matters most.
          </p>
          <div className="gws-glowy-actions">
            <AnchorLink href="/revenue-diagnostic" className="gws-glowy-primary supporting-button" style={{ fontFamily: '"DM Sans", Arial, sans-serif', fontSize: 14 }}>
              Book a Revenue Diagnostic
            </AnchorLink>
          </div>
        </div>
      </div>
    </section>
  );
}
