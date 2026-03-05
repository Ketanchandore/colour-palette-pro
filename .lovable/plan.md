

## Plan: Complete SEO Optimization — All 35 Pages

### Current State
- **32 of 35 pages** have SEOHead (missing: Auth, Profile, Subscription)
- **Only 8 pages** have InternalLinks (need 27 more)
- **Footer** only links 16 pages (missing 19+ routes)
- **sitemap.xml** is accurate but needs `/palettes/ui-designer` verified
- **No page has FAQs** except the 3 SEO playbook pages
- Auth/Profile/Subscription/NotFound have no SEO tags at all

### Implementation

**1. Add SEOHead to remaining pages** (Auth, Profile, Subscription, NotFound — unique titles/descriptions each)

**2. Mega Footer with all pages** — Restructure Footer.tsx into 6 columns:
- Colors (6 links), AI Tools (6 links), Design Tools (6 links), 2026 Trends (4 links), Resources (4 links), Community (4 links)
- Total: 30+ internal links in footer visible on every page

**3. Add InternalLinks to all 27 remaining pages:**
- ImageColorExtractor, AIColorSuggestions, BrandColors, ColorBlindnessSimulator, UISimulator, URLBrandExtractor, AccessibilityDashboard, CodeExport, MoodAISearch, BrandArchitect, SocialMediaKit, AIConstraintGenerator, DataVizStudio, ProjectWorkspace, ColorSpaceConverter, LiveUIPreview, ContrastChecker, ColorExplorer, Leaderboard, Favorites, TrendsIndex, CloudDancer2026, Mermaidcore2026, ThermalGlow2026, ColorIndex, ColorPage, Profile
- Each gets 6 contextual links relevant to that page's topic

**4. Add FAQs to 10 high-value pages** (with JSON-LD schema):
- Generator, Trending, ContrastChecker, ColorExplorer, ImageColorExtractor, AIColorSuggestions, BrandArchitect, ColorSpaceConverter, Tools, ColorIndex
- 3-5 unique FAQs per page with humanized answers

**5. Verify sitemap.xml** matches exactly the routes in App.tsx (remove any non-existent, add any missing like `/palettes/ui-designer`)

**6. Update index.html noscript** to match footer structure

### Files to Modify
- `src/components/layout/Footer.tsx` — Complete rewrite with 6-column mega footer
- `src/pages/Auth.tsx` — Add SEOHead
- `src/pages/Profile.tsx` — Add SEOHead
- `src/pages/Subscription.tsx` — Add SEOHead
- `src/pages/NotFound.tsx` — Add SEOHead
- 27 page files — Add InternalLinks component
- 10 page files — Add FAQSection component
- `public/sitemap.xml` — Verify/fix routes
- `index.html` — Update noscript to match footer

### Key SEO Titles (unique per page)
| Page | Title |
|------|-------|
| / | Colour Pine — Free AI Color Palette Generator 2026 |
| /generator | Free Color Palette Generator — AI-Powered Schemes |
| /trending | Trending Color Palettes 2026 — Most Popular |
| /contrast-checker | WCAG Contrast Checker — Free Accessibility Tool |
| /image-extractor | Image Color Extractor — Pick Colors from Photos |
| /ai-suggestions | AI Color Suggestions — Smart Palette Generator |
| /brand-architect | AI Brand Architect — Complete Brand Identity |
| /color-explorer | Color Explorer — 50,000+ HEX Colors |
| /colors | Color Database — Browse All Named Colors |
| /blindness-simulator | Color Blindness Simulator — Protanopia Test |
| /code-export | Color Code Export — CSS, Tailwind, Flutter |
| /mood-search | Mood Color Search — Find Colors by Feeling |
| /color-space-converter | Color Space Converter — HEX RGB HSL CMYK |
| /data-viz-studio | Data Viz Color Studio — Chart Palettes |
| /social-kit | Social Media Color Kit — Brand Graphics |
| /live-preview | Live UI Color Preview — Test on Mockups |
| /ui-simulator | UI Color Simulator — Dashboard Preview |
| /url-extractor | URL Brand Extractor — Website Color Picker |
| /accessibility | Accessibility Dashboard — WCAG Analysis |
| /brand-colors | Brand Color Codes — 50+ Famous Brands |
| /trends | 2026 Color Trends — Cloud Dancer & More |
| /trends/cloud-dancer-2026 | Cloud Dancer 2026 — Pantone Color of Year |
| /trends/mermaidcore-2026 | Mermaidcore 2026 — Ocean Aesthetic Palette |
| /trends/thermal-glow-2026 | Thermal Glow 2026 — Infrared Heat Palette |
| /auth | Sign In — Colour Pine |
| /profile | My Profile — Colour Pine |
| /subscription | Plans & Pricing — Colour Pine |

### No UI/UX Changes
- Footer gets more links but same dark style
- InternalLinks appear at page bottom (existing pattern)
- FAQs use existing accordion component
- All existing functionality unchanged

