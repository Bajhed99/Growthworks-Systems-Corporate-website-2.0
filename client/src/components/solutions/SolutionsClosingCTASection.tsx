import { ArrowRight } from "lucide-react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

export function SolutionsClosingCTASection() {
  return (
    <section aria-label="Start With The Constraint" className="diagnostic-section section--dark" style={{ background: '#2B2B2B' }}>
      <div className="site-shell" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
        <p className="section-kicker" style={{ color: '#94a3b8' }}>Next Step</p>
        <h2 id="solutions-closing-cta" style={{
          color: '#fff',
          fontFamily: 'DM Serif Display, Georgia, serif',
          fontSize: '36px', lineHeight: 1.15, fontWeight: 400,
          marginBottom: '20px',
        }}>
          Find the part of your revenue system that deserves attention first.
        </h2>
        <p style={{
          fontFamily: 'DM Sans, system-ui, sans-serif',
          fontSize: '18px', color: '#cbd5e1', lineHeight: 1.65,
          marginBottom: '32px',
        }}>
          A Revenue Diagnostic examines how the critical parts of your revenue path work together, where opportunity is being lost, and which improvements are most likely to create meaningful business impact.
        </p>
        <AnchorLink href="/revenue-diagnostic" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '14px 28px', borderRadius: '8px',
          background: '#841617', color: '#fff',
          fontFamily: 'DM Sans, system-ui, sans-serif',
          fontSize: '16px', fontWeight: 600,
          textDecoration: 'none',
          transition: 'opacity 0.2s',
        }}>
          Book a Revenue Diagnostic <ArrowRight size={16} />
        </AnchorLink>
        <p style={{
          fontFamily: 'DM Sans, system-ui, sans-serif',
          fontSize: '14px', color: '#94a3b8', marginTop: '16px',
        }}>
          60 minutes · No obligation · Focused on your constraint
        </p>
      </div>
    </section>
  );
}
