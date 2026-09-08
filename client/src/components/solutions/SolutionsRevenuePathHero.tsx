import { ArrowRight, ArrowLeft, RefreshCcw } from "lucide-react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

export function SolutionsRevenuePathHero() {
  const areas = [
    {
      num: '01',
      name: 'Digital Presence',
      state: 'Found + Understood',
      desc: 'Discovery and consideration.',
      position: 'left',
    },
    {
      num: '02',
      name: 'Lead Response',
      state: 'Captured + Moving',
      desc: 'Capture and speed.',
      position: 'center',
    },
    {
      num: '03',
      name: 'Sales Operations',
      state: 'Consistent + Converting',
      desc: 'Progression and consistency.',
      position: 'right',
    },
    {
      num: '04',
      name: 'Revenue Intelligence',
      state: 'Measured + Improving',
      desc: 'Measurement and prioritization.',
      position: 'right',
    },
  ];

  return (
    <section aria-label="One Revenue Path, Four Areas of Improvement" className="diagnostic-section section--white">
      <div className="site-shell">
        <p className="section-kicker" style={{ textAlign: 'center' }}>The Solution System</p>
        <h2 id="four-areas-title" style={{ textAlign: 'center' }}>Each capability strengthens a different part of the same <span style={{ color: 'var(--maroon)' }}>revenue journey.</span></h2>
        <p className="section-intro" style={{ maxWidth: '680px', marginInline: 'auto', textAlign: 'center' }}>
          The four solution areas are organized around the business responsibility they strengthen, not around individual tools or technologies. They are connected by design.
        </p>

        {/* Desktop: horizontal connected path */}
        <div className="hidden md:block" aria-label="Four connected solution areas" role="img">
          <svg
            viewBox="0 0 1120 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ width: '100%', maxWidth: '1120px', marginTop: '48px', display: 'block' }}
          >
            {/* Connecting lines */}
            {/* 01 → 02 */}
            <path d="M 220 80 L 320 80" stroke="#DDD6CC" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M 220 80 L 320 80" stroke="#841617" strokeWidth="1" strokeDasharray="0" opacity="0.3" markerEnd="url(#arrow01)" />
            {/* 02 → 03 */}
            <path d="M 540 160 L 640 160" stroke="#DDD6CC" strokeWidth="2" strokeDasharray="6 4" />
            {/* 03 → 04 */}
            <path d="M 860 80 L 960 80" stroke="#DDD6CC" strokeWidth="2" strokeDasharray="6 4" />
            {/* Feedback loop: 04 → (back up) → 01 */}
            <path d="M 1080 160 C 1100 160 1100 300 560 300 C 20 300 20 160 40 160 L 80 160" stroke="#841617" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" fill="none" />
            <path d="M 90 155 L 80 160 L 90 165" stroke="#841617" strokeWidth="1.5" fill="none" opacity="0.5" />

            {/* Arrow markers */}
            <defs>
              <marker id="arrow01" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#841617" opacity="0.4" />
              </marker>
            </defs>

            {/* Nodes */}
            {/* 01 — top left */}
            <rect x="20" y="48" width="200" height="64" rx="0" fill="#FFFFFF" stroke="#DDD6CC" strokeWidth="1" />
            <text x="36" y="66" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#841617" letterSpacing="0.05em">01</text>
            <text x="36" y="84" fontFamily="DM Serif Display, Georgia, serif" fontSize="15" fontWeight="400" fill="#2B2B2B">Digital Presence</text>
            <text x="36" y="100" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#625E59">Found + Understood</text>

            {/* 02 — top right of first row */}
            <rect x="320" y="128" width="220" height="64" rx="0" fill="#FFFFFF" stroke="#DDD6CC" strokeWidth="1" />
            <text x="336" y="146" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#841617" letterSpacing="0.05em">02</text>
            <text x="336" y="164" fontFamily="DM Serif Display, Georgia, serif" fontSize="15" fontWeight="400" fill="#2B2B2B">Lead Response</text>
            <text x="336" y="180" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#625E59">Captured + Moving</text>

            {/* 03 — bottom */}
            <rect x="640" y="128" width="220" height="64" rx="0" fill="#FFFFFF" stroke="#DDD6CC" strokeWidth="1" />
            <text x="656" y="146" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#841617" letterSpacing="0.05em">03</text>
            <text x="656" y="164" fontFamily="DM Serif Display, Georgia, serif" fontSize="15" fontWeight="400" fill="#2B2B2B">Sales Operations</text>
            <text x="656" y="180" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#625E59">Consistent + Converting</text>

            {/* 04 — right */}
            <rect x="960" y="48" width="120" height="64" rx="0" fill="#FFFFFF" stroke="#841617" strokeWidth="1.5" />
            <text x="976" y="66" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#841617" letterSpacing="0.05em">04</text>
            <text x="976" y="84" fontFamily="DM Serif Display, Georgia, serif" fontSize="15" fontWeight="400" fill="#2B2B2B">Revenue</text>
            <text x="976" y="100" fontFamily="DM Serif Display, Georgia, serif" fontSize="15" fontWeight="400" fill="#2B2B2B">Intelligence</text>

            {/* Feedback label */}
            <text x="560" y="292" fontFamily="DM Sans, system-ui, sans-serif" fontSize="11" fill="#625E59" textAnchor="middle" fontStyle="italic">Learning feeds back to all stages</text>
          </svg>
        </div>

        {/* Mobile: vertical connected progression */}
        <div className="md:hidden" aria-label="Four connected solution areas" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '0' }}>
          {areas.map((area, idx) => (
            <div key={area.num} style={{ display: 'flex', alignItems: 'stretch' }}>
              {/* Card */}
              <div style={{
                flex: 1, background: '#fff', border: idx === areas.length - 1 ? '1.5px solid #841617' : '1px solid #DDD6CC',
                borderRadius: 0,
                padding: '20px 20px 20px 20px'
              }}>
                <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '11px', fontWeight: 600, color: '#841617', letterSpacing: '0.05em' }}>{area.num}</span>
                <h3 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '18px', fontWeight: 400, color: '#2B2B2B', marginTop: '4px', lineHeight: 1.3 }}>{area.name}</h3>
                <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '13px', color: '#625E59', marginTop: '4px' }}>{area.state}</p>
                <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '14px', color: '#334155', marginTop: '6px', lineHeight: 1.55 }}>{area.desc}</p>
              </div>
              {/* Connector */}
              {idx < areas.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '0', width: '24px', background: '#F8F5EC' }}>
                  <ArrowRight size={14} style={{ color: '#625E59', alignSelf: 'center' }} aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
          {/* Feedback indicator */}
          <div style={{ padding: '12px 16px', borderTop: '1px dashed #841617', borderBottom: '1px solid #DDD6CC', borderRadius: 0, background: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCcw size={12} style={{ color: '#841617', flexShrink: 0 }} aria-hidden="true" />
            <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '13px', color: '#625E59', fontStyle: 'italic' }}>Learning feeds back to earlier stages</span>
          </div>
        </div>

        <p style={{ marginTop: '32px', fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
          These four capabilities form one connected system. Each one reinforces the others. Learn how they work together below.
        </p>
      </div>
    </section>
  );
}
