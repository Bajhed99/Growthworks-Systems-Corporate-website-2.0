import { ArrowRight } from "lucide-react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

export function SolutionsHero() {
  return (
    <section className="gws-glowy-hero" aria-labelledby="solutions-hero-title">
      <div className="gws-glowy-canvas" />
      <div className="gws-glowy-content">
        <div className="gws-glowy-content-inner">
          <div className="gws-glowy-badge">
            Solutions
          </div>
          <h1 id="solutions-hero-title" className="gws-glowy-title">
            Integrated capabilities engineered to <span style={{ color: 'var(--maroon)' }}>eliminate revenue leakage.</span>
          </h1>
          <p className="gws-glowy-copy" style={{ maxWidth: '720px' }}>
            GrowthWorks Systems strengthens the connected parts of the revenue path that determine whether opportunity is found, captured, converted, and improved — through Digital Presence, Lead Response, Sales Operations, and Revenue Intelligence.
          </p>
          <div className="gws-glowy-actions">
            <AnchorLink href="/revenue-diagnostic" className="gws-glowy-primary supporting-button">
              Book a Revenue Diagnostic
              <ArrowRight size={16} />
            </AnchorLink>
          </div>
        </div>
      </div>
    </section>
  );
}
