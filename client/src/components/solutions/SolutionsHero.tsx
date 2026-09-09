import React from "react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

export function SolutionsHero() {
  return (
    <section className="gws-glowy-hero" style={{ minHeight: 'unset', height: 655.078 }} aria-labelledby="solutions-hero-title">
      <div className="gws-glowy-canvas" style={{ height: 655.078 }} />
      <div className="gws-glowy-content" style={{ paddingBottom: 108 }}>
        <div className="gws-glowy-content-inner" style={{ marginTop: 0, marginBottom: 0 }}>
          <div className="gws-glowy-badge">
            Solutions
          </div>
          <h2 id="solutions-hero-title" className="gws-glowy-title">
            Integrated capabilities engineered to <span style={{ color: 'var(--maroon)' }}>eliminate revenue leakage.</span>
          </h2>
          <p className="gws-glowy-copy">
            GrowthWorks Systems strengthens the connected parts of the revenue path that determine whether opportunity is found, captured, converted, and improved — through Digital Presence, Lead Response, Sales Operations, and Revenue Intelligence.
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
