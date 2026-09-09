export function AIEvaluationSection() {
  return (
    <section aria-label="AI Visibility Evaluation" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker">Evaluation</p>
        <h2 className="font-serif">How Visibility Is <span className="heading-accent">Assessed</span></h2>
        <p className="section-intro">
          Assessing AI Visibility requires more than running an SEO audit. It requires understanding how AI systems interpret your business, what entities and sources they associate with you, and whether you're being included in the recommendations that actually matter to your buyers.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px' }} aria-label="Evaluation criteria">
          {[
            'Buyer-question simulation: how AI systems answer the questions your buyers are actually asking',
            'Entity recognition: whether your business is correctly identified and disambiguated',
            'Source inclusion: whether authoritative third-party sources mention and validate your business',
            'Citation eligibility: whether your content is structured to be cited by AI answer systems',
            'Recommendation shortlist presence: whether you appear in the final recommendations AI systems give to buyers',
          ].map((item, idx) => (
            <li key={idx} className="ai-list-item">
              <span className="ai-list-badge" aria-hidden="true">{idx + 1}</span>
              <span style={{ fontFamily: '"DM Sans", Arial, sans-serif', fontSize: '15px', color: '#334155', lineHeight: 1.6, paddingTop: '3px' }}>{item}</span>
            </li>
          ))}
        </ul>
        <p className="ai-source-note">
          Source-dependency note: Evaluation criteria and weightings above are presented at the conceptual level. Specific scoring rubrics, evaluation question sets, and platform-specific assessment methods should be confirmed with source-approved evaluation documentation.
        </p>
      </div>
    </section>
  );
}
