import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, Share2, ArrowRight, Sparkles, Globe, Search } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import SEOHead from "@/components/seo/SEOHead";
import { FAQSection } from "@/components/seo/FAQSection";
import { InternalLinks } from "@/components/seo/InternalLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { festivalPalettes, festivalCategories } from "@/data/festivalPalettes";
import { toast } from "sonner";

function FestivalCard({ festival }: { festival: typeof festivalPalettes[0] }) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    toast.success(`Copied ${hex}`);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const sharePalette = () => {
    const url = `${window.location.origin}/palettes/festival/${festival.slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-glow-sm transition-all duration-300">
      {/* Color strip */}
      <div className="flex h-28">
        {festival.colors.map((color, i) => (
          <button
            key={i}
            className="flex-1 relative group/color transition-all duration-200 hover:flex-[1.5]"
            style={{ backgroundColor: color }}
            onClick={() => copyColor(color)}
            title={`Copy ${color}`}
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 transition-opacity bg-black/20">
              {copiedColor === color ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <Copy className="w-4 h-4 text-white" />
              )}
            </span>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/80 opacity-0 group-hover/color:opacity-100 transition-opacity drop-shadow-md">
              {color}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <span className="text-xl">{festival.emoji}</span>
            {festival.name}
          </h3>
          <button onClick={sharePalette} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Share">
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{festival.shortDescription}</p>
        <div className="flex items-center justify-between">
          {festival.month && (
            <Badge variant="secondary" className="text-xs">{festival.month}</Badge>
          )}
          <Link to={`/palettes/festival/${festival.slug}`}>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 text-xs gap-1">
              View Details <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FestivalPalettes() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = festivalPalettes;
    if (activeCategory !== "all") {
      list = list.filter((f) => f.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.shortDescription.toLowerCase().includes(q) ||
          f.keywords.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, search]);

  const hubFaqs = [
    { question: "What festival color palettes are available?", answer: "We offer 18+ curated festival palettes covering Indian festivals (Diwali, Holi, Navratri, Onam, Pongal, Raksha Bandhan, Independence Day), world celebrations (Christmas, New Year, Easter, Thanksgiving, Eid, Chinese New Year, Valentine's Day), and thematic palettes (Wedding, Pastel, Dark Mode)." },
    { question: "Can I use these festival colors in my design projects?", answer: "Absolutely! All our festival color palettes come with ready-to-use hex codes, CSS variables, and usage guidelines. Click any color to copy its hex code, or visit the detail page for full CSS export, accessibility notes, and real-world use cases." },
    { question: "How are festival colors chosen?", answer: "Each palette is researched from cultural traditions, historical symbolism, and modern design trends. For example, Diwali colors come from diya flames and rangoli patterns, while Christmas colors originate from holly berries and evergreen symbolism." },
    { question: "Do you have Indian festival color palettes?", answer: "Yes! We have dedicated palettes for Diwali, Holi, Navratri, Onam, Pongal, Raksha Bandhan, and Indian Independence Day — each with culturally accurate colors, symbolism explanations, and professional design use cases." },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Festival Color Palettes — Indian & World Holiday Colors",
    description: "Explore 18+ curated color palettes for festivals worldwide. Diwali, Holi, Christmas, Eid, Wedding & more with hex codes and CSS exports.",
    url: "https://colourpine.com/palettes/festival",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: festivalPalettes.length,
      itemListElement: festivalPalettes.map((f, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: f.name,
        url: `https://colourpine.com/palettes/festival/${f.slug}`,
      })),
    },
  };

  const internalLinks = [
    { label: "Color Palette Generator", path: "/generator", description: "Generate custom palettes with AI" },
    { label: "Halloween Color Palettes", path: "/palettes/halloween-color-palette", description: "Spooky gothic Halloween palettes" },
    { label: "2026 Color Trends", path: "/trends", description: "Trending palettes for 2026" },
    { label: "Contrast Checker", path: "/contrast-checker", description: "WCAG accessibility checker" },
    { label: "Color Explorer", path: "/color-explorer", description: "Browse 50,000+ colors" },
    { label: "UI Designer Palettes", path: "/palettes/ui-designer", description: "Palettes for dashboard and app design" },
  ];

  return (
    <MainLayout>
      <SEOHead
        title="Festival Color Palettes — Indian & World Holiday Colors 2026 | Colour Pine"
        description="Explore 18+ curated color palettes for festivals worldwide — Diwali, Holi, Christmas, Eid, Chinese New Year, Wedding & more. Free hex codes, CSS variables, and design tips."
        keywords="festival color palette, diwali colors, holi color palette, christmas colors, wedding color palette, indian festival colors, eid colors, chinese new year palette, pastel palette, dark mode colors"
        canonicalUrl="https://colourpine.com/palettes/festival"
        structuredData={structuredData}
      />

      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            18+ Curated Festival Palettes
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Festival Color Palettes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrate every occasion with culturally authentic, designer-ready color palettes for <strong>Indian festivals</strong>, <strong>world holidays</strong>, and <strong>special events</strong>.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search festivals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("all")}
            >
              <Globe className="w-3.5 h-3.5 mr-1" /> All
            </Button>
            {festivalCategories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filtered.length} festival palette{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map((festival) => (
            <FestivalCard key={festival.id} festival={festival} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No festivals found matching "{search}"</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setActiveCategory("all"); }}>
              Clear filters
            </Button>
          </div>
        )}

        {/* SEO Content */}
        <section className="mt-16 prose prose-sm max-w-none">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Why Use Festival Color Palettes in Design?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-foreground font-semibold mb-2">🎯 Cultural Relevance</h3>
              <p>Using culturally authentic colors for festival campaigns shows respect and understanding of your audience. Each palette in our collection is researched from traditional sources, ensuring your designs resonate genuinely with celebrants.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-foreground font-semibold mb-2">📈 Seasonal Traffic</h3>
              <p>Festival-themed designs drive massive seasonal engagement. Diwali, Christmas, and Lunar New Year campaigns see 3-5x higher interaction rates when using authentic, culturally appropriate color schemes.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-foreground font-semibold mb-2">🌍 Global Inclusivity</h3>
              <p>With palettes spanning Indian, East Asian, Middle Eastern, Western, and universal celebrations, your brand can authentically celebrate diversity and connect with audiences worldwide.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-foreground font-semibold mb-2">⚡ Ready-to-Use</h3>
              <p>Every palette comes with hex codes, CSS variables, and usage tips. Click any color to copy, visit detail pages for full CSS exports, and integrate directly into your Tailwind, React, or design tool workflow.</p>
            </div>
          </div>
        </section>

        <FAQSection faqs={hubFaqs} title="Festival Color Palettes — FAQ" />
        <InternalLinks links={internalLinks} title="Explore More Color Tools" />
      </div>
    </MainLayout>
  );
}
