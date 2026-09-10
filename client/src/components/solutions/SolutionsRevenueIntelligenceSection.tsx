'use client';

import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, BarChart3, Target, RefreshCw, CheckCircle, Gauge, Eye } from "lucide-react";

const CRIMSON = "#841617";

const CAPABILITIES = [
  {
    num: "01",
    title: "Revenue-Path Measurement",
    body: "A clear view of where value is created and where it leaks.",
    detail:
      "Track the flow of value from initial discovery through to closed outcomes. Visibility into which stages convert, where prospects stall, and what context is lost along the way.",
    Icon: TrendingUp,
  },
  {
    num: "02",
    title: "Pipeline Visibility",
    body: "Know which opportunities are moving and which are stuck.",
    detail:
      "Every qualified opportunity carries a status, owner, and next step. No ghost opportunities, no stale pipeline rows — the team sees what is alive and what needs attention.",
    Icon: BarChart3,
  },
  {
    num: "03",
    title: "Handoff Visibility",
    body: "Every transition preserves the context the next stage needs.",
    detail:
      "Value leaks between handoffs — between marketing and sales, between sales and delivery, between discovery and proposal. We track context continuity as a measurable signal.",
    Icon: Target,
  },
  {
    num: "04",
    title: "Outcome Attribution",
    body: "Connect outcomes back to the actions and investments that produced them.",
    detail:
      "Not all pipeline movement is equal. We attribute positive outcomes to the specific conditions, conversations, and interventions that drove them — so learning is reliable, not anecdotal.",
    Icon: CheckCircle,
  },
  {
    num: "05",
    title: "Performance Reporting",
    body: "Reports that show what matters, not everything that moved.",
    detail:
      "Measurement should serve prioritization, not fill dashboards. Reports are scoped to the constraints and opportunities that actually move revenue forward.",
    Icon: Gauge,
  },
  {
    num: "06",
    title: "Constraint Identification",
    body: "Surface the real bottleneck, not the noisiest metric.",
    detail:
      "Every system has a constraint. Revenue Intelligence identifies where value accumulates, where it stalls, and where improvement effort should be concentrated for maximum leverage.",
    Icon: Eye,
  },
  {
    num: "07",
    title: "Continuous Optimization",
    body: "Turn each outcome into the next improvement cycle.",
    detail:
      "Learning feeds back into Digital Presence, Lead Response, and Sales Operations — closing the loop that turns measurement into action. Measurement without feedback is just observation.",
    Icon: RefreshCw,
  },
];

export function SolutionsRevenueIntelligenceSection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="revenue-intelligence-title"
      className="diagnostic-section section--white"
      style={{ background: "#ffffff" }}
    >
      {/* Desktop version */}
      <div className="hidden-mobile">
        <div className="site-shell">
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '680px', marginInline: 'auto', marginBottom: '56px' }}>
            <p
              className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-crimson text-center"
              style={{
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
              }}
            >
              04 — Revenue Intelligence
            </p>

            <h2
              id="revenue-intelligence-title"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 400,
                lineHeight: 1.15,
                color: '#1a1a1a',
                marginBottom: 14,
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
              }}
            >
              Make it easier to see <span style={{ color: CRIMSON }}>where value is being created,</span> where it is being lost, and what to improve next.
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '17px',
                lineHeight: 1.7,
                color: '#57534e',
                maxWidth: '680px',
                marginInline: 'auto',
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s',
              }}
            >
              Revenue Intelligence closes the loop. Its purpose is to show where value is created or lost and which constraint should be improved next — not to produce analytics for their own sake.
            </p>
          </div>

          {/* Capability cards grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginTop: '40px',
              maxWidth: '860px',
              marginInline: 'auto',
            }}
          >
            {CAPABILITIES.map((cap, i) => {
              const isHovered = hoveredIdx === i;
              const Icon = cap.Icon;
              return (
                <div
                  key={cap.num}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    background: '#ffffff',
                    border: isHovered ? '2px solid #1a1a1a' : '1px solid #e7e5e4',
                    borderTop: isHovered ? '4px solid #841617' : '3px solid #841617',
                    padding: '28px 24px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default',
                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: isHovered
                      ? '0 8px 24px rgba(132,22,23,0.08)'
                      : 'none',
                    borderRadius: '0px',
                    opacity: sectionVisible ? 1 : 0,
                    animation: sectionVisible
                      ? `cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + i * 0.08}s both`
                      : 'none',
                  }}
                >
                  {/* Ghost number */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '4px',
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: '72px',
                      fontWeight: 400,
                      lineHeight: 1,
                      color: CRIMSON,
                      opacity: isHovered ? 0.12 : 0.05,
                      pointerEvents: 'none',
                      userSelect: 'none',
                      transition: 'opacity 0.4s ease',
                    }}
                  >
                    {cap.num}
                  </span>

                  {/* Icon */}
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#1a1a1a',
                    border: '2px solid #841617',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginBottom: '14px',
                  }}>
                    <Icon size={18} strokeWidth={1.5} color="#ffffff" />
                  </div>

                  {/* Indicator bar */}
                  <div style={{
                    width: 24,
                    height: 2,
                    background: CRIMSON,
                    marginBottom: '10px',
                    opacity: 0.6,
                  }} />

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: '17px',
                    fontWeight: 400,
                    color: '#1a1a1a',
                    lineHeight: 1.3,
                    marginBottom: '6px',
                  }}>
                    {cap.title}
                  </h3>

                  {/* Detail */}
                  <p style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '13px',
                    color: '#57534e',
                    lineHeight: 1.65,
                    margin: 0,
                  }}>
                    {cap.body}
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '12px',
                    color: '#78716c',
                    lineHeight: 1.65,
                    marginTop: '8px',
                    margin: 0,
                  }}>
                    {cap.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Outcome callout */}
          <div
            style={{
              marginTop: '56px',
              padding: '32px',
              background: '#ffffff',
              border: '1.5px solid #1a1a1a',
              borderTop: '4px solid #841617',
              borderRadius: '0px',
              position: 'relative',
              maxWidth: '860px',
              marginInline: 'auto',
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.7s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.7s',
            }}
          >
            {/* Accent bar */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 4,
                height: '100%',
                background: '#1a1a1a',
              }}
            />

            <div style={{ paddingLeft: '16px' }}>
              <p style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#1a1a1a',
                marginBottom: '10px',
              }}>Outcome</p>

              <p style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '15px',
                color: '#334155',
                lineHeight: 1.7,
                margin: 0,
              }}>
                Show where value is created or lost and what constraint should be improved next. Revenue Intelligence feeds learning back into Digital Presence, Lead Response, and Sales Operations — completing the loop that turns measurement into action.
              </p>
            </div>
          </div>

          {/* Feedback loop indicator */}
          <div
            style={{
              marginTop: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.5s ease 0.9s, transform 0.5s ease 0.9s',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#841617"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ opacity: 0.45, flexShrink: 0 }}
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            <span style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              color: '#78716c',
              fontStyle: 'italic',
            }}>
              Revenue Intelligence feeds learning back to Sales Operations, Lead Response, and Digital Presence
            </span>
          </div>

          {/* Product guardrails note */}
          <p style={{
            fontSize: '13px',
            color: '#64748b',
            marginTop: '20px',
            lineHeight: 1.6,
            textAlign: 'center',
            opacity: sectionVisible ? 0.8 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.5s ease 1s, transform 0.5s ease 1s',
          }}>
            Product guardrails: Revenue Intelligence is capability/outcome-led. No proprietary analytics platform, proprietary scoring system, AI scoring software, proprietary dashboard, unsupported data integrations, or fabricated client metrics are presented. The content reflects measurement and prioritization capabilities, not a specific software product.
          </p>
        </div>
      </div>

      {/* Mobile version */}
      <div className="hidden-desktop">
        <div className="site-shell px-4">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p
              className="text-[12px] font-sans font-semibold tracking-[0.18em] uppercase mb-3 text-crimson text-center"
              style={{
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
              }}
            >
              04 — Revenue Intelligence
            </p>

            <h2
              id="revenue-intelligence-title"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(24px, 6vw, 32px)',
                fontWeight: 400,
                lineHeight: 1.2,
                color: '#1a1a1a',
                marginBottom: '12px',
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s',
              }}
            >
              Make it easier to see <span style={{ color: CRIMSON }}>where value is being created,</span> where it is being lost, and what to improve next.
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '15px',
                lineHeight: 1.65,
                color: '#57534e',
                maxWidth: '680px',
                marginInline: 'auto',
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.4s ease 0.25s, transform 0.4s ease 0.25s',
              }}
            >
              Revenue Intelligence closes the loop. Its purpose is to show where value is created or lost and which constraint should be improved next — not to produce analytics for their own sake.
            </p>
          </div>

          {/* Capabilities as stacked cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {CAPABILITIES.map((cap, i) => {
              const isHovered = hoveredIdx === i;
              const Icon = cap.Icon;
              return (
                <div
                  key={cap.num}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    background: '#ffffff',
                    border: isHovered ? '2px solid #1a1a1a' : '1px solid #d6d3d1',
                    borderTop: isHovered ? '4px solid #841617' : '3px solid #841617',
                    borderRadius: '10px',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? 'translateY(0)' : 'translateY(12px)',
                    transition: `opacity 0.5s ease ${0.2 + i * 0.07}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + i * 0.07}s`,
                  }}
                >
                  {/* Number badge + title row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: isHovered ? '#ffffff' : CRIMSON,
                      border: `2px solid ${CRIMSON}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: '16px',
                      fontWeight: 400,
                      color: isHovered ? CRIMSON : '#ffffff',
                      flexShrink: 0,
                      transition: 'all 0.3s ease',
                    }}>
                      {cap.num}
                    </div>
                    <h3 style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: '18px',
                      fontWeight: 400,
                      color: '#1a1a1a',
                      lineHeight: 1.3,
                      margin: 0,
                    }}>
                      {cap.title}
                    </h3>
                  </div>

                  {/* Icon + indicator */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#1a1a1a',
                    border: `2px solid ${CRIMSON}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginBottom: '12px',
                    alignSelf: 'flex-start',
                  }}>
                    <Icon size={16} strokeWidth={1.5} color="#ffffff" />
                  </div>

                  {/* Body statement */}
                  <p style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#2B2B2B',
                    lineHeight: 1.55,
                    marginBottom: '10px',
                    margin: '0 0 10px 0',
                  }}>
                    {cap.body}
                  </p>

                  {/* Detail */}
                  <p style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '14px',
                    color: '#57534e',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {cap.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Outcome callout */}
          <div
            style={{
              marginTop: '36px',
              padding: '28px',
              background: '#ffffff',
              border: '1px solid #d6d3d1',
              borderTop: '4px solid #841617',
              borderRadius: '10px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.5s ease 0.65s, transform 0.5s ease 0.65s',
            }}
          >
            <p style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#1a1a1a',
              marginBottom: '10px',
            }}>Outcome</p>
            <p style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '15px',
              color: '#334155',
              lineHeight: 1.7,
              margin: 0,
            }}>
              Show where value is created or lost and what constraint should be improved next. Revenue Intelligence feeds learning back into Digital Presence, Lead Response, and Sales Operations — completing the loop that turns measurement into action.
            </p>
          </div>

          {/* Feedback loop */}
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease 0.85s, transform 0.4s ease 0.85s',
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#841617"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ opacity: 0.45, flexShrink: 0 }}
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            <span style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '12px',
              fontWeight: 400,
              color: '#78716c',
              fontStyle: 'italic',
            }}>
              Revenue Intelligence feeds learning back to Sales Operations, Lead Response, and Digital Presence
            </span>
          </div>

          {/* Product guardrails note */}
          <p style={{
            fontSize: '12px',
            color: '#78716c',
            marginTop: '16px',
            lineHeight: 1.6,
            textAlign: 'center',
            opacity: sectionVisible ? 0.8 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.4s ease 0.95s, transform 0.4s ease 0.95s',
          }}>
            Product guardrails: Revenue Intelligence is capability/outcome-led. No proprietary analytics platform, proprietary scoring system, AI scoring software, proprietary dashboard, unsupported data integrations, or fabricated client metrics are presented. The content reflects measurement and prioritization capabilities, not a specific software product.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ===== Mobile overrides: only below 768px ===== */
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .hidden-desktop { display: none !important; }
        }
      `}</style>
    </section>
  );
}
