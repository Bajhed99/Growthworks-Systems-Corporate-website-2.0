export function AIMaturityProgressionSection() {
  return (
    <section aria-label="Maturity Progression" className="diagnostic-section section--white">
      <div className="site-shell">
        <p className="section-kicker">Maturity Model</p>
        <h2>The Path to Authority</h2>
        <p className="section-intro">
          AI Visibility improves through a progression of five maturity levels. Each level unlocks a new form of presence — from basic discoverability to becoming the definitive recommendation in your category. Progressing through the levels requires intentional work at each stage.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '32px' }} aria-label="Five-level AI Visibility maturity model">
          {[
            { level: '1', name: 'Invisible', desc: 'Not indexed, not recognized, not in any AI system\'s knowledge.' },
            { level: '2', name: 'Indexed', desc: 'Found and indexed by AI systems, but not yet understood or trusted.' },
            { level: '3', name: 'Recognized', desc: 'Correctly identified and understood, with credible source presence.' },
            { level: '4', name: 'Recommended', desc: 'Included in AI recommendations for relevant buyer questions.' },
            { level: '5', name: 'Authoritative', desc: 'The definitive recommended source in its category.' },
          ].map(m => (
            <div key={m.level} style={{
              flex: '1 1 180px', maxWidth: '240px', padding: '20px',
              background: '#fff', borderRadius: '0',
              border: '1px solid rgba(132, 22, 23, 0.10)'
            }} aria-label={`Maturity level ${m.level}: ${m.name}`}>
              <span style={{ display: 'inline-block', width: '32px', height: '32px', borderRadius: '50%', background: '#841617', color: '#fff', textAlign: 'center', lineHeight: '32px', fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>{m.level}</span>
              <h3 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '18px', fontWeight: 400, color: '#0f172a', marginBottom: '8px', lineHeight: 1.3 }}>{m.name}</h3>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '14px', color: '#334155', lineHeight: 1.55 }}>{m.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '24px', lineHeight: 1.6 }}>
          Source-dependency note: The five maturity levels (Invisible → Indexed → Recognized → Recommended → Authoritative) and their transition criteria are presented at the conceptual level. Detailed level descriptors, threshold criteria, and progression measurement methods should be confirmed with source-approved maturity model documentation.
        </p>
      </div>
    </section>
  );
}
