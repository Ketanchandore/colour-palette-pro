import { SEOHead } from "@/components/seo/SEOHead";
import { FAQSection } from "@/components/seo/FAQSection";
import { InternalLinks } from "@/components/seo/InternalLinks";
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const colorCombinations = [
  { name: "Red + Navy Blue", colors: ["#DC2626", "#1E3A5F"], desc: "Classic, professional pairing. Perfect for corporate branding and formal designs.", use: "Business cards, corporate websites, presentations" },
  { name: "Red + Gold", colors: ["#DC2626", "#D4AF37"], desc: "Luxurious and regal. Evokes warmth, wealth, and celebration.", use: "Event invitations, luxury brands, holiday designs" },
  { name: "Red + White", colors: ["#DC2626", "#FFFFFF"], desc: "Bold and clean. High contrast for maximum readability.", use: "Logos, signage, call-to-action buttons" },
  { name: "Red + Black", colors: ["#DC2626", "#1A1A1A"], desc: "Dramatic and powerful. Creates a sense of urgency and elegance.", use: "Fashion brands, gaming, nightlife venues" },
  { name: "Red + Teal", colors: ["#DC2626", "#0D9488"], desc: "Complementary pair with vibrant energy. Eye-catching and modern.", use: "Posters, social media graphics, app interfaces" },
  { name: "Red + Cream", colors: ["#DC2626", "#FFF8E7"], desc: "Soft and inviting. Red pops beautifully against warm cream.", use: "Restaurant menus, food packaging, vintage designs" },
  { name: "Red + Gray", colors: ["#DC2626", "#6B7280"], desc: "Sophisticated and balanced. Gray neutralizes red's intensity.", use: "Tech products, dashboards, editorial design" },
  { name: "Red + Pink", colors: ["#DC2626", "#F9A8D4"], desc: "Monochromatic harmony. Playful and energetic.", use: "Valentine's Day, beauty brands, children's products" },
  { name: "Red + Forest Green", colors: ["#DC2626", "#166534"], desc: "Traditional complementary pair. Rich and festive.", use: "Christmas designs, Italian themes, nature brands" },
  { name: "Red + Mustard Yellow", colors: ["#DC2626", "#CA8A04"], desc: "Warm analogous combo. Earthy and autumnal.", use: "Fall campaigns, food brands, retro designs" },
];

const faqs = [
  { question: "What colors go with red?", answer: "Red pairs beautifully with navy blue, gold, white, black, teal, cream, gray, pink, forest green, and mustard yellow. The best combination depends on your project — navy blue for professional looks, gold for luxury, white for bold contrast, and teal for vibrant modern designs." },
  { question: "What is the complementary color of red?", answer: "The complementary color of red is green. On the color wheel, red (#FF0000) sits directly opposite green (#00FF00). For design, try pairing red with teal or forest green for a more sophisticated take on this complementary relationship." },
  { question: "What colors go good with red and black?", answer: "Red and black pair well with white, gold, silver, or cream as accent colors. White adds clean contrast, gold adds luxury, silver brings modern edge, and cream softens the dramatic combination." },
  { question: "Does red go with blue?", answer: "Yes! Red and blue is a classic color combination. Navy blue with red creates a patriotic or professional look, while royal blue with red is bold and energetic. Avoid pairing bright red with bright blue as they can vibrate visually." },
  { question: "What neutrals go with red?", answer: "The best neutrals to pair with red are white, black, gray, cream, beige, and tan. Lighter neutrals let red be the focal point, while darker neutrals like charcoal or black create dramatic sophistication." },
  { question: "Is red a warm or cool color?", answer: "Red is a warm color. It sits on the warm side of the color wheel alongside orange and yellow. However, red can have cool undertones (blue-reds like crimson) or warm undertones (orange-reds like vermilion), which affects how it pairs with other colors." },
];

const internalLinks = [
  { label: "Color Opposite of Pink", path: "/guides/color-opposite-of-pink", description: "Discover complementary colors for pink and build stunning palettes" },
  { label: "Pink & Green Color Palette", path: "/guides/pink-and-green-palette", description: "Explore beautiful pink and green color combinations" },
  { label: "Creative Color Wheel", path: "/guides/creative-color-wheel", description: "Interactive color wheel to find harmonious color combinations" },
  { label: "Contrast Checker", path: "/contrast-checker", description: "Check WCAG contrast ratios for your red color combinations" },
  { label: "AI Color Suggestions", path: "/ai-suggestions", description: "Get AI-powered color palette recommendations" },
  { label: "Palette Generator", path: "/generator", description: "Generate harmonious color palettes instantly" },
];

const copyColor = (hex: string) => {
  navigator.clipboard.writeText(hex);
  toast.success(`Copied ${hex}`);
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Colors Go With Red? 10 Expert Color Combinations for 2026",
  description: "Discover the best colors that go with red for design, fashion, and home decor. Expert-curated red color combinations with HEX codes.",
  author: { "@type": "Organization", name: "Colour Pine" },
  datePublished: "2026-01-01",
  dateModified: "2026-04-16",
};

export default function WhatColorsGoWithRed() {
  return (
    <MainLayout>
      <SEOHead
        title="What Colors Go With Red? 10 Best Red Color Combinations [2026]"
        description="Discover what colors go with red — 10 expert-curated red color combinations with HEX codes for design, fashion & branding. Free color palette ideas."
        keywords="what colors go with red, colors that go with red, what colors go good with red, red color combinations, red color palette, red complementary colors"
        canonicalUrl="/guides/what-colors-go-with-red"
        structuredData={structuredData}
      />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/tools" className="hover:text-foreground">Tools</Link> / <span className="text-foreground">What Colors Go With Red</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
          What Colors Go With Red? 10 Best Combinations
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          Red is one of the most powerful colors in design. Whether you're creating a brand identity, designing a website, or decorating a room — choosing the right colors to pair with red makes all the difference. Here are 10 expert-curated <strong>red color combinations</strong> with HEX codes you can copy instantly.
        </p>

        <div className="space-y-6 mb-12">
          {colorCombinations.map((combo) => (
            <div key={combo.name} className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">{combo.name}</h2>
              <div className="flex gap-3 mb-3">
                {combo.colors.map((c) => (
                  <button key={c} onClick={() => copyColor(c)} className="group flex items-center gap-2">
                    <div className="w-14 h-14 rounded-lg border border-border shadow-sm" style={{ backgroundColor: c }} />
                    <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground">{c}</span>
                    <Copy className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
              <p className="text-muted-foreground text-sm mb-1">{combo.desc}</p>
              <p className="text-xs text-muted-foreground"><strong>Best for:</strong> {combo.use}</p>
            </div>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">How to Choose Colors That Go With Red</h2>
          <div className="prose prose-sm text-muted-foreground max-w-none space-y-3">
            <p>When selecting colors to pair with red, consider these color theory principles:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Complementary:</strong> Green sits opposite red on the color wheel, creating maximum contrast and visual energy.</li>
              <li><strong>Analogous:</strong> Orange and pink are red's neighbors, creating warm, harmonious combinations.</li>
              <li><strong>Triadic:</strong> Red, blue, and yellow form a triadic harmony — bold and balanced.</li>
              <li><strong>Neutral pairing:</strong> White, black, gray, and cream let red be the star without competing.</li>
            </ul>
          </div>
        </section>

        <FAQSection faqs={faqs} title="Frequently Asked Questions About Red Color Combinations" />
        <InternalLinks links={internalLinks} />
      </div>
    </MainLayout>
  );
}
