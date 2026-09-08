import React from "react";
import { ArrowRight } from "lucide-react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

export function AICClosingCTABand() {
  return (
    <section aria-label="Book a Revenue Diagnostic" className="diagnostic-section section--dark" style={{ background: '#0f172a' }}>
      <div className="site-shell" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
        <p className="section-kicker" style={{ color: '#94a3b8' }}>Next Step</p>
        <h2 id="closing-cta-title" style={{ color: '#fff', fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '36px', lineHeight: 1.15, fontWeight: 400, marginBottom: '20px' }}>
          Understand how your business is seen — before the buyer decides.
        </h2>
        <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '18px', color: '#cbd5e1', lineHeight: 1.65, marginBottom: '32px' }}>
          A Revenue Diagnostic examines your visibility, credibility, and revenue system together — identifying where AI systems understand you well and where they don't, then establishing where improvement creates the greatest impact.
        </p>
        <AnchorLink href="/revenue-diagnostic" className="gws-glowy-primary" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '14px 28px', borderRadius: '0',
          background: '#841617', color: '#fff', fontFamily: 'DM Sans, system-ui, sans-serif',
          fontSize: '16px', fontWeight: 600, textDecoration: 'none',
          transition: 'opacity 0.2s'
        }}>
          Book a Revenue Diagnostic <ArrowRight size={16} />
        </AnchorLink>
        <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '14px', color: '#94a3b8', marginTop: '16px' }}>
          60 minutes · No obligation · Focused on your visibility and revenue constraints
        </p>
      </div>
    </section>
  );
}
