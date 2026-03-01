

## Plan: SEO Content Engine + Homepage Fix + Google Indexability

### Problem Analysis
1. **Featured Palettes not loading**: Database has 10 featured palettes. Console shows "Failed to fetch" errors from auth token refresh (network issue). The palette query itself works. Will add fallback static palettes so content always shows.
2. **Google can't see JS-rendered content**: React SPA renders via JavaScript. Google does render JS but delays indexing. Solution: Add static fallback content visible on first paint, structured data in `index.html`, and comprehensive `sitemap.xml`.
3. **No internal linking**: Pages exist in isolation with no cross-linking.
4. **No SEO content engine**: Need dataset, playbook configs, and reusable components.

### Implementation Steps

**Step 1: Fix Homepage Featured Palettes**
- Add hardcoded fallback palettes in `Index.tsx` so if Supabase fetch fails, static palettes still render (Google sees content immediately)
- Show fallback data instead of empty grid when fetch fails

**Step 2: Create SEO Data Infrastructure**
- Create `src/data/seo/dataset.ts` with master lists: personas (8), industries (12), tools (6), integrations (4), formats (4)
- Create `src/data/seo/playbooks.ts` with playbook type configs, URL patterns, word count minimums, schema types

**Step 3: Create Reusable SEO Components**
- `src/components/seo/FAQSection.tsx` - Accordion with FAQ JSON-LD schema auto-injection
- `src/components/seo/InternalLinks.tsx` - Related pages footer with parent/sibling/cross-playbook links
- `src/components/seo/SEOPageLayout.tsx` - Shared wrapper: MainLayout + SEOHead + breadcrumbs + InternalLinks

**Step 4: Add Internal Linking to All Existing Pages**
- Add `InternalLinks` component to bottom of every major page (Generator, Trending, Collections, Tools, ColorExplorer, all trend pages)
- Each page gets 5+ contextual internal links

**Step 5: Create Initial SEO Pages (3 new pages)**
- `/palettes/frontend-developer` - Frontend Dev Color Palettes (Templates playbook)
- `/compare/hex-vs-rgb-vs-hsl` - HEX vs RGB vs HSL Comparison (Comparisons playbook)
- `/glossary/color-theory` - Color Theory glossary entry (Glossary playbook)
- Each page: 900+ words, 3+ FAQs, 5+ internal links, JSON-LD schema

**Step 6: Google Indexability Improvements**
- Update `index.html` with proper meta tags (title, description, keywords for Colour Pine)
- Create `public/sitemap.xml` with all 30+ static routes
- Create `public/robots.txt` update to reference sitemap
- Add structured data (Organization, WebSite, SearchAction) to `index.html`
- Add `<noscript>` fallback content in `index.html` for crawlers

**Step 7: Update Sidebar with Resources Section**
- Add "Resources" section to sidebar with links to SEO pages (Guides, Glossary, Comparisons)

**Step 8: Update App.tsx Routes**
- Add routes for new SEO pages: `/palettes/frontend-developer`, `/compare/hex-vs-rgb-vs-hsl`, `/glossary/color-theory`

### Files to Create
1. `src/data/seo/dataset.ts`
2. `src/data/seo/playbooks.ts`
3. `src/components/seo/FAQSection.tsx`
4. `src/components/seo/InternalLinks.tsx`
5. `src/components/seo/SEOPageLayout.tsx`
6. `src/pages/seo/FrontendDevColorPalettes.tsx`
7. `src/pages/seo/HexVsRgbComparison.tsx`
8. `src/pages/seo/GlossaryColorTheory.tsx`
9. `public/sitemap.xml`

### Files to Modify
1. `src/pages/Index.tsx` - Add fallback palettes, SEOHead, internal links
2. `src/components/layout/Sidebar.tsx` - Add Resources section
3. `src/App.tsx` - Add new routes
4. `index.html` - Update meta tags, add structured data, add noscript content
5. `public/robots.txt` - Add sitemap reference
6. Multiple existing pages - Add InternalLinks component to bottom

### Technical Note
- Cannot do server-side rendering (SSR) in Lovable (React SPA only)
- Google does render JavaScript pages but with a delay (days to weeks)
- Mitigation: Static fallback content, proper structured data, comprehensive sitemap, noscript tags
- All UI/UX remains unchanged per project constraints

