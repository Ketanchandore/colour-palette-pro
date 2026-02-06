
# Programmatic SEO Content Engine Implementation Plan

## Overview

This plan implements a scalable Programmatic SEO architecture supporting 12 playbooks that can generate 100,000+ unique, high-value pages. The system builds on the existing infrastructure (50,000+ color database in `colorData.ts`, SEOHead component, MainLayout with sidebar).

---

## Architecture Design

```text
+---------------------------+
|   Programmatic SEO Engine |
+---------------------------+
           |
     +-----+-----+
     |           |
  Data Layer   Page Layer
     |           |
  +--+--+     +--+--+
  |     |     |     |
Dataset Config  Template Components
(JSON) (Types)  (12 Playbooks)
```

**File Structure:**
```text
src/
├── data/
│   └── seo/
│       ├── dataset.ts          # Master dataset (personas, industries, etc.)
│       ├── playbooks.ts        # Playbook configurations
│       └── generators/         # Content generators per playbook
│           ├── templates.ts
│           ├── curation.ts
│           ├── comparisons.ts
│           ├── personas.ts
│           ├── integrations.ts
│           ├── glossary.ts
│           └── index.ts
├── pages/
│   └── seo/
│       ├── UIDesignerColorPalettes.tsx (existing)
│       ├── FrontendDevColorPalettes.tsx
│       ├── BrandDesignerColorPalettes.tsx
│       ├── HexVsRgbComparison.tsx
│       ├── FigmaIntegration.tsx
│       ├── TailwindIntegration.tsx
│       ├── GlossaryPage.tsx
│       └── [dynamic routes...]
└── components/
    └── seo/
        ├── SEOHead.tsx (existing)
        ├── SEOPageLayout.tsx    # Shared layout for SEO pages
        ├── FAQSection.tsx       # Reusable FAQ component with schema
        ├── InternalLinks.tsx    # Internal linking component
        ├── ComparisonTable.tsx  # For Comparisons playbook
        └── CurationCard.tsx     # For Curation playbook
```

---

## Phase 1: Core Infrastructure

### Task 1.1: Master Dataset Creation
Create `src/data/seo/dataset.ts` containing:

**Categories:**
- Color Palettes, Gradients, Brand Colors, UI Colors, Data Visualization

**Personas (8 initial):**
- UI Designer, Frontend Developer, Brand Designer, Mobile App Designer
- Marketing Manager, Product Manager, UX Researcher, Graphic Designer

**Industries (12 initial):**
- SaaS, E-commerce, Healthcare, FinTech, Gaming, Education
- Real Estate, Restaurant, Luxury, Sustainability, Wedding, Tech Startup

**Tools (6):**
- Palette Generator, Gradient Generator, Contrast Checker
- Color Converter, AI Brand Architect, Code Export

**Integrations (4):**
- Figma, Tailwind CSS, CSS Variables, SCSS/SASS

**Formats (4):**
- HEX, RGB, HSL, CMYK

### Task 1.2: Playbook Configuration System
Create `src/data/seo/playbooks.ts` defining:

```typescript
interface PlaybookConfig {
  type: PlaybookType;
  urlPattern: string;
  minWordCount: number;
  requiredSections: string[];
  schemaType: 'Article' | 'FAQPage' | 'HowTo' | 'Product';
}
```

### Task 1.3: Reusable SEO Components

**SEOPageLayout.tsx:**
- Wraps MainLayout with consistent breadcrumbs
- Handles structured data injection
- Includes internal linking footer

**FAQSection.tsx:**
- Accordion component with FAQ schema
- Minimum 3 FAQs per page
- Auto-generates JSON-LD

**InternalLinks.tsx:**
- Parent category link
- 2 sibling page links
- 2 cross-playbook links

---

## Phase 2: Initial Playbook Implementation (Priority Pages)

### Playbook 1: TEMPLATES (3 pages)

**Page 1:** `/palettes/ui-designer` (EXISTS)
- Already implemented with 710 lines of content
- Serves as the template for other persona pages

**Page 2:** `/palettes/frontend-developer`
- Focus: React/Tailwind CSS color tokens
- Includes: Code snippets, CSS variable patterns
- Unique angle: Design token naming conventions

**Page 3:** `/palettes/brand-designer`
- Focus: Brand identity color systems
- Includes: Primary/secondary/accent structure
- Unique angle: Brand color ratio guidelines (60-30-10)

### Playbook 2: PERSONAS (3 pages)

**Page 1:** `/guides/marketing-manager-colors`
- Pain points: A/B testing, conversion optimization
- Solutions: High-contrast CTAs, trust colors
- Benefits: Data-backed color psychology

**Page 2:** `/guides/mobile-app-designer-colors`
- Pain points: Dark mode, accessibility on small screens
- Solutions: System color adaptation
- Benefits: iOS/Android color guidelines

**Page 3:** `/guides/ux-researcher-colors`
- Pain points: Color perception studies
- Solutions: User testing methodologies
- Benefits: Evidence-based color decisions

### Playbook 3: INTEGRATIONS (2 pages)

**Page 1:** `/integrations/figma`
- Setup: Figma plugin workflow
- Use cases: Design system sync, variable export
- Workflow: Colour Pine to Figma bridge

**Page 2:** `/integrations/tailwind-css`
- Setup: tailwind.config.js integration
- Use cases: Design token generation
- Workflow: Export to Tailwind theme

### Playbook 4: COMPARISONS (2 pages)

**Page 1:** `/compare/hex-vs-rgb-vs-hsl`
- Feature matrix: Readability, use cases, browser support
- Verdict: When to use each format
- Tools link: Color Converter

**Page 2:** `/compare/light-mode-vs-dark-mode-palettes`
- Feature matrix: Contrast ratios, color adjustments
- Use-case recommendations by industry
- Tools link: Contrast Checker

### Playbook 5: CURATION (2 pages)

**Page 1:** `/best/saas-dashboard-color-palettes-2026`
- Ranking criteria: Clarity, accessibility, modern aesthetics
- Top 10 with pros/cons
- Summary table

**Page 2:** `/best/e-commerce-color-palettes`
- Ranking criteria: Conversion optimization, trust signals
- Top 10 with industry analysis
- Summary table

### Playbook 6: GLOSSARY (5 entries)

**Create glossary system at `/glossary/[term]`:**
- `/glossary/color-theory` - Beginner explanation + technical depth
- `/glossary/wcag-contrast-ratio` - Accessibility standards
- `/glossary/complementary-colors` - Color wheel theory
- `/glossary/analogous-colors` - Harmony types
- `/glossary/color-psychology` - Emotional associations

---

## Phase 3: Routing & Navigation

### Task 3.1: Update App.tsx Routes
Add new routes for all playbook pages:

```typescript
// Templates (Personas with palettes)
<Route path="/palettes/:persona" element={<PersonaPalettePage />} />

// Personas (Guides)
<Route path="/guides/:persona" element={<PersonaGuidePage />} />

// Integrations
<Route path="/integrations/:tool" element={<IntegrationPage />} />

// Comparisons
<Route path="/compare/:slug" element={<ComparisonPage />} />

// Curation
<Route path="/best/:slug" element={<CurationPage />} />

// Glossary
<Route path="/glossary/:term" element={<GlossaryPage />} />
```

### Task 3.2: Update Sidebar Navigation
Add new "Resources" section with:
- Guides (personas)
- Integrations
- Glossary
- Best Of (curation)

---

## Phase 4: Quality & Validation System

### Task 4.1: Content Validation Utility
Create `src/utils/seoValidation.ts`:

```typescript
interface ValidationResult {
  isValid: boolean;
  wordCount: number;
  faqCount: number;
  internalLinkCount: number;
  hasSchema: boolean;
  errors: string[];
}
```

Validation rules:
- Minimum 900 words (informational) / 600 words (utility)
- Minimum 3 FAQs
- Minimum 5 internal links
- Required structured data
- Unique slug check
- No duplicate primary keywords

### Task 4.2: Sitemap Generation
Create `public/sitemap-seo.xml` with:
- All programmatic pages
- Priority based on page type
- Last modified dates

---

## Phase 5: Scaling Strategy (Future)

### Combinational Expansion Rules

**Safe combinations (implemented first):**
- Persona + Category (8 personas x 5 categories = 40 pages)
- Industry + Tool (12 industries x 6 tools = 72 pages)
- Integration + Format (4 integrations x 4 formats = 16 pages)

**Total Phase 2 potential:** ~130 unique pages

### Content Uniqueness Safeguards
- Each page must have unique H1
- Primary keyword cannot repeat across pages
- Minimum 40% unique content per page
- No thin pages under word count minimum

---

## Implementation Priority

| Priority | Playbook | Pages | Estimated LOC |
|----------|----------|-------|---------------|
| 1 | Templates | 3 | ~2,000 |
| 2 | Personas | 3 | ~2,500 |
| 3 | Integrations | 2 | ~1,400 |
| 4 | Comparisons | 2 | ~1,600 |
| 5 | Curation | 2 | ~1,800 |
| 6 | Glossary | 5 | ~2,000 |

**Total initial implementation:** 17 new SEO pages (~11,300 lines of code)

---

## Technical Specifications

### SEO Requirements Per Page
- Title: 50-60 characters with primary keyword
- Meta description: 150-160 characters
- H1: Unique, keyword-rich
- H2-H3: Semantic hierarchy
- Canonical URL: Absolute path
- Open Graph tags: Title, description, image
- JSON-LD: Article/FAQPage/HowTo schema

### Internal Linking Matrix
```text
Templates <-> Personas (same audience)
Integrations <-> Code Export tool
Comparisons <-> Tools page
Curation <-> Generator tool
Glossary <-> All pages (contextual)
```

### Performance Considerations
- Lazy load images
- Code split per route
- Static generation for glossary
- Memoize color calculations

---

## Files to Create/Modify

**New Files (17):**
1. `src/data/seo/dataset.ts`
2. `src/data/seo/playbooks.ts`
3. `src/components/seo/SEOPageLayout.tsx`
4. `src/components/seo/FAQSection.tsx`
5. `src/components/seo/InternalLinks.tsx`
6. `src/components/seo/ComparisonTable.tsx`
7. `src/pages/seo/FrontendDevColorPalettes.tsx`
8. `src/pages/seo/BrandDesignerColorPalettes.tsx`
9. `src/pages/seo/MarketingManagerColors.tsx`
10. `src/pages/seo/MobileAppDesignerColors.tsx`
11. `src/pages/seo/UXResearcherColors.tsx`
12. `src/pages/seo/FigmaIntegration.tsx`
13. `src/pages/seo/TailwindIntegration.tsx`
14. `src/pages/seo/HexVsRgbComparison.tsx`
15. `src/pages/seo/SaasDashboardPalettes.tsx`
16. `src/pages/seo/GlossaryColorTheory.tsx`
17. `src/utils/seoValidation.ts`

**Modified Files (2):**
1. `src/App.tsx` - Add new routes
2. `src/components/layout/Sidebar.tsx` - Add Resources section

---

## Success Metrics

1. Each page passes content validation (900+ words, 3+ FAQs)
2. Zero duplicate primary keywords
3. All pages have valid JSON-LD schema
4. Internal linking network complete (5+ links per page)
5. Mobile-responsive layouts
6. Core Web Vitals within limits
