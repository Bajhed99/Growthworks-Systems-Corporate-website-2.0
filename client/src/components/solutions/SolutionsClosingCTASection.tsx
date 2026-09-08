import React from "react";
import { ArrowRight } from "lucide-react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

export function SolutionsClosingCTASection() {
  return (
    <section aria-label="Start With The Constraint" className="diagnostic-section section--dark bg-gws-dark" style={{ background: '#2B2B2B' }}>
      <div className="site-shell" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
        <p className="section-kicker" style={{ color: '#94a3b8' }}>Next Step</p>
        <h2 id="solutions-closing-cta" className="font-serif" style={{
          color: '#fff',
          fontSize: '36px', lineHeight: 1.15, fontWeight: 400,
          marginBottom: '20px',
        }}>
          Find the part of your <span style={{ color: 'var(--maroon)' }}>revenue system</span> that deserves <span style={{ color: 'var(--maroon)' }}>attention first.</span>
        </h2>
        <p style={{
          fontFamily: 'DM Sans, system-ui, sans-serif',
          fontSize: '18px', color: '#cbd5e1', lineHeight: 1.65,
          marginBottom: '32px',
        }}>
          A Revenue Diagnostic examines how the critical parts of your revenue path work together, where opportunity is being lost, and which improvements are most likely to create meaningful business impact.
        </p>
        <AnchorLink href="/revenue-diagnostic" className="rounded bg-crimson text-white" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          padding: '14px 28px',
          color: '#fff',
          fontFamily: 'DM Sans, Arial, sans-serif',
          fontSize: '16px', fontWeight: 600,
          lineHeight: 1.2,
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
