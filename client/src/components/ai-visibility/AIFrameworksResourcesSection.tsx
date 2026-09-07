export function AIFrameworksResourcesSection() {
  return (
    <section aria-label="Frameworks and Resources" className="diagnostic-section section--gray">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-16">
        <h3 className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-gray-400">Resources</h3>
        <h2>Frameworks, Tools, and References</h2>
        <p className="section-intro">
          AI Visibility work benefits from structured frameworks and consistent reference points — the Revenue Infrastructure Framework provides the operational context, and the AI Visibility framework provides the specific visibility model.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <article className="p-6 bg-white rounded-2xl border border-gray-200">
            <h3 className="font-serif text-[20px] font-normal text-gray-900 mb-2.5 leading-tight">Revenue Infrastructure Framework</h3>
            <p className="font-sans text-[15px] text-gray-700 leading-[1.60] mb-3">
              The connected system of strategy, technology, data, process, and execution that turns market opportunity into measurable revenue. AI Visibility operates as the front-end discovery component within this system.
            </p>
            <a href="/framework" className="font-sans text-[14px] font-semibold text-crimson hover:text-crimson-dark">View Framework →</a>
          </article>
          <article className="p-6 bg-white rounded-2xl border border-gray-200">
            <h3 className="font-serif text-[20px] font-normal text-gray-900 mb-2.5 leading-tight">AI Visibility Framework</h3>
            <p className="font-sans text-[15px] text-gray-700 leading-[1.60] mb-3">
              The structured approach to understanding, measuring, and improving how AI systems discover, understand, and recommend your business — from buyer question through recommendation.
            </p>
            <span className="font-sans text-[14px] text-gray-500">This page</span>
          </article>
        </div>
        <p className="text-[13px] text-gray-500 mt-5 leading-[1.6]">
          Source-dependency note: Approved resource list, tool references, and external framework links should be confirmed with source-approved documentation before finalizing references.
        </p>
      </div>
    </section>
  );
}
