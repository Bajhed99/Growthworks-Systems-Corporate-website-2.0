export function AIEvolutionSection() {
  return (
    <section aria-labelledby="ai-evolution-title" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker">AI Search Landscape</p>
        <h2 id="ai-evolution-title" className="font-serif">How Search Has <span className="heading-accent">Changed</span> — And Why It Matters</h2>
        <p className="section-intro">
          The evolution from traditional search engines to AI-powered answer engines represents a fundamental shift in how buyers discover solutions. Each era introduces new requirements for visibility.
        </p>
        <div className="ai-cards">
          {[
            { era: 'Traditional Search', years: '1990s – 2020', desc: 'Keyword-based ranking, backlink authority, and on-page optimization determine visibility.', pill: 'SEO' },
            { era: 'AI-Enhanced Search', years: '2020 – 2023', desc: 'AI features layered onto search — featured snippets, People Also Ask, autocomplete — with richer entity recognition.', pill: 'SEO +' },
            { era: 'AI Answer Engines', years: '2023 – Present', desc: 'Large language models synthesize answers directly from authoritative sources. Entities, citations, and source credibility determine inclusion.', pill: 'AEO' },
            { era: 'Ambient AI', years: 'Emerging', desc: 'AI agents, voice interfaces, and autonomous systems surface recommendations without requiring a traditional web visit at all.', pill: 'GEO' },
          ].map(e => (
            <article key={e.era} className="ai-era-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span className="ai-card-num">{e.pill}</span>
                <span style={{ fontFamily: '"DM Sans", Arial, sans-serif', fontSize: '13px', color: '#64748b' }}>{e.years}</span>
              </div>
              <h3 className="ai-card-title">{e.era}</h3>
              <p className="ai-card-body">{e.desc}</p>
            </article>
          ))}
        </div>
        <p className="ai-source-note">
          Source-dependency note: Era year ranges, platform-specific mechanics, and citation logic are provided at the conceptual level. Confirm exact timeline markers and specific AI platform behavior with authoritative sources before production use.
        </p>
      </div>
    </section>
  );
}
