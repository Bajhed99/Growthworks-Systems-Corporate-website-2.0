export function AITechnicalFoundationSection() {
  return (
    <section aria-label="Technical Foundation" className="diagnostic-section section--gray">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <p className="section-kicker">Technical Foundation</p>
        <h2 className="font-serif">Six Layers of Technical <span className="heading-accent">Readiness</span></h2>
        <p className="section-intro">
          Technical readiness for AI Visibility spans more than crawlability. It includes structured identity, content architecture, citation pathways, and cross-source coherence — six layers that together determine whether AI systems can understand and trust your presence.
        </p>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '32px'
        }}>
          {[
            { layer: '01', title: 'Structured Identity', desc: 'Schema markup, consistent naming, and entity definitions.' },
            { layer: '02', title: 'Content Architecture', desc: 'Clear topical structure, authoritative depth, and citation-ready content.' },
            { layer: '03', title: 'Source Consistency', desc: 'Same facts across authoritative third-party sources AI systems reference.' },
            { layer: '04', title: 'Citation Pathways', desc: 'Clear references to evidence, expertise, and third-party validation.' },
            { layer: '05', title: 'Relationship Mapping', desc: 'Linked entities across the business ecosystem — services, industries, locations.' },
            { layer: '06', title: 'Cross-Source Coherence', desc: 'Consistent brand identity across all discoverable sources.' },
          ].map(l => (
            <article key={l.layer} style={{
              padding: '20px 22px', borderRadius: '0', border: '1px solid rgba(132, 22, 23, 0.10)', background: '#fff'
            }}>
              <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '12px', fontWeight: 600, color: '#841617', letterSpacing: '0.05em' }}>{l.layer}</span>
              <h3 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '20px', fontWeight: 400, color: '#0f172a', marginTop: '6px', marginBottom: '10px', lineHeight: 1.3 }}>{l.title}</h3>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '15px', color: '#334155', lineHeight: 1.60 }}>{l.desc}</p>
            </article>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '20px', lineHeight: 1.6 }}>
          Source-dependency note: The six-layer framework above reflects the approved conceptual model. Detailed layer definitions, scoring logic, and cross-layer interaction rules should be confirmed from source-approved technical documentation.
        </p>
      </div>
    </section>
  );
}
