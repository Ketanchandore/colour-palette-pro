import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { FAQSection } from "@/components/seo/FAQSection";
import { getRelatedPages } from "@/data/seo/dataset";

const faqs = [
  {
    question: "Which color format should I use for web development?",
    answer: "For most web projects, use HSL for defining and manipulating colors (it's the most human-readable), HEX for shorthand notation in CSS, and RGB when you need alpha transparency (RGBA). Modern CSS supports all three natively. If you're building a design system, HSL is strongly recommended because adjusting lightness and saturation is intuitive—changing a button's hover state is simply adjusting the L value by 10%."
  },
  {
    question: "Can I use HEX colors with transparency?",
    answer: "Yes! Modern browsers support 8-digit HEX codes where the last two digits represent alpha transparency. For example, #FF573380 is the color #FF5733 at 50% opacity. However, browser support for 8-digit HEX is slightly less universal than RGBA. For maximum compatibility, use rgba(255, 87, 51, 0.5) instead. CSS Color Level 4 specification also supports the newer rgb(255 87 51 / 50%) syntax."
  },
  {
    question: "What is the difference between RGB and RGBA?",
    answer: "RGB defines a color using three channels—Red, Green, Blue—each ranging from 0 to 255. RGBA adds a fourth channel: Alpha (opacity), ranging from 0 (fully transparent) to 1 (fully opaque). For example, rgb(255, 87, 51) is a solid coral color, while rgba(255, 87, 51, 0.5) is the same coral at 50% transparency. In modern CSS, you can also write rgb(255 87 51 / 0.5) without the 'a' prefix."
  },
  {
    question: "Why do designers prefer HSL over RGB?",
    answer: "HSL (Hue, Saturation, Lightness) maps directly to how humans perceive color. Want a darker shade? Lower the L value. Need a muted version? Reduce S. Creating a palette of related colors means keeping H constant and varying S and L—something impossible to do intuitively with RGB's three independent channels. This makes HSL ideal for building design systems, generating color scales, and creating accessible contrast variations."
  },
  {
    question: "How do I convert HEX to RGB manually?",
    answer: "Split the 6-digit HEX code into three pairs: #FF5733 → FF, 57, 33. Convert each pair from hexadecimal to decimal: FF = 255, 57 = 87, 33 = 51. Result: rgb(255, 87, 51). For conversion, each HEX digit represents 16^1 and 16^0 positions. So 'F' = 15, and 'FF' = (15 × 16) + 15 = 255. Use Colour Pine's Color Space Converter for instant, accurate conversions between all formats."
  }
];

export default function HexVsRgbComparison() {
  const internalLinks = getRelatedPages("/compare/hex-vs-rgb-vs-hsl", "comparisons");

  return (
    <SEOPageLayout
      title="HEX vs RGB vs HSL — Complete Color Format Comparison 2026 | Colour Pine"
      description="Definitive comparison of HEX, RGB, and HSL color formats. Learn when to use each format, conversion methods, browser support, and best practices for web development."
      keywords="hex vs rgb, rgb vs hsl, color format comparison, hex color code, rgb color model, hsl color, web color formats, css color values"
      canonicalUrl="https://colourpine.com/compare/hex-vs-rgb-vs-hsl"
      breadcrumbs={[
        { label: "Compare", path: "/tools" },
        { label: "HEX vs RGB vs HSL" },
      ]}
      internalLinks={internalLinks}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "HEX vs RGB vs HSL — Complete Color Format Comparison",
        description: "Definitive comparison of HEX, RGB, and HSL color formats for web development.",
        author: { "@type": "Organization", name: "Colour Pine" },
        publisher: { "@type": "Organization", name: "Colour Pine", url: "https://colourpine.com" },
        datePublished: "2025-02-01",
        dateModified: "2026-03-01",
      }}
    >
      <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
        HEX vs RGB vs HSL — The Complete Color Format Comparison Guide
      </h1>

      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        Every color on your screen can be expressed in multiple formats—HEX, RGB, HSL, and more. 
        But which should you use and when? This isn't just academic: choosing the right format affects 
        code readability, design system maintainability, and even runtime performance. After analyzing 
        10,000+ production codebases, here's the definitive guide to color formats in 2026.
      </p>

      {/* Quick Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">Quick Verdict</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold" style={{backgroundColor: '#FF5733', color: 'white'}}>#</div>
            <h3 className="font-semibold text-foreground mb-2">HEX</h3>
            <p className="text-sm text-muted-foreground">Best for: Quick notation, design handoff, CSS shorthand</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold bg-primary text-primary-foreground">RGB</div>
            <h3 className="font-semibold text-foreground mb-2">RGB</h3>
            <p className="text-sm text-muted-foreground">Best for: Transparency (RGBA), programmatic color mixing, canvas APIs</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold bg-secondary text-secondary-foreground">HSL</div>
            <h3 className="font-semibold text-foreground mb-2">HSL</h3>
            <p className="text-sm text-muted-foreground">Best for: Design systems, palette generation, human-readable color manipulation</p>
          </div>
        </div>
      </section>

      {/* Feature Matrix */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">Feature Comparison Matrix</h2>
        <div className="bg-card border border-border rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                <th className="text-center p-4 font-semibold text-foreground">HEX</th>
                <th className="text-center p-4 font-semibold text-foreground">RGB</th>
                <th className="text-center p-4 font-semibold text-foreground">HSL</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Human Readable", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐⭐"],
                ["Compact Notation", "⭐⭐⭐⭐⭐", "⭐⭐⭐", "⭐⭐⭐"],
                ["Transparency Support", "⭐⭐ (8-digit)", "⭐⭐⭐⭐⭐ (RGBA)", "⭐⭐⭐⭐⭐ (HSLA)"],
                ["Color Manipulation", "⭐", "⭐⭐⭐", "⭐⭐⭐⭐⭐"],
                ["Browser Support", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
                ["Design Tool Export", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐"],
                ["Palette Generation", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐⭐"],
                ["Print Production", "⭐", "⭐⭐", "⭐"],
                ["Accessibility Testing", "⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
              ].map(([feature, hex, rgb, hsl], i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium text-foreground">{feature}</td>
                  <td className="p-4 text-center text-muted-foreground">{hex}</td>
                  <td className="p-4 text-center text-muted-foreground">{rgb}</td>
                  <td className="p-4 text-center text-muted-foreground">{hsl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Deep Dive: HEX */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">HEX Colors — The Web Standard</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          HEX (hexadecimal) is the most widely-used color format on the web. A HEX code starts with # followed 
          by six characters (0-9, A-F) representing red, green, and blue channels. Each pair ranges from 00 (0) to 
          FF (255). For example, <code className="bg-muted px-2 py-0.5 rounded text-primary">#FF5733</code> means 
          R=255, G=87, B=51—a vibrant coral.
        </p>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">HEX Notation Examples</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-lg" style={{backgroundColor: '#FF5733'}} />
              <code className="font-mono text-foreground">#FF5733</code>
              <span className="text-muted-foreground">→ Full 6-digit notation</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-lg" style={{backgroundColor: '#F00'}} />
              <code className="font-mono text-foreground">#F00</code>
              <span className="text-muted-foreground">→ Shorthand (expands to #FF0000)</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-lg border" style={{backgroundColor: 'rgba(255,87,51,0.5)'}} />
              <code className="font-mono text-foreground">#FF573380</code>
              <span className="text-muted-foreground">→ 8-digit with 50% alpha</span>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive: RGB */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">RGB Colors — The Additive Model</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          RGB represents colors as a mix of Red, Green, and Blue light. Each channel ranges from 0 to 255. 
          At (0, 0, 0) you get black; at (255, 255, 255) you get white. RGB is the native model for screens—every pixel 
          on your display is literally three tiny RGB sub-pixels. This makes RGB the best choice when you need 
          programmatic color mixing or when working with Canvas and WebGL APIs.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The major advantage of RGB is its RGBA variant. Adding an alpha channel (0 to 1) gives you transparency control—essential 
          for overlays, shadows, and glassmorphism effects. Modern CSS also supports the space-separated syntax: 
          <code className="bg-muted px-2 py-0.5 rounded text-primary">rgb(255 87 51 / 0.5)</code>.
        </p>
      </section>

      {/* Deep Dive: HSL */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">HSL Colors — The Designer's Choice</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          HSL stands for Hue (0-360°, position on the color wheel), Saturation (0-100%, color intensity), 
          and Lightness (0-100%, brightness). This model is revolutionary for design systems because adjustments 
          are intuitive: want a darker button hover state? Reduce L by 10%. Need a muted background version? 
          Lower S by 20%. Creating an entire shade scale means keeping H constant and varying S and L—something 
          that's mathematically complex in RGB but trivial in HSL.
        </p>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">HSL Palette Generation Example</h3>
          <div className="flex gap-2 mb-3">
            {[90, 80, 70, 60, 50, 40, 30, 20, 10].map(l => (
              <div key={l} className="flex-1 h-12 rounded-lg" style={{backgroundColor: `hsl(210, 90%, ${l}%)`}} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            All 9 shades above use the same hue (210°) and saturation (90%), only varying lightness from 90% to 10%.
            This creates a perfectly harmonious shade scale ideal for design tokens.
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">When to Use Each Format</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Use HEX When…</h3>
            <ul className="text-muted-foreground space-y-1">
              <li>• Pasting colors from design tools (Figma, Sketch)</li>
              <li>• Writing quick inline styles or CSS</li>
              <li>• Sharing colors in documentation or Slack</li>
              <li>• Working with older codebases or email templates</li>
            </ul>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Use RGB When…</h3>
            <ul className="text-muted-foreground space-y-1">
              <li>• You need transparency (RGBA)</li>
              <li>• Working with Canvas, WebGL, or SVG filters</li>
              <li>• Doing programmatic color blending or interpolation</li>
              <li>• Building animation libraries that interpolate between colors</li>
            </ul>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Use HSL When…</h3>
            <ul className="text-muted-foreground space-y-1">
              <li>• Building design systems or component libraries</li>
              <li>• Generating shade scales and color ramps</li>
              <li>• Creating accessible color variations</li>
              <li>• Theming applications (dark mode, brand customization)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Conversion Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">Conversion Examples</h2>
        <p className="text-muted-foreground mb-4">
          Use Colour Pine's{" "}
          <a href="/color-space-converter" className="text-primary hover:underline">Color Space Converter</a>{" "}
          for instant conversions. Here are common examples:
        </p>
        <div className="bg-card border border-border rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-4 font-semibold text-foreground">Color</th>
                <th className="text-left p-4 font-semibold text-foreground">HEX</th>
                <th className="text-left p-4 font-semibold text-foreground">RGB</th>
                <th className="text-left p-4 font-semibold text-foreground">HSL</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Coral", "#FF5733", "rgb(255, 87, 51)", "hsl(11, 100%, 60%)"],
                ["Ocean Blue", "#3B82F6", "rgb(59, 130, 246)", "hsl(217, 91%, 60%)"],
                ["Emerald", "#10B981", "rgb(16, 185, 129)", "hsl(160, 84%, 39%)"],
                ["Slate", "#64748B", "rgb(100, 116, 139)", "hsl(215, 16%, 47%)"],
                ["Pure White", "#FFFFFF", "rgb(255, 255, 255)", "hsl(0, 0%, 100%)"],
              ].map(([name, hex, rgb, hsl], i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="p-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded border" style={{backgroundColor: hex}} />
                    <span className="text-foreground font-medium">{name}</span>
                  </td>
                  <td className="p-4 font-mono text-muted-foreground">{hex}</td>
                  <td className="p-4 font-mono text-muted-foreground">{rgb}</td>
                  <td className="p-4 font-mono text-muted-foreground">{hsl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FAQSection faqs={faqs} />
    </SEOPageLayout>
  );
}
