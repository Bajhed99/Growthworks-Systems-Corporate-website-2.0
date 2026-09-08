export function SolutionsRevenueIntelligenceSection() {
  const capabilities = [
    'Revenue-Path Measurement',
    'Pipeline Visibility',
    'Handoff Visibility',
    'Outcome Attribution',
    'Performance Reporting',
    'Constraint Identification',
    'Continuous Optimization',
  ];

  return (
    <section aria-labelledby="revenue-intelligence-title" className="diagnostic-section section--white">
      <div className="site-shell">
        <p className="section-kicker" style={{ textAlign: 'center' }}>04 — Revenue Intelligence</p>
        <h2 id="revenue-intelligence-title" style={{ textAlign: 'center' }}>Make it easier to see <span style={{ color: 'var(--maroon)' }}>where value is being created,</span> where it is being lost, and what to improve next.</h2>
        <p className="section-intro" style={{ maxWidth: '680px', marginInline: 'auto', textAlign: 'center' }}>
          Revenue Intelligence closes the loop. Its purpose is to show where value is created or lost and which constraint should be improved next — not to produce analytics for their own sake.
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '32px',
        }}>
          {capabilities.map((cap, idx) => (
            <div key={cap} style={{
              width: idx < 4 ? 'calc((100% - 36px) / 4)' : 'calc((100% - 24px) / 3)',
              minWidth: '200px',
              maxWidth: '260px',
              padding: '14px 18px',
              background: '#fff',
              border: '1px solid #DDD6CC',
              borderRadius: 0,
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
          background: '#f8f5ec',
          border: '1px solid #DDD6CC',
          borderRadius: 0,
        }}>
          <h3 style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: '18px', fontWeight: 400, color: '#2B2B2B',
            marginBottom: '8px', lineHeight: 1.3,
          }}>Outcome</h3>
          <p style={{
            fontFamily: 'DM Sans, system-ui, sans-serif',
            fontSize: '15px', color: '#334155', lineHeight: 1.65,
          }}>
            Show where value is created or lost and what constraint should be improved next. Revenue Intelligence feeds learning back into Digital Presence, Lead Response, and Sales Operations — completing the loop that turns measurement into action.
          </p>
        </div>

        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '20px', lineHeight: 1.6 }}>
          Product guardrails: Revenue Intelligence is capability/outcome-led. No proprietary analytics platform, proprietary scoring system, AI scoring software, proprietary dashboard, unsupported data integrations, or fabricated client metrics are presented. The content reflects measurement and prioritization capabilities, not a specific software product.
        </p>
      </div>
    </section>
  );
}
