import React from "react";
import { ArrowRight } from "lucide-react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

export function SolutionsDigitalPresenceSection() {
  const capabilities = [
    {
      num: '01',
      title: 'Website Experience',
      body: 'A digital front door that earns trust and directs attention to what matters next.',
    },
    {
      num: '02',
      title: 'AI-Ready Website Foundations',
      body: 'Structure and markup that AI systems can read, interpret, and present confidently.',
    },
    {
      num: '03',
      title: 'Search & Discoverability',
      body: 'Positioning that makes the business visible to the people actively looking for it.',
    },
    {
      num: '04',
      title: 'AI Visibility',
      body: 'Presence in AI-generated answers, not just traditional search results.',
    },
    {
      num: '05',
      title: 'Positioning & Messaging',
      body: 'Clear statements of what the business does, who it serves, and why it matters.',
    },
    {
      num: '06',
      title: 'Conversion Path Design',
      body: 'A defined next step for every visitor, so attention becomes action.',
    },
  ];

  return (
    <section aria-labelledby="digital-presence-title" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker" style={{ textAlign: 'center' }}>01 — Digital Presence</p>
        <h2 id="digital-presence-title" style={{ textAlign: 'center' }}>Make it easier for the right buyers to find, understand, and <span style={{ color: 'var(--maroon)' }}>trust your business.</span></h2>
        <p className="section-intro" style={{ maxWidth: '680px', marginInline: 'auto', textAlign: 'center' }}>
          Digital Presence strengthens the beginning of the revenue path: discovery and consideration. The objective is not simply more traffic — it is a digital presence that makes clear what the business does, who it serves, why it is relevant, and what a buyer should do next.
        </p>

        {/* Capability cards — 2-up grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          marginTop: '40px',
          border: '1px solid #DDD6CC',
          background: '#DDD6CC',
        }}>
          {capabilities.map(cap => (
            <div key={cap.num} style={{
              background: '#fff',
              padding: '28px 32px',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
            }}>
              <span style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '32px',
                fontWeight: 400,
                color: '#841617',
                lineHeight: 1,
                opacity: 0.5,
                flexShrink: 0,
                minWidth: '32px',
              }} aria-hidden="true">{cap.num}</span>
              <div>
                <h3 style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: '17px',
                  fontWeight: 400,
                  color: '#2B2B2B',
                  lineHeight: 1.3,
                  marginBottom: '6px',
                }}>{cap.title}</h3>
                <p style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '14px',
                  color: '#625E59',
                  lineHeight: 1.6,
                  margin: 0,
                }}>{cap.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Outcome callout */}
        <div style={{
          marginTop: '32px',
          padding: '28px 32px',
          background: '#fff',
          border: '1px solid #DDD6CC',
          borderRadius: 0,
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start',
        }}>
          <div style={{
            width: '3px',
            height: '48px',
            background: '#841617',
            flexShrink: 0,
            borderRadius: 0,
          }} aria-hidden="true" />
          <div style={{ textAlign: 'left' }}>
            <p style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#841617',
              marginBottom: '8px',
            }}>Outcome</p>
            <p style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '15px',
              color: '#334155',
              lineHeight: 1.65,
              margin: 0,
            }}>
              A stronger Digital Presence creates qualified opportunity for the rest of the revenue system. When buyers discover and understand your business before they reach out, every subsequent step becomes easier.
            </p>
            <div style={{ marginTop: '14px' }}>
              <AnchorLink href="/ai-visibility" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: "'DM Sans', Arial, sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                color: '#841617',
                lineHeight: 1.2,
                textDecoration: 'none',
              }}>
                Learn about AI Visibility <ArrowRight size={15} />
              </AnchorLink>
            </div>
          </div>
        </div>

        {/* Feedback loop indicator */}
        <div style={{
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          <span style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '13px',
            fontWeight: 400,
            color: '#625E59',
            fontStyle: 'italic',
          }}>Revenue Intelligence feeds learning back to this stage</span>
        </div>

        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '20px', lineHeight: 1.6 }}>
          Content boundary: AI Visibility deep-dive content — AEO/GEO education, entity optimization frameworks, AI lifecycle, maturity model, visibility score, and specialist diagnostic content — belongs on the dedicated AI Visibility page. Solutions provides the overview and routes deeper.
        </p>
      </div>
    </section>
  );
}
