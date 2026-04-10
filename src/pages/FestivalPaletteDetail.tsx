import { useParams, Link } from "react-router-dom";
import { Copy, Check, Share2, ArrowLeft, Download, Palette } from "lucide-react";
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import SEOHead from "@/components/seo/SEOHead";
import { FAQSection } from "@/components/seo/FAQSection";
import { InternalLinks } from "@/components/seo/InternalLinks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { festivalPalettes } from "@/data/festivalPalettes";
import { toast } from "sonner";

function ColorSwatch({ color, name }: { color: string; name: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    toast.success(`Copied ${color}`);
    setTimeout(() => setCopied(false), 1500);
  };

  const isDark = parseInt(color.slice(1), 16) < 0x888888;

  return (
    <button
      onClick={copy}
      className="group relative rounded-2xl overflow-hidden h-36 md:h-44 flex-1 min-w-[100px] transition-all duration-300 hover:scale-105 hover:shadow-xl"
      style={{ backgroundColor: color }}
    >
      <div className={`absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? "text-white" : "text-gray-800"}`}>
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        <span className="text-xs font-mono font-bold">{color}</span>
      </div>
      <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
        {name}
      </div>
    </button>
  );
}

export default function FestivalPaletteDetail() {
  const { slug } = useParams<{ slug: string }>();
  const festival = festivalPalettes.find((f) => f.slug === slug);

  if (!festival) {
    return (
      <MainLayout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Palette Not Found</h1>
          <Link to="/palettes/festival">
            <Button><ArrowLeft className="w-4 h-4 mr-2" /> Back to Festival Palettes</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const cssCode = Object.entries(festival.cssVariables)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");
  const fullCss = `:root {\n${cssCode}\n}`;

  const tailwindCode = Object.entries(festival.cssVariables)
    .map(([k, v]) => `    '${k.replace("--", "")}': '${v}',`)
    .join("\n");

  const copyCss = () => {
    navigator.clipboard.writeText(fullCss);
    toast.success("CSS variables copied!");
  };

  const copyTailwind = () => {
    navigator.clipboard.writeText(`colors: {\n${tailwindCode}\n}`);
    toast.success("Tailwind config copied!");
  };

  const copyAllHex = () => {
    navigator.clipboard.writeText(festival.colors.join(", "));
    toast.success("All hex codes copied!");
  };

  const sharePage = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Page link copied!");
  };

  const varNames = Object.keys(festival.cssVariables);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: festival.name + " Color Palette",
    description: festival.description,
    url: `https://colourpine.com/palettes/festival/${festival.slug}`,
    creator: { "@type": "Organization", name: "Colour Pine" },
    keywords: festival.keywords,
  };

  // Related festivals (same category, excluding current)
  const related = festivalPalettes
    .filter((f) => f.category === festival.category && f.id !== festival.id)
    .slice(0, 3);

  const internalLinks = [
    { label: "All Festival Palettes", path: "/palettes/festival", description: "Browse all festival color palettes" },
    { label: "Color Palette Generator", path: "/generator", description: "Generate custom palettes" },
    { label: "Contrast Checker", path: "/contrast-checker", description: "WCAG accessibility validation" },
    { label: "Halloween Palettes", path: "/palettes/halloween-color-palette", description: "Spooky Halloween color combos" },
    { label: "Color Explorer", path: "/color-explorer", description: "Browse 50,000+ colors" },
    { label: "2026 Color Trends", path: "/trends", description: "Trending colors for 2026" },
  ];

  return (
    <MainLayout>
      <SEOHead
        title={`${festival.name} Color Palette — Free Hex Codes & CSS | Colour Pine`}
        description={festival.description}
        keywords={festival.keywords}
        canonicalUrl={`https://colourpine.com/palettes/festival/${festival.slug}`}
        structuredData={structuredData}
      />

      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li className="flex items-center gap-1">
              <span className="mx-1">›</span>
              <Link to="/palettes/festival" className="hover:text-foreground transition-colors">Festival Palettes</Link>
            </li>
            <li className="flex items-center gap-1">
              <span className="mx-1">›</span>
              <span className="text-foreground font-medium">{festival.name}</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{festival.emoji}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {festival.name} Color Palette
              </h1>
              {festival.month && (
                <Badge variant="secondary" className="mt-1">{festival.month}</Badge>
              )}
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">{festival.description}</p>
        </div>

        {/* Color Swatches */}
        <div className="flex gap-3 mb-6 flex-wrap md:flex-nowrap">
          {festival.colors.map((color, i) => (
            <ColorSwatch
              key={color}
              color={color}
              name={varNames[i]?.replace("--", "") || color}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 flex-wrap mb-10">
          <Button onClick={copyAllHex} variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-1" /> Copy All Hex
          </Button>
          <Button onClick={copyCss} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" /> CSS Variables
          </Button>
          <Button onClick={copyTailwind} variant="outline" size="sm">
            <Palette className="w-4 h-4 mr-1" /> Tailwind Config
          </Button>
          <Button onClick={sharePage} variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-1" /> Share
          </Button>
        </div>

        {/* Content */}
        <article className="prose prose-sm max-w-none mb-12">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            About the {festival.name} Palette
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{festival.content}</p>

          {/* CSS Export */}
          <h3 className="text-xl font-display font-bold text-foreground mb-3">CSS Variables</h3>
          <pre className="bg-card border border-border rounded-xl p-4 overflow-x-auto text-sm text-foreground mb-6">
            <code>{fullCss}</code>
          </pre>

          {/* Use Cases */}
          <h3 className="text-xl font-display font-bold text-foreground mb-3">Design Use Cases</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 list-none p-0">
            {festival.useCases.map((uc) => (
              <li key={uc} className="flex items-center gap-2 bg-card border border-border rounded-lg p-3 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                {uc}
              </li>
            ))}
          </ul>

          {/* Color Accessibility Note */}
          <h3 className="text-xl font-display font-bold text-foreground mb-3">Accessibility Tips</h3>
          <p className="text-muted-foreground leading-relaxed">
            Always verify contrast ratios when using festival colors for text and backgrounds. Use our{" "}
            <Link to="/contrast-checker" className="text-primary hover:underline">Contrast Checker</Link>{" "}
            to ensure WCAG AA (4.5:1) or AAA (7:1) compliance. Festival palettes are best used for decorative elements, headers, and accent colors, with neutral backgrounds for body text.
          </p>
        </article>

        {/* Related palettes */}
        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-display font-bold text-foreground mb-4">Related Festival Palettes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/palettes/festival/${r.slug}`}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all"
                >
                  <div className="flex h-16">
                    {r.colors.map((c) => (
                      <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-foreground">{r.emoji} {r.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <FAQSection faqs={festival.faqs} title={`${festival.name} — FAQ`} />
        <InternalLinks links={internalLinks} />
      </div>
    </MainLayout>
  );
}
