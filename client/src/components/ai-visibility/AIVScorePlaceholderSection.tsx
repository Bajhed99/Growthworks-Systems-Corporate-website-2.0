export function AIVScorePlaceholderSection() {
  return (
    <section aria-label="AI Visibility Score" className="diagnostic-section section--white">
      <div className="site-shell">
        <p className="section-kicker">Visibility Score</p>
        <h2>AI Visibility Score — Source-Dependent Metrics</h2>
        <p className="section-intro">
          A structured visibility score provides a consistent way to measure improvement over time. The score considers multiple dimensions: entity clarity, citation eligibility, source coherence, recommendation presence, and cross-source consistency.
        </p>
        <div style={{
          background: '#f8fafc', borderRadius: '0', padding: '28px 24px',
          border: '1px solid rgba(132, 22, 23, 0.08)', marginTop: '32px'
        }} aria-label="Seven-dimension score framework">
          <h3 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '20px', fontWeight: 400, color: '#0f172a', marginBottom: '16px', lineHeight: 1.3 }}>
            Seven-Weighted Dimensions (Conceptual)
          </h3>
          <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '15px', color: '#334155', lineHeight: 1.60, marginBottom: '16px' }}>
            The score framework is designed to cover the full visibility lifecycle — from being indexed to being recommended. Each dimension reflects a specific capability that AI systems require before recommending a business in response to a buyer's question.
          </p>
          <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '13px', color: '#475569', lineHeight: 1.6, fontStyle: 'italic' }}>
            Source-dependency guard: Specific dimension weights, descriptor names, scoring ranges, and interpretation rules are source-dependent and should be confirmed with the approved AI Visibility Score specification before any production use. This section is intentionally not fabricated with synthetic weights or synthetic descriptors.
          </p>
        </div>
      </div>
    </section>
  );
}
