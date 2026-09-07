export function AIEntityOptimizationSection() {
  return (
    <section aria-label="Entity Optimization" className="bg-surface py-[112px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <h3 className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-gray-400">Entity Optimization</h3>
        <h2>How AI Understands Who You Are</h2>
        <p className="section-intro">
          AI systems don't read pages the way people do. They interpret entities — discrete units of meaning: your business, your offering, your expertise, your market — and the relationships between them. Entity optimization is the work of making those units unambiguous, well-supported, and trustworthy across the entire web.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
          {[
            { title: 'Disambiguation', desc: 'Your brand is recognized as one specific entity — not confused with similarly named or related businesses.' },
            { title: 'Authority Signals', desc: 'Author, expertise, and citation patterns reinforce what your entity is and what it can be trusted on.' },
            { title: 'Relationship Mapping', desc: 'Connected entities — services, industries, locations, founders — establish the full context AI systems need to understand your role.' },
            { title: 'Source Consistency', desc: 'The same information appears reliably across authoritative third-party sources that AI systems trust.' },
          ].map(item => (
            <article key={item.title} className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-serif text-[20px] font-normal leading-[1.3] text-gray-900 mb-2.5">{item.title}</h3>
              <p className="font-sans text-[15px] text-gray-500 leading-[1.60]">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
