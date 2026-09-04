export function AIFrameworksResourcesSection() {
  return (
    <section aria-label="Frameworks and Resources" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker">Resources</p>
        <h2>Frameworks, Tools, and References</h2>
        <p className="section-intro">
          AI Visibility work benefits from structured frameworks and consistent reference points — the Revenue Infrastructure Framework provides the operational context, and the AI Visibility framework provides the specific visibility model.
        </p>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '32px'
        }}>
          <article style={{ padding: '24px', background: '#fff', borderRadius: '0', border: '1px solid rgba(132, 22, 23, 0.10)' }}>
            <h3 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '20px', fontWeight: 400, color: '#0f172a', marginBottom: '10px', lineHeight: 1.3 }}>Revenue Infrastructure Framework</h3>
            <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '15px', color: '#334155', lineHeight: 1.60, marginBottom: '12px' }}>
              The connected system of strategy, technology, data, process, and execution that turns market opportunity into measurable revenue. AI Visibility operates as the front-end discovery component within this system.
            </p>
            <a href="/framework" style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '14px', fontWeight: 600, color: '#841617' }}>View Framework →</a>
          </article>
          <article style={{ padding: '24px', background: '#fff', borderRadius: '0', border: '1px solid rgba(132, 22, 23, 0.10)' }}>
            <h3 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '20px', fontWeight: 400, color: '#0f172a', marginBottom: '10px', lineHeight: 1.3 }}>AI Visibility Framework</h3>
            <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '15px', color: '#334155', lineHeight: 1.60, marginBottom: '12px' }}>
              The structured approach to understanding, measuring, and improving how AI systems discover, understand, and recommend your business — from buyer question through recommendation.
            </p>
            <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '14px', color: '#64748b' }}>This page</span>
          </article>
        </div>
        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '20px', lineHeight: 1.6 }}>
          Source-dependency note: Approved resource list, tool references, and external framework links should be confirmed with source-approved documentation before finalizing references.
        </p>
      </div>
    </section>
  );
}
