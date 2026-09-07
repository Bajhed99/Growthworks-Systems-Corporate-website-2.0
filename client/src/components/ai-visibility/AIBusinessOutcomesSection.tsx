export function AIBusinessOutcomesSection() {
  return (
    <section aria-label="Business Outcomes" className="diagnostic-section section--gray">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <h3 className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-gray-400">Business Outcomes</h3>
        <h2 className="font-serif">From Discoverability to Revenue Growth</h2>
        <p className="font-sans text-[15px] text-gray-700 leading-[1.55]">
          AI Visibility isn't just about being found. It's about being found at the right time, by the right buyer, with the right authority — and turning that discovery into business outcomes that compound over time.
        </p>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '32px'
        }} aria-label="Five-step outcomes chain">
          {[
            { step: '01', title: 'Discoverability', desc: 'Your business is found when buyers ask relevant questions.' },
            { step: '02', title: 'Recognition', desc: 'AI systems correctly understand what you do and who you serve.' },
            { step: '03', title: 'Recommendation', desc: 'You appear in the recommendation shortlist for qualified buyers.' },
            { step: '04', title: 'Engagement', desc: 'Buyers reach out with context — they already know you.' },
            { step: '05', title: 'Revenue Growth', desc: 'Qualified pipeline improves; acquisition cost decreases; growth compounds.' },
          ].map(s => (
            <div key={s.step} style={{
              flex: '1 1 200px', maxWidth: '260px', padding: '24px 20px',
              background: '#fff'
            }} className="rounded-2xl border-gray-200" aria-label={`${s.title}: ${s.desc}`}>
              <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '12px' }} className="bg-crimson text-white">{s.step}</span>
              <h3 className="font-serif text-[20px] font-normal text-gray-900 mb-2 leading-tight">{s.title}</h3>
              <p className="font-sans text-[15px] text-gray-700 leading-[1.55]">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="font-sans text-[13px] text-gray-500 mt-6 leading-[1.6]">
          Source-dependency note: The five-step outcomes chain is presented at the conceptual level. Specific intermediate stages, measurement methods, and outcome tracking criteria should be verified with source-approved business outcomes documentation.
        </p>
      </div>
    </section>
  );
}
