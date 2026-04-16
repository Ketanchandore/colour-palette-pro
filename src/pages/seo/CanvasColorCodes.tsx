import { SEOHead } from "@/components/seo/SEOHead";
import { FAQSection } from "@/components/seo/FAQSection";
import { InternalLinks } from "@/components/seo/InternalLinks";
import { MainLayout } from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Copy, Search } from "lucide-react";
import { toast } from "sonner";

const canvasColors = [
  { name: "White", hex: "#FFFFFF", rgb: "rgb(255,255,255)" },
  { name: "Black", hex: "#000000", rgb: "rgb(0,0,0)" },
  { name: "Red", hex: "#FF0000", rgb: "rgb(255,0,0)" },
  { name: "Green", hex: "#008000", rgb: "rgb(0,128,0)" },
  { name: "Blue", hex: "#0000FF", rgb: "rgb(0,0,255)" },
  { name: "Yellow", hex: "#FFFF00", rgb: "rgb(255,255,0)" },
  { name: "Cyan", hex: "#00FFFF", rgb: "rgb(0,255,255)" },
  { name: "Magenta", hex: "#FF00FF", rgb: "rgb(255,0,255)" },
  { name: "Orange", hex: "#FFA500", rgb: "rgb(255,165,0)" },
  { name: "Purple", hex: "#800080", rgb: "rgb(128,0,128)" },
  { name: "Pink", hex: "#FFC0CB", rgb: "rgb(255,192,203)" },
  { name: "Brown", hex: "#A52A2A", rgb: "rgb(165,42,42)" },
  { name: "Gray", hex: "#808080", rgb: "rgb(128,128,128)" },
  { name: "Navy", hex: "#000080", rgb: "rgb(0,0,128)" },
  { name: "Teal", hex: "#008080", rgb: "rgb(0,128,128)" },
  { name: "Olive", hex: "#808000", rgb: "rgb(128,128,0)" },
  { name: "Maroon", hex: "#800000", rgb: "rgb(128,0,0)" },
  { name: "Lime", hex: "#00FF00", rgb: "rgb(0,255,0)" },
  { name: "Aqua", hex: "#00FFFF", rgb: "rgb(0,255,255)" },
  { name: "Silver", hex: "#C0C0C0", rgb: "rgb(192,192,192)" },
  { name: "Coral", hex: "#FF7F50", rgb: "rgb(255,127,80)" },
  { name: "Salmon", hex: "#FA8072", rgb: "rgb(250,128,114)" },
  { name: "Gold", hex: "#FFD700", rgb: "rgb(255,215,0)" },
  { name: "Khaki", hex: "#F0E68C", rgb: "rgb(240,230,140)" },
  { name: "Indigo", hex: "#4B0082", rgb: "rgb(75,0,130)" },
  { name: "Violet", hex: "#EE82EE", rgb: "rgb(238,130,238)" },
  { name: "Turquoise", hex: "#40E0D0", rgb: "rgb(64,224,208)" },
  { name: "Tomato", hex: "#FF6347", rgb: "rgb(255,99,71)" },
  { name: "SteelBlue", hex: "#4682B4", rgb: "rgb(70,130,180)" },
  { name: "SlateGray", hex: "#708090", rgb: "rgb(112,128,144)" },
];

const faqs = [
  { question: "What are canvas color codes?", answer: "Canvas color codes are color values used in HTML5 Canvas — the JavaScript drawing API. Canvas supports named colors (like 'red'), HEX codes (#FF0000), RGB values rgb(255,0,0), RGBA for transparency, and HSL values. These are the same CSS color formats." },
  { question: "How do I set color in HTML Canvas?", answer: "Use ctx.fillStyle or ctx.strokeStyle with any valid CSS color: ctx.fillStyle = '#FF0000' for HEX, ctx.fillStyle = 'rgb(255,0,0)' for RGB, or ctx.fillStyle = 'red' for named colors. Then call ctx.fillRect() or ctx.stroke() to apply." },
  { question: "What is the difference between HEX and RGB in Canvas?", answer: "Both HEX and RGB produce the same colors in Canvas. HEX (#FF0000) is shorter to write, while RGB rgb(255,0,0) is more readable. RGBA adds transparency: rgba(255,0,0,0.5) for 50% transparent red." },
  { question: "Can I use CSS color names in Canvas?", answer: "Yes! HTML5 Canvas supports all 140+ CSS named colors like 'coral', 'steelblue', 'tomato', etc. Named colors are convenient but offer fewer options than HEX or RGB." },
];

const internalLinks = [
  { label: "Color Space Converter", path: "/color-space-converter", description: "Convert HEX ↔ RGB ↔ HSL ↔ CMYK" },
  { label: "50,000+ Color Database", path: "/colors", description: "Browse every color with canvas-ready codes" },
  { label: "Code Export", path: "/code-export", description: "Export palettes as CSS, Tailwind, SCSS, Swift" },
  { label: "HEX vs RGB vs HSL", path: "/compare/hex-vs-rgb-vs-hsl", description: "Color format comparison guide" },
  { label: "Creative Color Wheel", path: "/guides/creative-color-wheel", description: "Interactive color wheel tool" },
  { label: "Color Theory Guide", path: "/glossary/color-theory", description: "Color theory fundamentals" },
];

export default function CanvasColorCodes() {
  const [search, setSearch] = useState("");
  const filtered = canvasColors.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.hex.toLowerCase().includes(search.toLowerCase()));

  return (
    <MainLayout>
      <SEOHead
        title="Canvas Color Codes — HTML5 Canvas Color Reference [HEX + RGB]"
        description="Complete canvas color codes reference with HEX and RGB values. 30+ common HTML5 Canvas colors with copyable codes for JavaScript developers."
        keywords="canvas color codes, html canvas colors, canvas fillstyle colors, html5 canvas color reference, javascript canvas colors"
        canonicalUrl="/guides/canvas-color-codes"
        structuredData={{ "@context": "https://schema.org", "@type": "Article", headline: "Canvas Color Codes — HTML5 Canvas Color Reference", author: { "@type": "Organization", name: "Colour Pine" } }}
      />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/tools" className="hover:text-foreground">Tools</Link> / <span className="text-foreground">Canvas Color Codes</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Canvas Color Codes</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          Complete reference of <strong>HTML5 Canvas color codes</strong> with HEX and RGB values. Click any color to copy its code for use with <code className="bg-muted px-1 rounded">ctx.fillStyle</code> or <code className="bg-muted px-1 rounded">ctx.strokeStyle</code>.
        </p>

        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input type="text" placeholder="Search colors..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
          {filtered.map((c) => (
            <div key={c.hex} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
              <div className="w-12 h-12 rounded-lg border border-border shrink-0" style={{ backgroundColor: c.hex }} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{c.name}</p>
                <div className="flex gap-2">
                  <button onClick={() => { navigator.clipboard.writeText(c.hex); toast.success(`Copied ${c.hex}`); }} className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1">{c.hex} <Copy className="w-3 h-3" /></button>
                  <button onClick={() => { navigator.clipboard.writeText(c.rgb); toast.success(`Copied ${c.rgb}`); }} className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1">{c.rgb} <Copy className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Using Colors in HTML5 Canvas</h2>
          <div className="bg-muted/50 rounded-xl p-5 font-mono text-sm text-foreground">
            <pre>{`const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Using HEX
ctx.fillStyle = '#FF6347';
ctx.fillRect(10, 10, 100, 100);

// Using RGB
ctx.fillStyle = 'rgb(70, 130, 180)';
ctx.fillRect(120, 10, 100, 100);

// Using RGBA (with transparency)
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
ctx.fillRect(230, 10, 100, 100);`}</pre>
          </div>
        </section>

        <FAQSection faqs={faqs} title="Canvas Color Codes FAQ" />
        <InternalLinks links={internalLinks} />
      </div>
    </MainLayout>
  );
}
