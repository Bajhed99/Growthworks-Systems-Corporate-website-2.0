export function AIBusinessOutcomesSection() {
  return (
    <section aria-label="Business Outcomes" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker">Business Outcomes</p>
        <h2>From Discoverability to Revenue Growth</h2>
        <p className="section-intro">
          AI Visibility isn't just about being found. It's about being found at the right time, by the right buyer, with the right authority — and turning that discovery into business outcomes that compound over time.
        </p>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '32px'
        }} aria-label="Five-step outcomes chain">
          {[
            { step: '01', title: 'Discoverability', desc: 'Your business is found when buyers ask relevant questions.' },
            { step: '02', title: 'Recognition', desc: 'AI systems correctly understand what you do and who you serve.' },
            { step: '03', title: 'Recommendation', desc: 'You appear in the recommendation shortlist for qualified buyers.' },
            { step: '04', title: 'Engagement', desc: 'Buyers reach out with context — they already know you.' },
            { step: '05', title: 'Revenue Growth', desc: 'Qualified pipeline improves; acquisition cost decreases; growth compounds.' },
          ].map(s => (
            <div key={s.step} style={{
              flex: '1 1 200px', maxWidth: '260px', padding: '24px 20px',
              background: '#fff', borderRadius: '12px', border: '1px solid rgba(132, 22, 23, 0.10)'
            }} aria-label={`${s.title}: ${s.desc}`}>
              <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '6px', background: '#841617', color: '#fff', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '12px' }}>{s.step}</span>
              <h3 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '20px', fontWeight: 400, color: '#0f172a', marginBottom: '8px', lineHeight: 1.3 }}>{s.title}</h3>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '15px', color: '#334155', lineHeight: 1.55 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '24px', lineHeight: 1.6 }}>
          Source-dependency note: The five-step outcomes chain is presented at the conceptual level. Specific intermediate stages, measurement methods, and outcome tracking criteria should be verified with source-approved business outcomes documentation.
        </p>
      </div>
    </section>
  );
}
