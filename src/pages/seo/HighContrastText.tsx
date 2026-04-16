import { SEOHead } from "@/components/seo/SEOHead";
import { FAQSection } from "@/components/seo/FAQSection";
import { InternalLinks } from "@/components/seo/InternalLinks";
import { MainLayout } from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Check, X } from "lucide-react";

const contrastPairs = [
  { bg: "#FFFFFF", fg: "#000000", ratio: 21, label: "Black on White", wcagAA: true, wcagAAA: true },
  { bg: "#1A1A2E", fg: "#EAEAEA", ratio: 15.4, label: "Light Gray on Dark Navy", wcagAA: true, wcagAAA: true },
  { bg: "#0F172A", fg: "#F8FAFC", ratio: 18.1, label: "White on Slate 900", wcagAA: true, wcagAAA: true },
  { bg: "#FFFFFF", fg: "#DC2626", ratio: 4.63, label: "Red on White", wcagAA: true, wcagAAA: false },
  { bg: "#1E3A5F", fg: "#FFD700", ratio: 8.2, label: "Gold on Navy", wcagAA: true, wcagAAA: true },
  { bg: "#FFFFFF", fg: "#2563EB", ratio: 4.68, label: "Blue on White", wcagAA: true, wcagAAA: false },
  { bg: "#000000", fg: "#00FF00", ratio: 15.3, label: "Green on Black (Matrix)", wcagAA: true, wcagAAA: true },
  { bg: "#FEF3C7", fg: "#92400E", ratio: 6.8, label: "Brown on Yellow", wcagAA: true, wcagAAA: true },
];

const faqs = [
  { question: "What is high contrast text?", answer: "High contrast text has a large difference in luminance between the text color and background color. WCAG 2.1 requires a minimum contrast ratio of 4.5:1 for normal text (AA) and 7:1 for enhanced readability (AAA). Higher contrast means better readability for all users." },
  { question: "What is a black and white checker for contrast?", answer: "A black and white contrast checker tests the contrast ratio between any two colors (not just black and white). It validates whether your color combination meets WCAG AA or AAA accessibility standards. Colour Pine's Contrast Checker supports any foreground/background color pair." },
  { question: "What is the minimum WCAG contrast ratio?", answer: "WCAG 2.1 Level AA requires 4.5:1 for normal text and 3:1 for large text (18pt+). Level AAA requires 7:1 for normal text and 4.5:1 for large text. UI components and graphical objects need at least 3:1 contrast." },
  { question: "How do I test color contrast?", answer: "Use Colour Pine's free Contrast Checker at /contrast-checker. Enter any foreground and background colors to instantly see the contrast ratio and WCAG compliance for AA and AAA levels." },
  { question: "What is the best high contrast color combination?", answer: "Black text on white background (#000000 on #FFFFFF) has the maximum contrast ratio of 21:1. Other excellent high-contrast pairs include white on dark navy (18:1), green on black (15:1), and dark brown on pale yellow (6.8:1)." },
];

const internalLinks = [
  { label: "Contrast Checker Tool", path: "/contrast-checker", description: "Test any color pair for WCAG compliance" },
  { label: "Accessibility Dashboard", path: "/accessibility", description: "Full WCAG compliance report for your palette" },
  { label: "Color Blindness Simulator", path: "/blindness-simulator", description: "Test how colors appear to colorblind users" },
  { label: "Code Export", path: "/code-export", description: "Export accessible palettes as CSS/Tailwind" },
  { label: "What Colors Go With Red", path: "/guides/what-colors-go-with-red", description: "Expert red color combinations" },
  { label: "Canvas Color Codes", path: "/guides/canvas-color-codes", description: "HTML5 Canvas color reference" },
];

export default function HighContrastText() {
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [fgColor, setFgColor] = useState("#000000");

  return (
    <MainLayout>
      <SEOHead
        title="High Contrast Text Guide — WCAG Color Contrast Checker [2026]"
        description="Learn about high contrast text for accessibility. Free black and white checker, WCAG contrast ratios, and 8 pre-tested high contrast color combinations with codes."
        keywords="high contrast text, black and white checker, high contrast coloring, contrast low, value and contrast, testing colors, WCAG contrast checker"
        canonicalUrl="/guides/high-contrast-text"
        structuredData={{ "@context": "https://schema.org", "@type": "Article", headline: "High Contrast Text Guide — WCAG Color Contrast", author: { "@type": "Organization", name: "Colour Pine" } }}
      />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/tools" className="hover:text-foreground">Tools</Link> / <span className="text-foreground">High Contrast Text</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">High Contrast Text — Accessibility Guide</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          <strong>High contrast text</strong> is essential for web accessibility. This guide covers WCAG contrast requirements, pre-tested color pairs, and how to check your designs with a <strong>black and white checker</strong>.
        </p>

        {/* Live Preview */}
        <section className="mb-12">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Live Contrast Preview</h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <label className="flex items-center gap-2 text-sm text-foreground">
              Background: <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded border-0 cursor-pointer" />
              <span className="font-mono text-xs text-muted-foreground">{bgColor}</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              Text: <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded border-0 cursor-pointer" />
              <span className="font-mono text-xs text-muted-foreground">{fgColor}</span>
            </label>
          </div>
          <div className="rounded-xl border border-border p-8 text-center" style={{ backgroundColor: bgColor, color: fgColor }}>
            <p className="text-2xl font-bold mb-2">The quick brown fox jumps over the lazy dog</p>
            <p className="text-sm">This is how your text will look with these colors.</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">For precise contrast ratio measurement, use our <Link to="/contrast-checker" className="text-primary hover:underline">Contrast Checker tool</Link>.</p>
        </section>

        {/* Pre-tested pairs */}
        <section className="mb-12">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">8 Pre-Tested High Contrast Color Pairs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contrastPairs.map((pair) => (
              <div key={pair.label} className="rounded-xl border border-border overflow-hidden">
                <div className="p-6" style={{ backgroundColor: pair.bg, color: pair.fg }}>
                  <p className="font-bold text-lg">{pair.label}</p>
                  <p className="text-sm opacity-80">Sample body text for readability.</p>
                </div>
                <div className="p-3 bg-card flex items-center gap-3 text-sm">
                  <span className="font-mono text-muted-foreground">{pair.ratio}:1</span>
                  <span className="flex items-center gap-1">{pair.wcagAA ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />} AA</span>
                  <span className="flex items-center gap-1">{pair.wcagAAA ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />} AAA</span>
                  <span className="font-mono text-xs text-muted-foreground ml-auto">{pair.bg} / {pair.fg}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FAQSection faqs={faqs} title="High Contrast Text FAQ" />
        <InternalLinks links={internalLinks} />
      </div>
    </MainLayout>
  );
}
