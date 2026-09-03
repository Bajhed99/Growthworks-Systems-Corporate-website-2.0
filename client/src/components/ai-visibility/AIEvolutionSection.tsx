export function AIEvolutionSection() {
  return (
    <section aria-labelledby="ai-evolution-title" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker">AI Search Landscape</p>
        <h2 id="ai-evolution-title">How Search Has Changed — And Why It Matters</h2>
        <p className="section-intro">
          The evolution from traditional search engines to AI-powered answer engines represents a fundamental shift in how buyers discover solutions. Each era introduces new requirements for visibility.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '40px' }}>
          {[
            { era: 'Traditional Search', years: '1990s – 2020', desc: 'Keyword-based ranking, backlink authority, and on-page optimization determine visibility.', pill: 'SEO' },
            { era: 'AI-Enhanced Search', years: '2020 – 2023', desc: 'AI features layered onto search — featured snippets, People Also Ask, autocomplete — with richer entity recognition.', pill: 'SEO +' },
            { era: 'AI Answer Engines', years: '2023 – Present', desc: 'Large language models synthesize answers directly from authoritative sources. Entities, citations, and source credibility determine inclusion.', pill: 'AEO' },
            { era: 'Ambient AI', years: 'Emerging', desc: 'AI agents, voice interfaces, and autonomous systems surface recommendations without requiring a traditional web visit at all.', pill: 'GEO' },
          ].map(e => (
            <div key={e.era} style={{
              background: '#fff', borderRadius: '12px', padding: '28px 24px',
              border: '1px solid rgba(132, 22, 23, 0.10)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ padding: '3px 10px', borderRadius: '6px', background: '#841617', color: '#fff', fontSize: '12px', fontWeight: 600 }}>{e.pill}</span>
                <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '13px', color: '#64748b' }}>{e.years}</span>
              </div>
              <h3 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '18px', fontWeight: 400, lineHeight: 1.3, color: '#0f172a', marginBottom: '10px' }}>{e.era}</h3>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '15px', color: '#334155', lineHeight: 1.60 }}>{e.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '14px', color: '#475569', marginTop: '32px', lineHeight: 1.6 }}>
          Source-dependency note: Era year ranges, platform-specific mechanics, and citation logic are provided at the conceptual level. Confirm exact timeline markers and specific AI platform behavior with authoritative sources before production use.
        </p>
      </div>
    </section>
  );
}
