import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Globe, Search, Bot, Megaphone, Layout, Target, ChevronLeft, ChevronRight } from "lucide-react";

function AnchorLink({ href, children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}

const CRIMSON = "#841617";

const highlight = (text: string, words: string[]) => {
  let result: React.ReactNode[] = [];
  const regex = new RegExp(`(\\b${words.join("\\b|\\b")}\\b)`, "gi");
  const parts = text.split(regex);
  parts.forEach((part, i) => {
    if (words.some(w => w.toLowerCase() === part.toLowerCase())) {
      result.push(<span key={i} style={{ color: CRIMSON, fontWeight: 600 }}>{part}</span>);
    } else {
      result.push(part);
    }
  });
  return result;
};

const CAPABILITIES = [
  {
    num: '01',
    title: 'Website Experience',
    body: 'A digital front door that earns trust and directs attention to what matters next.',
    highlightBody: ['trust'],
    detail: 'Your website is the first impression. We design experiences that communicate clarity, credibility, and purpose — so visitors understand what you offer and what to do next.',
    highlightDetail: ['first impression', 'clarity, credibility, and purpose'],
    Icon: Globe,
  },
  {
    num: '02',
    title: 'AI-Ready Website Foundations',
    body: 'Structure and markup that AI systems can read, interpret, and present confidently.',
    highlightBody: ['confidently'],
    detail: "AI platforms surface answers, not just links. We ensure your website's structure, schema, and content architecture are organized for AI interpretation and presentation.",
    highlightDetail: ['surface answers', 'interpretation and presentation'],
    Icon: Layout,
  },
  {
    num: '03',
    title: 'Search & Discoverability',
    body: 'Positioning that makes the business visible to the people actively looking for it.',
    highlightBody: ['actively looking'],
    detail: 'Visibility is not accidental. We build the positioning and content structure that help the right buyers find you through the channels they use most.',
    highlightDetail: ['not accidental'],
    Icon: Search,
  },
  {
    num: '04',
    title: 'AI Visibility',
    body: 'Presence in AI-generated answers, not just traditional search results.',
    highlightBody: ['AI-generated answers'],
    detail: 'When buyers ask AI tools for recommendations, your business needs to appear in the answer. We build the entity signals and answer-engine optimization that earn that placement.',
    highlightDetail: ['appear in the answer', 'earn that placement'],
    Icon: Bot,
  },
  {
    num: '05',
    title: 'Positioning & Messaging',
    body: 'Clear statements of what the business does, who it serves, and why it matters.',
    highlightBody: ['why it matters'],
    detail: 'Unclear positioning is invisible positioning. We refine the language that tells buyers who you are, who you serve, and why they should take the next step.',
    highlightDetail: ['invisible positioning'],
    Icon: Megaphone,
  },
  {
    num: '06',
    title: 'Conversion Path Design',
    body: 'A defined next step for every visitor, so attention becomes action.',
    highlightBody: ['action'],
    detail: 'Traffic without a path is waste. We design the sequences, offers, and next steps that move visitors from awareness to conversation.',
    highlightDetail: ['waste', 'awareness to conversation'],
    Icon: Target,
  },
];

const SLIDE_INTERVAL = 2500;

export function SolutionsDigitalPresenceSection() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  // [ANIM: section reveal on scroll]
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
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // [ANIM: auto-slide carousel — starts on mount, pauses on hover]
  const tick = useCallback((now: number) => {
    if (startRef.current === null) startRef.current = now;
    const elapsed = now - startRef.current;
    const pct = (elapsed % SLIDE_INTERVAL) / SLIDE_INTERVAL;
    setProgress(pct);
    if (elapsed >= SLIDE_INTERVAL) {
      startRef.current = now;
      setActive((a) => (a + 1) % CAPABILITIES.length);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    startRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [tick]);

  // [ANIM: pause on hover]
  useEffect(() => {
    if (paused) {
      pausedAtRef.current = performance.now() - (startRef.current || performance.now());
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    } else {
      startRef.current = null;
      pausedAtRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused, tick]);

  const goTo = useCallback((i: number) => {
    setActive(i);
    startRef.current = null;
    pausedAtRef.current = 0;
    setProgress(0);
  }, []);

  const goPrev = useCallback(() => {
    goTo((active - 1 + CAPABILITIES.length) % CAPABILITIES.length);
  }, [active, goTo]);

  const goNext = useCallback(() => {
    goTo((active + 1) % CAPABILITIES.length);
  }, [active, goTo]);

  const c = CAPABILITIES[active];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="digital-presence-title"
      className="diagnostic-section section--gray"
      style={{ borderTop: '3px solid #841617' }}
    >
      <div className="site-shell">
        <p className="section-kicker" style={{ textAlign: 'center' }}>01 — Digital Presence</p>

        {/* [CRIMSON: header accent line] */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '2px',
          marginBottom: '4px',
        }}>
          <div style={{ width: 28, height: 1.5, background: '#841617', opacity: 0.4 }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#841617', opacity: 0.5 }} />
          <div style={{ width: 28, height: 1.5, background: '#841617', opacity: 0.4 }} />
        </div>

        <h2 id="digital-presence-title" style={{ textAlign: 'center' }}>
          Make it easier for the right buyers to find, understand, and{' '}
          <span style={{ color: 'var(--maroon)' }}>trust your business.</span>
        </h2>
        <p
          className="section-intro"
          style={{ maxWidth: '680px', marginInline: 'auto', textAlign: 'center' }}
        >
          Digital Presence strengthens the beginning of the revenue path: discovery
          and consideration. The objective is not simply more traffic — it is a
          digital presence that makes clear what the business does, who it serves,
          why it is relevant, and what a buyer should do next.
        </p>

        {/* [ENHANCED: auto-slide carousel with progress ring] */}
        <div
          style={{
            marginTop: '44px',
            maxWidth: '780px',
            marginInline: 'auto',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Active slide */}
          <div
            key={active}
            style={{
              background: '#ffffff',
              border: '2px solid #1a1a1a',
              borderTop: '4px solid #841617',
              padding: '48px 44px',
              animation: 'fadeSlideIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* [DECORATIVE: large ghost number in crimson] */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-18px',
                right: '12px',
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '160px',
                fontWeight: 400,
                lineHeight: 1,
                color: '#841617',
                opacity: 0.05,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {c.num}
            </span>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              {/* [ICON: black circle with crimson ring + white icon] */}
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: '#1a1a1a',
                border: '2px solid #841617',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <c.Icon size={22} strokeWidth={1.5} color="#ffffff" />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#1a1a1a',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span style={{
                    width: 18,
                    height: 1.5,
                    background: '#1a1a1a',
                    display: 'inline-block',
                  }} />
                  {c.num} — {c.title}
                </div>

                {/* [CRIMSON: impactful words highlighted in h3] */}
                <h3 style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  fontWeight: 400,
                  color: '#1a1a1a',
                  lineHeight: 1.2,
                  marginBottom: '14px',
                  letterSpacing: '-0.01em',
                  borderLeft: '3px solid #841617',
                  paddingLeft: '16px',
                }}>
                  {highlight(c.body, c.highlightBody)}
                </h3>

                {/* [CRIMSON: impactful words highlighted in detail] */}
                <p style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '15px',
                  color: '#44403c',
                  lineHeight: 1.7,
                  marginBottom: '20px',
                }}>
                  {highlight(c.detail, c.highlightDetail)}
                </p>

                {/* [ENHANCED: progress bar — black fill with crimson endpoint] */}
                <div style={{
                  width: '100%',
                  height: 2,
                  background: '#e7e5e4',
                  borderRadius: 0,
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <div style={{
                    width: `${progress * 100}%`,
                    height: '100%',
                    background: '#1a1a1a',
                    transition: 'width 0.1s linear',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: '-1.5',
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#841617',
                    }} />
                  </div>
                </div>
              </div>
            </div>

            {/* [ENHANCED: prev/next arrows in black] */}
            <button
              onClick={goPrev}
              aria-label="Previous capability"
              style={{
                position: 'absolute',
                top: '50%',
                left: '12px',
                transform: 'translateY(-50%)',
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '1.5px solid #1a1a1a',
                background: 'rgba(255,255,255,0.9)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1a1a1a',
                transition: 'background 0.2s ease, transform 0.15s ease',
                zIndex: 2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                e.currentTarget.style.color = '#1a1a1a';
              }}
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              onClick={goNext}
              aria-label="Next capability"
              style={{
                position: 'absolute',
                top: '50%',
                right: '12px',
                transform: 'translateY(-50%)',
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '1.5px solid #1a1a1a',
                background: 'rgba(255,255,255,0.9)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1a1a1a',
                transition: 'background 0.2s ease, transform 0.15s ease',
                zIndex: 2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                e.currentTarget.style.color = '#1a1a1a';
              }}
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>

          {/* [NAV: dot indicators + counter] */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '20px',
          }}>
            <span style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              color: '#1a1a1a',
              letterSpacing: '0.06em',
              minWidth: '40px',
              textAlign: 'center',
            }}>
              {String(active + 1).padStart(2, '0')} / {String(CAPABILITIES.length).padStart(2, '0')}
            </span>
            <div style={{ width: 1, height: 14, background: '#d6d3d1' }} />
            {CAPABILITIES.map((cap, i) => (
              <button
                key={cap.num}
                onClick={() => goTo(i)}
                aria-label={`View ${cap.title}`}
                style={{
                  width: active === i ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: 'none',
                  background: active === i ? '#841617' : '#d6d3d1',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Outcome callout */}
        <div
          style={{
            marginTop: '36px',
            padding: '28px 32px',
            background: sectionVisible ? '#ffffff' : '#f5f5f4',
            border: '1.5px solid #1a1a1a',
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-start',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, background 0.4s ease',
          }}
        >
          <div
            style={{
              width: '3px',
              height: '48px',
              background: '#1a1a1a',
              flexShrink: 0,
              borderRadius: 0,
            }}
            aria-hidden="true"
          />
          <div style={{ textAlign: 'left', flex: 1 }}>
            <p style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#1a1a1a',
              marginBottom: '8px',
            }}>Outcome</p>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              marginBottom: '10px',
            }}>
              <span style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '28px',
                color: '#1a1a1a',
                lineHeight: 1,
              }}>3x</span>
              <span style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '13px',
                color: '#57534e',
              }}>more inbound leads with strong digital presence</span>
            </div>
            <div style={{
              width: '100%',
              height: 3,
              background: '#e7e5e4',
              borderRadius: 0,
              overflow: 'hidden',
              marginBottom: '14px',
            }}>
              <div style={{
                width: sectionVisible ? '72%' : '0%',
                height: '100%',
                background: '#1a1a1a',
                transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.4s',
              }} />
            </div>
            <p style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '15px',
              color: '#44403c',
              lineHeight: 1.65,
              margin: 0,
            }}>
              A stronger Digital Presence creates qualified opportunity for the rest
              of the revenue system. When buyers discover and understand your
              business before they reach out, every subsequent step becomes easier.
            </p>
            <div style={{ marginTop: '14px' }}>
              <AnchorLink
                href="/ai-visibility"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  lineHeight: 1.2,
                  textDecoration: 'none',
                  borderBottom: '1.5px solid transparent',
                  transition: 'gap 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.gap = '12px';
                  e.currentTarget.style.borderBottomColor = '#1a1a1a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.gap = '8px';
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }}
              >
                Learn about AI Visibility <ArrowRight size={15} />
              </AnchorLink>
            </div>
          </div>
        </div>

        {/* [ANIM: feedback loop indicator] */}
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s',
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ opacity: 0.35, flexShrink: 0 }}
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
            Revenue Intelligence feeds learning back to this stage
          </span>
        </div>

        <p style={{
          fontSize: '13px',
          color: '#78716c',
          marginTop: '20px',
          lineHeight: 1.6,
          opacity: sectionVisible ? 0.7 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s',
        }}>
          Content boundary: AI Visibility deep-dive content — AEO/GEO education,
          entity optimization frameworks, AI lifecycle, maturity model, visibility
          score, and specialist diagnostic content — belongs on the dedicated AI
          Visibility page. Solutions provides the overview and routes deeper.
        </p>

      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
