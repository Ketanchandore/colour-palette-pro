import { Link } from "react-router-dom";
import { FAQSection } from "@/components/seo/FAQSection";

const howItWorks = [
  { step: "1", title: "Choose a Tool", desc: "Pick from 25+ free color tools — palette generator, contrast checker, AI brand architect, and more." },
  { step: "2", title: "Generate or Explore", desc: "Create custom palettes with AI, extract colors from images, or browse 50,000+ named colors." },
  { step: "3", title: "Test & Validate", desc: "Check WCAG contrast ratios, simulate color blindness, and preview on real UI mockups." },
  { step: "4", title: "Export & Use", desc: "Export as CSS, Tailwind, SCSS, Swift, or Flutter. Copy HEX codes instantly." },
];

const testimonials = [
  { name: "Sarah K.", role: "UI Designer", text: "Colour Pine replaced 5 different color tools for me. The contrast checker and live UI preview are incredible." },
  { name: "James R.", role: "Frontend Developer", text: "The Tailwind export and code-ready palettes save me hours every week. Best free color tool online." },
  { name: "Maria L.", role: "Brand Designer", text: "The AI Brand Architect generated a complete brand identity in seconds. Absolutely game-changing." },
  { name: "Alex T.", role: "Product Manager", text: "Our entire team uses Colour Pine for accessibility compliance. The WCAG dashboard is a must-have." },
];

const homepageFAQs = [
  { question: "Is Colour Pine free to use?", answer: "Yes! Colour Pine offers 25+ professional color tools completely free, including the AI palette generator, WCAG contrast checker, color blindness simulator, and 50,000+ color database. Premium features are available for power users." },
  { question: "What is the best color palette generator in 2026?", answer: "Colour Pine is the most advanced free color palette generator in 2026, featuring AI-powered suggestions, 7 harmony modes (complementary, analogous, triadic, split-complementary, tetradic, monochromatic, and custom), WCAG accessibility validation, and instant export to CSS, Tailwind, SCSS, Swift, and Flutter." },
  { question: "How do I check color contrast for WCAG compliance?", answer: "Use Colour Pine's free WCAG Contrast Checker at /contrast-checker. Enter any two colors to instantly validate AA and AAA contrast ratios for normal text, large text, and UI components. The Accessibility Dashboard provides a complete WCAG compliance report for your entire palette." },
  { question: "Can I extract colors from an image or website?", answer: "Yes! The Image Color Extractor analyzes any uploaded photo to identify dominant, vibrant, and muted colors. The URL Brand Extractor pulls the complete color palette from any live website URL — perfect for competitive analysis and brand research." },
  { question: "What color formats does Colour Pine support?", answer: "Colour Pine supports HEX, RGB, HSL, CMYK, LAB, and Tailwind CSS color formats. The Color Space Converter lets you convert between all formats instantly. Code Export generates production-ready CSS custom properties, Tailwind config, SCSS variables, Swift UIColor, and Flutter Color objects." },
  { question: "What are the 2026 color trends?", answer: "The top 2026 color trends include Cloud Dancer (Pantone's Color of the Year 2026 — a warm off-white), Mermaidcore (iridescent aqua and pearl tones), and Thermal Glow (infrared heat-map inspired gradients). Explore all 2026 trend palettes on Colour Pine's Trends page." },
  { question: "How does the AI Brand Architect work?", answer: "The AI Brand Architect uses artificial intelligence to generate a complete brand identity from a single text prompt. It creates primary, secondary, and accent color palettes, suggests typography pairings, and provides usage guidelines — all optimized for accessibility and visual harmony." },
  { question: "Can I use Colour Pine for Tailwind CSS projects?", answer: "Absolutely! Colour Pine generates Tailwind-ready color tokens, including custom color config objects, CSS custom properties mapped to Tailwind classes, and shade scales (50-950) for any color. The Frontend Developer Palettes page offers production-ready Tailwind themes." },
];

const useCases = [
  { title: "Web Designers", desc: "Generate accessible color palettes, preview on real UI mockups, and export CSS variables in seconds.", link: "/palettes/ui-designer" },
  { title: "Frontend Developers", desc: "Get production-ready Tailwind configs, CSS custom properties, and React theme tokens.", link: "/palettes/frontend-developer" },
  { title: "Brand Designers", desc: "Build complete brand identities with AI, extract competitor colors, and create social media kits.", link: "/brand-architect" },
  { title: "Product Managers", desc: "Ensure WCAG compliance with contrast checkers, accessibility dashboards, and color blindness simulators.", link: "/accessibility" },
  { title: "Marketing Teams", desc: "Create on-brand social graphics, explore trending palettes, and maintain color consistency.", link: "/social-kit" },
  { title: "Students & Educators", desc: "Learn color theory fundamentals, explore the color wheel, and understand harmony types.", link: "/glossary/color-theory" },
];

export function HomepageSEO() {
  return (
    <div className="space-y-16">
      {/* How It Works */}
      <section>
        <h2 className="text-3xl font-display font-bold text-foreground text-center mb-8">
          How Colour Pine Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step) => (
            <div key={step.step} className="relative rounded-xl border border-border bg-card p-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mb-4 text-lg">
                {step.step}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who It's For */}
      <section>
        <h2 className="text-3xl font-display font-bold text-foreground text-center mb-3">
          Built for Every Creative Professional
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
          Whether you're a designer, developer, or marketer — Colour Pine has the tools you need
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((uc) => (
            <Link
              key={uc.title}
              to={uc.link}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-glow-sm transition-all"
            >
              <h3 className="font-semibold text-foreground mb-2">{uc.title}</h3>
              <p className="text-sm text-muted-foreground">{uc.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section>
        <h2 className="text-3xl font-display font-bold text-foreground text-center mb-8">
          Loved by Designers & Developers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-6">
              <p className="text-muted-foreground text-sm italic mb-4">"{t.text}"</p>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={homepageFAQs} title="Frequently Asked Questions" />

      {/* Bottom CTA */}
      <section className="text-center rounded-2xl bg-gradient-to-br from-primary/10 via-card to-secondary/10 border border-border p-10">
        <h2 className="text-3xl font-display font-bold text-foreground mb-3">
          Start Creating Beautiful Color Palettes Today
        </h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Join thousands of designers and developers using Colour Pine — the world's most advanced free color platform.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/generator" className="inline-flex items-center px-6 py-3 rounded-lg gradient-primary text-white font-medium hover:opacity-90 transition-opacity shadow-glow-md">
            Start Generating — It's Free
          </Link>
          <Link to="/colors" className="inline-flex items-center px-6 py-3 rounded-lg border border-border bg-card text-foreground font-medium hover:border-primary/30 transition-colors">
            Explore 50,000+ Colors
          </Link>
        </div>
      </section>
    </div>
  );
}
