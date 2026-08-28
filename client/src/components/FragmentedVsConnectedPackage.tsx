import { useState, useEffect } from 'react'
import {
  Globe,
  MessageSquare,
  Filter,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Zap,
  TrendingUp,
  Unlink,
  Link2
} from 'lucide-react'

// ── Brand design tokens ────────────────────────────────────────────────────────
const MAROON = '#7A1E22'
const GOLD = '#B8863B'
const INK = '#1C1917'
const SMOKE = '#57534E'
const ASH = '#D6CECE'
const PARCHMENT = '#FBF9F5'
const WARM_WHITE = '#FFFFFF'
const BORDER_WARM = '#EBE4DC'

// ── Capabilities metadata ──────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    id: 0,
    number: '01',
    title: 'Digital Presence',
    role: 'Reach & visibility',
    icon: Globe,
    fragTitle: 'Visibility Gap',
    fragSub: 'Leads go untracked across ad networks',
    fragDetail: 'Buyer signals stay isolated across tools and channels.',
    connTitle: 'Unified Buyer Signals',
    connSub: 'First-party intent tagged instantly',
    connDetail: 'Buyer signals flow into one coordinated system.',
    flowLabel: 'Intent signals',
    metricFrag: 'Untracked signals',
    metricConn: 'Signals captured',
  },
  {
    id: 1,
    number: '02',
    title: 'Lead Response',
    role: 'Capture & respond',
    icon: MessageSquare,
    fragTitle: 'Slow Response',
    fragSub: 'Intent expires in inbox queues',
    fragDetail: 'Inquiries sit in general mailboxes for hours. Prospects move on to competitors before sales receives context or assignment.',
    connTitle: 'Instant Context Routing',
    connSub: '< 2 min automated SLA response',
    connDetail: 'Automated routing preserves context and triggers the right response while buyer intent is active.',
    flowLabel: 'Qualified leads',
    metricFrag: 'Delayed response',
    metricConn: 'Response coordinated',
  },
  {
    id: 2,
    number: '03',
    title: 'Sales Operations',
    role: 'Pipeline & deals',
    icon: Filter,
    fragTitle: 'Broken Handoff',
    fragSub: 'Context lost between SDR & AE',
    fragDetail: 'Manual CRM entries lead to missing discovery notes. Reps repeat questions, frustrating buyers and stalling deal momentum.',
    connTitle: 'Seamless Deal Pipeline',
    connSub: 'Complete activity & context transfer',
    connDetail: 'Automated deal stages, full transcript syncing, and deal health alerts empower sales teams to close larger opportunities faster.',
    flowLabel: 'Pipeline data',
    metricFrag: 'Lost context',
    metricConn: 'Context preserved',
  },
  {
    id: 3,
    number: '04',
    title: 'Revenue Intelligence',
    role: 'Measure outcomes',
    icon: BarChart3,
    fragTitle: 'Lost Attribution',
    fragSub: 'No feedback loop to marketing',
    fragDetail: 'Closed-lost data stays siloed in sales reps heads. Marketing continues acquiring low-quality leads, repeating inefficient spend cycles.',
    connTitle: 'Closed-Loop Engine',
    connSub: 'Revenue intelligence feeds front line',
    connDetail: 'Deal outcome data continuously retrains targeting models and sales playbooks, compounding efficiency with every transaction.',
    flowLabel: 'Closed-loop data',
    metricFrag: 'Incomplete attribution',
    metricConn: 'Outcomes measured',
  }
]

export default function App() {
  const [selectedNode, setSelectedNode] = useState<number>(0)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const [showSwipeHint, setShowSwipeHint] = useState<boolean>(true)
  const viewMode = 'both'
  const animationsActive = true
  const capabilities = CAPABILITIES


  const activeCap = CAPABILITIES[selectedNode]

  return (
    <div className="min-h-screen relative font-sans text-stone-800 antialiased" style={{ backgroundColor: PARCHMENT }}>
      {/* Refined Warm Dot Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${ASH} 1.2px, transparent 1.2px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        body {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .font-serif {
          font-family: 'Playfair Display', Georgia, serif;
        }

        .card-shadow {
          box-shadow: 0 4px 20px -2px rgba(122, 30, 34, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02);
        }

        .card-shadow-gold {
          box-shadow: 0 8px 28px -4px rgba(184, 134, 59, 0.12), 0 2px 8px -1px rgba(184, 134, 59, 0.06);
        }

        .card-shadow-maroon {
          box-shadow: 0 8px 28px -4px rgba(122, 30, 34, 0.12), 0 2px 8px -1px rgba(122, 30, 34, 0.06);
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }

        @keyframes flowConnected {
          0% { top: -20px; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        @keyframes flowFragmented {
          0% { top: -10px; opacity: 0; }
          15% { opacity: 1; }
          40% { top: 50%; opacity: 1; }
          50% { top: 55%; opacity: 0; transform: scale(0.5); }
          100% { top: 55%; opacity: 0; }
        }

        @keyframes cascadeFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes tourProgress {
          from { width: 0%; }
          to { width: 100%; }
        }

        .animate-cascade {
          opacity: 0;
          animation: cascadeFadeIn 0.6s ease-out forwards;
        }

        .premium-scrollbar::-webkit-scrollbar {
          height: 8px;
        }

        .premium-scrollbar::-webkit-scrollbar-track {
          background: rgba(214, 206, 206, 0.2);
          border-radius: 4px;
        }

        .premium-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(184, 134, 59, 0.4);
          border-radius: 4px;
        }

        .premium-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(184, 134, 59, 0.6);
        }

        /* Hide scrollbar completely on mobile, use premium on desktop */
        @media (max-width: 768px) {
          .mobile-snap-gallery {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE/Edge */
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
          }
          .mobile-snap-gallery::-webkit-scrollbar {
            display: none; /* Chrome/Safari/Opera */
          }
        }

        .animate-pulse-slow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        
        {/* Header Section */}
        <header className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-200/60 border border-stone-300/60 text-xs font-semibold tracking-wider uppercase text-stone-700 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#B8863B]" />
            GrowthWorks Architecture Comparison
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-[1.15] mb-5">
            Growth compounds when the <span className="italic font-normal text-[#B8863B]">system connects.</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal max-w-2xl mx-auto">
            The same capabilities produce very different results when they work as one connected system.
          </p>
        </header>

        {/* Capability Quick Navigation Strip */}
        {/* Navigation strip removed per visual revisions */}

        {/* Visual Diagram Main Stage */}
        <div className="relative mb-12 mt-12">
          
          {/* Mobile Swipe Indicator Overlay - Sticky to right edge */}
          {showSwipeHint && (
            <div className="md:hidden sticky top-[75vh] z-50 w-full h-0 flex justify-end pointer-events-none">
              <div className="flex items-center gap-1.5 bg-stone-900/95 backdrop-blur-md text-white pl-4 pr-3 py-2.5 rounded-l-full shadow-[-4px_8px_16px_-4px_rgba(0,0,0,0.3)] animate-pulse border border-white/20 border-r-0 transition-opacity duration-500 translate-x-4 -mt-8">
                <span className="text-xs font-semibold tracking-wide text-stone-100">Swipe to compare</span>
                <ArrowRight className="w-4 h-4 text-[#B8863B]" />
              </div>
            </div>
          )}

          <div 
            className="bg-white/95 backdrop-blur-md border-y sm:border sm:rounded-3xl border-stone-200/90 py-4 sm:p-6 lg:p-8 shadow-sm overflow-x-auto premium-scrollbar mobile-snap-gallery -mx-4 sm:mx-0 relative"
            onScroll={(e) => {
              if (e.currentTarget.scrollLeft > 30 && showSwipeHint) {
                setShowSwipeHint(false)
              }
            }}
          >
            
            <div className={'flex flex-row items-start gap-0 sm:gap-6 lg:gap-10 w-full relative z-10'}>
            
            {/* ── LEFT PANEL: FRAGMENTED GROWTH ── */}
            <div className="flex-none w-[88vw] md:w-auto md:flex-1 flex flex-col min-w-0 snap-center scroll-m-0 sm:scroll-m-6 px-4 sm:px-0">
                {/* Sticky Section Header */}
                <div className="sticky top-4 z-30 bg-white/95 backdrop-blur-md pt-3 text-center pb-5 mb-4 border-b border-stone-200/80 rounded-2xl shadow-[0_12px_16px_-12px_rgba(0,0,0,0.05)]">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-[#7A1E22]/20 text-[#7A1E22] text-xs font-semibold mb-2">
                    <Unlink className="w-3.5 h-3.5" />
                    Siloed Operations
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-stone-900 tracking-tight">
                    Fragmented Growth
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7A1E22] italic mt-1 font-medium">
                    "Activity everywhere. Momentum nowhere."
                  </p>
                </div>

                {/* Vertical Nodes Container */}
                <div className="relative py-2 flex flex-col gap-8 sm:gap-10">
                  {capabilities.map((cap, idx) => {
                    const isHovered = hoveredNode === cap.id
                    const isSelected = selectedNode === cap.id
                    const isDimmed = hoveredNode !== null && hoveredNode !== cap.id
                    const Icon = cap.icon

                    return (
                      <div 
                        key={cap.id} 
                        className="relative animate-cascade"
                        style={{ animationDelay: `${idx * 0.15}s` }}
                      >
                        {/* Node Card Component */}
                        <div
                          onClick={() => setSelectedNode(cap.id)}
                          onMouseEnter={() => setHoveredNode(cap.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setSelectedNode(cap.id)
                            }
                          }}
                          className={`cursor-pointer transition-all duration-300 rounded-2xl border p-3.5 sm:p-4.5 relative z-10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#7A1E22]/30 ${
                            isSelected
                              ? 'bg-white border-[#7A1E22] card-shadow-maroon ring-2 ring-[#7A1E22]/20'
                              : isHovered
                              ? 'bg-white border-[#7A1E22]/60 shadow-md translate-y-[-2px]'
                              : isDimmed
                              ? 'bg-stone-50/60 border-stone-200 opacity-60'
                              : 'bg-stone-50/90 border-stone-200/80 hover:bg-white hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon & Stage Badge */}
                            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                              isHovered || isSelected
                                ? 'bg-red-50 border-[#7A1E22]/30 text-[#7A1E22]'
                                : 'bg-stone-100 border-stone-200 text-stone-600'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>

                            {/* Node Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1.5 mb-0.5">
                                <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                                  STAGE {cap.number}
                                </span>
                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-[#7A1E22] bg-red-50 px-2 py-0.5 rounded-md border border-[#7A1E22]/15 shrink-0">
                                  <AlertCircle className="w-3 h-3" />
                                  {cap.fragTitle}
                                </span>
                              </div>

                              <h3 className="text-sm sm:text-base font-bold text-stone-900 truncate">
                                {cap.title}
                              </h3>
                              <p className="text-[11px] sm:text-xs text-stone-500 font-medium truncate">
                                {cap.role}
                              </p>
                            </div>
                          </div>

                          {/* Gap Consequence Callout */}
                          <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-600 bg-red-50/40 -mx-1 px-2.5 py-1.5 rounded-lg">
                            <span className="font-medium text-[#7A1E22] text-[11px] truncate">
                              ⚠ {cap.fragSub}
                            </span>
                          </div>

                          {/* Selected State Inline Context with Accordion Animation */}
                          <div
                            className={`grid transition-all duration-300 ease-in-out ${
                              isSelected ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="pt-3 border-t border-stone-100 text-[11px] sm:text-xs text-stone-600 leading-relaxed">
                                {cap.fragDetail}
                                <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold text-[#7A1E22] bg-red-50/50 px-2 py-1 rounded">
                                  Outcome: {cap.metricFrag}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Connector Downward SVG Path between nodes */}
                        {idx < capabilities.length - 1 && (
                          <div className={`my-2.5 flex flex-col items-center justify-center relative transition-opacity duration-500 ${isDimmed ? 'opacity-30' : 'opacity-100'}`}>
                            {/* Broken dashed line */}
                            <div className="h-8 sm:h-10 w-0.5 border-r-2 border-dashed border-[#7A1E22]/30 relative overflow-hidden">
                              {animationsActive && (
                                <div 
                                  className="absolute left-[-1.5px] w-[5px] h-[5px] bg-[#7A1E22] rounded-full shadow-sm" 
                                  style={{ animation: 'flowFragmented 2s infinite ease-in' }} 
                                />
                              )}
                            </div>

                            {/* Gap Break Badge */}
                            <div className="my-0.5 px-2.5 py-0.5 bg-red-100/80 border border-[#7A1E22]/20 rounded-full text-[9.5px] sm:text-[10px] font-bold text-[#7A1E22] shadow-2xs flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7A1E22]" />
                              DATA BREAK & LOST CONTEXT
                            </div>

                            <div className="h-2.5 w-0.5 border-r-2 border-dashed border-stone-300" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Bottom Outcome Warning Box */}
                <div className="mt-5 p-3.5 rounded-2xl bg-red-50/70 border border-[#7A1E22]/20 text-center">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A1E22] mb-0.5">
                    Systemic Consequence
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    Revenue leakage
                  </p>
                </div>
              </div>

            {/* ── CENTER DIVIDER (for side-by-side mode) ── */}
            <div className="flex-none flex flex-col items-center justify-center relative w-[1px] shrink-0 self-stretch">
              <div className="h-full w-px bg-gradient-to-b from-stone-200 via-stone-300 to-stone-200" />
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white border border-stone-200 shadow-xs px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-500 whitespace-nowrap z-10">
                VS
              </div>
            </div>

            {/* ── RIGHT PANEL: CONNECTED GROWTH ── */}
            <div className="flex-none w-[88vw] md:w-auto md:flex-1 flex flex-col min-w-0 snap-center scroll-m-0 sm:scroll-m-6 px-4 sm:px-0">
                {/* Sticky Section Header */}
                <div className="sticky top-4 z-30 bg-white/95 backdrop-blur-md pt-3 text-center pb-5 mb-4 border-b border-stone-200/80 rounded-2xl shadow-[0_12px_16px_-12px_rgba(0,0,0,0.05)]">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#B8863B]/30 text-[#B8863B] text-xs font-semibold mb-2">
                    <Link2 className="w-3.5 h-3.5" />
                    CONNECTED SYSTEM
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-stone-900 tracking-tight">
                    Connected Growth
                  </h2>
                  <p className="text-xs sm:text-sm text-[#B8863B] italic mt-1 font-medium">
                    "Each signal strengthens the next."
                  </p>
                </div>

                {/* Vertical Nodes Container */}
                <div className="relative py-2 flex flex-col gap-8 sm:gap-10">
                  {capabilities.map((cap, idx) => {
                    const isHovered = hoveredNode === cap.id
                    const isSelected = selectedNode === cap.id
                    const isDimmed = hoveredNode !== null && hoveredNode !== cap.id
                    const Icon = cap.icon

                    return (
                      <div 
                        key={cap.id} 
                        className="relative animate-cascade"
                        style={{ animationDelay: `${idx * 0.15}s` }}
                      >
                        {/* Node Card Component */}
                        <div
                          onClick={() => setSelectedNode(cap.id)}
                          onMouseEnter={() => setHoveredNode(cap.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setSelectedNode(cap.id)
                            }
                          }}
                          className={`cursor-pointer transition-all duration-300 rounded-2xl border p-3.5 sm:p-4.5 relative z-10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B8863B]/40 ${
                            isSelected
                              ? 'bg-white border-[#B8863B] card-shadow-gold ring-2 ring-[#B8863B]/25'
                              : isHovered
                              ? 'bg-white border-[#B8863B]/70 shadow-md translate-y-[-2px]'
                              : isDimmed
                              ? 'bg-stone-50/60 border-stone-200 opacity-60'
                              : 'bg-white/90 border-amber-200/60 hover:border-[#B8863B]/50 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon & Stage Badge */}
                            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                              isHovered || isSelected
                                ? 'bg-amber-50 border-[#B8863B]/40 text-[#B8863B]'
                                : 'bg-amber-50/50 border-amber-200/80 text-[#B8863B]'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>

                            {/* Node Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1.5 mb-0.5">
                                <span className="text-[10px] font-bold tracking-widest text-[#B8863B] uppercase">
                                  STAGE {cap.number}
                                </span>
                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  {cap.connTitle}
                                </span>
                              </div>

                              <h3 className="text-sm sm:text-base font-bold text-stone-900 truncate">
                                {cap.title}
                              </h3>
                              <p className="text-[11px] sm:text-xs text-stone-500 font-medium truncate">
                                {cap.role}
                              </p>
                            </div>
                          </div>

                          {/* Connected Flow Callout */}
                          <div className="mt-3 pt-2.5 border-t border-amber-100 flex items-center justify-between text-xs text-stone-600 bg-amber-50/50 -mx-1 px-2.5 py-1.5 rounded-lg">
                            <span className="font-medium text-stone-800 text-[11px] truncate flex items-center gap-1">
                              <Zap className="w-3 h-3 text-[#B8863B]" />
                              {cap.connSub}
                            </span>
                          </div>

                          {/* Selected State Inline Context with Accordion Animation */}
                          <div
                            className={`grid transition-all duration-300 ease-in-out ${
                              isSelected ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="pt-3 border-t border-amber-100/50 text-[11px] sm:text-xs text-stone-600 leading-relaxed">
                                {cap.connDetail}
                                <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50/50 px-2 py-1 rounded">
                                  Outcome: {cap.metricConn}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Continuous Flow Connector between nodes */}
                        {idx < capabilities.length - 1 && (
                          <div className={`my-2.5 flex flex-col items-center justify-center relative transition-opacity duration-500 ${isDimmed ? 'opacity-30' : 'opacity-100'}`}>
                            {/* Solid Gold Flow Line with Pulse Animation */}
                            <div className="h-8 sm:h-10 w-0.5 bg-gradient-to-b from-[#B8863B] via-[#D4AF37] to-[#B8863B] relative overflow-hidden rounded-full shadow-2xs">
                              {animationsActive && (
                                <div
                                  className="absolute w-1.5 h-6 bg-gradient-to-b from-transparent via-white to-white left-[-2px] rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                                  style={{
                                    animation: `flowConnected 1.5s infinite linear`,
                                    animationDelay: `${idx * 0.3}s`
                                  }}
                                />
                              )}
                            </div>

                            {/* Flow Label Pill */}
                            <div className="my-0.5 px-2.5 py-0.5 bg-amber-100/90 border border-[#B8863B]/30 rounded-full text-[10px] sm:text-[10.5px] font-semibold text-[#B8863B] shadow-2xs flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              <span>{cap.flowLabel}</span>
                              <ArrowRight className="w-3 h-3 rotate-90" />
                            </div>

                            <div className="h-2.5 w-0.5 bg-[#B8863B]" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Bottom Outcome Compounding Badge */}
                <div className="mt-5 p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-100/60 border border-[#B8863B]/40 text-center shadow-xs relative overflow-hidden">
                  <div className="absolute top-2 right-2 opacity-10 text-[#B8863B]">
                    <RotateCcw className="w-14 h-14" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B8863B] text-white text-[10px] font-bold tracking-widest uppercase mb-1">
                    <Sparkles className="w-3 h-3" />
                    Compounding improvement
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 mb-0.5">
                    Attract · Convert · Retain · Grow
                  </h4>
                  <p className="text-xs text-stone-600">
                    Revenue intelligence feeds what the business learns back into acquisition, response, and sales—creating a system that improves over time.
                  </p>
                </div>
              </div>

          </div>
        </div>
        </div>

        {/* Legend / Reading Guide Footer */}
        <footer className="mt-8 pt-8 border-t border-stone-300/60 flex flex-wrap items-center justify-between gap-6 text-xs text-stone-600">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-stone-300 border-b border-dashed border-[#7A1E22]" />
              <span>Dashed maroon: Broken handoff</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-[#B8863B]" />
              <span>Solid gold: Continuous signal flow</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5 text-[#B8863B]" />
              <span>Feedback curve: Intelligence loop</span>
            </div>
          </div>

          <div className="text-stone-400 font-medium">
            GrowthWorks Systems © 2026 · Interactive Visual Diagram
          </div>
        </footer>

      </div>
    </div>
  )
}
