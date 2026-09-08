import React from "react";
import { ArrowRight } from "lucide-react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

export function AIVisibilityHero() {
  return (
    <section className="gws-glowy-hero" aria-labelledby="ai-visibility-hero-title">
      <div className="gws-glowy-canvas" style={{
        background: "radial-gradient(60% 60% at 85% 10%, rgba(132,22,23,0.08), transparent 72%), radial-gradient(45% 45% at 8% 80%, rgba(132,22,23,0.04), transparent 72%)"
      }} />
      <div className="gws-glowy-content max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16 w-full">
        <div className="gws-glowy-content-inner">
          <h3 className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-gray-400">
            AI Visibility
          </h3>
          <h1 id="ai-visibility-hero-title" className="gws-glowy-title font-serif">
            Be understood before the buyer ever reaches your website.
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
