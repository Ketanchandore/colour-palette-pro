import { SEOHead } from "@/components/seo/SEOHead";
import { FAQSection } from "@/components/seo/FAQSection";
import { InternalLinks } from "@/components/seo/InternalLinks";
import { MainLayout } from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const palettes = [
  { name: "Soft Spring", colors: ["#F9A8D4", "#86EFAC", "#FDE68A", "#FBCFE8", "#BBF7D0"], desc: "Pastel pink and green with soft yellow accents. Perfect for spring campaigns." },
  { name: "Tropical Paradise", colors: ["#EC4899", "#10B981", "#06B6D4", "#F43F5E", "#34D399"], desc: "Bold tropical pink and green. Vibrant and energetic." },
  { name: "Botanical Garden", colors: ["#DB2777", "#166534", "#15803D", "#BE185D", "#22C55E"], desc: "Deep botanical greens with rich pinks. Elegant and natural." },
  { name: "Watermelon", colors: ["#F43F5E", "#4ADE80", "#FCA5A5", "#22C55E", "#1A1A1A"], desc: "Watermelon-inspired pink and green. Fun and fresh." },
  { name: "Sage & Rose", colors: ["#F0ABFC", "#94A3B8", "#A7F3D0", "#C084FC", "#6EE7B7"], desc: "Muted sage green with dusty rose pink. Sophisticated and modern." },
  { name: "Neon Pop", colors: ["#FF6B9D", "#00FF88", "#FFE156", "#FF3366", "#33FF99"], desc: "Electric neon pink and green. Maximum visual impact." },
  { name: "Vintage Flora", colors: ["#E8B4B8", "#93C5A3", "#F5DEB3", "#C9A0A0", "#7EB08E"], desc: "Vintage muted tones. Timeless and romantic." },
  { name: "Forest Bloom", colors: ["#BE185D", "#052E16", "#14532D", "#9D174D", "#166534"], desc: "Dark forest green with deep magenta. Dramatic and luxurious." },
];

const faqs = [
  { question: "Do pink and green go together?", answer: "Yes! Pink and green are a classic complementary-adjacent pair. They create a vibrant, natural-feeling combination inspired by flowers and foliage. The key is matching the tone — pastel pink with sage green, or bold pink with emerald green." },
  { question: "What shade of green goes best with pink?", answer: "Sage green, mint green, and emerald green all pair beautifully with pink. Sage green works with dusty pink for a muted look, mint green pairs with hot pink for energy, and emerald green complements blush pink for elegance." },
  { question: "Is pink and green a wedding color palette?", answer: "Pink and green is one of the most popular wedding color palettes, especially for spring and garden weddings. Blush pink with sage green creates a romantic, timeless aesthetic perfect for invitations, floral arrangements, and table settings." },
  { question: "What colors complement a pink and green palette?", answer: "White, cream, gold, and soft yellow complement pink and green beautifully. White adds freshness, cream adds warmth, gold adds luxury, and soft yellow creates a complete garden-inspired palette." },
];

const internalLinks = [
  { label: "What Colors Go With Red", path: "/guides/what-colors-go-with-red", description: "Expert red color combinations with HEX codes" },
  { label: "Color Opposite of Pink", path: "/guides/color-opposite-of-pink", description: "Find pink's complementary color and more" },
  { label: "Creative Color Wheel", path: "/guides/creative-color-wheel", description: "Explore color harmonies interactively" },
  { label: "Palette Generator", path: "/generator", description: "Generate custom color palettes with AI" },
  { label: "Festival Color Palettes", path: "/palettes/festival", description: "Explore festive color combinations" },
  { label: "Trending Palettes", path: "/trending", description: "Discover the most popular color palettes" },
];

const copyColor = (hex: string) => { navigator.clipboard.writeText(hex); toast.success(`Copied ${hex}`); };

export default function PinkAndGreenPalette() {
  return (
    <MainLayout>
      <SEOHead
        title="Pink and Green Color Palette — 8 Beautiful Combinations [2026]"
        description="Explore 8 stunning pink and green color palettes with HEX codes. From pastel spring to neon pop — find the perfect pink and green combination for your design."
        keywords="pink and green color palette, pink and green, pink and green combination, sage and pink palette, pink green wedding colors"
        canonicalUrl="/guides/pink-and-green-palette"
        structuredData={{ "@context": "https://schema.org", "@type": "Article", headline: "Pink and Green Color Palette — 8 Beautiful Combinations", author: { "@type": "Organization", name: "Colour Pine" } }}
      />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/tools" className="hover:text-foreground">Tools</Link> / <span className="text-foreground">Pink & Green Palette</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Pink and Green Color Palette</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          Pink and green is one of the most versatile color combinations in design. From soft pastels to bold neons, these 8 curated <strong>pink and green color palettes</strong> cover every style — with copyable HEX codes.
        </p>

        <div className="space-y-6 mb-12">
          {palettes.map((p) => (
            <div key={p.name} className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">{p.name}</h2>
              <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {p.colors.map((c) => (
                  <button key={c} onClick={() => copyColor(c)} className="group flex flex-col items-center gap-1">
                    <div className="w-16 h-16 rounded-lg border border-border shadow-sm" style={{ backgroundColor: c }} />
                    <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground">{c}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <FAQSection faqs={faqs} title="Pink & Green Color Palette FAQ" />
        <InternalLinks links={internalLinks} />
      </div>
    </MainLayout>
  );
}
