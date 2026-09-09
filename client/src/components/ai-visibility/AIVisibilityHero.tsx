import React from "react";
import { ArrowRight } from "lucide-react";
import { AnchorLink } from "./AnchorLink";

export function AIVisibilityHero() {
  return (
    <section className="gws-glowy-hero" aria-labelledby="ai-visibility-hero-title">
      <div className="gws-glowy-canvas" />
      <div className="gws-glowy-content">
        <div className="gws-glowy-content-inner">
          <p className="hero-kicker">AI Visibility</p>
          <h1 id="ai-visibility-hero-title" className="gws-glowy-title font-serif">
            Be <span className="heading-accent">understood</span> before the buyer ever reaches your website.
          </h1>
          <p className="gws-glowy-copy font-sans">
            AI-powered search engines now shape how buyers discover, evaluate, and choose solutions — before they ever visit your website. AI Visibility ensures your business is understood, trusted, and recommended at the moment that matters most.
          </p>
          <div className="gws-glowy-actions">
            <AnchorLink href="/revenue-diagnostic" className="gws-glowy-primary rounded">
              Book a Revenue Diagnostic
              <ArrowRight size={16} />
            </AnchorLink>
          </div>
        </div>
      </div>
    </section>
  );
}
