import { ArrowRight } from "lucide-react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

export function SolutionsConstraintFirstSection() {
  const phases = [
    { num: '01', name: 'Diagnose', desc: 'Identify where opportunity is lost or constrained.' },
    { num: '02', name: 'Design', desc: 'Determine how processes, platforms, data, and customer journey should work together.' },
    { num: '03', name: 'Implement', desc: 'Strengthen or connect required capabilities.' },
    { num: '04', name: 'Optimize', desc: 'Measure outcomes, identify the next constraint, and improve.' },
  ];

  return (
    <section aria-labelledby="constraint-title" className="diagnostic-section section--white">
      <div className="site-shell">
        <p className="section-kicker" style={{ textAlign: 'center' }}>Diagnose Before Prescribing</p>
        <h2 id="constraint-title" style={{ textAlign: 'center' }}>The objective is not to install more tools.</h2>
        <p className="section-intro" style={{ maxWidth: '680px', marginInline: 'auto', textAlign: 'center' }}>
          A business may already have a website, CRM, automation, analytics, sales team, and marketing activity. The question is whether those capabilities work together well enough to convert opportunity into measurable revenue.
        </p>

        {/* Desktop horizontal process */}
        <div className="hidden md:block" style={{ marginTop: '40px' }} aria-label="Four-phase improvement process">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {phases.map(phase => (
              <div key={phase.num} style={{
                background: '#fff',
                border: '1px solid #DDD6CC',
                borderRadius: 0,
                padding: '24px 20px',
                position: 'relative',
              }} aria-label={`${phase.name}: ${phase.desc}`}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '6px',
                  background: '#841617', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'DM Sans, system-ui, sans-serif',
                  fontSize: '13px', fontWeight: 600,
                  marginBottom: '12px',
                }}>{phase.num}</div>
                <h3 style={{
                  fontFamily: 'DM Serif Display, Georgia, serif',
                  fontSize: '20px', fontWeight: 400, color: '#2B2B2B',
                  marginBottom: '8px', lineHeight: 1.3,
                }}>{phase.name}</h3>
                <p style={{
                  fontFamily: 'DM Sans, system-ui, sans-serif',
                  fontSize: '15px', color: '#334155', lineHeight: 1.55,
                }}>{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical process */}
        <div className="md:hidden" style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }} aria-label="Four-phase improvement process">
          {phases.map(phase => (
            <div key={phase.num} style={{
              background: '#fff',
              border: '1px solid #DDD6CC',
              borderRadius: 0,
              padding: '20px',
            }} aria-label={`${phase.name}: ${phase.desc}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '6px',
                  background: '#841617', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'DM Sans, system-ui, sans-serif',
                  fontSize: '13px', fontWeight: 600, flexShrink: 0,
                }}>{phase.num}</div>
                <h3 style={{
                  fontFamily: 'DM Serif Display, Georgia, serif',
                  fontSize: '20px', fontWeight: 400, color: '#2B2B2B', lineHeight: 1.3,
                }}>{phase.name}</h3>
              </div>
              <p style={{
                fontFamily: 'DM Sans, system-ui, sans-serif',
                fontSize: '15px', color: '#334155', lineHeight: 1.55,
                paddingLeft: '44px',
              }}>{phase.desc}</p>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '40px',
          padding: '24px 28px',
          background: '#f8f5ec',
          border: '1px solid #DDD6CC',
          borderRadius: 0,
        }}>
          <p style={{
            fontFamily: 'DM Sans, system-ui, sans-serif',
            fontSize: '15px', color: '#334155', lineHeight: 1.65, marginBottom: '16px',
          }}>
            GWS uses the Revenue Infrastructure Framework to identify the constraint first, then determine which capabilities need to be strengthened, connected, redesigned, or optimized.
          </p>
          <AnchorLink href="/framework" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            fontFamily: 'DM Sans, Arial, sans-serif',
            fontSize: '16px', fontWeight: 600, color: '#841617',
            lineHeight: 1.2,
            textDecoration: 'none',
          }}>
            Explore the Revenue Infrastructure Framework <ArrowRight size={16} />
          </AnchorLink>
        </div>
      </div>
    </section>
  );
}
