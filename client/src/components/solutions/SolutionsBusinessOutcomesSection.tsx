export function SolutionsBusinessOutcomesSection() {
  return (
    <section aria-label="Business Outcomes" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker">Business Outcomes</p>
        <h2 id="outcomes-title">The capabilities matter because of what they make possible.</h2>
        <p className="section-intro" style={{ maxWidth: '680px' }}>
          The four solution modules are not an arbitrary service catalog. Each supports a specific business outcome that moves the revenue path from opportunity to measurable improvement.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '16px',
          marginTop: '32px',
        }}>
          {[
            { label: 'BE FOUND', desc: 'Make the business easier for relevant buyers to discover and understand through Digital Presence.' },
            { label: 'CAPTURE & RESPOND', desc: 'Convert active interest into identifiable opportunity and respond while intent is high through Lead Response.' },
            { label: 'CONVERT CONSISTENTLY', desc: 'Give people and systems the context necessary to move qualified opportunities toward revenue with less friction through Sales Operations.' },
            { label: 'IMPROVE & SCALE', desc: 'Connect performance signals back into decisions so the business can improve and identify the next constraint through Revenue Intelligence.' },
          ].map(outcome => (
            <article key={outcome.label} style={{
              background: '#fff',
              border: '1px solid #DDD6CC',
              borderRadius: '12px',
              padding: '24px',
            }} aria-label={outcome.label}>
              <h3 style={{
                fontFamily: 'DM Serif Display, Georgia, serif',
                fontSize: '22px', fontWeight: 400, color: '#841617',
                letterSpacing: '0.02em', lineHeight: 1.2,
                marginBottom: '12px',
              }}>{outcome.label}</h3>
              <p style={{
                fontFamily: 'DM Sans, system-ui, sans-serif',
                fontSize: '15px', color: '#334155', lineHeight: 1.65,
              }}>{outcome.desc}</p>
            </article>
          ))}
        </div>

        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '24px', lineHeight: 1.6 }}>
          These outcomes are not a second taxonomy — they describe the results the four connected modules are responsible for. Each outcome is tied to a specific capability family: Digital Presence (BE FOUND), Lead Response (CAPTURE & RESPOND), Sales Operations (CONVERT CONSISTENTLY), and Revenue Intelligence (IMPROVE & SCALE).
        </p>
      </div>
    </section>
  );
}
