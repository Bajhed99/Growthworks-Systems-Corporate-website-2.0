export function AIEntityOptimizationSection() {
  return (
    <section aria-label="Entity Optimization" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker">Entity Optimization</p>
        <h2 className="font-serif">How AI <span className="heading-accent">Understands</span> Who You Are</h2>
        <p className="section-intro">
          AI systems don't read pages the way people do. They interpret entities — discrete units of meaning: your business, your offering, your expertise, your market — and the relationships between them. Entity optimization is the work of making those units unambiguous, well-supported, and trustworthy across the entire web.
        </p>
        <div className="ai-cards">
          {[
            { title: 'Disambiguation', desc: 'Your brand is recognized as one specific entity — not confused with similarly named or related businesses.' },
            { title: 'Authority Signals', desc: 'Author, expertise, and citation patterns reinforce what your entity is and what it can be trusted on.' },
            { title: 'Relationship Mapping', desc: 'Connected entities — services, industries, locations, founders — establish the full context AI systems need to understand your role.' },
            { title: 'Source Consistency', desc: 'The same information appears reliably across authoritative third-party sources that AI systems trust.' },
          ].map(item => (
            <article key={item.title} className="ai-card">
              <h3 className="ai-card-title">{item.title}</h3>
              <p className="ai-card-body">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
