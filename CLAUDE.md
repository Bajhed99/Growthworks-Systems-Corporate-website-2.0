# GWS Website 2.0 - Project Documentation

## Project Overview

**GWS Website 2.0** is a comprehensive website redesign and enhancement project for Global Wealth Solutions. The project focuses on building a modern, responsive homepage that showcases GWS's AI-powered capabilities and business value propositions.

## Project Goals

- Build a modern, professional homepage aligned with wireframes and design specifications
- Implement responsive design for desktop and mobile views
- Showcase 11 core sections of the GWS value proposition
- Create high-impact hero section with clear CTAs
- Implement revenue diagnostic and credibility bridge sections
- Ensure accessibility and performance standards

## Tech Stack

- **Framework**: Next.js / React (TBD - to be determined based on requirements)
- **Styling**: Tailwind CSS or styled-components
- **Design Tools**: UI/UX Pro Max, 21st.dev MCP Server
- **Package Manager**: npm

## Project Structure

```
GWS-Website-2.0/
├── .claude/                    # Claude Code configuration & skills
├── .mcp.json                   # MCP server configuration
├── docs/                       # Reference materials (organized below)
│   ├── wireframes/             # Desktop & Mobile wireframes (PDF & PNG)
│   ├── design-specs/           # All design documentation
│   │   ├── Hero Headline Copy
│   │   ├── Problem Recognition Card Copy
│   │   ├── Core Solution Modules Copy
│   │   ├── How GWS Works Copy
│   │   ├── Four Business Outcomes Copy
│   │   ├── Who GWS Serves Copy
│   │   ├── Credibility Bridge Copy
│   │   ├── Founder Credibility Copy
│   │   ├── AI Visibility Differentiator Copy
│   │   ├── Revenue Diagnostic CTA Copy
│   │   ├── Color Application & CTA States
│   │   ├── Typography Hierarchy & Spacing System
│   │   ├── Mobile View Responsive Specification
│   │   ├── Revenue Infrastructure Diagram
│   │   ├── Homepage Architecture (11 sections)
│   │   └── Content Inventory & Disposition Matrix
│   ├── content-copy/           # Organized content sections
│   ├── branding/               # Brand guidelines & assets
│   └── architecture/           # Technical architecture docs
├── src/                        # Source code
│   ├── components/             # Reusable React components
│   │   ├── Hero/
│   │   ├── Navigation/
│   │   ├── Sections/
│   │   ├── Cards/
│   │   ├── CTAs/
│   │   └── Footer/
│   ├── pages/                  # Next.js pages / routes
│   ├── styles/                 # Global styles
│   ├── utils/                  # Helper functions
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Libraries & utilities
├── public/                     # Static assets
├── package.json
├── next.config.js              # Next.js configuration
└── README.md
```

## 11 Core Homepage Sections

Based on the architecture documentation, the homepage includes:

1. **Hero Headline & Supporting Copy** - Main value proposition
2. **Problem Recognition Card** - Identifies client pain points
3. **Core Solution Modules** - Key solutions GWS offers
4. **How GWS Works** - Process overview
5. **Four Business Outcomes** - Key benefits/results
6. **Who GWS Serves** - Target audience
7. **Credibility Bridge** - Trust & social proof section
8. **Founder Credibility** - Leadership & background
9. **AI Visibility Differentiator** - AI-powered capabilities
10. **Revenue Diagnostic CTA** - Primary call-to-action
11. **Additional Section** - TBD based on final architecture

## Design System

### Color Palette
- Defined in: `docs/design-specs/GWS_Color_Application_and_CTA_States.docx`
- CTA states and color application rules included

### Typography
- Font pairings: 74 options available via UI/UX Pro Max
- Hierarchy & Spacing: `docs/design-specs/GWS_Typography_Hierarchy_and_Spacing_System.docx`
- Implements consistent spacing system throughout

### Responsive Design
- Mobile specifications: `docs/design-specs/GWS_Mobile_View_Ruling_and_Revenue_Infrastructure_Responsive_Specification.docx`
- Desktop wireframe: PNG & PDF formats
- Mobile wireframe: PNG & PDF formats

## Development Guidelines

### Component Development
- Build components aligned with wireframe layouts
- Follow design specs for spacing, colors, and typography
- Ensure mobile-first responsive approach
- Use semantic HTML for accessibility

### Content Management
- Copy organized by section in design specs
- Maintain consistency with approved messaging
- Reference content inventory matrix for dispositions

### Performance
- Optimize images and assets
- Implement code splitting for routes
- Use Next.js static generation where possible
- Monitor Core Web Vitals

## UI/UX Tools

### UI/UX Pro Max Skill
- Access to 79 searchable UI styles
- 192 color palettes for brand alignment
- 74 font pairings for typography
- Auto-generates design system recommendations

### 21st.dev MCP Server
- Enhanced UI/UX intelligence
- API Key: Set via `VITE_21ST_API_KEY` environment variable (see `.env.example`)
- Use for design decisions and component recommendations

## Next Steps

1. ✅ Set up project structure with docs
2. ⬜ Decide on Next.js vs React + routing solution
3. ⬜ Set up base project scaffolding
4. ⬜ Create component library structure
5. ⬜ Build Hero section component
6. ⬜ Implement remaining sections
7. ⬜ Add responsive design breakpoints
8. ⬜ Performance optimization & testing

## References

All reference materials are organized in the `/docs` folder:
- Wireframes with desktop and mobile views
- Comprehensive design specifications
- Content copy for all sections
- Branding guidelines
- Technical architecture documentation

---

**Last Updated**: 2026-08-26
**Status**: Project Setup Complete - Ready for Development

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
