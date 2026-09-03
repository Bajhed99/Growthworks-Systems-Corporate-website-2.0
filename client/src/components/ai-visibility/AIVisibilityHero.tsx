import { ArrowRight } from "lucide-react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

export function AIVisibilityHero() {
  return (
    <section className="gws-glowy-hero" aria-labelledby="ai-visibility-hero-title">
      <div className="gws-glowy-canvas" style={{
        background: "radial-gradient(60% 60% at 85% 10%, rgba(132, 22, 23, 0.08), transparent 72%), radial-gradient(45% 45% at 8% 80%, rgba(132, 22, 23, 0.04), transparent 72%)"
      }} />
      <div className="gws-glowy-content">
        <div className="gws-glowy-content-inner">
          <div className="gws-glowy-badge">
            <span>AI Visibility</span>
          </div>
          <h1 id="ai-visibility-hero-title" className="gws-glowy-title">
            Be understood before the buyer ever reaches your website.
          </h1>
          <p className="gws-glowy-copy">
            AI-powered search engines now shape how buyers discover, evaluate, and choose solutions — before they ever visit your website. AI Visibility ensures your business is understood, trusted, and recommended at the moment that matters most.
          </p>
          <div className="gws-glowy-actions">
            <AnchorLink href="/revenue-diagnostic" className="gws-glowy-primary">
              Book a Revenue Diagnostic
              <ArrowRight size={16} />
            </AnchorLink>
          </div>
        </div>
      </div>
    </section>
  );
}
