export function AIBusinessOutcomesSection() {
  return (
    <section aria-label="Business Outcomes" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker">Business Outcomes</p>
        <h2 className="font-serif">From Discoverability to <span className="heading-accent">Revenue Growth</span></h2>
        <p className="font-sans text-[15px] text-gray-700 leading-[1.55]">
          AI Visibility isn't just about being found. It's about being found at the right time, by the right buyer, with the right authority — and turning that discovery into business outcomes that compound over time.
        </p>
        <div className="ai-cards" aria-label="Five-step outcomes chain">
          {[
            { step: '01', title: 'Discoverability', desc: 'Your business is found when buyers ask relevant questions.' },
            { step: '02', title: 'Recognition', desc: 'AI systems correctly understand what you do and who you serve.' },
            { step: '03', title: 'Recommendation', desc: 'You appear in the recommendation shortlist for qualified buyers.' },
            { step: '04', title: 'Engagement', desc: 'Buyers reach out with context — they already know you.' },
            { step: '05', title: 'Revenue Growth', desc: 'Qualified pipeline improves; acquisition cost decreases; growth compounds.' },
          ].map(s => (
            <div key={s.step} className="ai-card" aria-label={`${s.title}: ${s.desc}`}>
              <span className="ai-card-num">{s.step}</span>
              <h3 className="ai-card-title">{s.title}</h3>
              <p className="ai-card-body">{s.desc}</p>
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
