import { ArrowRight } from "lucide-react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

export function SolutionsDigitalPresenceSection() {
  const capabilities = [
    'Website Experience',
    'AI-Ready Website Foundations',
    'Search & Discoverability Foundations',
    'AI Visibility',
    'Positioning & Messaging Integration',
    'Conversion Path Design',
  ];

  return (
    <section aria-labelledby="digital-presence-title" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker">01 — Digital Presence</p>
        <h2 id="digital-presence-title">Make it easier for the right buyers to find, understand, and trust your business.</h2>
        <p className="section-intro" style={{ maxWidth: '680px' }}>
          Digital Presence strengthens the beginning of the revenue path: discovery and consideration. The objective is not simply more traffic — it is a digital presence that makes clear what the business does, who it serves, why it is relevant, and what a buyer should do next.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '12px',
          marginTop: '32px',
        }}>
          {capabilities.map(cap => (
            <div key={cap} style={{
              padding: '14px 18px',
              background: '#fff',
              border: '1px solid #DDD6CC',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#841617', flexShrink: 0,
              }} aria-hidden="true" />
              <span style={{
                fontFamily: 'DM Sans, system-ui, sans-serif',
                fontSize: '15px', color: '#2B2B2B', lineHeight: 1.4,
              }}>{cap}</span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '32px',
          padding: '24px 28px',
          background: '#fff',
          border: '1px solid #DDD6CC',
          borderRadius: '12px',
        }}>
          <p style={{
            fontFamily: 'DM Sans, system-ui, sans-serif',
            fontSize: '15px', color: '#334155', lineHeight: 1.65,
          }}>
            A stronger Digital Presence creates qualified opportunity for the rest of the revenue system. When buyers discover and understand your business before they reach out, every subsequent step becomes easier.
          </p>
          <div style={{ marginTop: '16px' }}>
            <AnchorLink href="/ai-visibility" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontFamily: 'DM Sans, system-ui, sans-serif',
              fontSize: '14px', fontWeight: 600, color: '#841617',
              textDecoration: 'none',
            }}>
              Learn about AI Visibility <ArrowRight size={14} />
            </AnchorLink>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '20px', lineHeight: 1.6 }}>
          Content boundary: AI Visibility deep-dive content — AEO/GEO education, entity optimization frameworks, AI lifecycle, maturity model, visibility score, and specialist diagnostic content — belongs on the dedicated AI Visibility page. Solutions provides the overview and routes deeper.
        </p>
      </div>
    </section>
  );
}
