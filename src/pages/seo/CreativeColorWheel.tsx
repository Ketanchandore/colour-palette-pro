import { SEOHead } from "@/components/seo/SEOHead";
import { FAQSection } from "@/components/seo/FAQSection";
import { InternalLinks } from "@/components/seo/InternalLinks";
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const wheelColors = [
  { name: "Red", hex: "#FF0000", deg: 0 },
  { name: "Red-Orange", hex: "#FF4500", deg: 30 },
  { name: "Orange", hex: "#FF8C00", deg: 60 },
  { name: "Yellow-Orange", hex: "#FFB300", deg: 90 },
  { name: "Yellow", hex: "#FFD700", deg: 120 },
  { name: "Yellow-Green", hex: "#9ACD32", deg: 150 },
  { name: "Green", hex: "#00AA00", deg: 180 },
  { name: "Blue-Green", hex: "#00CED1", deg: 210 },
  { name: "Blue", hex: "#0000FF", deg: 240 },
  { name: "Blue-Violet", hex: "#8A2BE2", deg: 270 },
  { name: "Violet", hex: "#9400D3", deg: 300 },
  { name: "Red-Violet", hex: "#C71585", deg: 330 },
];

const harmonyTypes = [
  { name: "Complementary", desc: "Two colors opposite each other on the wheel. Maximum contrast.", offsets: [0, 180] },
  { name: "Analogous", desc: "Three colors side by side. Harmonious and pleasing.", offsets: [0, 30, 60] },
  { name: "Triadic", desc: "Three colors equally spaced (120° apart). Balanced and vibrant.", offsets: [0, 120, 240] },
  { name: "Split-Complementary", desc: "Base color + two colors adjacent to its complement.", offsets: [0, 150, 210] },
  { name: "Tetradic", desc: "Four colors in two complementary pairs. Rich and complex.", offsets: [0, 90, 180, 270] },
  { name: "Monochromatic", desc: "Variations of a single hue. Elegant and cohesive.", offsets: [0] },
];

const faqs = [
  { question: "What is a creative color wheel?", answer: "A creative color wheel is a circular diagram showing relationships between colors. It displays primary colors (red, yellow, blue), secondary colors (orange, green, violet), and tertiary colors. Designers use it to find harmonious color combinations like complementary, analogous, and triadic schemes." },
  { question: "What are the 12 colors on the color wheel?", answer: "The 12 colors are: Red, Red-Orange, Orange, Yellow-Orange, Yellow, Yellow-Green, Green, Blue-Green, Blue, Blue-Violet, Violet, and Red-Violet. These include 3 primary, 3 secondary, and 6 tertiary colors." },
  { question: "What is a CMY color wheel?", answer: "A CMY (Cyan, Magenta, Yellow) color wheel is used in print design. Unlike the traditional RYB wheel, CMY is based on subtractive color mixing used by printers. Cyan, Magenta, and Yellow are the primary colors in this system." },
  { question: "How do I find complementary colors?", answer: "Complementary colors sit directly opposite each other on the color wheel. For example, red's complement is green, blue's complement is orange, and yellow's complement is violet. Use Colour Pine's color wheel tool to find any color's complement instantly." },
  { question: "What is the difference between RGB and RYB color wheels?", answer: "The RYB (Red-Yellow-Blue) wheel is used in traditional art and painting. The RGB (Red-Green-Blue) wheel is used in digital design and screens. RGB is additive (light mixing), while RYB is subtractive (pigment mixing)." },
];

const internalLinks = [
  { label: "Palette Generator", path: "/generator", description: "Generate harmonious palettes using color wheel principles" },
  { label: "Color Theory Guide", path: "/glossary/color-theory", description: "Deep dive into color theory fundamentals" },
  { label: "Color Space Converter", path: "/color-space-converter", description: "Convert between HEX, RGB, HSL, CMYK formats" },
  { label: "What Colors Go With Red", path: "/guides/what-colors-go-with-red", description: "Expert red color combinations" },
  { label: "Pantone to HEX", path: "/guides/pantone-to-hex", description: "Convert Pantone colors to HEX codes" },
  { label: "50,000+ Colors", path: "/colors", description: "Browse the complete color database" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Creative Color Wheel — Free Online Color Wheel Tool",
  description: "Interactive creative color wheel to explore complementary, analogous, triadic, and split-complementary color harmonies. Free online tool.",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function CreativeColorWheel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [harmonyIndex, setHarmonyIndex] = useState(0);
  const selected = wheelColors[selectedIndex];
  const harmony = harmonyTypes[harmonyIndex];

  const getHarmonyColors = () => {
    return harmony.offsets.map(offset => {
      const targetDeg = (selected.deg + offset) % 360;
      const closest = wheelColors.reduce((prev, curr) =>
        Math.abs(curr.deg - targetDeg) < Math.abs(prev.deg - targetDeg) ? curr : prev
      );
      return closest;
    });
  };

  return (
    <MainLayout>
      <SEOHead
        title="Creative Color Wheel — Free Online Interactive Color Wheel Tool"
        description="Explore the creative color wheel with complementary, analogous, triadic & split-complementary harmonies. Free interactive tool with HEX codes for designers."
        keywords="creative color wheel, color wheel, cmy color wheel, color wheel tool, complementary colors, triadic colors, analogous colors"
        canonicalUrl="/guides/creative-color-wheel"
        structuredData={structuredData}
      />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/tools" className="hover:text-foreground">Tools</Link> / <span className="text-foreground">Creative Color Wheel</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
          Creative Color Wheel — Interactive Color Harmony Tool
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          Use this free <strong>creative color wheel</strong> to explore color harmonies. Click any color to see its complementary, analogous, triadic, and split-complementary palettes with HEX codes.
        </p>

        {/* Interactive Wheel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="relative w-full max-w-[360px] mx-auto aspect-square">
              {wheelColors.map((color, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const r = 140;
                const cx = 180 + r * Math.cos(angle);
                const cy = 180 + r * Math.sin(angle);
                const isSelected = i === selectedIndex;
                const isHarmony = getHarmonyColors().some(h => h.hex === color.hex);
                return (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedIndex(i)}
                    className={`absolute w-12 h-12 rounded-full border-2 transition-transform ${isSelected ? 'scale-125 border-foreground ring-2 ring-primary' : isHarmony ? 'scale-110 border-foreground' : 'border-border hover:scale-110'}`}
                    style={{ backgroundColor: color.hex, left: cx - 24, top: cy - 24 }}
                    title={color.name}
                  />
                );
              })}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-border" style={{ backgroundColor: selected.hex }} />
                  <p className="font-semibold text-foreground text-sm">{selected.name}</p>
                  <p className="text-xs font-mono text-muted-foreground">{selected.hex}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Color Harmonies</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {harmonyTypes.map((h, i) => (
                <button key={h.name} onClick={() => setHarmonyIndex(i)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${i === harmonyIndex ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>
                  {h.name}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4">{harmony.desc}</p>
            <div className="space-y-3">
              {getHarmonyColors().map((c) => (
                <button key={c.hex + c.name} onClick={() => { navigator.clipboard.writeText(c.hex); toast.success(`Copied ${c.hex}`); }}
                  className="flex items-center gap-3 w-full p-3 rounded-lg border border-border hover:border-primary/30 transition-colors bg-card">
                  <div className="w-10 h-10 rounded-lg border border-border" style={{ backgroundColor: c.hex }} />
                  <div className="text-left">
                    <p className="font-medium text-foreground text-sm">{c.name}</p>
                    <p className="text-xs font-mono text-muted-foreground">{c.hex}</p>
                  </div>
                  <Copy className="w-4 h-4 text-muted-foreground ml-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Harmony Types Explanation */}
        <section className="mb-12">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Understanding Color Wheel Harmonies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {harmonyTypes.map((h) => (
              <div key={h.name} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-2">{h.name}</h3>
                <p className="text-sm text-muted-foreground">{h.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <FAQSection faqs={faqs} title="Color Wheel FAQ" />
        <InternalLinks links={internalLinks} />
      </div>
    </MainLayout>
  );
}
