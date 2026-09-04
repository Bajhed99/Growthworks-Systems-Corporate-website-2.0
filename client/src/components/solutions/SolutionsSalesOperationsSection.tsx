export function SolutionsSalesOperationsSection() {
  const capabilities = [
    'CRM Structure',
    'Pipeline Design',
    'Workflow Automation',
    'Opportunity Management',
    'Sales Follow-Up Systems',
    'Context Continuity',
  ];

  return (
    <section aria-labelledby="sales-operations-title" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker" style={{ textAlign: 'center' }}>03 — Sales Operations</p>
        <h2 id="sales-operations-title" style={{ textAlign: 'center' }}>Keep qualified opportunities moving consistently toward a decision.</h2>
        <p className="section-intro" style={{ maxWidth: '680px', marginInline: 'auto', textAlign: 'center' }}>
          Sales Operations creates the operational structure behind opportunity progression. It should help the business understand where an opportunity stands, who owns the next action, what context exists, and what should happen next.
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '32px',
        }}>
          {capabilities.map(cap => (
            <div key={cap} style={{
              width: 'calc((100% - 24px) / 3)',
              minWidth: '220px',
              maxWidth: '340px',
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
          background: '#fff',
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
            Move viable opportunities toward decisions through a repeatable path rather than inconsistent manual execution. The objective is consistency — the same reliable experience for every qualified opportunity — not a tool installation that creates new complexity.
          </p>
        </div>

        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '20px', lineHeight: 1.6 }}>
          Naming note: At the Solutions Overview level the canonical label is Sales Operations. Existing retained pages or deeper capability descriptions that reference CRM structure, pipeline design, or workflow automation preserve their terminology at the appropriate depth.
        </p>
      </div>
    </section>
  );
}
