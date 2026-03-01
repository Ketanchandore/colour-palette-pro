import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { FAQSection } from "@/components/seo/FAQSection";
import { Link } from "react-router-dom";
import { getRelatedPages } from "@/data/seo/dataset";

const faqs = [
  {
    question: "What is color theory in simple terms?",
    answer: "Color theory is the science and art of using colors effectively. It explains how colors relate to each other on the color wheel, why certain combinations look harmonious while others clash, and how colors affect human emotions and perceptions. At its core, color theory gives designers and artists a framework for choosing colors that work well together—based on principles like complementary colors (opposites attract), analogous colors (neighbors blend), and triadic colors (even spacing creates balance)."
  },
  {
    question: "What are the 3 basic principles of color theory?",
    answer: "The three foundational principles are: (1) The Color Wheel — a circular arrangement of 12 colors showing their relationships. Primary colors (red, blue, yellow) combine to create secondary colors (orange, green, purple), which combine to create tertiary colors. (2) Color Harmony — the rules for combining colors pleasingly: complementary (opposite on wheel), analogous (adjacent), triadic (equidistant), and split-complementary. (3) Color Context — how colors behave differently based on surrounding colors, lighting, and cultural associations."
  },
  {
    question: "How do I apply color theory to web design?",
    answer: "Start with the 60-30-10 rule: 60% dominant color (backgrounds, large surfaces), 30% secondary color (navigation, sidebars, cards), 10% accent color (CTAs, links, highlights). Choose your dominant using the color wheel harmony rules. Then validate contrast ratios for accessibility (WCAG 2.1 requires 4.5:1 for text). Use Colour Pine's Palette Generator to create harmonious schemes automatically, and the Contrast Checker to validate accessibility compliance."
  },
  {
    question: "What is the difference between warm and cool colors?",
    answer: "Warm colors (red, orange, yellow — hues 0-60° and 300-360° on the HSL wheel) evoke energy, passion, and urgency. They appear to advance toward the viewer. Cool colors (blue, green, purple — hues 120-270°) evoke calm, trust, and professionalism. They appear to recede. In web design, warm accents on cool backgrounds create visual hierarchy. E-commerce sites use warm colors for CTAs (Buy Now buttons) against cool, trustworthy blue backgrounds."
  },
  {
    question: "Why is color theory important for UI/UX design?",
    answer: "Color theory directly impacts usability, conversion rates, and brand perception. Studies show that color increases brand recognition by up to 80%. The right color palette guides users through visual hierarchy (what to look at first), communicates meaning through semantic colors (red = error, green = success), ensures accessibility for the 300+ million color-blind users worldwide, and builds emotional connections with your brand. Ignoring color theory leads to confusing interfaces, poor accessibility, and lost conversions."
  }
];

export default function GlossaryColorTheory() {
  const internalLinks = getRelatedPages("/glossary/color-theory", "glossary");

  return (
    <SEOPageLayout
      title="Color Theory — Complete Guide for Designers & Developers 2026 | Colour Pine"
      description="Master color theory fundamentals: the color wheel, harmony rules, psychology, and practical application in web design. Beginner-friendly with expert-level depth."
      keywords="color theory, color wheel, color harmony, complementary colors, analogous colors, color psychology, design color theory, web design colors"
      canonicalUrl="https://colourpine.com/glossary/color-theory"
      breadcrumbs={[
        { label: "Glossary", path: "/tools" },
        { label: "Color Theory" },
      ]}
      internalLinks={internalLinks}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: "Color Theory",
        description: "The science and art of using colors effectively, encompassing the color wheel, harmony rules, and color psychology.",
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Colour Pine Color Glossary",
          url: "https://colourpine.com/glossary"
        }
      }}
    >
      <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
        Color Theory — The Complete Guide for Designers & Developers
      </h1>

      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        Color theory is the foundation of every great design. Whether you're building a SaaS dashboard, 
        designing a brand identity, or choosing paint for your living room—the same principles apply. This guide 
        covers everything from beginner fundamentals to advanced techniques used by professional designers at 
        companies like Apple, Stripe, and Spotify.
      </p>

      {/* Beginner Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          What is Color Theory? (Beginner's Guide)
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Imagine you're mixing paint. Red and blue make purple. Yellow and blue make green. 
          Color theory formalizes these relationships into a system anyone can use. At its heart is the 
          <strong className="text-foreground"> color wheel</strong>—a circular diagram invented by Sir Isaac Newton in 1666 
          that arranges colors by their chromatic relationship.
        </p>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          The wheel has three tiers: <strong className="text-foreground">primary colors</strong> (red, blue, yellow—can't be 
          created by mixing), <strong className="text-foreground">secondary colors</strong> (orange, green, purple—created by 
          mixing two primaries), and <strong className="text-foreground">tertiary colors</strong> (red-orange, blue-green, etc.—
          created by mixing a primary with an adjacent secondary).
        </p>

        {/* Visual Color Wheel */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">The 12-Color Wheel</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { color: "#FF0000", name: "Red", type: "Primary" },
              { color: "#FF7700", name: "Red-Orange", type: "Tertiary" },
              { color: "#FFAA00", name: "Orange", type: "Secondary" },
              { color: "#FFD700", name: "Yellow-Orange", type: "Tertiary" },
              { color: "#FFFF00", name: "Yellow", type: "Primary" },
              { color: "#AAFF00", name: "Yellow-Green", type: "Tertiary" },
              { color: "#00FF00", name: "Green", type: "Secondary" },
              { color: "#00FFAA", name: "Blue-Green", type: "Tertiary" },
              { color: "#0000FF", name: "Blue", type: "Primary" },
              { color: "#7700FF", name: "Blue-Purple", type: "Tertiary" },
              { color: "#AA00FF", name: "Purple", type: "Secondary" },
              { color: "#FF00AA", name: "Red-Purple", type: "Tertiary" },
            ].map(c => (
              <div key={c.name} className="text-center">
                <div className="w-14 h-14 rounded-full border-2 border-border mx-auto mb-1" style={{backgroundColor: c.color}} />
                <p className="text-xs text-muted-foreground">{c.name}</p>
                <p className="text-[10px] text-muted-foreground/60">{c.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Harmony */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          Color Harmony — Rules for Beautiful Combinations
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Color harmony is why some color combinations feel "right" and others feel jarring. 
          These aren't subjective—they're based on mathematical relationships on the color wheel. 
          Here are the five fundamental harmony types every designer should know:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Complementary</h3>
            <div className="flex gap-2 mb-3">
              <div className="w-12 h-12 rounded-lg" style={{backgroundColor: '#3B82F6'}} />
              <div className="w-12 h-12 rounded-lg" style={{backgroundColor: '#F69B3B'}} />
            </div>
            <p className="text-sm text-muted-foreground">
              Colors directly opposite on the wheel. Maximum contrast and visual impact. 
              Use for CTAs against backgrounds. Example: Blue buttons on orange accents.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Analogous</h3>
            <div className="flex gap-2 mb-3">
              <div className="w-12 h-12 rounded-lg" style={{backgroundColor: '#3B82F6'}} />
              <div className="w-12 h-12 rounded-lg" style={{backgroundColor: '#6366F1'}} />
              <div className="w-12 h-12 rounded-lg" style={{backgroundColor: '#8B5CF6'}} />
            </div>
            <p className="text-sm text-muted-foreground">
              Three adjacent colors on the wheel. Creates serene, comfortable designs. 
              Nature uses this pattern extensively. Ideal for gradient-heavy interfaces.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Triadic</h3>
            <div className="flex gap-2 mb-3">
              <div className="w-12 h-12 rounded-lg" style={{backgroundColor: '#EF4444'}} />
              <div className="w-12 h-12 rounded-lg" style={{backgroundColor: '#3B82F6'}} />
              <div className="w-12 h-12 rounded-lg" style={{backgroundColor: '#22C55E'}} />
            </div>
            <p className="text-sm text-muted-foreground">
              Three colors evenly spaced (120° apart). Vibrant and balanced. 
              Use one dominant, two as accents. Google's brand colors use this approach.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Split-Complementary</h3>
            <div className="flex gap-2 mb-3">
              <div className="w-12 h-12 rounded-lg" style={{backgroundColor: '#3B82F6'}} />
              <div className="w-12 h-12 rounded-lg" style={{backgroundColor: '#F59E0B'}} />
              <div className="w-12 h-12 rounded-lg" style={{backgroundColor: '#EF4444'}} />
            </div>
            <p className="text-sm text-muted-foreground">
              One base + two colors adjacent to its complement. Less tension than 
              complementary, more variety than analogous. Best for beginners.
            </p>
          </div>
        </div>
      </section>

      {/* Color Psychology */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          Color Psychology in Design
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Colors trigger emotional responses that directly impact user behavior. Research shows 
          that up to 90% of snap product judgments are based on color alone. Here's what each major 
          color communicates in Western digital design:
        </p>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-4 font-semibold text-foreground">Color</th>
                <th className="text-left p-4 font-semibold text-foreground">Emotions</th>
                <th className="text-left p-4 font-semibold text-foreground">Best Used For</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["🔴 Red", "Urgency, passion, energy", "CTAs, sale badges, error states"],
                ["🔵 Blue", "Trust, stability, professionalism", "Corporate, finance, healthcare"],
                ["🟢 Green", "Growth, health, success", "Eco brands, success states, money"],
                ["🟡 Yellow", "Optimism, warmth, caution", "Warnings, highlights, food brands"],
                ["🟣 Purple", "Luxury, creativity, wisdom", "Premium brands, creative tools"],
                ["🟠 Orange", "Friendliness, enthusiasm", "CTAs, social platforms, youth brands"],
                ["⚫ Black", "Sophistication, power", "Luxury, fashion, minimalist UI"],
              ].map(([color, emotions, use], i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium text-foreground">{color}</td>
                  <td className="p-4 text-muted-foreground">{emotions}</td>
                  <td className="p-4 text-muted-foreground">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          Technical Deep Dive — Color Models & Spaces
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Beyond basic theory, understanding color models is essential for digital implementation. 
          The three main models for screens are{" "}
          <Link to="/compare/hex-vs-rgb-vs-hsl" className="text-primary hover:underline">HEX, RGB, and HSL</Link>. 
          Each represents the same colors differently:
        </p>
        <ul className="space-y-2 text-muted-foreground mb-4">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">RGB</span> — Additive model matching how screens emit light. Best for programmatic manipulation.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">HSL</span> — Human-perception model. Best for design systems and palette generation.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">CMYK</span> — Subtractive model for print. Not used on screens but critical for brand guidelines that span digital and print.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">OKLCH</span> — Perceptually uniform color space (CSS Color Level 4). The future of web color, ensuring equal perceived brightness across hues.
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed">
          Use Colour Pine's{" "}
          <Link to="/color-space-converter" className="text-primary hover:underline">Color Space Converter</Link>{" "}
          to translate between all formats instantly, or explore our{" "}
          <Link to="/colors" className="text-primary hover:underline">50,000+ color database</Link>{" "}
          where every color includes values in all major formats.
        </p>
      </section>

      {/* The 60-30-10 Rule */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          The 60-30-10 Rule in Practice
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          The most practical application of color theory in UI design is the 60-30-10 rule. 
          This interior design principle translates perfectly to digital interfaces:
        </p>
        <div className="flex gap-2 mb-4">
          <div className="flex-[6] h-20 rounded-lg bg-background border border-border flex items-center justify-center text-sm text-muted-foreground">60% — Background</div>
          <div className="flex-[3] h-20 rounded-lg bg-card border border-border flex items-center justify-center text-sm text-muted-foreground">30% — Surface</div>
          <div className="flex-[1] h-20 rounded-lg bg-primary flex items-center justify-center text-sm text-primary-foreground">10%</div>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          The 60% dominant color creates visual breathing room. The 30% secondary supports navigation and structure. 
          The 10% accent draws attention to key interactions—buttons, links, active states. This ratio prevents 
          visual overwhelm while maintaining clear hierarchy.
        </p>
      </section>

      {/* Related Terms */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">Related Color Terms</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { term: "Complementary Colors", desc: "Opposite on the color wheel" },
            { term: "Analogous Colors", desc: "Adjacent on the color wheel" },
            { term: "Color Psychology", desc: "Emotional effects of color" },
            { term: "WCAG Contrast Ratio", desc: "Accessibility color standards" },
            { term: "Color Temperature", desc: "Warm vs cool color classification" },
            { term: "Saturation", desc: "Color intensity or vividness" },
          ].map(item => (
            <div key={item.term} className="bg-card border border-border rounded-lg p-3">
              <p className="text-sm font-medium text-foreground">{item.term}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <FAQSection faqs={faqs} />
    </SEOPageLayout>
  );
}
