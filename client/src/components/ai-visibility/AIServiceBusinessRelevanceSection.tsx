import React from "react";
import { ArrowRight } from "lucide-react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

export function AIServiceBusinessRelevanceSection() {
  return (
    <section aria-label="Service Business Relevance" className="diagnostic-section section--white">
      <div className="site-shell">
        <p className="section-kicker">Why It Matters for Service Businesses</p>
        <h2>AI Visibility Is Not Optional Anymore</h2>
        <p className="section-intro">
          Service businesses — agencies, consultancies, professional practices — are disproportionately affected by AI-driven discovery. Your potential clients are already asking AI systems for recommendations before they've visited a single website. If you're not understood by those systems, you're invisible at the exact moment a buying decision is being made.
        </p>
        <div style={{
          background: '#f8fafc', borderRadius: '0', padding: '28px 24px',
          border: '1px solid rgba(132, 22, 23, 0.08)', marginTop: '32px'
        }}>
          <h3 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '20px', fontWeight: 400, color: '#0f172a', marginBottom: '16px', lineHeight: 1.3 }}>
            The Revenue Infrastructure Context
          </h3>
          <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '15px', color: '#334155', lineHeight: 1.60, marginBottom: '16px' }}>
            AI Visibility doesn't operate in isolation. It's connected to how buyers discover your business, how they build trust before contact, and how your systems manage the relationship from first recommendation to closed revenue. Within the Revenue Infrastructure Framework, AI Visibility is the front end of the buyer relationship — the moment before the relationship begins.
          </p>
          <AnchorLink href="/framework" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '14px', fontWeight: 600, color: '#841617'
          }}>
            Explore the Revenue Infrastructure Framework <ArrowRight size={14} />
          </AnchorLink>
        </div>
      </div>
    </section>
  );
}
