import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { FAQSection } from "@/components/seo/FAQSection";
import { PaletteCard } from "@/components/palette/PaletteCard";
import { getRelatedPages } from "@/data/seo/dataset";

const palettes = [
  { id: "fd-1", name: "React Ocean", colors: ["#61DAFB", "#282C34", "#20232A", "#FFFFFF", "#88D8F5"], likes: 2847 },
  { id: "fd-2", name: "Vue Emerald", colors: ["#42B883", "#35495E", "#2C3E50", "#3EAF7C", "#F5F5F5"], likes: 2134 },
  { id: "fd-3", name: "Tailwind Sky", colors: ["#38BDF8", "#0EA5E9", "#0284C7", "#F0F9FF", "#1E293B"], likes: 3621 },
  { id: "fd-4", name: "Dark Mode Pro", colors: ["#1A1A2E", "#16213E", "#0F3460", "#E94560", "#EEEEEE"], likes: 4210 },
  { id: "fd-5", name: "Minimal Grayscale", colors: ["#111827", "#374151", "#6B7280", "#D1D5DB", "#F9FAFB"], likes: 1856 },
  { id: "fd-6", name: "Gradient Sunset", colors: ["#FF6B6B", "#FFA07A", "#FFD93D", "#6BCB77", "#4D96FF"], likes: 2943 },
];

const faqs = [
  {
    question: "What is the best color palette for a React dashboard?",
    answer: "For React dashboards, use a primary blue (#3B82F6) for actions, neutral grays (#1F2937, #6B7280, #F3F4F6) for structure, and a contrasting accent like green (#10B981) for success states. This follows Material Design principles while maintaining WCAG AA contrast ratios. The React Ocean and Dark Mode Pro palettes above are excellent starting points for professional dashboard interfaces."
  },
  {
    question: "How do I implement CSS color tokens in a React project?",
    answer: "Define CSS custom properties in your root stylesheet: :root { --color-primary: #3B82F6; --color-bg: #FFFFFF; }. In React components, reference them via className with Tailwind (text-primary) or inline styles (var(--color-primary)). For TypeScript projects, create a theme.ts file exporting your tokens as constants. Use Colour Pine's Code Export tool to generate production-ready token files for CSS Variables, Tailwind, and SCSS formats."
  },
  {
    question: "How many colors should a frontend color palette have?",
    answer: "A production-ready frontend palette typically needs 5-8 core colors: 1 primary brand color, 1-2 secondary/accent colors, 3-4 neutral grays (for text, borders, backgrounds), and 3 semantic colors (success green, warning yellow, error red). Each color should have 9-10 shade variations (50-950) for flexibility. This gives you roughly 50-80 total color values in your design token system."
  },
  {
    question: "What's the difference between design tokens and CSS variables?",
    answer: "Design tokens are platform-agnostic design decisions (e.g., 'color-primary = #3B82F6') that can be transformed into any format—CSS variables, Tailwind config, iOS/Android values. CSS variables (custom properties) are one implementation of design tokens specific to web. Think of tokens as the source of truth and CSS variables as the web output. Tools like Style Dictionary can convert tokens to multiple platforms automatically."
  },
  {
    question: "How do I create a dark mode color palette for my web app?",
    answer: "Start by inverting your lightness scale: swap light backgrounds (#FFFFFF → #1A1A2E) and dark text (#111827 → #E5E7EB). Don't simply invert colors—reduce saturation by 10-20% for dark backgrounds to avoid eye strain. Use elevated surfaces (slightly lighter darks) for cards and modals. Keep your primary brand color but adjust its brightness. Test contrast ratios (minimum 4.5:1 for text). The Dark Mode Pro palette above demonstrates these principles perfectly."
  }
];

export default function FrontendDevColorPalettes() {
  const internalLinks = getRelatedPages("/palettes/frontend-developer", "templates");

  return (
    <SEOPageLayout
      title="Frontend Developer Color Palettes 2026 — CSS Tokens & React Themes | Colour Pine"
      description="Production-ready color palettes for frontend developers. Copy-paste CSS variables, Tailwind config, and React theme tokens. Dark mode, accessibility-first design systems."
      keywords="frontend developer color palette, css color tokens, react color theme, tailwind color scheme, dark mode palette, web developer colors, design tokens"
      canonicalUrl="https://colourpine.com/palettes/frontend-developer"
      breadcrumbs={[
        { label: "Palettes", path: "/trending" },
        { label: "Frontend Developer" },
      ]}
      internalLinks={internalLinks}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Frontend Developer Color Palettes 2026 — CSS Tokens & React Themes",
        description: "Production-ready color palettes for frontend developers with CSS variables, Tailwind config, and React theme tokens.",
        author: { "@type": "Organization", name: "Colour Pine" },
        publisher: { "@type": "Organization", name: "Colour Pine", url: "https://colourpine.com" },
        datePublished: "2025-01-15",
        dateModified: "2026-03-01",
      }}
    >
      {/* H1 */}
      <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
        Frontend Developer Color Palettes — Production-Ready CSS Tokens & React Themes
      </h1>

      {/* Introduction */}
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        Building a web application? Your color palette isn't just about aesthetics—it's architecture. 
        Every CSS variable, every Tailwind class, every design token shapes how users experience your product. 
        These palettes are battle-tested across React, Vue, and Angular projects, with proper contrast ratios, 
        dark mode variants, and semantic naming conventions built in. Click any color to copy its HEX code, 
        then use our <a href="/code-export" className="text-primary hover:underline">Code Export tool</a> to 
        generate your complete token file.
      </p>

      {/* Palette Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">
          Curated Palettes for Web Development
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {palettes.map((palette) => (
            <PaletteCard
              key={palette.id}
              id={palette.id}
              name={palette.name}
              colors={palette.colors}
              likes={palette.likes}
            />
          ))}
        </div>
      </section>

      {/* CSS Variables Guide */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          How to Use These Palettes in Your Code
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Every palette above is designed to drop directly into your project. Here's how to implement 
          the "Dark Mode Pro" palette using three popular approaches:
        </p>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">CSS Custom Properties</h3>
            <pre className="bg-muted/50 rounded-lg p-4 text-sm overflow-x-auto text-foreground">
              <code>{`:root {
  --color-bg-primary: #1A1A2E;
  --color-bg-secondary: #16213E;
  --color-accent: #0F3460;
  --color-cta: #E94560;
  --color-text: #EEEEEE;
}`}</code>
            </pre>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Tailwind CSS Config</h3>
            <pre className="bg-muted/50 rounded-lg p-4 text-sm overflow-x-auto text-foreground">
              <code>{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        surface: { DEFAULT: '#1A1A2E', secondary: '#16213E' },
        accent: '#0F3460',
        cta: '#E94560',
      }
    }
  }
}`}</code>
            </pre>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">React Theme Object</h3>
            <pre className="bg-muted/50 rounded-lg p-4 text-sm overflow-x-auto text-foreground">
              <code>{`const theme = {
  colors: {
    background: { primary: '#1A1A2E', secondary: '#16213E' },
    accent: '#0F3460',
    cta: '#E94560',
    text: { primary: '#EEEEEE', secondary: '#B0B0B0' },
  }
};`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Design Token Naming */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          Design Token Naming Conventions for Developers
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          The difference between a maintainable codebase and color chaos? Naming conventions. 
          Use semantic names (--color-cta, --color-surface) instead of descriptive names (--color-red, --color-dark-blue). 
          This lets you swap entire themes without touching component code. Here's the industry-standard approach 
          used by Stripe, GitHub, and Vercel:
        </p>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-4 font-semibold text-foreground">Token Name</th>
                <th className="text-left p-4 font-semibold text-foreground">Purpose</th>
                <th className="text-left p-4 font-semibold text-foreground">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-4 font-mono text-primary">--color-bg-primary</td>
                <td className="p-4 text-muted-foreground">Main page background</td>
                <td className="p-4"><span className="inline-block w-4 h-4 rounded" style={{backgroundColor: '#1A1A2E'}} /> #1A1A2E</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 font-mono text-primary">--color-bg-elevated</td>
                <td className="p-4 text-muted-foreground">Cards, modals, dropdowns</td>
                <td className="p-4"><span className="inline-block w-4 h-4 rounded" style={{backgroundColor: '#16213E'}} /> #16213E</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 font-mono text-primary">--color-text-primary</td>
                <td className="p-4 text-muted-foreground">Main body text</td>
                <td className="p-4"><span className="inline-block w-4 h-4 rounded border" style={{backgroundColor: '#EEEEEE'}} /> #EEEEEE</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 font-mono text-primary">--color-interactive</td>
                <td className="p-4 text-muted-foreground">Buttons, links, focus rings</td>
                <td className="p-4"><span className="inline-block w-4 h-4 rounded" style={{backgroundColor: '#E94560'}} /> #E94560</td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-primary">--color-border</td>
                <td className="p-4 text-muted-foreground">Dividers, input borders</td>
                <td className="p-4"><span className="inline-block w-4 h-4 rounded" style={{backgroundColor: '#0F3460'}} /> #0F3460</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Dark Mode Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          Dark Mode Implementation Guide
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Dark mode isn't inverting colors—it's a complete re-thinking of your visual hierarchy. 
          In dark themes, elevation is communicated through lighter surfaces (not shadows). 
          Your primary brand color needs brightness adjustment (increase lightness by 10-15% in HSL). 
          Text on dark backgrounds should never be pure white (#FFFFFF)—use #E5E7EB or #F3F4F6 
          to reduce eye strain. The "Dark Mode Pro" palette above demonstrates all these principles.
        </p>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Dark Mode Checklist for Developers</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Background surface colors: Use 3+ elevation levels (#0D1117 → #161B22 → #21262D)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Text colors: Primary (#E6EDF3), Secondary (#8B949E), Disabled (#484F58)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Contrast ratio: Minimum 4.5:1 for body text (WCAG AA)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Saturated colors: Reduce saturation 10-20% on dark backgrounds</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>System preference: Use prefers-color-scheme media query as default</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          Accessibility-First Color Selection
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Every palette on this page meets WCAG 2.1 AA standards for contrast ratios. 
          But accessibility goes beyond contrast. Consider color blindness (8% of males are affected)—never 
          use red/green as the only differentiator. Use our{" "}
          <a href="/blindness-simulator" className="text-primary hover:underline">Color Blindness Simulator</a>{" "}
          to validate your palette, and the{" "}
          <a href="/contrast-checker" className="text-primary hover:underline">Contrast Checker</a>{" "}
          to verify every text/background combination. For data visualizations, use our{" "}
          <a href="/data-viz-studio" className="text-primary hover:underline">Data Viz Studio</a>{" "}
          which generates colorblind-safe chart palettes.
        </p>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
    </SEOPageLayout>
  );
}
