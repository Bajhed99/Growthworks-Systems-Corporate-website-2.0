export function SolutionsConnectedSystemSection() {
  return (
    <section aria-label="How the Four Areas Work Together" className="diagnostic-section section--gray">
      <div className="site-shell">
        <p className="section-kicker" style={{ textAlign: 'center' }}>Connected By Design</p>
        <h2 id="connected-system-title" style={{ textAlign: 'center' }}>Improving one area helps. Connecting all four creates leverage.</h2>
        <p className="section-intro" style={{ maxWidth: '680px', marginInline: 'auto', textAlign: 'center' }}>
          The four areas represent a connected revenue path, not independent service categories. Each stage feeds the next, and Revenue Intelligence feeds learning back into all earlier stages.
        </p>

        <div style={{
          marginTop: '32px',
          padding: '32px 28px',
          background: '#fff',
          border: '1px solid #DDD6CC',
          borderRadius: 0,
        }} aria-label="Connected revenue path flow">
          {/* Desktop: horizontal flow with feedback loop */}
          <div className="hidden md:block" aria-hidden="false">
            <svg viewBox="0 0 880 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: '100%', maxWidth: '880px', display: 'block' }}>
              <defs>
                <marker id="arrow-cs" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#841617" opacity="0.5" />
                </marker>
              </defs>

              {/* Nodes */}
              <rect x="0" y="8" width="175" height="56" rx="0" fill="#FFFFFF" stroke="#DDD6CC" strokeWidth="1" />
              <text x="24" y="34" fontFamily="DM Serif Display, Georgia, serif" fontSize="14" fontWeight="400" fill="#2B2B2B">Digital Presence</text>
              <text x="24" y="52" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#625E59">Found + Understood</text>

              <rect x="240" y="8" width="175" height="56" rx="0" fill="#FFFFFF" stroke="#DDD6CC" strokeWidth="1" />
              <text x="264" y="34" fontFamily="DM Serif Display, Georgia, serif" fontSize="14" fontWeight="400" fill="#2B2B2B">Lead Response</text>
              <text x="264" y="52" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#625E59">Captured + Moving</text>

              <rect x="480" y="8" width="175" height="56" rx="0" fill="#FFFFFF" stroke="#DDD6CC" strokeWidth="1" />
              <text x="500" y="34" fontFamily="DM Serif Display, Georgia, serif" fontSize="14" fontWeight="400" fill="#2B2B2B">Sales Operations</text>
              <text x="500" y="52" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#625E59">Consistent + Converting</text>

              <rect x="720" y="8" width="140" height="56" rx="0" fill="#fff8f6" stroke="#841617" strokeWidth="1.5" />
              <text x="736" y="34" fontFamily="DM Serif Display, Georgia, serif" fontSize="13" fontWeight="400" fill="#2B2B2B">Revenue</text>
              <text x="736" y="52" fontFamily="DM Serif Display, Georgia, serif" fontSize="13" fontWeight="400" fill="#2B2B2B">Intelligence</text>

              {/* Horizontal arrows */}
              <path d="M 185 36 L 230 36" stroke="#DDD6CC" strokeWidth="1.5" markerEnd="url(#arrow-cs)" />
              <path d="M 425 36 L 470 36" stroke="#DDD6CC" strokeWidth="1.5" markerEnd="url(#arrow-cs)" />
              <path d="M 665 36 L 710 36" stroke="#DDD6CC" strokeWidth="1.5" markerEnd="url(#arrow-cs)" />

              {/* Feedback loop */}
              <path d="M 870 36 L 880 36 L 880 120 L 880 140 C 880 150 860 150 480 150 L 20 150 L 20 130" stroke="#841617" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.65" markerEnd="url(#arrow-cs)" />
              <text x="480" y="140" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#841617" textAnchor="middle" opacity="0.85" fontStyle="italic">Feedback → All stages</text>
            </svg>
          </div>

          {/* Mobile: stacked vertical flow */}
          <div className="md:hidden" aria-label="Connected revenue path" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { name: 'Digital Presence', sub: 'Found + Understood', desc: 'Discovery and consideration' },
              { name: 'Lead Response', sub: 'Captured + Moving', desc: 'Capture and speed' },
              { name: 'Sales Operations', sub: 'Consistent + Converting', desc: 'Progression and consistency' },
              { name: 'Revenue Intelligence', sub: 'Measured + Improving', desc: 'Measurement and prioritization', highlight: true },
            ].map((stage, idx, arr) => (
              <div key={stage.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0' }}>
                <div style={{
                  flex: 1,
                  padding: '14px 16px',
                  background: stage.highlight ? '#fff8f6' : '#fff',
                  border: stage.highlight ? '1.5px solid #841617' : '1px solid #DDD6CC',
                  borderRadius: 0,
                }}>
                  <h4 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '17px', fontWeight: 400, color: '#2B2B2B', lineHeight: 1.3 }}>{stage.name}</h4>
                  <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '12px', color: '#625E59' }}>{stage.sub}</p>
                  <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '13px', color: '#334155', marginTop: '2px' }}>{stage.desc}</p>
                </div>
                {idx < arr.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '0 4px' }}>
                    <div style={{ width: '1px', height: '20px', background: '#841617', opacity: 0.3 }} />
                    <span style={{ fontSize: '10px', color: '#841617', opacity: 0.5 }} aria-hidden>↓</span>
                  </div>
                )}
              </div>
            ))}
            <div style={{ padding: '8px 0', borderTop: '1px dashed #841617', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '13px', color: '#625E59', fontStyle: 'italic' }}>Feedback → All stages</span>
            </div>
          </div>
        </div>

        <p style={{
          fontFamily: 'DM Sans, system-ui, sans-serif',
          fontSize: '15px', color: '#334155', lineHeight: 1.65,
          marginTop: '32px',
        }}>
          No solution is recommended in isolation. Every recommendation is tied to the business outcome and system constraint it is intended to improve.
        </p>
      </div>
    </section>
  );
}
