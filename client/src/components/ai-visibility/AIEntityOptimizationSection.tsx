export function AIEntityOptimizationSection() {
  return (
    <section aria-label="Entity Optimization" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker">Entity Optimization</p>
        <h2>How AI Understands Who You Are</h2>
        <p className="section-intro">
          AI systems don't read pages the way people do. They interpret entities — discrete units of meaning: your business, your offering, your expertise, your market — and the relationships between them. Entity optimization is the work of making those units unambiguous, well-supported, and trustworthy across the entire web.
        </p>
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginTop: '32px' }}>
          {[
            { title: 'Disambiguation', desc: 'Your brand is recognized as one specific entity — not confused with similarly named or related businesses.' },
            { title: 'Authority Signals', desc: 'Author, expertise, and citation patterns reinforce what your entity is and what it can be trusted on.' },
            { title: 'Relationship Mapping', desc: 'Connected entities — services, industries, locations, founders — establish the full context AI systems need to understand your role.' },
            { title: 'Source Consistency', desc: 'The same information appears reliably across authoritative third-party sources that AI systems trust.' },
          ].map(item => (
            <article key={item.title} style={{
              background: '#fff', borderRadius: '12px', padding: '24px',
              border: '1px solid rgba(132, 22, 23, 0.10)'
            }}>
              <h3 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '20px', fontWeight: 400, lineHeight: 1.3, color: '#0f172a', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '15px', color: '#334155', lineHeight: 1.60 }}>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
