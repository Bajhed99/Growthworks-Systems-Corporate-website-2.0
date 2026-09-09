export function AITechnicalFoundationSection() {
  return (
    <section aria-label="Technical Foundation" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker">Technical Foundation</p>
        <h2 className="font-serif">Six Layers of Technical <span className="heading-accent">Readiness</span></h2>
        <p className="section-intro">
          Technical readiness for AI Visibility spans more than crawlability. It includes structured identity, content architecture, citation pathways, and cross-source coherence — six layers that together determine whether AI systems can understand and trust your presence.
        </p>
        <div className="ai-cards">
          {[
            { layer: '01', title: 'Structured Identity', desc: 'Schema markup, consistent naming, and entity definitions.' },
            { layer: '02', title: 'Content Architecture', desc: 'Clear topical structure, authoritative depth, and citation-ready content.' },
            { layer: '03', title: 'Source Consistency', desc: 'Same facts across authoritative third-party sources AI systems reference.' },
            { layer: '04', title: 'Citation Pathways', desc: 'Clear references to evidence, expertise, and third-party validation.' },
            { layer: '05', title: 'Relationship Mapping', desc: 'Linked entities across the business ecosystem — services, industries, locations.' },
            { layer: '06', title: 'Cross-Source Coherence', desc: 'Consistent brand identity across all discoverable sources.' },
          ].map(l => (
            <article key={l.layer} className="ai-card-outline">
              <span className="ai-card-num">{l.layer}</span>
              <h3 className="ai-card-title">{l.title}</h3>
              <p className="ai-card-body">{l.desc}</p>
            </article>
          ))}
        </div>
        <p className="ai-source-note">
          Source-dependency note: The six-layer framework above reflects the approved conceptual model. Detailed layer definitions, scoring logic, and cross-layer interaction rules should be confirmed from source-approved technical documentation.
        </p>
      </div>
    </section>
  );
}
