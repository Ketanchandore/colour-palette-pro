import { SEOHead } from "@/components/seo/SEOHead";
import { FAQSection } from "@/components/seo/FAQSection";
import { InternalLinks } from "@/components/seo/InternalLinks";
import { MainLayout } from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Copy, Search } from "lucide-react";
import { toast } from "sonner";

const pantoneColors = [
  { pantone: "Pantone 186 C", hex: "#C8102E", name: "Red" },
  { pantone: "Pantone 485 C", hex: "#DA291C", name: "Bright Red" },
  { pantone: "Pantone 021 C", hex: "#FE5000", name: "Orange" },
  { pantone: "Pantone 116 C", hex: "#FFCD00", name: "Yellow" },
  { pantone: "Pantone 354 C", hex: "#009639", name: "Green" },
  { pantone: "Pantone 286 C", hex: "#0032A0", name: "Blue" },
  { pantone: "Pantone 2685 C", hex: "#56368A", name: "Purple" },
  { pantone: "Pantone 219 C", hex: "#DA1884", name: "Pink" },
  { pantone: "Pantone 7421 C", hex: "#612141", name: "Burgundy" },
  { pantone: "Pantone 7502 C", hex: "#D3BC8D", name: "Gold" },
  { pantone: "Pantone 877 C", hex: "#8A8D8F", name: "Silver" },
  { pantone: "Pantone 432 C", hex: "#333F48", name: "Charcoal" },
  { pantone: "Pantone Black C", hex: "#2D2926", name: "Black" },
  { pantone: "Pantone Cool Gray 1 C", hex: "#D9D9D6", name: "Cool Gray" },
  { pantone: "Pantone 7455 C", hex: "#3A5DAE", name: "Royal Blue" },
  { pantone: "Pantone 7462 C", hex: "#00558C", name: "Navy" },
  { pantone: "Pantone 7473 C", hex: "#279989", name: "Teal" },
  { pantone: "Pantone 7739 C", hex: "#44883E", name: "Forest Green" },
  { pantone: "Pantone 1665 C", hex: "#DC4405", name: "Vermilion" },
  { pantone: "Pantone 7406 C", hex: "#F2A900", name: "Amber" },
  { pantone: "Pantone 7622 C", hex: "#93272C", name: "Crimson" },
  { pantone: "Pantone 2607 C", hex: "#500778", name: "Deep Purple" },
  { pantone: "Pantone 7541 C", hex: "#D9E1E2", name: "Ice Blue" },
  { pantone: "Pantone 7527 C", hex: "#D6D2C4", name: "Warm Gray" },
  { pantone: "Pantone 2026 COTY", hex: "#E8DED2", name: "Cloud Dancer (2026)" },
  { pantone: "Pantone 633 C", hex: "#0093B2", name: "Cyan" },
  { pantone: "Pantone 7578 C", hex: "#C6653F", name: "Terracotta" },
  { pantone: "Pantone 7536 C", hex: "#A69F88", name: "Olive" },
  { pantone: "Pantone 704 C", hex: "#953751", name: "Raspberry" },
  { pantone: "Pantone 7408 C", hex: "#F0AB00", name: "Marigold" },
];

const faqs = [
  { question: "How do I convert Pantone to HEX?", answer: "Use Colour Pine's free Pantone to HEX converter above. Search for any Pantone color code and get the exact HEX equivalent. Note that Pantone colors are defined for physical printing, so digital HEX values are close approximations." },
  { question: "Is Pantone to HEX conversion exact?", answer: "Pantone to HEX conversion is an approximation. Pantone colors are designed for physical ink on paper, while HEX is for digital screens. The HEX values provided are the closest possible digital representation of each Pantone color." },
  { question: "What is CMYK converter Pantone?", answer: "A CMYK to Pantone converter maps CMYK print values (Cyan, Magenta, Yellow, Key/Black) to their closest Pantone spot color. Use Colour Pine's Color Space Converter to convert between CMYK, HEX, RGB, and HSL formats." },
  { question: "What Pantone color is Cloud Dancer 2026?", answer: "Cloud Dancer is Pantone's Color of the Year 2026. Its approximate HEX value is #E8DED2 — a warm, comforting off-white with creamy undertones. Explore Cloud Dancer palettes on Colour Pine's 2026 Trends page." },
  { question: "Can I use Pantone colors in web design?", answer: "Pantone colors are primarily for print. For web design, convert Pantone to HEX or RGB. Use the converted HEX code in your CSS. Remember that screen display varies by device, so the color may look slightly different from the physical Pantone swatch." },
];

const internalLinks = [
  { label: "Color Space Converter", path: "/color-space-converter", description: "Convert between HEX, RGB, HSL, CMYK, and LAB formats" },
  { label: "HEX vs RGB vs HSL", path: "/compare/hex-vs-rgb-vs-hsl", description: "Understanding different color format differences" },
  { label: "Creative Color Wheel", path: "/guides/creative-color-wheel", description: "Interactive color wheel for harmony exploration" },
  { label: "Cloud Dancer 2026", path: "/trends/cloud-dancer-2026", description: "Explore Pantone's 2026 Color of the Year palettes" },
  { label: "Brand Colors", path: "/brand-colors", description: "HEX codes for 50+ famous brands" },
  { label: "Color Database", path: "/colors", description: "Browse 50,000+ named colors with HEX codes" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Pantone to HEX Converter — Free Online Color Converter",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function PantoneToHex() {
  const [search, setSearch] = useState("");
  const filtered = pantoneColors.filter(c =>
    c.pantone.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.hex.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <SEOHead
        title="Pantone to HEX Converter — Free Online Pantone Color Lookup"
        description="Convert Pantone colors to HEX codes instantly. Free Pantone to HEX converter with 30+ popular Pantone colors including Cloud Dancer 2026. CMYK converter Pantone."
        keywords="pantone to hex, pantone to hex converter, cmyk converter pantone, pantone color chart, pantone hex codes, pantone color of the year 2026"
        canonicalUrl="/guides/pantone-to-hex"
        structuredData={structuredData}
      />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/tools" className="hover:text-foreground">Tools</Link> / <span className="text-foreground">Pantone to HEX</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
          Pantone to HEX Converter
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          Instantly convert <strong>Pantone colors to HEX codes</strong> for web design. Search by Pantone number, color name, or HEX value. All 30+ popular Pantone colors with their exact digital equivalents.
        </p>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Pantone 186 C, Red, #C8102E..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Color Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filtered.map((c) => (
            <button key={c.pantone} onClick={() => { navigator.clipboard.writeText(c.hex); toast.success(`Copied ${c.hex}`); }}
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-all group text-left">
              <div className="w-14 h-14 rounded-lg border border-border shrink-0" style={{ backgroundColor: c.hex }} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">{c.pantone}</p>
                <p className="text-xs text-muted-foreground">{c.name}</p>
                <p className="text-xs font-mono text-muted-foreground">{c.hex}</p>
              </div>
              <Copy className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 shrink-0" />
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No Pantone colors found. Try a different search term.</p>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">How Pantone to HEX Conversion Works</h2>
          <div className="prose prose-sm text-muted-foreground max-w-none space-y-3">
            <p>Pantone Matching System (PMS) colors are standardized spot colors used in print. Each Pantone shade has a unique reference number. When converting to digital formats (HEX, RGB), the values are approximations since screens use light (additive mixing) while print uses ink (subtractive mixing).</p>
            <p>For accurate brand reproduction: always reference the official Pantone swatch book for print, and use the HEX conversion for digital applications like websites, apps, and social media graphics.</p>
          </div>
        </section>

        <FAQSection faqs={faqs} title="Pantone to HEX Converter FAQ" />
        <InternalLinks links={internalLinks} />
      </div>
    </MainLayout>
  );
}
