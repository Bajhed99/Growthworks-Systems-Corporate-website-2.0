export function AIFrameworksResourcesSection() {
  return (
    <section aria-label="Frameworks and Resources" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker">Resources</p>
        <h2 className="font-serif">Frameworks, Tools, and <span className="heading-accent">References</span></h2>
        <p className="section-intro">
          AI Visibility work benefits from structured frameworks and consistent reference points — the Revenue Infrastructure Framework provides the operational context, and the AI Visibility framework provides the specific visibility model.
        </p>
        <div className="ai-cards">
          <article className="ai-card">
            <h3 className="ai-card-title">Revenue Infrastructure Framework</h3>
            <p className="ai-card-body">
              The connected system of strategy, technology, data, process, and execution that turns market opportunity into measurable revenue. AI Visibility operates as the front-end discovery component within this system.
            </p>
            <a href="/framework" style={{ fontFamily: '"DM Sans", Arial, sans-serif', fontSize: '14px', fontWeight: 600, color: '#841617' }}>View Framework →</a>
          </article>
          <article className="ai-card">
            <h3 className="ai-card-title">AI Visibility Framework</h3>
            <p className="ai-card-body">
              The structured approach to understanding, measuring, and improving how AI systems discover, understand, and recommend your business — from buyer question through recommendation.
            </p>
            <span style={{ fontFamily: '"DM Sans", Arial, sans-serif', fontSize: '14px', color: '#64748b' }}>This page</span>
          </article>
        </div>
        <p className="ai-source-note">
          Source-dependency note: Approved resource list, tool references, and external framework links should be confirmed with source-approved documentation before finalizing references.
        </p>
      </div>
    </section>
  );
}
