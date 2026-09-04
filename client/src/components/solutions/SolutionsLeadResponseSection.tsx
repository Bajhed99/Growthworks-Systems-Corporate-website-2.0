export function SolutionsLeadResponseSection() {
  const capabilities = [
    'Lead Capture',
    'Speed-to-Lead Systems',
    'Automated Acknowledgment & Follow-Up',
    'AI-Assisted Reception',
    'Lead Qualification & Routing',
    'Scheduling & Next-Step Automation',
  ];

  return (
    <section aria-labelledby="lead-response-title" className="diagnostic-section section--white">
      <div className="site-shell">
        <p className="section-kicker" style={{ textAlign: 'center' }}>02 — Lead Response</p>
        <h2 id="lead-response-title" style={{ textAlign: 'center' }}>Protect buyer intent after someone raises their hand.</h2>
        <p className="section-intro" style={{ maxWidth: '680px', marginInline: 'auto', textAlign: 'center' }}>
          Generating an inquiry is only valuable if the opportunity receives an effective next step. Lead Response focuses on what happens between initial interest and active sales engagement.
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
            Reduce viable opportunities lost between inquiry and meaningful follow-up. Lead Response is about the moment a buyer has raised their hand — that intent is perishable, and the system that responds to it determines whether opportunity becomes a relationship or a missed call.
          </p>
        </div>

        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '20px', lineHeight: 1.6 }}>
          Note: AI-Assisted Reception is included as a capability category but is qualified as appropriate only where part of an approved implementation. Solutions does not claim that every engagement includes AI reception, nor does it assert specific speed-to-lead performance numbers.
        </p>
      </div>
    </section>
  );
}
